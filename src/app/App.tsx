import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { PainPoints } from "./components/PainPoints";
import { Styles } from "./components/Styles";
import { Benefits } from "./components/Benefits";
import { Testimonials } from "./components/Testimonials";
import { CtaSection } from "./components/CtaSection";
import { Footer } from "./components/Footer";
import { LocationMap } from "./components/LocationMap";
import { useState, useEffect } from "react";
import { defaultContent } from "./data/defaultContent";
import { transformApiData } from "./utils/transformApiData";

// ═══════════════════════════════════════════════════════════════
// CONFIGURATION
// ═══════════════════════════════════════════════════════════════
const WORDPRESS_API_BASE = "https://michael.airtime.cc/wp-json/custom/v1";

// Site ID - n8n will replace this during deployment
// For local testing, use ?id=YOUR_SITE_ID in the URL
const SITE_ID = "REPLACE_WITH_SITE_ID";

export default function App() {
  const [contentData, setContentData] = useState<any>(defaultContent);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [siteId, setSiteId] = useState<string | null>(null);

  useEffect(() => {
    // ═══════════════════════════════════════════════════════════════
    // STEP 1: Determine which site ID to use
    // ═══════════════════════════════════════════════════════════════
    const urlParams = new URLSearchParams(window.location.search);
    const idFromUrl = urlParams.get("id");

    console.log("🔍 Checking for site ID...");
    console.log("URL:", window.location.href);
    console.log("Hardcoded SITE_ID:", SITE_ID);
    console.log("ID from URL parameter:", idFromUrl);

    // Priority:
    // 1. If SITE_ID has been replaced by n8n (not the placeholder), use it
    // 2. Otherwise, use URL parameter (for local testing)
    let targetId: string | null = null;

    if (SITE_ID !== "REPLACE_WITH_SITE_ID") {
      // Production: n8n has replaced the placeholder
      targetId = SITE_ID;
      console.log("✓ Using hardcoded SITE_ID from deployment:", targetId);
    } else if (idFromUrl) {
      // Development: Using URL parameter for testing
      targetId = idFromUrl;
      console.log("✓ Using SITE_ID from URL parameter:", targetId);
    } else {
      // No ID available
      console.warn("⚠️ No site ID provided");
      setError(
        "No site ID configured. Add ?id=YOUR_SITE_ID to the URL for testing."
      );
      setLoading(false);
      return;
    }

    setSiteId(targetId);

    // ═══════════════════════════════════════════════════════════════
    // STEP 2: Fetch content from WordPress API
    // ═══════════════════════════════════════════════════════════════
    const apiUrl = `${WORDPRESS_API_BASE}/get-json/${targetId}`;
    console.log("📡 Fetching from:", apiUrl);

    fetch(apiUrl)
      .then((response) => {
        console.log("📥 Response status:", response.status);

        if (!response.ok) {
          throw new Error(
            `Failed to load content (Status: ${response.status})`
          );
        }

        return response.json();
      })
      .then((data) => {
        console.log("✓ API Response received for ID", targetId);
        console.log("Raw response:", data);

        // ═══════════════════════════════════════════════════════════
        // STEP 3: Transform API data to component format
        // ═══════════════════════════════════════════════════════════
        const transformedData = transformApiData(data);
        console.log("✓ Data transformed");
        console.log("Transformed data:", transformedData);

        setContentData(transformedData);
        setLoading(false);
        console.log("✓ Content loaded successfully!");
      })
      .catch((err) => {
        console.error("❌ Error loading content:", err);
        setError(err.message || "Failed to load site content");
        setLoading(false);
      });
  }, []); // Run once on mount

  // ═══════════════════════════════════════════════════════════════
  // LOADING STATE
  // ═══════════════════════════════════════════════════════════════
  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-primary mx-auto mb-6"></div>
          <h2 className="text-2xl font-semibold text-foreground mb-2">
            Loading Your Site
          </h2>
          <p className="text-muted-foreground">
            {siteId
              ? `Fetching content for site #${siteId}...`
              : "Initializing..."}
          </p>
        </div>
      </div>
    );
  }

  // ═══════════════════════════════════════════════════════════════
  // ERROR STATE
  // ═══════════════════════════════════════════════════════════════
  if (error) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-card border border-border rounded-lg shadow-lg p-8 text-center">
          <div className="w-16 h-16 bg-destructive/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-8 h-8 text-destructive"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>

          <h1 className="text-2xl font-bold text-foreground mb-2">
            Unable to Load Site
          </h1>

          <p className="text-muted-foreground mb-6">{error}</p>

          <div className="bg-muted rounded-lg p-4 mb-6 text-left">
            <p className="text-sm text-muted-foreground mb-2">
              <strong>Current URL:</strong>
            </p>
            <code className="text-xs bg-background px-2 py-1 rounded break-all block">
              {window.location.href}
            </code>
            <p className="text-sm text-muted-foreground mt-3 mb-1">
              <strong>Site ID Status:</strong>
            </p>
            <code className="text-xs bg-background px-2 py-1 rounded block">
              {SITE_ID === "REPLACE_WITH_SITE_ID"
                ? "⚠️ Not deployed (using URL param mode)"
                : `✓ Configured: ${SITE_ID}`}
            </code>
          </div>

          <div className="space-y-2 text-sm text-muted-foreground text-left">
            <p>
              <strong>How to fix:</strong>
            </p>
            <ol className="list-decimal list-inside space-y-1 ml-2">
              <li>
                For testing: Add{" "}
                <code className="bg-muted px-1 rounded">?id=YOUR_SITE_ID</code>{" "}
                to the URL
              </li>
              <li>
                For production: Deploy via n8n workflow to auto-configure site
                ID
              </li>
              <li>Verify the site ID exists in the WordPress database</li>
              <li>Check the WordPress API is accessible</li>
            </ol>
          </div>

          <button
            onClick={() => window.location.reload()}
            className="mt-6 px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  // ═══════════════════════════════════════════════════════════════
  // SUCCESS STATE - RENDER SITE
  // ═══════════════════════════════════════════════════════════════
  return (
    <div className="min-h-screen bg-background">
      <Header content={contentData.header} />
      <main>
        <Hero content={contentData.hero} />
        <PainPoints content={contentData.painPoints} />
        <Styles content={contentData.styles} />
        <Benefits content={contentData.benefits} />
        <LocationMap content={contentData.location} />
        <Testimonials content={contentData.testimonials} />
        <CtaSection content={contentData.ctaSection} />
      </main>
      <Footer content={contentData.footer} />
    </div>
  );
}
