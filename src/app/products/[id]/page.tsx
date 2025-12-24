'use client'

import { useState } from 'react'
import { 
  ShoppingCart, 
  Heart, 
  Share2, 
  Star, 
  Truck, 
  Shield, 
  RotateCcw, 
  Ruler,
  ChevronLeft,
  ChevronRight,
  Plus,
  Minus
} from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

interface Product {
  id: string
  name: string
  price: number
  originalPrice?: number
  images: string[]
  rating: number
  reviewCount: number
  description: string
  features: string[]
  sizes: Array<{ size: string; inStock: boolean }>
  colors: Array<{ name: string; hex: string; inStock: boolean; swatchClass: string }>
  category: string
  isNew?: boolean
  isSale?: boolean
}

// Mock product data - in real app, this would come from API/database
const product: Product = {
  id: '1',
  name: 'Neon Samurai Hoodie',
  price: 89.99,
  originalPrice: 119.99,
  images: [
    '/images/placeholder-hoodie.svg',
    '/images/placeholder-hoodie.svg',
    '/images/placeholder-hoodie.svg',
    '/images/placeholder-hoodie.svg'
  ],
  rating: 4.8,
  reviewCount: 124,
  description: 'Embrace the cyberpunk aesthetic with our Neon Samurai Hoodie. Featuring bold neon graphics inspired by Japanese street culture and anime aesthetics. Made with premium cotton blend for ultimate comfort and durability.',
  features: [
    'Premium cotton-polyester blend (80/20)',
    'Japanese-inspired neon graphics',
    'Reinforced double-lined hood',
    'Kangaroo pocket with hidden phone compartment',
    'Ribbed cuffs and hem',
    'Unisex fit'
  ],
  sizes: [
    { size: 'XS', inStock: true },
    { size: 'S', inStock: true },
    { size: 'M', inStock: true },
    { size: 'L', inStock: true },
    { size: 'XL', inStock: false },
    { size: '2XL', inStock: true }
  ],
  colors: [
    { name: 'Neon Pink', hex: '#22d3ee', inStock: true, swatchClass: 'bg-[#22d3ee]' },
    { name: 'Electric Blue', hex: '#1E90FF', inStock: true, swatchClass: 'bg-[#1E90FF]' },
    { name: 'Cyber Gold', hex: '#FFD700', inStock: false, swatchClass: 'bg-[#FFD700]' }
  ],
  category: 'hoodies',
  isSale: true
}

export default function ProductPage({ params }: { params: { id: string } }) {
  // Use params.id for the product ID (currently using mock data)
  const productId = params.id;
  const [selectedImage, setSelectedImage] = useState(0)
  const [selectedSize, setSelectedSize] = useState('')
  const [selectedColor, setSelectedColor] = useState(product.colors[0])
  const [quantity, setQuantity] = useState(1)
  const [isWishlisted, setIsWishlisted] = useState(false)

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert('Please select a size')
      return
    }
    // Add to cart logic here
    console.log('Added to cart:', { productId, product, selectedSize, selectedColor, quantity })
  }

  const nextImage = () => {
    setSelectedImage((prev) => (prev + 1) % product.images.length)
  }

  const prevImage = () => {
    setSelectedImage((prev) => (prev - 1 + product.images.length) % product.images.length)
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-[#0D0D0D] via-[#1A1A1A] to-[#0D0D0D]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-gray-400 mb-8">
          <Link href="/" className="hover:text-[#22d3ee] transition-colors">Home</Link>
          <span>/</span>
          <Link href="/products" className="hover:text-[#22d3ee] transition-colors">Products</Link>
          <span>/</span>
          <span className="text-white">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="relative aspect-square bg-linear-to-br from-[#22d3ee]/20 to-[#1E90FF]/20 rounded-2xl overflow-hidden">
              <Image
                src={product.images[selectedImage]}
                alt={product.name}
                fill
                className="object-cover"
              />
              
              {/* Badges */}
              <div className="absolute top-4 left-4 flex flex-col gap-2">
                {product.isNew && (
                  <span className="px-3 py-1 bg-[#FFD700] text-black text-sm font-bold rounded-lg">
                    NEW
                  </span>
                )}
                {product.isSale && (
                  <span className="px-3 py-1 bg-[#22d3ee] text-white text-sm font-bold rounded-lg">
                    SALE
                  </span>
                )}
              </div>

              {/* Navigation Arrows */}
              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 p-2 bg-black/50 text-white rounded-full hover:bg-black/70 transition-colors"
                title="Previous image"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 p-2 bg-black/50 text-white rounded-full hover:bg-black/70 transition-colors"
                title="Next image"
              >
                <ChevronRight className="w-6 h-6" />
              </button>

              {/* Wishlist & Share */}
              <div className="absolute top-4 right-4 flex gap-2">
                <button
                  onClick={() => setIsWishlisted(!isWishlisted)}
                  className={`p-2 rounded-full transition-colors ${
                    isWishlisted ? 'bg-[#22d3ee] text-white' : 'bg-black/50 text-white hover:bg-black/70'
                  }`}
                  title={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
                >
                  <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-current' : ''}`} />
                </button>
                <button
                  className="p-2 bg-black/50 text-white rounded-full hover:bg-black/70 transition-colors"
                  title="Share product"
                >
                  <Share2 className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Thumbnail Images */}
            <div className="flex gap-3">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  title={`View image ${index + 1}`}
                  className={`relative aspect-square w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                    selectedImage === index 
                      ? 'border-[#22d3ee] shadow-[0_0_15px_rgba(34,211,238,0.45)]' 
                      : 'border-gray-600 hover:border-gray-400'
                  }`}
                >
                  <Image
                    src={image}
                    alt={`${product.name} view ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            {/* Title & Rating */}
            <div>
              <h1 className="text-3xl lg:text-4xl font-bold text-white mb-4">
                {product.name}
              </h1>
              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center gap-1">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-5 h-5 ${
                          i < Math.floor(product.rating)
                            ? 'text-[#FFD700] fill-current'
                            : 'text-gray-600'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-white font-medium">{product.rating}</span>
                  <span className="text-gray-400">({product.reviewCount} reviews)</span>
                </div>
              </div>
              
              {/* Price */}
              <div className="flex items-center gap-3 mb-6">
                <span className="text-3xl font-bold text-[#22d3ee]">
                  ${product.price}
                </span>
                {product.originalPrice && (
                  <>
                    <span className="text-xl text-gray-500 line-through">
                      ${product.originalPrice}
                    </span>
                    <span className="px-2 py-1 bg-[#22d3ee]/20 text-[#22d3ee] text-sm font-bold rounded">
                      SAVE ${(product.originalPrice - product.price).toFixed(2)}
                    </span>
                  </>
                )}
              </div>
            </div>

            {/* Description */}
            <p className="text-gray-300 leading-relaxed">
              {product.description}
            </p>

            {/* Color Selection */}
            <div>
              <h3 className="text-white font-semibold mb-3">Color: {selectedColor.name}</h3>
              <div className="flex gap-3">
                {product.colors.map((color) => (
                  <button
                    key={color.name}
                    onClick={() => setSelectedColor(color)}
                    disabled={!color.inStock}
                    className={`relative w-12 h-12 rounded-full border-4 transition-all ${color.swatchClass} ${
                      selectedColor.name === color.name
                        ? 'border-[#22d3ee] shadow-[0_0_15px_rgba(34,211,238,0.45)]'
                        : 'border-gray-600 hover:border-gray-400'
                    } ${!color.inStock ? 'opacity-50 cursor-not-allowed' : ''}`}
                    title={color.inStock ? color.name : `${color.name} - Out of Stock`}
                  >
                    {!color.inStock && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-8 h-0.5 bg-red-500 rotate-45" />
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Size Selection */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-white font-semibold">Size</h3>
                <Link 
                  href="/help/size-guide" 
                  className="text-[#22d3ee] hover:text-[#0ea5e9] transition-colors flex items-center gap-1"
                >
                  <Ruler className="w-4 h-4" />
                  Size Guide
                </Link>
              </div>
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size.size}
                    onClick={() => size.inStock && setSelectedSize(size.size)}
                    disabled={!size.inStock}
                    className={`py-3 px-4 border-2 rounded-lg font-medium transition-all ${
                      selectedSize === size.size
                        ? 'border-[#22d3ee] bg-[#22d3ee] text-black'
                        : size.inStock
                        ? 'border-gray-600 text-white hover:border-[#22d3ee] hover:text-[#22d3ee]'
                        : 'border-gray-700 text-gray-500 cursor-not-allowed line-through'
                    }`}
                  >
                    {size.size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div>
              <h3 className="text-white font-semibold mb-3">Quantity</h3>
              <div className="flex items-center gap-4">
                <div className="flex items-center border border-gray-600 rounded-lg">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-2 hover:bg-gray-800 transition-colors"
                    title="Decrease quantity"
                  >
                    <Minus className="w-4 h-4 text-white" />
                  </button>
                  <span className="px-4 py-2 text-white font-medium min-w-12 text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-2 hover:bg-gray-800 transition-colors"
                    title="Increase quantity"
                  >
                    <Plus className="w-4 h-4 text-white" />
                  </button>
                </div>
                <span className="text-gray-400">In Stock</span>
              </div>
            </div>

            {/* Add to Cart */}
            <button
              onClick={handleAddToCart}
              className="w-full py-4 bg-linear-to-r from-[#22d3ee] to-[#0ea5e9] hover:from-[#1E90FF] hover:to-[#00FFFF] text-black hover:text-white font-bold rounded-xl transition-all duration-300 flex items-center justify-center gap-3 shadow-[0_0_30px_rgba(34,211,238,0.3)] hover:shadow-[0_0_40px_rgba(30,144,255,0.4)]"
            >
              <ShoppingCart className="w-5 h-5" />
              Add to Cart - ${(product.price * quantity).toFixed(2)}
            </button>

            {/* Features */}
            <div className="bg-[#1A1A1A] border border-[#22d3ee]/30 rounded-xl p-6">
              <h3 className="text-white font-semibold mb-4">Product Features</h3>
              <ul className="space-y-2">
                {product.features.map((feature, index) => (
                  <li key={index} className="text-gray-300 flex items-start gap-2">
                    <span className="text-[#22d3ee] mt-1">•</span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            {/* Shipping & Returns */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="flex items-center gap-3 text-gray-300">
                <Truck className="w-5 h-5 text-[#22d3ee]" />
                <div>
                  <div className="font-medium">Free Shipping</div>
                  <div className="text-sm text-gray-400">Orders over $75</div>
                </div>
              </div>
              <div className="flex items-center gap-3 text-gray-300">
                <RotateCcw className="w-5 h-5 text-[#1E90FF]" />
                <div>
                  <div className="font-medium">Easy Returns</div>
                  <div className="text-sm text-gray-400">30-day policy</div>
                </div>
              </div>
              <div className="flex items-center gap-3 text-gray-300">
                <Shield className="w-5 h-5 text-[#FFD700]" />
                <div>
                  <div className="font-medium">Secure Payment</div>
                  <div className="text-sm text-gray-400">SSL protected</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
