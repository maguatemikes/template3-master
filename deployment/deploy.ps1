# ---------------------------
# Modern Minimalist Website Deployment Script (Cloudflare + S3 + Vite)
# ---------------------------

# Stop on errors (but we'll handle AWS CLI errors manually via $LASTEXITCODE)
$ErrorActionPreference = 'Stop'

# Start logging
$LogFile = "deploy.log"
Start-Transcript -Path $LogFile -Append

# Color definitions
$Colors = @{
    'Red'    = 'Red'
    'Green'  = 'Green'
    'Yellow' = 'Yellow'
    'Blue'   = 'Blue'
}

# Deployment flags
$S3_BUCKET_CREATED = $false
$deploymentComplete = $true

# ---------------------------
# Message function
# ---------------------------
function Write-Message {
    param([string]$Type, [string]$Message)
    switch ($Type) {
        "info" { Write-Host "INFO: $Message" -ForegroundColor $Colors['Blue'] }
        "success" { Write-Host "SUCCESS: $Message" -ForegroundColor $Colors['Green'] }
        "warning" { Write-Host "WARNING: $Message" -ForegroundColor $Colors['Yellow'] }
        "error" { Write-Host "ERROR: $Message" -ForegroundColor $Colors['Red'] }
    }
}

# ---------------------------
# Rollback function
# ---------------------------
function Rollback {
    Write-Message "warning" "Deployment failed. Rolling back changes..."
    if ($S3_BUCKET_CREATED -and $S3_BUCKET) {
        Write-Message "info" "Deleting newly created S3 bucket: $S3_BUCKET"
        aws s3 rb "s3://$S3_BUCKET" --force @script:profileArgs
    }
    Write-Message "info" "Rollback completed."
}

# ---------------------------
# Load config
# ---------------------------
function Load-Configuration {
    $ConfigFile = Join-Path $PSScriptRoot "deploy-config.env"
    Write-Message "info" "Loading configuration from: $ConfigFile"
    if (-Not (Test-Path $ConfigFile)) { Write-Message "error" "Config file not found"; exit 1 }
    Get-Content $ConfigFile | ForEach-Object {
        if ($_ -notmatch '^\s*#' -and $_ -match '^\s*(\S+?)\s*=\s*(.*)$') {
            $key = $Matches[1]
            $value = $Matches[2].Trim('"').Trim()
            Set-Variable -Name $key -Value $value -Scope Script
            [Environment]::SetEnvironmentVariable($key, $value, "Process")
            Write-Host "Set $key to '$value'"
        }
    }
}

# ---------------------------
# Validate environment
# ---------------------------
function Validate-EnvVariables {
    $required_vars = @("AWS_REGION", "DOMAIN_NAME")
    
    # Only require AWS_CLI_PROFILE if not in CI/CD
    if (-not $script:isCI) {
        $required_vars += "AWS_CLI_PROFILE"
    }
    
    foreach ($var in $required_vars) {
        $value = Get-Variable -Name $var -ValueOnly -ErrorAction SilentlyContinue
        if ([string]::IsNullOrEmpty($value)) {
            Write-Message "error" "Required env variable $var is not set."
            exit 1
        }
    }
    $S3_BUCKET = $DOMAIN_NAME
    Set-Variable -Name "S3_BUCKET" -Value $S3_BUCKET -Scope Script
}

# ---------------------------
# Validate S3 bucket name
# ---------------------------
function Validate-BucketName {
    param([string]$BucketName)
    if ([string]::IsNullOrEmpty($BucketName)) { Write-Message "error" "S3 bucket name empty"; return $false }
    if ($BucketName.Length -lt 3 -or $BucketName.Length -gt 63) { Write-Message "error" "S3 bucket name invalid length"; return $false }
    if ($BucketName -notmatch '^[a-z0-9][a-z0-9.-]*[a-z0-9]$') { Write-Message "error" "S3 bucket invalid format"; return $false }
    return $true
}

# ---------------------------
# Build Vite app
# ---------------------------
function Build-ReactApp {
    param([string]$AppPath)
    Write-Message "info" "Building Vite app..."
    Push-Location $AppPath
    if (-Not (Test-Path "node_modules")) {
        Write-Message "info" "Installing npm dependencies..."
        npm install
    }
    npm run build
    Pop-Location
    Write-Message "success" "Vite app build completed."
}

# ---------------------------
# Deploy to S3
# ---------------------------
function Deploy-To-S3 {
    param([string]$BucketName, [string]$BuildFolder)
    if (-Not (Test-Path $BuildFolder)) {
        Write-Message "error" "Build folder '$BuildFolder' does not exist. Did the build succeed?"
        exit 1
    }
    Write-Message "info" "Uploading files to S3 bucket: $BucketName"
    aws s3 sync "$BuildFolder" "s3://$BucketName" `
        --delete `
        @script:profileArgs
    
    if ($LASTEXITCODE -ne 0) {
        Write-Message "error" "Failed to upload files to S3"
        exit 1
    }
    
    Write-Message "success" "Deployment to S3 completed."
}

# ---------------------------
# Main flow
# ---------------------------
try {
    Write-Message "info" "Starting deployment process..."
    Load-Configuration

    # Detect if running in CI/CD environment (GitHub Actions)
    $script:isCI = ($env:CI -eq "true") -or ($env:GITHUB_ACTIONS -eq "true")
    
    if ($script:isCI) {
        Write-Message "info" "Running in CI/CD environment - using environment variables for AWS credentials"
        $script:profileArgs = @()
    } else {
        Write-Message "info" "Running locally - using AWS profile: $AWS_CLI_PROFILE"
        $script:profileArgs = @("--profile", $AWS_CLI_PROFILE)
    }

    if (-not (Get-Command "aws" -ErrorAction SilentlyContinue)) {
        Write-Message "error" "AWS CLI not installed."
        exit 1
    }

    Validate-EnvVariables
    if (-not (Validate-BucketName $S3_BUCKET)) { exit 1 }

    # Create S3 bucket if it doesn't exist
    Write-Message "info" "Checking if S3 bucket exists: $S3_BUCKET"
    
    # Temporarily allow errors for bucket check
    $prevErrorPref = $ErrorActionPreference
    $ErrorActionPreference = 'Continue'
    
    $null = aws s3api head-bucket --bucket $S3_BUCKET @script:profileArgs 2>&1
    $bucketExists = ($LASTEXITCODE -eq 0)
    
    $ErrorActionPreference = $prevErrorPref
    
    if ($bucketExists) {
        Write-Message "info" "S3 bucket already exists: $S3_BUCKET"
    } else {
        Write-Message "info" "S3 bucket does not exist. Creating: $S3_BUCKET"
        
        # Create bucket with proper region configuration
        if ($AWS_REGION -eq "us-east-1") {
            # us-east-1 doesn't need LocationConstraint
            aws s3api create-bucket `
                --bucket $S3_BUCKET `
                @script:profileArgs
        } else {
            # Other regions require LocationConstraint
            aws s3api create-bucket `
                --bucket $S3_BUCKET `
                --region $AWS_REGION `
                --create-bucket-configuration LocationConstraint=$AWS_REGION `
                @script:profileArgs
        }
        
        if ($LASTEXITCODE -eq 0) {
            $S3_BUCKET_CREATED = $true
            Write-Message "success" "S3 bucket created successfully: $S3_BUCKET"
        } else {
            Write-Message "error" "Failed to create S3 bucket. Check if bucket name is available."
            exit 1
        }
    }

    # Configure bucket for static website hosting
    Write-Message "info" "Configuring static website hosting..."
    aws s3 website "s3://$S3_BUCKET" `
        --index-document index.html `
        --error-document index.html `
        @script:profileArgs
    
    if ($LASTEXITCODE -ne 0) {
        Write-Message "error" "Failed to configure static website hosting"
        exit 1
    }

    # Disable public access blocks
    Write-Message "info" "Configuring public access..."
    aws s3api put-public-access-block `
        --bucket $S3_BUCKET `
        --public-access-block-configuration "BlockPublicAcls=false,IgnorePublicAcls=false,BlockPublicPolicy=false,RestrictPublicBuckets=false" `
        @script:profileArgs
    
    if ($LASTEXITCODE -ne 0) {
        Write-Message "error" "Failed to configure public access"
        exit 1
    }

    # Apply bucket policy for public read
    Write-Message "info" "Applying public read policy..."
    $bucketPolicy = @"
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "PublicReadGetObject",
            "Effect": "Allow",
            "Principal": "*",
            "Action": "s3:GetObject",
            "Resource": "arn:aws:s3:::$S3_BUCKET/*"
        }
    ]
}
"@
    $policyFile = Join-Path $PSScriptRoot "temp-bucket-policy.json"
    # Use UTF8 without BOM to avoid JSON parsing issues
    [System.IO.File]::WriteAllText($policyFile, $bucketPolicy)
    
    aws s3api put-bucket-policy `
        --bucket $S3_BUCKET `
        --policy "file://$policyFile" `
        @script:profileArgs
    
    if ($LASTEXITCODE -ne 0) {
        Write-Message "error" "Failed to apply bucket policy"
        Remove-Item $policyFile -ErrorAction SilentlyContinue
        exit 1
    }
    
    Remove-Item $policyFile -ErrorAction SilentlyContinue
    Write-Message "success" "S3 bucket configured successfully"

    # Build Vite app
    Build-ReactApp -AppPath "$PSScriptRoot\.."

    # Deploy to S3 (dist folder)
    Deploy-To-S3 -BucketName $S3_BUCKET -BuildFolder "$PSScriptRoot\..\dist"

    Write-Message "success" "Deployment completed! Your site should now be live via Cloudflare DNS."
    
    # Output S3 website URL
    $websiteUrl = "http://$S3_BUCKET.s3-website-$AWS_REGION.amazonaws.com"
    Write-Message "success" "Website URL: $websiteUrl"

} catch {
    Write-Message "error" "Deployment error: $_"
    $deploymentComplete = $false
} finally {
    Stop-Transcript
    if (-not $deploymentComplete) { Rollback }
}
