export default function ProductGridSkeleton() {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
            <div className="aspect-square bg-gray-200 animate-pulse" />
            <div className="p-4">
              <div className="h-6 bg-gray-200 rounded animate-pulse mb-2" />
              <div className="h-8 bg-gray-200 rounded animate-pulse mb-3 w-24" />
              <div className="h-4 bg-gray-200 rounded animate-pulse mb-2 w-20" />
              <div className="flex gap-2 mb-3">
                {[...Array(3)].map((_, j) => (
                  <div key={j} className="w-6 h-6 bg-gray-200 rounded-full animate-pulse" />
                ))}
              </div>
              <div className="h-4 bg-gray-200 rounded animate-pulse w-16" />
            </div>
          </div>
        ))}
      </div>
    )
  }
  