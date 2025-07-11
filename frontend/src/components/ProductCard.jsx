import { useState, useRef, useEffect } from "react"
import { ChevronLeft, ChevronRight, Star } from "lucide-react"

export default function ProductCard({ product }) {
  // State variables
  const [selectedColor, setSelectedColor] = useState("yellow")
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [currentX, setCurrentX] = useState(0)
  const carouselRef = useRef(null)

  // Convert popularity score to 5-star rating (0-1 to 0-5 scale)
  const starRating = Math.round(product.popularityScore * 5 * 10) / 10

  const colors = [
    { key: "yellow", name: "Yellow Gold", color: "#E6CA97" },
    { key: "white", name: "White Gold", color: "#D9D9D9" },
    { key: "rose", name: "Rose Gold", color: "#E1A4A9" },
  ]

  const images = Object.values(product.images)
  const colorKeys = Object.keys(product.images)

  const nextImage = () => {
    const newIndex = (currentImageIndex - 1 + images.length) % images.length
    setCurrentImageIndex(newIndex)
    setSelectedColor(colorKeys[newIndex])
  }

  const prevImage = () => {
    const newIndex = (currentImageIndex + 1) % images.length
    setCurrentImageIndex(newIndex)
    setSelectedColor(colorKeys[newIndex])
  }

  // Touch/Swipe handlers for mobile
  const handleTouchStart = (e) => {
    setIsDragging(true)
    setStartX(e.touches[0].clientX)
    setCurrentX(e.touches[0].clientX)
  }

  const handleTouchMove = (e) => {
    if (!isDragging) return
    setCurrentX(e.touches[0].clientX)
  }

  const handleTouchEnd = () => {
    if (!isDragging) return
    
    const diff = startX - currentX
    const threshold = 50 // Minimum swipe distance
    
    if (Math.abs(diff) > threshold) {
      if (diff > 0) {
        nextImage() // Swipe left
      } else {
        prevImage() // Swipe right
      }
    }
    
    setIsDragging(false)
  }

  // Mouse drag handlers for desktop
  const handleMouseDown = (e) => {
    setIsDragging(true)
    setStartX(e.clientX)
    setCurrentX(e.clientX)
  }

  const handleMouseMove = (e) => {
    if (!isDragging) return
    setCurrentX(e.clientX)
  }

  const handleMouseUp = () => {
    if (!isDragging) return
    
    const diff = startX - currentX
    const threshold = 50
    
    if (Math.abs(diff) > threshold) {
      if (diff > 0) {
        nextImage()
      } else {
        prevImage()
      }
    }
    
    setIsDragging(false)
  }

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') {
        prevImage()
      } else if (e.key === 'ArrowRight') {
        nextImage()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating)
    const hasHalfStar = rating % 1 !== 0
    const emptyStars = 5 - Math.ceil(rating)

    return (
      <div className="flex items-center gap-1">
        {[...Array(fullStars)].map((_, i) => (
          <Star key={i} className="w-4 h-4" style={{ fill: "#E6CA97", color: "#E6CA97" }} />
        ))}
        {hasHalfStar && (
          <div className="relative">
            <Star className="w-4 h-4 text-gray-300" />
            <div className="absolute inset-0 overflow-hidden w-1/2">
              <Star className="w-4 h-4" style={{ fill: "#E6CA97", color: "#E6CA97" }} />
            </div>
          </div>
        )}
        {[...Array(emptyStars)].map((_, i) => (
          <Star key={i} className="w-4 h-4 text-gray-300" />
        ))}
        <span className="ml-2 font-avenir-book text-gray-600" style={{ fontSize: "14px" }}>{rating.toFixed(1)}/5</span>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow duration-300 h-full flex flex-col">
      {/* Image Carousel */}
      <div 
        ref={carouselRef}
        className="relative aspect-square bg-gray-50 cursor-grab active:cursor-grabbing flex-shrink-0"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        <img
          src={images[currentImageIndex] || "/placeholder.svg"}
          alt={product.name}
          className="w-full h-full object-cover select-none"
          draggable={false}
        />

        {/* Carousel Navigation */}
        {images.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-1 shadow-sm transition-colors z-10"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-4 h-4 text-gray-600" />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-1 shadow-sm transition-colors z-10"
              aria-label="Next image"
            >
              <ChevronRight className="w-4 h-4 text-gray-600" />
            </button>
          </>
        )}

      </div>

      {/* Product Info */}
      <div className="p-4 flex-1 flex flex-col">
        <h3 className="font-montserrat-medium text-gray-800 mb-2 line-clamp-2" style={{ fontSize: "15px" }}>
          {product.name}
        </h3>

        <div className="font-montserrat-regular text-gray-900 mb-3 flex-shrink-0" style={{ fontSize: "15px" }}>
          ${product.price.toFixed(2)} USD
        </div>

        {/* Color Picker */}
        <div className="mb-3 flex-shrink-0">
          <div className="font-avenir-book text-gray-600 mb-2" style={{ fontSize: "12px" }}>
            {colors.find((c) => c.key === selectedColor)?.name}
          </div>
          <div className="flex gap-2">
            {colors.map((color) => (
              <button
                key={color.key}
                onClick={() => {
                  setSelectedColor(color.key)
                  const colorIndex = colorKeys.indexOf(color.key)
                  if (colorIndex !== -1) {
                    setCurrentImageIndex(colorIndex)
                  }
                }}
                className="relative flex items-center justify-center w-8 h-8 focus:outline-none"
                style={{ background: "none", border: "none", boxShadow: "none" }}
                title={color.name}
                aria-label={`Select ${color.name}`}
              >
                {selectedColor === color.key ? (
                  <span className="flex items-center justify-center w-[30px] h-[30px] rounded-full border border-black p-0 m-0">
                    <span style={{ backgroundColor: color.color }} className="inline-block w-6 h-6 rounded-full p-0 m-0"></span>
                  </span>
                ) : (
                  <span style={{ backgroundColor: color.color }} className="inline-block w-6 h-6 rounded-full p-0 m-0"></span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Star Rating */}
        <div className="flex items-center mt-auto flex-shrink-0">{renderStars(starRating)}</div>
      </div>
    </div>
  )
}
