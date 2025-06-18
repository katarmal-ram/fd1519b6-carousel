
interface InfrastructureProps {
  config: {
    title: string;
    subtitle: string;
    items: Array<{
      id: string;
      title: string;
      description: string;
      capacity?: string;
      area?: string;
      specifications: string;
      image: string;
    }>;
  };
}

const Infrastructure = ({ config }: InfrastructureProps) => {
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
          {config.items.map((item, index) => (
            <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold text-blue-600 mb-3">
                  {item.title}
                </h3>
                <p className="text-gray-600 mb-4 text-sm">
                  {item.description}
                </p>
                
                <div className="space-y-2 text-sm">
                  {item.capacity && (
                    <div className="flex justify-between">
                      <span className="text-gray-500">Capacity:</span>
                      <span className="text-gray-900 font-medium">{item.capacity}</span>
                    </div>
                  )}
                  {item.area && (
                    <div className="flex justify-between">
                      <span className="text-gray-500">Area:</span>
                      <span className="text-gray-900 font-medium">{item.area}</span>
                    </div>
                  )}
                  <div className="pt-2">
                    <span className="text-gray-500 text-xs">Specifications:</span>
                    <p className="text-gray-700 text-xs mt-1">{item.specifications}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Infrastructure;
