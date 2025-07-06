import { useState, useEffect } from "react"
import ProductCard from "./ProductCard"
import ProductGridSkeleton from "./UI/ProductGridSkeleton"
import ProductFilter from "./ProductFilter"
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

const API_BASE_URL = "http://localhost:3000/api"

export default function ProductGrid() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [filterLoading, setFilterLoading] = useState(false)
  const [error, setError] = useState(null)
  const [goldPrice, setGoldPrice] = useState(65.5)
  const [filters, setFilters] = useState({})
  const [appliedFilters, setAppliedFilters] = useState({})

  useEffect(() => {
    fetchProducts()
  }, [])

  useEffect(() => {
    // Debounce filter requests to avoid too many API calls
    const timeoutId = setTimeout(() => {
      if (Object.keys(filters).length > 0 && Object.values(filters).some(v => v !== "" && v !== null && v !== undefined)) {
        fetchFilteredProducts()
      } else {
        fetchProducts()
      }
    }, 500)

    return () => clearTimeout(timeoutId)
  }, [filters])

  const fetchProducts = async () => {
    try {
      setLoading(true)
      setError(null)
      
      const response = await fetch(`${API_BASE_URL}/products`)
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      const data = await response.json()
      setProducts(data.products || [])
      setGoldPrice(data.goldPrice || 65.5)
      setAppliedFilters({})
    } catch (error) {
      console.error("Error fetching products:", error)
      setError("Failed to load products. Please try again later.")
    } finally {
      setLoading(false)
    }
  }

  const fetchFilteredProducts = async () => {
    try {
      setFilterLoading(true)
      setError(null)
      
      // Build query string from filters
      const queryParams = new URLSearchParams()
      Object.entries(filters).forEach(([key, value]) => {
        if (value && value !== "" && value !== null && value !== undefined) {
          queryParams.append(key, value)
        }
      })
      
      const response = await fetch(`${API_BASE_URL}/products/filter?${queryParams.toString()}`)
      if (!response.ok) {
        if (response.status === 400) {
          const errorData = await response.json()
          throw new Error(errorData.error || 'Invalid filter parameters')
        }
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      const data = await response.json()
      setProducts(data.products || [])
      setGoldPrice(data.goldPrice || 65.5)
      setAppliedFilters(data.filters || {})
    } catch (error) {
      console.error("Error filtering products:", error)
      setError(error.message || "Failed to filter products. Please try again later.")
      // Fallback to showing all products on filter error
      fetchProducts()
    } finally {
      setFilterLoading(false)
    }
  }

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters)
  }

  const handleClearFilters = () => {
    setFilters({})
    fetchProducts()
  }

  if (loading) {
    return <ProductGridSkeleton />
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-500 mb-4">{error}</p>
        <button
          onClick={fetchProducts}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
        >
          Try Again
        </button>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Gold Price Display */}
      <div className="text-center">
        <p className="text-sm text-gray-600 mb-1">Current Gold Price</p>
        <p className="text-2xl font-semibold text-yellow-600">
          ${goldPrice.toFixed(2)} USD per gram
        </p>
      </div>

      {/* Filter Component */}
      <ProductFilter 
        onFilterChange={handleFilterChange}
        filters={filters}
        onClearFilters={handleClearFilters}
        isLoading={filterLoading}
      />
      
      {/* Results Count */}
      <div className="text-sm text-gray-600">
        Showing {products.length} products
        {Object.keys(appliedFilters).length > 0 && (
          <span className="ml-2 text-blue-600">
            (filtered results)
          </span>
        )}
      </div>
      
      {/* Loading indicator for filters */}
      {filterLoading && (
        <div className="text-center py-4">
          <div className="inline-flex items-center gap-2 text-blue-600">
            <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
            <span>Applying filters...</span>
          </div>
        </div>
      )}
      
      {/* Products Carousel */}
      {products.length === 0 && !filterLoading ? (
        <div className="text-center py-12">
          <p className="text-gray-500">No products match your filters</p>
          <button
            onClick={handleClearFilters}
            className="mt-2 px-4 py-2 text-blue-500 hover:text-blue-600 transition-colors"
          >
            Clear filters
          </button>
        </div>
      ) : (
        <div className="relative">
          <Swiper
            modules={[Navigation, Pagination]}
            spaceBetween={24}
            slidesPerView={1}
            navigation={{
              nextEl: '.swiper-button-next',
              prevEl: '.swiper-button-prev',
            }}
            pagination={{
              clickable: true,
              el: '.swiper-pagination',
            }}
            breakpoints={{
              640: {
                slidesPerView: 2,
                spaceBetween: 20,
              },
              768: {
                slidesPerView: 3,
                spaceBetween: 24,
              },
              1024: {
                slidesPerView: 4,
                spaceBetween: 24,
              },
              1280: {
                slidesPerView: 5,
                spaceBetween: 24,
              },
            }}
            className="product-swiper"
          >
            {products.map((product) => (
              <SwiperSlide key={product.id}>
                <ProductCard product={product} />
              </SwiperSlide>
            ))}
          </Swiper>
          
          {/* Custom Navigation Buttons */}
          <div className="swiper-button-prev !text-gray-600 !bg-white !w-10 !h-10 !rounded-full !shadow-lg hover:!bg-gray-50 transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </div>
          <div className="swiper-button-next !text-gray-600 !bg-white !w-10 !h-10 !rounded-full !shadow-lg hover:!bg-gray-50 transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
          
          {/* Pagination */}
          <div className="swiper-pagination !bottom-0 !mt-4"></div>
        </div>
      )}
    </div>
  )
}
