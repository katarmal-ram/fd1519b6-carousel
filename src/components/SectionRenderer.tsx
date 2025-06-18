
import { ErrorBoundary } from 'react-error-boundary';
import WhyChooseUs from './sections/WhyChooseUs';
import AboutUsIntro from './sections/AboutUsIntro';
import Stats from './sections/Stats';
import Expertise from './sections/Expertise';
import Services from './sections/Services';
import FeaturedProducts from './sections/FeaturedProducts';
import Testimonials from './sections/Testimonials';
import CompanyOverview from './sections/CompanyOverview';
import CompanyJourney from './sections/CompanyJourney';
import Infrastructure from './sections/Infrastructure';
import ManufacturingProcess from './sections/ManufacturingProcess';
import Awards from './sections/Awards';
import FAQs from './sections/FAQs';
import ContactForm from './sections/ContactForm';
import ContactInfo from './sections/ContactInfo';
import CTA from './sections/CTA';
import Capabilities from './sections/Capabilities';
import Certificates from './sections/Certificates';
import Products from './sections/Products';

interface SectionRendererProps {
  sectionKey: string;
  config: any;
}

// Map section keys to their component types for consistent rendering
const SECTION_KEY_TO_TYPE: Record<string, string> = {
  'whyChooseUs': 'why-choose-us',
  'aboutusintro': 'about-us-intro',
  'stats': 'stats',
  'expertise': 'expertise',
  'services': 'services',
  'featuredProducts': 'featured-products',
  'testimonials': 'testimonials',
  'companyOverview': 'company-overview',
  'companyJourney': 'company-journey',
  'infrastructure': 'infrastructure',
  'manufacturingProcess': 'manufacturing-process',
  'awards': 'awards',
  'faqs': 'faqs',
  'contactForm': 'contact-form',
  'contactInfo': 'contact-info',
  'cta': 'cta',
  'capabilities': 'capabilities',
  'certificates': 'certificates',
  'products': 'products',
};

const sectionComponents = {
  'why-choose-us': WhyChooseUs,
  'about-us-intro': AboutUsIntro,
  'stats': Stats,
  'expertise': Expertise,
  'services': Services,
  'featured-products': FeaturedProducts,
  'testimonials': Testimonials,
  'company-overview': CompanyOverview,
  'company-journey': CompanyJourney,
  'infrastructure': Infrastructure,
  'manufacturing-process': ManufacturingProcess,
  'awards': Awards,
  'faqs': FAQs,
  'contact-form': ContactForm,
  'contact-info': ContactInfo,
  'cta': CTA,
  'capabilities': Capabilities,
  'certificates': Certificates,
  'products': Products,
};

const SectionErrorFallback = ({ sectionKey }: { sectionKey: string }) => (
  <div className="py-16 bg-red-50">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <h2 className="text-2xl font-bold text-red-600 mb-4">Section Error</h2>
      <p className="text-red-700">Failed to load section: {sectionKey}</p>
    </div>
  </div>
);

const SectionRenderer = ({ sectionKey, config }: SectionRendererProps) => {
  // Determine the component type - use mapping first, then fall back to config.type
  const componentType = SECTION_KEY_TO_TYPE[sectionKey] || config.type;
  const SectionComponent = sectionComponents[componentType as keyof typeof sectionComponents];

  if (!SectionComponent) {
    console.warn(`Unknown section type: ${componentType} for section: ${sectionKey}`);
    return (
      <div className="py-16 bg-yellow-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold text-yellow-600 mb-4">Unknown Section</h2>
          <p className="text-yellow-700">Section type "{componentType}" is not supported</p>
        </div>
      </div>
    );
  }

  return (
    <ErrorBoundary
      FallbackComponent={() => <SectionErrorFallback sectionKey={sectionKey} />}
      onError={(error) => console.error(`Error in section ${sectionKey}:`, error)}
    >
      <SectionComponent config={config} />
    </ErrorBoundary>
  );
};

export default SectionRenderer;
