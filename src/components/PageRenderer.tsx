
import { usePageConfig } from '@/hooks/usePageConfig';
import { useEffect } from 'react';
import LoadingScreen from './LoadingScreen';
import Hero from './Hero';
import SectionRenderer from './SectionRenderer';

interface PageRendererProps {
  pageName: string;
}

// Define proper section orders for each page
const PAGE_SECTION_ORDERS = {
  home: [
    'whyChooseUs',
    'aboutusintro', 
    'stats',
    'expertise',
    'testimonials',
    'faqs',
    'cta'
  ],
  about: [
    'companyOverview',
    'companyJourney',
    'infrastructure', 
    'manufacturingProcess',
    'awards',
    'certificates',
    'cta'
  ],
  services: [
    'services',
    'capabilities',
    'cta'
  ],
  products: [
    'products',
    'cta'
  ],
  contact: [
    'contactInfo',
    'contactForm'
  ]
};

const PageRenderer = ({ pageName }: PageRendererProps) => {
  const { config, loading, error } = usePageConfig(pageName);

  // Make config available globally for components that need it
  useEffect(() => {
    if (config) {
      (window as any).pageConfig = config;
    }
  }, [config]);

  if (loading) {
    return <LoadingScreen />;
  }

  if (error || !config) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-red-50">
        <div className="text-center p-8">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Page Error</h1>
          <p className="text-red-700 mb-4">{error || `Failed to load page: ${pageName}`}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  // Get the proper section order for this page
  const sectionOrder = PAGE_SECTION_ORDERS[pageName as keyof typeof PAGE_SECTION_ORDERS] || [];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      {config.hero?.enabled && (
        <Hero hero={config.hero} />
      )}

      {/* Page Sections - Ordered properly */}
      <div className="relative">
        {sectionOrder.map((sectionKey) => {
          const sectionConfig = config.sections[sectionKey];
          
          if (!sectionConfig || !sectionConfig.enabled) {
            console.log(`Skipping disabled or missing section: ${sectionKey}`);
            return null;
          }

          return (
            <SectionRenderer
              key={sectionKey}
              sectionKey={sectionKey}
              config={sectionConfig}
            />
          );
        })}
        
        {/* Render any additional sections not in the predefined order */}
        {Object.entries(config.sections).map(([sectionKey, sectionConfig]) => {
          if (!sectionConfig.enabled || sectionOrder.includes(sectionKey)) {
            return null;
          }

          console.log(`Rendering additional section: ${sectionKey}`);
          return (
            <SectionRenderer
              key={sectionKey}
              sectionKey={sectionKey}
              config={sectionConfig}
            />
          );
        })}
      </div>
    </div>
  );
};

export default PageRenderer;
