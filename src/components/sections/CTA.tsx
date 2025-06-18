
import { Button } from '@/components/ui/button';

interface CTAProps {
  config: {
    title: string;
    subtitle: string;
    primaryCTA?: {
      text: string;
      action: string;
    };
    secondaryCTA?: {
      text: string;
      action: string;
    };
    primaryButton?: string;
    secondaryButton?: string;
    backgroundImage?: string;
  };
}

const CTA = ({ config }: CTAProps) => {
  const handleCTAClick = (action: string) => {
    // Scroll to top before navigation
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    if (action.startsWith('tel:')) {
      window.location.href = action;
    } else if (action.startsWith('/')) {
      // Small delay to allow scroll animation before navigation
      setTimeout(() => {
        window.location.href = action;
      }, 300);
    } else {
      window.open(action, '_blank');
    }
  };

  return (
    <section className="relative py-20 overflow-hidden bg-slate-950">
      {/* Background */}
      {config.backgroundImage && (
        <div className="absolute inset-0 z-0">
          <img 
            src={config.backgroundImage} 
            alt="Call to action background" 
            className="w-full h-full object-cover" 
          />
          <div className="absolute inset-0 bg-black bg-opacity-60" />
        </div>
      )}

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl md:text-5xl font-bold mb-6 text-slate-50">
          {config.title}
        </h2>
        <p className="text-xl text-gray-100 mb-8 max-w-2xl mx-auto">
          {config.subtitle}
        </p>
        
        <div className="space-x-4">
          {(config.primaryCTA || config.primaryButton) && (
            <Button 
              size="lg" 
              className="bg-theme-red hover:bg-theme-red-dark text-white font-semibold transition-all duration-300 transform hover:scale-105" 
              onClick={() => config.primaryCTA && handleCTAClick(config.primaryCTA.action)}
            >
              {config.primaryCTA?.text || config.primaryButton}
            </Button>
          )}
          {(config.secondaryCTA || config.secondaryButton) && (
            <Button 
              size="lg" 
              variant="outline" 
              onClick={() => config.secondaryCTA && handleCTAClick(config.secondaryCTA.action)} 
              className="border-white text-white bg-transparent hover:bg-white hover:text-slate-950 font-semibold my-[21px] mx-[28px] transition-all duration-300"
            >
              {config.secondaryCTA?.text || config.secondaryButton}
            </Button>
          )}
        </div>
      </div>
    </section>
  );
};

export default CTA;
