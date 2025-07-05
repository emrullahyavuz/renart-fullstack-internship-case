import { useState, useEffect } from "react"
import ProductCard from "./ProductCard"
import ProductGridSkeleton from "./UI/ProductGridSkeleton"
import ProductFilter from "./ProductFilter"

const API_BASE_URL = "http://localhost:5000/api"

export default function ProductGrid() {
  const [products, setProducts] = useState([])
  const [filteredProducts, setFilteredProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [goldPrice, setGoldPrice] = useState(65.5)
  const [filters, setFilters] = useState({})

  useEffect(() => {
    fetchProducts()
  }, [])

  useEffect(() => {
    applyFilters()
  }, [products, filters])

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
    } catch (error) {
      console.error("Error fetching products:", error)
      setError("Failed to load products. Please try again later.")
    } finally {
      setLoading(false)
    }
  }

  const applyFilters = () => {
    let filtered = [...products]

    // Apply price filters
    if (filters.minPrice) {
      filtered = filtered.filter(product => product.price >= parseFloat(filters.minPrice))
    }
    if (filters.maxPrice) {
      filtered = filtered.filter(product => product.price <= parseFloat(filters.maxPrice))
    }

    // Apply popularity filters
    if (filters.minPopularity) {
      filtered = filtered.filter(product => product.popularityScore >= parseFloat(filters.minPopularity))
    }
    if (filters.maxPopularity) {
      filtered = filtered.filter(product => product.popularityScore <= parseFloat(filters.maxPopularity))
    }

    // Apply weight filters
    if (filters.minWeight) {
      filtered = filtered.filter(product => product.weight >= parseFloat(filters.minWeight))
    }
    if (filters.maxWeight) {
      filtered = filtered.filter(product => product.weight <= parseFloat(filters.maxWeight))
    }

    // Apply sorting
    if (filters.sortBy) {
      const [field, direction] = filters.sortBy.split('-')
      filtered.sort((a, b) => {
        let aValue, bValue
        
        switch (field) {
          case 'price':
            aValue = a.price
            bValue = b.price
            break
          case 'popularity':
            aValue = a.popularityScore
            bValue = b.popularityScore
            break
          case 'weight':
            aValue = a.weight
            bValue = b.weight
            break
          default:
            return 0
        }
        
        if (direction === 'asc') {
          return aValue - bValue
        } else {
          return bValue - aValue
        }
      })
    }

    setFilteredProducts(filtered)
  }

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters)
  }

  const handleClearFilters = () => {
    setFilters({})
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
      />
      
      {/* Results Count */}
      <div className="text-sm text-gray-600">
        Showing {filteredProducts.length} of {products.length} products
      </div>
      
      {/* Products Grid */}
      {filteredProducts.length === 0 ? (
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  )
}
