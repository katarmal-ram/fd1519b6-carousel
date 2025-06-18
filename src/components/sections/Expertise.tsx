
interface ExpertiseProps {
  config: {
    title: string;
    subtitle: string;
    description?: string;
    sectors?: Array<{
      id: string;
      name: string;
      description: string;
      image: string;
      applications: string[];
    }>;
    items?: Array<{
      sector: string;
      applications: string[];
    }>;
  };
}

const Expertise = ({ config }: ExpertiseProps) => {
  // Handle both old format (items) and new format (sectors)
  const sectorsData = config.sectors || config.items?.map(item => ({
    id: item.sector.toLowerCase().replace(/\s+/g, '-'),
    name: item.sector,
    description: '',
    image: '',
    applications: item.applications
  })) || [];

  return (
    <section className="py-16 bg-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {config.title}
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            {config.subtitle}
          </p>
          {config.description && (
            <p className="text-gray-600 mt-4 max-w-4xl mx-auto">
              {config.description}
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {sectorsData.map((sector, index) => (
            <div key={sector.id || index} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
              {sector.image && (
                <img
                  src={sector.image}
                  alt={sector.name}
                  className="w-full h-48 object-cover"
                />
              )}
              <div className="p-6">
                <h3 className="text-xl font-semibold text-blue-600 mb-3">
                  {sector.name}
                </h3>
                {sector.description && (
                  <p className="text-gray-600 mb-4 text-sm">
                    {sector.description}
                  </p>
                )}
                <ul className="space-y-2">
                  {sector.applications.map((application, appIndex) => (
                    <li key={appIndex} className="flex items-center text-gray-700 text-sm">
                      <div className="w-1.5 h-1.5 bg-red-600 rounded-full mr-3 flex-shrink-0" />
                      {application}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Expertise;
