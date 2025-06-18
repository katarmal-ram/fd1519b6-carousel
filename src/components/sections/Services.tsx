
import { Award, Clock, Cog } from 'lucide-react';

interface ServicesProps {
  config: {
    title: string;
    subtitle: string;
    items: Array<{
      id?: string;
      title: string;
      description: string;
      features?: string[];
      capabilities?: string[];
      icon?: string;
      image?: string;
    }>;
  };
}

const iconMap = {
  'award': Award,
  'clock': Clock,
  'cog': Cog,
};

const Services = ({ config }: ServicesProps) => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {config.title}
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            {config.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {config.items.map((service, index) => {
            const IconComponent = service.icon ? iconMap[service.icon as keyof typeof iconMap] : null;
            const features = service.capabilities || service.features || [];
            
            return (
              <div key={service.id || index} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                {service.image && (
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-48 object-cover"
                  />
                )}
                
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    {IconComponent && (
                      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                        <IconComponent className="h-6 w-6 text-blue-600" />
                      </div>
                    )}
                    <h3 className="text-xl font-semibold text-gray-900">
                      {service.title}
                    </h3>
                  </div>
                  
                  <p className="text-gray-600 mb-4">
                    {service.description}
                  </p>

                  {features.length > 0 && (
                    <ul className="space-y-2">
                      {features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center text-sm text-gray-700">
                          <div className="w-1.5 h-1.5 bg-red-600 rounded-full mr-3 flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Services;
