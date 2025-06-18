
import { Award, Clock, Cog } from 'lucide-react';

interface WhyChooseUsProps {
  config: {
    title: string;
    subtitle: string;
    items: Array<{
      id?: string;
      icon: string;
      title: string;
      description: string;
    }>;
  };
}

const iconMap = {
  'award': Award,
  'clock': Clock,
  'cog': Cog,
};

const WhyChooseUs = ({ config }: WhyChooseUsProps) => {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {config.title}
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            {config.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {config.items.map((item, index) => {
            const IconComponent = iconMap[item.icon as keyof typeof iconMap];
            return (
              <div key={item.id || index} className="text-center group hover:scale-105 transition-transform duration-300">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-200 transition-colors">
                  {IconComponent && <IconComponent className="h-8 w-8 text-blue-600" />}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-600">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
