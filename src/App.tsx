
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ErrorBoundary } from 'react-error-boundary';
import Layout from "./components/Layout";
import PageRenderer from "./components/PageRenderer";
import NotFound from "./pages/NotFound";
import ErrorFallback from "./components/ErrorFallback";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  },
});

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <div className="min-h-screen flex flex-col w-full">
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Layout>
              <Routes>
                <Route path="/" element={<PageRenderer pageName="home" />} />
                <Route path="/about" element={<PageRenderer pageName="about" />} />
                <Route path="/services" element={<PageRenderer pageName="services" />} />
                <Route path="/products" element={<PageRenderer pageName="products" />} />
                <Route path="/contact" element={<PageRenderer pageName="contact" />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Layout>
          </BrowserRouter>
        </div>
      </ErrorBoundary>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
