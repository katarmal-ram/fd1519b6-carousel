
import { usePageConfig } from '@/hooks/usePageConfig';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useState } from 'react';

interface ProductsProps {
  config: {
    title: string;
    subtitle: string;
    items: any[];
  };
}

const Products = ({ config }: ProductsProps) => {
  const { config: pageConfig } = usePageConfig('products');
  const categories = pageConfig?.products?.categories || [];
  const [selectedProduct, setSelectedProduct] = useState<any>(null);

  console.log('Products component - pageConfig:', pageConfig);
  console.log('Products component - categories:', categories);

  // Get all products from all categories
  const allProducts = categories.flatMap(category => 
    category.products?.map((product: any) => ({
      ...product,
      categoryName: category.name,
      categoryId: category.id
    })) || []
  );

  const ProductCard = ({ product, showCategory = false }: { product: any; showCategory?: boolean }) => (
    <Dialog>
      <DialogTrigger asChild>
        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
          <CardHeader className="pb-4">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-48 object-cover rounded-md mb-4"
            />
            <CardTitle className="text-xl text-blue-600">
              {product.name}
            </CardTitle>
            <CardDescription className="text-gray-600">
              {product.description}
            </CardDescription>
            {showCategory && (
              <div className="text-sm font-medium text-green-600 mt-2">
                Category: {product.categoryName}
              </div>
            )}
          </CardHeader>
        </Card>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl text-blue-600">{product.name}</DialogTitle>
          <DialogDescription className="text-lg">{product.description}</DialogDescription>
        </DialogHeader>
        
        <div className="mt-4">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-64 object-cover rounded-md mb-6"
          />
          
          <div className="space-y-6">
            {product.specifications && product.specifications.length > 0 && (
              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-3">Specifications</h4>
                <ul className="space-y-2">
                  {product.specifications.map((spec: string, index: number) => (
                    <li key={index} className="flex items-start">
                      <span className="text-blue-600 mr-3 mt-1">•</span>
                      <span className="text-gray-700">{spec}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            
            {product.applications && product.applications.length > 0 && (
              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-3">Applications</h4>
                <ul className="space-y-2">
                  {product.applications.map((app: string, index: number) => (
                    <li key={index} className="flex items-start">
                      <span className="text-green-600 mr-3 mt-1">•</span>
                      <span className="text-gray-700">{app}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            
            {showCategory && (
              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-3">Category</h4>
                <p className="text-gray-700">{product.categoryName}</p>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );

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

        {categories.length > 0 ? (
          <>
            {/* Categories Overview */}
            <div className="mb-12">
              <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">Product Categories</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {categories.map((category: any) => (
                  <div key={category.id} className="bg-gray-50 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                    <img
                      src={category.image}
                      alt={category.name}
                      className="w-full h-40 object-cover"
                    />
                    <div className="p-4">
                      <h4 className="text-lg font-semibold text-blue-600 mb-2">
                        {category.name}
                      </h4>
                      <p className="text-gray-600 text-sm mb-3">
                        {category.description}
                      </p>
                      <div className="text-sm text-red-600 font-medium">
                        {category.products?.length || 0} Products
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Products - Tabs */}
            <div className="mb-12">
              <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">Browse Products</h3>
              <Tabs defaultValue="all" className="w-full">
                <TabsList className="grid w-full grid-cols-2 lg:grid-cols-5 mb-8">
                  <TabsTrigger value="all" className="text-sm font-medium">
                    All Products ({allProducts.length})
                  </TabsTrigger>
                  {categories.map((category: any) => (
                    <TabsTrigger 
                      key={category.id} 
                      value={category.id}
                      className="text-sm font-medium"
                    >
                      {category.name} ({category.products?.length || 0})
                    </TabsTrigger>
                  ))}
                </TabsList>
                
                {/* All Products Tab */}
                <TabsContent value="all">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {allProducts.map((product: any) => (
                      <ProductCard key={`${product.categoryId}-${product.id}`} product={product} showCategory={true} />
                    ))}
                  </div>
                </TabsContent>
                
                {/* Category-specific Tabs */}
                {categories.map((category: any) => (
                  <TabsContent key={category.id} value={category.id}>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {category.products?.map((product: any) => (
                        <ProductCard key={product.id} product={product} />
                      )) || (
                        <div className="col-span-full text-center py-8">
                          <p className="text-gray-600">No products available in this category.</p>
                        </div>
                      )}
                    </div>
                  </TabsContent>
                ))}
              </Tabs>
            </div>
          </>
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-600">Loading product categories...</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default Products;
