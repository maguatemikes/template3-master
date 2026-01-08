// Transform WordPress API data to match component expectations
export function transformApiData(apiData: any): any {
  // Map emoji icons from API to lucide-react icon names
  const iconMapping: Record<string, string> = {
    // Pain Points icons
    '❌': 'MapPinOff',
    '⌛': 'Clock',
    '❓': 'Package',
    
    // Benefits icons
    '🚚': 'Zap',
    '💳': 'Shield',
    '⭐': 'Award',
  };

  const transformed = { ...apiData };

  // Transform painPoints icons
  if (transformed.painPoints?.points) {
    transformed.painPoints.points = transformed.painPoints.points.map((point: any) => ({
      ...point,
      icon: iconMapping[point.icon] || 'Package'
    }));
  }

  // Transform benefits icons
  if (transformed.benefits?.benefits) {
    transformed.benefits.benefits = transformed.benefits.benefits.map((benefit: any) => ({
      ...benefit,
      icon: iconMapping[benefit.icon] || 'Award'
    }));
  }

  return transformed;
}
