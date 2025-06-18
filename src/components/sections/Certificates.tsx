
interface CertificatesProps {
  config: {
    title: string;
    subtitle: string;
    items: Array<{
      id: string;
      name: string;
      description: string;
      image: string;
    }>;
  };
}

const Certificates = ({ config }: CertificatesProps) => {
  return (
    <section className="py-16 bg-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {config.title}
          </h2>
          <p className="text-lg text-gray-600">
            {config.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {config.items.map((certificate) => (
            <div key={certificate.id} className="bg-white rounded-lg shadow-lg p-6 text-center">
              <img
                src={certificate.image}
                alt={certificate.name}
                className="w-24 h-24 mx-auto mb-4 object-contain"
              />
              <h3 className="text-lg font-semibold text-blue-600 mb-2">
                {certificate.name}
              </h3>
              <p className="text-gray-600 text-sm">
                {certificate.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Certificates;
