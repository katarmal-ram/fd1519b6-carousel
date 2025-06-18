
import { useState, useEffect } from 'react';

const LoadingScreen = () => {
  const [companyName, setCompanyName] = useState('Loading...');

  useEffect(() => {
    // Fetch company name from config
    const fetchCompanyName = async () => {
      try {
        const response = await fetch('/pages/config.json');
        if (response.ok) {
          const config = await response.json();
          setCompanyName(config.company?.name || 'Company');
        }
      } catch (error) {
        console.log('Could not fetch company name');
      }
    };

    fetchCompanyName();
  }, []);

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center z-50">
      <div className="text-center">
        <div className="mb-8">
          <div className="inline-flex items-center space-x-2 mb-6">
            <div className="w-3 h-3 bg-blue-600 rounded-full animate-bounce"></div>
            <div className="w-3 h-3 bg-blue-600 rounded-full animate-bounce delay-100"></div>
            <div className="w-3 h-3 bg-blue-600 rounded-full animate-bounce delay-200"></div>
          </div>
          <h1 className="text-4xl font-bold text-blue-600 mb-4">{companyName}</h1>
          <p className="text-blue-700">Loading...</p>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
