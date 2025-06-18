import { useState, useEffect } from 'react';
import { Hero as HeroType } from '@/types/config';
import { Button } from '@/components/ui/button';

interface HeroProps {
  hero: HeroType;
}

const Hero = ({ hero }: HeroProps) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto-play for carousel with 4-second intervals
  useEffect(() => {
    if (hero.type === 'carousel' && hero.slides && hero.slides.length > 1) {
      const interval = setInterval(() => {
        setCurrentSlide(prev => (prev + 1) % hero.slides!.length);
      }, 4000); // 4 seconds
      return () => clearInterval(interval);
    }
  }, [hero]);

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

  if (hero.type === 'carousel' && hero.slides) {
    return (
      <section className="relative h-screen overflow-hidden">
        <div className="relative w-full h-full">
          {hero.slides.map((slide, index) => (
            <div 
              key={index} 
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
              }`}
            >
              {/* Background */}
              <div className="absolute inset-0">
                {slide.backgroundVideo ? (
                  <video autoPlay muted loop className="w-full h-full object-cover">
                    <source src={slide.backgroundVideo} type="video/mp4" />
                  </video>
                ) : (
                  <div className="relative w-full h-full overflow-hidden">
                    <img 
                      src={slide.backgroundImage} 
                      alt={slide.title} 
                      className="w-full h-full object-cover"
                    />
                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="relative z-20 h-full flex items-center justify-center">
                <div className="text-center text-white max-w-5xl mx-auto px-4">
                  <h1 className={`text-5xl md:text-7xl font-bold mb-6 transition-all duration-700 ${
                    index === currentSlide 
                      ? 'translate-y-0 opacity-100' 
                      : 'translate-y-8 opacity-0'
                  }`}>
                    {slide.title}
                  </h1>
                  <p className={`text-xl md:text-2xl mb-8 opacity-90 transition-all duration-700 delay-200 ${
                    index === currentSlide 
                      ? 'translate-y-0 opacity-90' 
                      : 'translate-y-8 opacity-0'
                  }`}>
                    {slide.subtitle}
                  </p>
                  <div className={`space-x-4 transition-all duration-700 delay-400 ${
                    index === currentSlide 
                      ? 'translate-y-0 opacity-100' 
                      : 'translate-y-8 opacity-0'
                  }`}>
                    <Button 
                      size="lg" 
                      className="text-white bg-theme-red hover:bg-theme-red-dark transition-all duration-300 transform hover:scale-105 hover:shadow-xl" 
                      onClick={() => slide.cta.primaryAction && handleCTAClick(slide.cta.primaryAction)}
                    >
                      {slide.cta.primary}
                    </Button>
                    <Button 
                      size="lg" 
                      variant="outline" 
                      onClick={() => slide.cta.secondaryAction && handleCTAClick(slide.cta.secondaryAction)} 
                      className="border-white hover:bg-white transition-all duration-300 text-white hover:text-zinc-950 hover:scale-105"
                    >
                      {slide.cta.secondary}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation arrows */}
        <button
          onClick={() => setCurrentSlide(prev => prev === 0 ? hero.slides!.length - 1 : prev - 1)}
          className="absolute left-8 top-1/2 -translate-y-1/2 z-30 bg-theme-blue/90 hover:bg-theme-blue-dark border-none text-white backdrop-blur-sm transition-all duration-300 hover:scale-110 w-12 h-12 rounded-full flex items-center justify-center"
        >
          ←
        </button>
        <button
          onClick={() => setCurrentSlide(prev => (prev + 1) % hero.slides!.length)}
          className="absolute right-8 top-1/2 -translate-y-1/2 z-30 bg-theme-blue/90 hover:bg-theme-blue-dark border-none text-white backdrop-blur-sm transition-all duration-300 hover:scale-110 w-12 h-12 rounded-full flex items-center justify-center"
        >
          →
        </button>

        {/* Slide Indicators */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30">
          <div className="flex space-x-3">
            {hero.slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`relative transition-all duration-500 ${
                  index === currentSlide 
                    ? 'w-8 h-3 bg-theme-red scale-110' 
                    : 'w-3 h-3 bg-white/50 hover:bg-white/75 hover:scale-110'
                } rounded-full overflow-hidden`}
              >
                {index === currentSlide && (
                  <div className="absolute inset-0 bg-theme-red animate-pulse rounded-full" />
                )}
              </button>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // Single image/video hero
  return (
    <section className="relative h-96 md:h-[500px] overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        {hero.backgroundVideo ? (
          <video autoPlay muted loop className="w-full h-full object-cover">
            <source src={hero.backgroundVideo} type="video/mp4" />
          </video>
        ) : (
          <img src={hero.backgroundImage} alt={hero.title || 'Hero image'} className="w-full h-full object-cover" />
        )}
        <div className="absolute inset-0 bg-black bg-opacity-50" />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex items-center justify-center">
        <div className="text-center text-white max-w-4xl mx-auto px-4">
          {hero.title && (
            <h1 className="text-4xl md:text-6xl font-bold mb-4 animate-fade-in">
              {hero.title}
            </h1>
          )}
          {hero.subtitle && (
            <p className="text-lg md:text-xl opacity-90 animate-fade-in delay-200">
              {hero.subtitle}
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

export default Hero;
