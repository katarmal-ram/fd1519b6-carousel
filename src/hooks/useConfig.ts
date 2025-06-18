
import { useState, useEffect } from 'react';
import { Config } from '@/types/config';

export const useConfig = () => {
  const [config, setConfig] = useState<Config | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchConfig = async () => {
      try {
        setLoading(true);
        console.log('Fetching global configuration...');
        
        const response = await fetch('/pages/config.json');
        if (!response.ok) {
          throw new Error(`Failed to fetch config: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('Global config loaded:', data);
        
        setConfig(data);
        
        // Update document title and favicon
        if (data.site) {
          document.title = data.site.name;
          const favicon = document.querySelector('link[rel="icon"]') as HTMLLinkElement;
          if (favicon && data.site.favicon) {
            favicon.href = data.site.favicon;
          }
        }
        
        setError(null);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Failed to load configuration';
        console.error('Config loading error:', errorMessage);
        setError(errorMessage);
        
        // Set fallback config
        setConfig({
          site: { name: 'Website', tagline: 'Welcome', favicon: '/favicon.ico' },
          company: { name: 'Company', tagline: 'Tagline', logo: '', description: 'Description' },
          contact: { address: '', phone: '', email: '', timing: [] },
          header: { navigation: [{ label: 'Home', href: '/' }] },
          footer: { navigation: [], social: [], branding: { text: '', company: '', url: '' } }
        });
      } finally {
        setLoading(false);
      }
    };

    fetchConfig();
  }, []);

  return { config, loading, error };
};
