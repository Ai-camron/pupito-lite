'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  ShoppingCart, 
  Trash2, 
  Plus, 
  Minus, 
  Heart,
  Truck,
  Tag,
  ArrowRight,
  Gift
} from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import OnlineStoreCallout from '@/components/OnlineStoreCallout'

interface CartItem {
  id: string
  name: string
  price: number
  originalPrice?: number
  image: string
  color: string
  size: string
  quantity: number
  inStock: boolean
}

// Mock cart data
const initialCartItems: CartItem[] = [
  {
    id: '1',
    name: 'Neon Samurai Hoodie',
    price: 89.99,
    originalPrice: 119.99,
    image: '/images/placeholder-hoodie.svg',
    color: 'Neon Pink',
    size: 'L',
    quantity: 1,
    inStock: true
  },
  {
    id: '2',
    name: 'Tokyo Nights Tee',
    price: 34.99,
    image: '/images/placeholder-tee.svg',
    color: 'Black',
    size: 'M',
    quantity: 2,
    inStock: true
  },
  {
    id: '3',
    name: 'Cyber Punk Joggers',
    price: 69.99,
    originalPrice: 89.99,
    image: '/images/placeholder-joggers.svg',
    color: 'Electric Blue',
    size: 'L',
    quantity: 1,
    inStock: false
  }
]

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>(initialCartItems)
  const [promoCode, setPromoCode] = useState('')
  const [appliedPromo, setAppliedPromo] = useState<string | null>(null)

  const updateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeItem(id)
      return
    }
    setCartItems(items =>
      items.map(item =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    )
  }

  const removeItem = (id: string) => {
    setCartItems(items => items.filter(item => item.id !== id))
  }

  const applyPromoCode = () => {
    // Mock promo code logic
    if (promoCode.toLowerCase() === 'pupito10') {
      setAppliedPromo('PUPITO10')
      setPromoCode('')
    } else {
      alert('Invalid promo code')
    }
  }

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  const promoDiscount = appliedPromo === 'PUPITO10' ? subtotal * 0.1 : 0
  const shipping = subtotal >= 75 ? 0 : 9.99
  const tax = (subtotal - promoDiscount) * 0.08
  const total = subtotal - promoDiscount + shipping + tax

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-linear-to-br from-[#0D0D0D] via-[#1A1A1A] to-[#0D0D0D]">
        <div className="flex items-center justify-center min-h-[calc(100vh-120px)]">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-md mx-auto px-4"
          >
            <div className="w-24 h-24 bg-linear-to-br from-[#22d3ee]/20 to-[#1E90FF]/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <ShoppingCart className="w-12 h-12 text-[#22d3ee]" />
            </div>
            <h1 className="text-3xl font-bold text-white mb-4">Your Cart is Empty</h1>
            <p className="text-gray-300 mb-8">
              Looks like you haven&apos;t added anything to your cart yet. Start shopping to fill it up!
            </p>
            <Link
              href="/products"
              className="inline-flex items-center gap-2 px-8 py-4 bg-linear-to-r from-[#22d3ee] to-[#0ea5e9] hover:from-[#1E90FF] hover:to-[#00FFFF] text-black hover:text-white font-bold rounded-xl transition-all duration-300"
            >
              Continue Shopping
              <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-[#0D0D0D] via-[#1A1A1A] to-[#0D0D0D]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-6xl font-bold bg-linear-to-r from-[#22d3ee] via-[#1E90FF] to-[#FFD700] bg-clip-text text-transparent mb-4">
            YOUR CART
          </h1>
          <p className="text-gray-300 text-lg">
            {cartItems.length} item{cartItems.length !== 1 ? 's' : ''} in your cart
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`bg-[#1A1A1A] border border-[#22d3ee]/30 rounded-xl p-6 ${
                  !item.inStock ? 'opacity-75' : ''
                }`}
              >
                <div className="flex flex-col sm:flex-row gap-4">
                  {/* Product Image */}
                  <div className="relative w-full sm:w-32 h-32 bg-linear-to-br from-[#22d3ee]/20 to-[#1E90FF]/20 rounded-lg overflow-hidden shrink-0">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                    {!item.inStock && (
                      <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                        <span className="text-red-400 font-bold text-sm">OUT OF STOCK</span>
                      </div>
                    )}
                  </div>

                  {/* Product Details */}
                  <div className="flex-1 space-y-2">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-white font-semibold text-lg mb-1">
                          <Link 
                            href={`/products/${item.id}`}
                            className="hover:text-[#22d3ee] transition-colors"
                          >
                            {item.name}
                          </Link>
                        </h3>
                        <div className="text-gray-400 text-sm space-x-4">
                          <span>Color: {item.color}</span>
                          <span>Size: {item.size}</span>
                        </div>
                      </div>
                      
                      {/* Remove Button */}
                      <button
                        onClick={() => removeItem(item.id)}
                        className="p-2 text-gray-400 hover:text-red-400 transition-colors"
                        title="Remove item"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>

                    {/* Price & Quantity */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-[#22d3ee] font-bold text-lg">
                          ${item.price}
                        </span>
                        {item.originalPrice && (
                          <span className="text-gray-500 line-through text-sm">
                            ${item.originalPrice}
                          </span>
                        )}
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex items-center gap-3">
                        <div className="flex items-center border border-gray-600 rounded-lg">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="p-2 hover:bg-gray-800 transition-colors"
                            title="Decrease quantity"
                          >
                            <Minus className="w-4 h-4 text-white" />
                          </button>
                          <span className="px-4 py-2 text-white font-medium min-w-12 text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="p-2 hover:bg-gray-800 transition-colors"
                            disabled={!item.inStock}
                            title="Increase quantity"
                          >
                            <Plus className="w-4 h-4 text-white" />
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Item Total */}
                    <div className="text-right">
                      <span className="text-white font-bold">
                        ${(item.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}

            {/* Continue Shopping */}
            <div className="text-center pt-4">
              <Link
                href="/products"
                className="inline-flex items-center gap-2 text-[#22d3ee] hover:text-[#0ea5e9] transition-colors font-medium"
              >
                Continue Shopping
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Order Summary */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            {/* Promo Code */}
            <div className="bg-[#1A1A1A] border border-[#22d3ee]/30 rounded-xl p-6">
              <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                <Tag className="w-5 h-5 text-[#FFD700]" />
                Promo Code
              </h3>
              {appliedPromo ? (
                <div className="flex items-center justify-between p-3 bg-green-500/20 border border-green-500/30 rounded-lg">
                  <span className="text-green-400 font-medium">{appliedPromo} Applied!</span>
                  <button
                    onClick={() => setAppliedPromo(null)}
                    className="text-green-400 hover:text-green-300"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Enter promo code"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    className="flex-1 px-3 py-2 bg-[#0D0D0D] border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-[#22d3ee] focus:outline-none"
                  />
                  <button
                    onClick={applyPromoCode}
                    className="px-4 py-2 bg-[#22d3ee] text-black font-medium rounded-lg hover:bg-[#0ea5e9] transition-colors"
                  >
                    Apply
                  </button>
                </div>
              )}
            </div>

            {/* Order Summary */}
            <div className="bg-[#1A1A1A] border border-[#22d3ee]/30 rounded-xl p-6">
              <h3 className="text-white font-semibold mb-4">Order Summary</h3>
              
              <div className="space-y-3 text-gray-300">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                
                {appliedPromo && (
                  <div className="flex justify-between text-green-400">
                    <span>Discount ({appliedPromo})</span>
                    <span>-${promoDiscount.toFixed(2)}</span>
                  </div>
                )}
                
                <div className="flex justify-between">
                  <span className="flex items-center gap-1">
                    Shipping
                    {shipping === 0 && <Truck className="w-4 h-4 text-green-400" />}
                  </span>
                  <span>
                    {shipping === 0 ? (
                      <span className="text-green-400">FREE</span>
                    ) : (
                      `$${shipping.toFixed(2)}`
                    )}
                  </span>
                </div>
                
                <div className="flex justify-between">
                  <span>Tax</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                
                <div className="border-t border-gray-600 pt-3">
                  <div className="flex justify-between text-white font-bold text-lg">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              {shipping > 0 && (
                <div className="mt-4 p-3 bg-[#22d3ee]/10 border border-[#22d3ee]/20 rounded-lg">
                  <p className="text-[#22d3ee] text-sm font-medium">
                    Add ${(75 - subtotal).toFixed(2)} more for FREE shipping!
                  </p>
                </div>
              )}
            </div>

            {/* Checkout Button */}
            <Link
              href="/checkout"
              className="block w-full py-4 bg-linear-to-r from-[#22d3ee] to-[#0ea5e9] hover:from-[#1E90FF] hover:to-[#00FFFF] text-black hover:text-white font-bold rounded-xl transition-all duration-300 text-center shadow-[0_0_30px_rgba(34,211,238,0.3)] hover:shadow-[0_0_40px_rgba(30,144,255,0.4)]"
            >
              Proceed to Checkout
            </Link>

            {/* Security & Features */}
            <div className="bg-[#1A1A1A] border border-[#22d3ee]/30 rounded-xl p-6">
              <div className="space-y-4 text-sm text-gray-300">
                <div className="flex items-center gap-3">
                  <Truck className="w-5 h-5 text-[#22d3ee] shrink-0" />
                  <div>
                    <div className="font-medium text-white">Free Shipping</div>
                    <div>On orders over $75</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <Heart className="w-5 h-5 text-[#1E90FF] shrink-0" />
                  <div>
                    <div className="font-medium text-white">Easy Returns</div>
                    <div>30-day return policy</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <Gift className="w-5 h-5 text-[#FFD700] shrink-0" />
                  <div>
                    <div className="font-medium text-white">Gift Cards</div>
                    <div>Perfect for any occasion</div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Online Store Info */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <OnlineStoreCallout variant="compact" />
        </div>
      </div>
    </div>
  )
}
