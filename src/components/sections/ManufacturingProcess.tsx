
interface ManufacturingProcessProps {
  config: {
    title: string;
    subtitle: string;
    items?: Array<{
      step: number;
      title: string;
      description: string;
    }>;
    steps?: Array<{
      step: number;
      title: string;
      description: string;
    }>;
  };
}

const ManufacturingProcess = ({ config }: ManufacturingProcessProps) => {
  // Handle both 'items' and 'steps' properties for flexibility
  const steps = config.items || config.steps || [];

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

        {/* Mobile Version - Vertical */}
        <div className="md:hidden">
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-blue-300"></div>
            
            <div className="space-y-8">
              {steps.map((step, index) => (
                <div key={index} className="relative flex items-start">
                  {/* Step number circle */}
                  <div className="relative z-10 mr-6">
                    <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-lg border-4 border-white shadow-lg">
                      {step.step}
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div className="flex-1 pt-2">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {step.title}
                    </h3>
                    <p className="text-gray-600 text-sm">
                      {step.description}
                    </p>
                  </div>
                  
                  {/* Arrow pointing down */}
                  {index < steps.length - 1 && (
                    <div className="absolute left-5 top-16 transform -translate-x-1/2">
                      <svg className="w-4 h-4 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a1 1 0 01-.707-.293l-3-3a1 1 0 011.414-1.414L9 15.586V4a1 1 0 112 0v11.586l1.293-1.293a1 1 0 011.414 1.414l-3 3A1 1 0 0110 18z" clipRule="evenodd" />
                      </svg>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Desktop Version - Horizontal */}
        <div className="hidden md:block">
          <div className="relative">
            {/* Process flow line for desktop */}
            <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-blue-300 transform -translate-y-1/2"></div>
            
            <div className={`grid grid-cols-${Math.min(steps.length, 6)} gap-8`}>
              {steps.map((step, index) => (
                <div key={index} className="relative">
                  {/* Step number circle */}
                  <div className="flex justify-center mb-4">
                    <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-lg relative z-10 border-4 border-white shadow-lg">
                      {step.step}
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div className="text-center">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {step.title}
                    </h3>
                    <p className="text-gray-600 text-sm">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ManufacturingProcess;
