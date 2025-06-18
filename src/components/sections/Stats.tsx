
import { useState, useEffect, useRef } from 'react';

interface StatsProps {
  config: {
    title: string;
    subtitle: string;
    items: Array<{
      number: string;
      label: string;
    }>;
  };
}

const Stats = ({ config }: StatsProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const CountUp = ({ end }: { end: string }) => {
    const [count, setCount] = useState(0);
    const endNumber = parseFloat(end.replace(/[+%]/g, ''));
    const suffix = end.replace(/[0-9.]/g, '');

    useEffect(() => {
      if (!isVisible) return;

      const duration = 2000;
      const steps = 60;
      const increment = endNumber / steps;
      let current = 0;

      const timer = setInterval(() => {
        current += increment;
        if (current >= endNumber) {
          setCount(endNumber);
          clearInterval(timer);
        } else {
          setCount(Math.floor(current));
        }
      }, duration / steps);

      return () => clearInterval(timer);
    }, [isVisible, endNumber]);

    return (
      <span>
        {count === endNumber ? end : `${count}${suffix}`}
      </span>
    );
  };

  return (
    <section ref={sectionRef} className="py-16 bg-gradient-to-br from-blue-50 to-red-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {config.title}
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            {config.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {config.items.map((item, index) => (
            <div key={index} className="text-center group">
              <div className="text-3xl md:text-4xl font-bold text-theme-red mb-2 transition-all duration-300 group-hover:scale-110 group-hover:text-theme-red-dark">
                <CountUp end={item.number} />
              </div>
              <p className="text-gray-600 font-medium group-hover:text-theme-blue transition-colors duration-300">
                {item.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;
