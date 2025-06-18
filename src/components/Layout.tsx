
import { ReactNode } from 'react';
import Header from './Header';
import Footer from './Footer';
import LoadingScreen from './LoadingScreen';
import { useConfig } from '@/hooks/useConfig';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const { config, loading, error } = useConfig();

  if (loading) {
    return <LoadingScreen />;
  }

  if (error || !config) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-red-50">
        <div className="text-center p-8">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Configuration Error</h1>
          <p className="text-red-700">{error || 'Failed to load site configuration'}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header config={config} />
      <main className="flex-1">
        {children}
      </main>
      <Footer config={config} />
    </div>
  );
};

export default Layout;
