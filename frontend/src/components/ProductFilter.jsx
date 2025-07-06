import { useState } from "react"
import { Filter, X } from "lucide-react"

export default function ProductFilter({ onFilterChange, filters, onClearFilters, isLoading = false }) {
  const [isOpen, setIsOpen] = useState(false)
  const [localFilters, setLocalFilters] = useState(filters)

  const handleFilterChange = (key, value) => {
    const newFilters = { ...localFilters, [key]: value }
    setLocalFilters(newFilters)
    onFilterChange(newFilters)
  }

  const handleClearFilters = () => {
    const clearedFilters = {}
    setLocalFilters(clearedFilters)
    onFilterChange(clearedFilters)
    onClearFilters()
  }

  const hasActiveFilters = Object.values(filters).some(value => value !== "" && value !== null && value !== undefined)

  return (
    <div className="mb-8">
      {/* Filter Toggle Button */}
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={() => setIsOpen(!isOpen)}
          disabled={isLoading}
          className="flex items-center gap-2 px-4 py-2 bg-[#F9F6F2] border border-[#F6E7C1] rounded-xl shadow-sm hover:bg-[#F6E7C1] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 500 }}
        >
          <Filter className="w-4 h-4 text-[#C2A76F]" />
          <span>Filters</span>
          {hasActiveFilters && (
            <div className="w-2 h-2 bg-[#C2A76F] rounded-full"></div>
          )}
          {isLoading && (
            <div className="w-4 h-4 border-2 border-[#C2A76F] border-t-transparent rounded-full animate-spin"></div>
          )}
        </button>
        
        {hasActiveFilters && (
          <button
            onClick={handleClearFilters}
            className="flex items-center gap-1 px-3 py-1 text-sm text-[#C2A76F] hover:text-[#A68A54] transition-colors bg-[#F6E7C1] rounded-lg shadow-sm"
            style={{ fontFamily: 'Montserrat, sans-serif' }}
          >
            <X className="w-3 h-3" />
            Clear all
          </button>
        )}
      </div>

      {/* Filter Panel */}
      {isOpen && (
        <div className="bg-[#F9F6F2] border border-[#F6E7C1] rounded-2xl p-6 shadow-md">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Price Range */}
            <div>
              <label className="block text-sm font-medium text-[#C2A76F] mb-2" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                Price Range (USD)
              </label>
              <div className="space-y-2">
                <input
                  type="number"
                  placeholder="Min price"
                  value={localFilters.minPrice || ""}
                  onChange={(e) => handleFilterChange("minPrice", e.target.value)}
                  className="w-full px-3 py-2 border border-[#F6E7C1] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C2A76F] focus:border-transparent bg-white placeholder:text-[#C2A76F]"
                  style={{ fontFamily: 'Montserrat, sans-serif' }}
                />
                <input
                  type="number"
                  placeholder="Max price"
                  value={localFilters.maxPrice || ""}
                  onChange={(e) => handleFilterChange("maxPrice", e.target.value)}
                  className="w-full px-3 py-2 border border-[#F6E7C1] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C2A76F] focus:border-transparent bg-white placeholder:text-[#C2A76F]"
                  style={{ fontFamily: 'Montserrat, sans-serif' }}
                />
              </div>
            </div>

            {/* Popularity Score */}
            <div>
              <label className="block text-sm font-medium text-[#C2A76F] mb-2" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                Popularity Score
              </label>
              <div className="space-y-2">
                <input
                  type="number"
                  step="0.1"
                  min="0"
                  max="1"
                  placeholder="Min popularity"
                  value={localFilters.minPopularity || ""}
                  onChange={(e) => handleFilterChange("minPopularity", e.target.value)}
                  className="w-full px-3 py-2 border border-[#F6E7C1] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C2A76F] focus:border-transparent bg-white placeholder:text-[#C2A76F]"
                  style={{ fontFamily: 'Montserrat, sans-serif' }}
                />
                <input
                  type="number"
                  step="0.1"
                  min="0"
                  max="1"
                  placeholder="Max popularity"
                  value={localFilters.maxPopularity || ""}
                  onChange={(e) => handleFilterChange("maxPopularity", e.target.value)}
                  className="w-full px-3 py-2 border border-[#F6E7C1] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C2A76F] focus:border-transparent bg-white placeholder:text-[#C2A76F]"
                  style={{ fontFamily: 'Montserrat, sans-serif' }}
                />
              </div>
            </div>

            {/* Weight Range */}
            <div>
              <label className="block text-sm font-medium text-[#C2A76F] mb-2" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                Weight (grams)
              </label>
              <div className="space-y-2">
                <input
                  type="number"
                  step="0.1"
                  placeholder="Min weight"
                  value={localFilters.minWeight || ""}
                  onChange={(e) => handleFilterChange("minWeight", e.target.value)}
                  className="w-full px-3 py-2 border border-[#F6E7C1] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C2A76F] focus:border-transparent bg-white placeholder:text-[#C2A76F]"
                  style={{ fontFamily: 'Montserrat, sans-serif' }}
                />
                <input
                  type="number"
                  step="0.1"
                  placeholder="Max weight"
                  value={localFilters.maxWeight || ""}
                  onChange={(e) => handleFilterChange("maxWeight", e.target.value)}
                  className="w-full px-3 py-2 border border-[#F6E7C1] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C2A76F] focus:border-transparent bg-white placeholder:text-[#C2A76F]"
                  style={{ fontFamily: 'Montserrat, sans-serif' }}
                />
              </div>
            </div>

            {/* Sort Options */}
            <div>
              <label className="block text-sm font-medium text-[#C2A76F] mb-2" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                Sort By
              </label>
              <select
                value={localFilters.sortBy || ""}
                onChange={(e) => handleFilterChange("sortBy", e.target.value)}
                className="w-full px-3 py-2 border border-[#F6E7C1] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C2A76F] focus:border-transparent bg-white text-[#C2A76F]"
                style={{ fontFamily: 'Montserrat, sans-serif' }}
              >
                <option value="">Default</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="popularity-asc">Popularity: Low to High</option>
                <option value="popularity-desc">Popularity: High to Low</option>
                <option value="weight-asc">Weight: Low to High</option>
                <option value="weight-desc">Weight: High to Low</option>
              </select>
            </div>
          </div>

          {/* Active Filters Display */}
          {hasActiveFilters && (
            <div className="mt-4 pt-4 border-t border-[#F6E7C1]">
              <div className="flex flex-wrap gap-2">
                {Object.entries(filters).map(([key, value]) => {
                  if (!value || value === "") return null
                  
                  let label = ""
                  switch (key) {
                    case "minPrice":
                      label = `Min Price: $${value}`
                      break
                    case "maxPrice":
                      label = `Max Price: $${value}`
                      break
                    case "minPopularity":
                      label = `Min Popularity: ${value}`
                      break
                    case "maxPopularity":
                      label = `Max Popularity: ${value}`
                      break
                    case "minWeight":
                      label = `Min Weight: ${value}g`
                      break
                    case "maxWeight":
                      label = `Max Weight: ${value}g`
                      break
                    case "sortBy":
                      label = `Sort: ${value.replace("-", " ")}`
                      break
                    default:
                      label = `${key}: ${value}`
                  }
                  
                  return (
                    <span
                      key={key}
                      className="inline-flex items-center gap-1 px-2 py-1 bg-[#F6E7C1] text-[#A68A54] text-sm rounded-full border border-[#C2A76F] shadow-sm"
                      style={{ fontFamily: 'Montserrat, sans-serif' }}
                    >
                      {label}
                      <button
                        onClick={() => handleFilterChange(key, "")}
                        className="hover:bg-[#F9F6F2] rounded-full p-0.5"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  )
                })}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
} 