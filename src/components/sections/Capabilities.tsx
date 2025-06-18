
interface CapabilitiesProps {
  config: {
    title: string;
    subtitle: string;
    items: Array<{
      id: string;
      title: string;
      description: string;
      metrics: Array<{
        label: string;
        value: string;
      }>;
    }>;
  };
}

const Capabilities = ({ config }: CapabilitiesProps) => {
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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {config.items.map((capability) => (
            <div key={capability.id} className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-semibold text-blue-600 mb-4">
                {capability.title}
              </h3>
              <p className="text-gray-600 mb-6">
                {capability.description}
              </p>
              
              <div className="space-y-3">
                {capability.metrics.map((metric, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <span className="text-gray-700 text-sm">{metric.label}</span>
                    <span className="text-red-600 font-semibold">{metric.value}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Capabilities;
