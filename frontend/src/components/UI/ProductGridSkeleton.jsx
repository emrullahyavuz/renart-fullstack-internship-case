import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

export default function ProductGridSkeleton() {
  return (
    <div className="w-full flex flex-col items-center justify-center min-h-[320px] py-8">
      <div className="flex flex-row gap-4 overflow-x-auto w-full px-4" style={{ WebkitOverflowScrolling: 'touch' }}>
        {[...Array(8)].map((_, i) => (
          <div key={i} className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden h-full flex flex-col min-w-[180px] max-w-[180px] min-h-[260px] max-h-[260px] flex-shrink-0">
            <div className="aspect-square">
              <Skeleton height="100%" width="100%" style={{ borderRadius: 0 }} />
            </div>
            <div className="p-2 flex-1 flex flex-col justify-between">
              <div>
                <Skeleton height={14} width="80%" className="mb-1" />
                <Skeleton height={14} width="60%" className="mb-2" />
              </div>
              {/* Color Palette Skeleton */}
              <div className="flex items-center justify-start mb-2 gap-1">
                {[...Array(3)].map((_, j) => (
                  <span key={j} className="flex items-center justify-center w-[20px] h-[20px] rounded-full border border-gray-300">
                    <span className="inline-block w-3.5 h-3.5 rounded-full">
                      <Skeleton circle height={14} width={14} />
                    </span>
                  </span>
                ))}
              </div>
              <Skeleton height={10} width={32} className="mt-auto" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
  