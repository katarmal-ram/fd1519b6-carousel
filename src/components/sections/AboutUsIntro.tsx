
interface AboutUsIntroProps {
  config: {
    title: string;
    subtitle: string;
    content?: string;
    description?: string;
    image: string;
    highlights: string[];
  };
}

const AboutUsIntro = ({ config }: AboutUsIntroProps) => {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {config.title}
            </h2>
            <p className="text-lg text-blue-600 mb-6">
              {config.subtitle}
            </p>
            <p className="text-gray-600 mb-6 leading-relaxed">
              {config.content || config.description}
            </p>
            
            <ul className="space-y-3">
              {config.highlights.map((highlight, index) => (
                <li key={index} className="flex items-center text-gray-700">
                  <div className="w-2 h-2 bg-red-600 rounded-full mr-3 flex-shrink-0" />
                  {highlight}
                </li>
              ))}
            </ul>
          </div>
          
          <div className="relative">
            <img
              src={config.image}
              alt={config.title}
              className="rounded-lg shadow-lg w-full h-auto"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUsIntro;
