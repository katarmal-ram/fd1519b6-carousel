
import { useState, useEffect } from 'react';
import { PageConfig } from '@/types/config';

export const usePageConfig = (pageName: string) => {
  const [config, setConfig] = useState<PageConfig | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPageConfig = async () => {
      try {
        setLoading(true);
        console.log(`Fetching page configuration for: ${pageName}`);
        
        const response = await fetch(`/pages/${pageName}.json`);
        if (!response.ok) {
          throw new Error(`Failed to fetch page config: ${response.status}`);
        }
        
        const data = await response.json();
        console.log(`Page config loaded for ${pageName}:`, data);
        
        // Validate required structure
        if (!data.meta || !data.sections) {
          throw new Error('Invalid page configuration structure');
        }
        
        setConfig(data);
        
        // Update page meta tags
        if (data.meta.title) {
          document.title = data.meta.title;
        }
        
        const metaDescription = document.querySelector('meta[name="description"]');
        if (metaDescription && data.meta.description) {
          metaDescription.setAttribute('content', data.meta.description);
        }
        
        setError(null);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : `Failed to load page: ${pageName}`;
        console.error('Page config loading error:', errorMessage);
        setError(errorMessage);
        
        // Set fallback config
        setConfig({
          meta: { title: 'Page Not Found', description: 'Page could not be loaded' },
          hero: { type: 'image', enabled: false },
          sections: {}
        });
      } finally {
        setLoading(false);
      }
    };

    if (pageName) {
      fetchPageConfig();
    }
  }, [pageName]);

  return { config, loading, error };
};
