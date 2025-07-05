import { Suspense } from "react";
import ProductGrid from "./components/ProductGrid";
import ProductGridSkeleton from "./components/UI/ProductGridSkeleton";


function App() {
  return (
   <main className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-light text-gray-800 mb-2" style={{ fontFamily: "Avenir, sans-serif" }}>
            Engagement Rings Collection
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover our exquisite collection of engagement rings with real-time pricing based on current gold market rates.
          </p>
        </div>
        
        <Suspense fallback={<ProductGridSkeleton />}>
          <ProductGrid />
        </Suspense>
      </div>
    </main>
  );
}

export default App;
