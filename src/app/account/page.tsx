'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  User, 
  Package, 
  Heart, 
  Settings, 
  LogOut,
  Eye,
  EyeOff,
  Edit,
  Calendar,
  MapPin,
  Phone,
  Mail
} from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/lib/auth-context'

interface Order {
  id: string
  date: string
  status: 'processing' | 'shipped' | 'delivered' | 'cancelled'
  items: Array<{
    name: string
    image: string
    quantity: number
    price: number
  }>
  total: number
  trackingNumber?: string
}

interface WishlistItem {
  id: string
  name: string
  price: number
  originalPrice?: number
  image: string
  inStock: boolean
}

const mockOrders: Order[] = [
  {
    id: 'ORD-001',
    date: '2024-01-15',
    status: 'delivered',
    items: [
      { name: 'Neon Samurai Hoodie', image: '/images/placeholder-hoodie.svg', quantity: 1, price: 89.99 }
    ],
    total: 89.99,
    trackingNumber: 'TRK123456789'
  },
  {
    id: 'ORD-002',
    date: '2024-01-20',
    status: 'shipped',
    items: [
      { name: 'Tokyo Nights Tee', image: '/images/placeholder-tee.svg', quantity: 2, price: 34.99 },
      { name: 'Cyber Punk Joggers', image: '/images/placeholder-joggers.svg', quantity: 1, price: 69.99 }
    ],
    total: 139.97,
    trackingNumber: 'TRK987654321'
  }
]

const mockWishlist: WishlistItem[] = [
  {
    id: '1',
    name: 'Anime Vibe Cap',
    price: 29.99,
    image: '/images/placeholder-cap.svg',
    inStock: true
  },
  {
    id: '2',
    name: 'Neon Samurai Hoodie',
    price: 89.99,
    originalPrice: 119.99,
    image: '/images/placeholder-hoodie.svg',
    inStock: false
  }
]

export default function AccountPage() {
  const router = useRouter()
  const { user, logout } = useAuth()
  const [activeTab, setActiveTab] = useState('profile')
  const [showPassword, setShowPassword] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [profileData, setProfileData] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.email || '',
    phone: '+1 (555) 123-4567',
    birthDate: '1995-06-15',
    address: '123 Main Street',
    city: 'Los Angeles',
    state: 'CA',
    zipCode: '90210',
    country: 'United States'
  })

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!user) {
      router.push('/login?redirect=/account')
    }
  }, [user, router])

  const handleLogout = async () => {
    await logout()
    router.push('/')
  }

  // Don't render anything if user is not authenticated
  if (!user) {
    return null
  }

  const tabs = [
    { id: 'profile', name: 'Profile', icon: User },
    { id: 'orders', name: 'Orders', icon: Package },
    { id: 'wishlist', name: 'Wishlist', icon: Heart },
    { id: 'settings', name: 'Settings', icon: Settings }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'processing': return 'text-[#FFD700]'
      case 'shipped': return 'text-[#1E90FF]'
      case 'delivered': return 'text-green-400'
      case 'cancelled': return 'text-red-400'
      default: return 'text-gray-400'
    }
  }

  const getStatusBg = (status: string) => {
    switch (status) {
      case 'processing': return 'bg-[#FFD700]/20 border-[#FFD700]/30'
      case 'shipped': return 'bg-[#1E90FF]/20 border-[#1E90FF]/30'
      case 'delivered': return 'bg-green-500/20 border-green-500/30'
      case 'cancelled': return 'bg-red-500/20 border-red-500/30'
      default: return 'bg-gray-500/20 border-gray-500/30'
    }
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-[#0D0D0D] via-[#1A1A1A] to-[#0D0D0D]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl md:text-6xl font-bold bg-linear-to-r from-[#FF69B4] via-[#1E90FF] to-[#FFD700] bg-clip-text text-transparent mb-4">
            MY ACCOUNT
          </h1>
          <p className="text-gray-300 text-lg">
            Welcome back, {user?.firstName}!
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Navigation */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-1"
          >
            <div className="bg-[#1A1A1A] border border-[#FF69B4]/30 rounded-xl p-6 sticky top-8">
              <div className="space-y-2">
                {tabs.map((tab) => {
                  const Icon = tab.icon
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors text-left ${
                        activeTab === tab.id
                          ? 'bg-[#FF69B4] text-black'
                          : 'text-gray-300 hover:text-white hover:bg-[#FF69B4]/10'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      {tab.name}
                    </button>
                  )
                })}
                
                <hr className="border-gray-600 my-4" />
                
                <button 
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-colors text-left"
                >
                  <LogOut className="w-5 h-5" />
                  Sign Out
                </button>
              </div>
            </div>
          </motion.div>

          {/* Main Content */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-3"
          >
            {/* Profile Tab */}
            {activeTab === 'profile' && (
              <div className="bg-[#1A1A1A] border border-[#FF69B4]/30 rounded-xl p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-white">Profile Information</h2>
                  <button
                    onClick={() => setIsEditing(!isEditing)}
                    className="flex items-center gap-2 px-4 py-2 bg-[#FF69B4] text-black rounded-lg hover:bg-[#FF1493] transition-colors"
                  >
                    <Edit className="w-4 h-4" />
                    {isEditing ? 'Save' : 'Edit'}
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="profile-first-name" className="block text-gray-300 text-sm font-medium mb-2">
                      <User className="w-4 h-4 inline mr-1" />
                      First Name
                    </label>
                    <input
                      id="profile-first-name"
                      type="text"
                      value={profileData.firstName}
                      onChange={(e) => setProfileData({...profileData, firstName: e.target.value})}
                      disabled={!isEditing}
                      className="w-full px-3 py-3 bg-[#0D0D0D] border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-[#FF69B4] focus:outline-none transition-colors disabled:opacity-50"
                      aria-label="First Name"
                    />
                  </div>

                  <div>
                    <label htmlFor="profile-last-name" className="block text-gray-300 text-sm font-medium mb-2">
                      Last Name
                    </label>
                    <input
                      id="profile-last-name"
                      type="text"
                      value={profileData.lastName}
                      onChange={(e) => setProfileData({...profileData, lastName: e.target.value})}
                      disabled={!isEditing}
                      className="w-full px-3 py-3 bg-[#0D0D0D] border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-[#FF69B4] focus:outline-none transition-colors disabled:opacity-50"
                      aria-label="Last Name"
                    />
                  </div>

                  <div>
                    <label htmlFor="profile-email" className="block text-gray-300 text-sm font-medium mb-2">
                      <Mail className="w-4 h-4 inline mr-1" />
                      Email
                    </label>
                    <input
                      id="profile-email"
                      type="email"
                      value={profileData.email}
                      onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                      disabled={!isEditing}
                      className="w-full px-3 py-3 bg-[#0D0D0D] border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-[#FF69B4] focus:outline-none transition-colors disabled:opacity-50"
                      aria-label="Email Address"
                    />
                  </div>

                  <div>
                    <label htmlFor="profile-phone" className="block text-gray-300 text-sm font-medium mb-2">
                      <Phone className="w-4 h-4 inline mr-1" />
                      Phone
                    </label>
                    <input
                      id="profile-phone"
                      type="tel"
                      value={profileData.phone}
                      onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
                      disabled={!isEditing}
                      className="w-full px-3 py-3 bg-[#0D0D0D] border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-[#FF69B4] focus:outline-none transition-colors disabled:opacity-50"
                      aria-label="Phone Number"
                    />
                  </div>

                  <div>
                    <label htmlFor="profile-birth-date" className="block text-gray-300 text-sm font-medium mb-2">
                      <Calendar className="w-4 h-4 inline mr-1" />
                      Birth Date
                    </label>
                    <input
                      id="profile-birth-date"
                      type="date"
                      value={profileData.birthDate}
                      onChange={(e) => setProfileData({...profileData, birthDate: e.target.value})}
                      disabled={!isEditing}
                      className="w-full px-3 py-3 bg-[#0D0D0D] border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-[#FF69B4] focus:outline-none transition-colors disabled:opacity-50"
                      aria-label="Birth Date"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label htmlFor="profile-address" className="block text-gray-300 text-sm font-medium mb-2">
                      <MapPin className="w-4 h-4 inline mr-1" />
                      Address
                    </label>
                    <input
                      id="profile-address"
                      type="text"
                      value={profileData.address}
                      onChange={(e) => setProfileData({...profileData, address: e.target.value})}
                      disabled={!isEditing}
                      className="w-full px-3 py-3 bg-[#0D0D0D] border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-[#FF69B4] focus:outline-none transition-colors disabled:opacity-50"
                      aria-label="Street Address"
                    />
                  </div>

                  <div>
                    <label htmlFor="profile-city" className="block text-gray-300 text-sm font-medium mb-2">
                      City
                    </label>
                    <input
                      id="profile-city"
                      type="text"
                      value={profileData.city}
                      onChange={(e) => setProfileData({...profileData, city: e.target.value})}
                      disabled={!isEditing}
                      className="w-full px-3 py-3 bg-[#0D0D0D] border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-[#FF69B4] focus:outline-none transition-colors disabled:opacity-50"
                      aria-label="City"
                    />
                  </div>

                  <div>
                    <label htmlFor="profile-zip-code" className="block text-gray-300 text-sm font-medium mb-2">
                      ZIP Code
                    </label>
                    <input
                      id="profile-zip-code"
                      type="text"
                      value={profileData.zipCode}
                      onChange={(e) => setProfileData({...profileData, zipCode: e.target.value})}
                      disabled={!isEditing}
                      className="w-full px-3 py-3 bg-[#0D0D0D] border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-[#FF69B4] focus:outline-none transition-colors disabled:opacity-50"
                      aria-label="ZIP Code"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Orders Tab */}
            {activeTab === 'orders' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-white">Order History</h2>
                
                {mockOrders.map((order, index) => (
                  <motion.div
                    key={order.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-[#1A1A1A] border border-[#FF69B4]/30 rounded-xl p-6"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4">
                      <div>
                        <h3 className="text-white font-semibold text-lg">Order {order.id}</h3>
                        <p className="text-gray-400">Placed on {new Date(order.date).toLocaleDateString()}</p>
                      </div>
                      
                      <div className="flex items-center gap-4">
                        <span className={`px-3 py-1 rounded-lg text-sm font-medium border ${getStatusBg(order.status)} ${getStatusColor(order.status)}`}>
                          {order.status.toUpperCase()}
                        </span>
                        <Link
                          href={`/orders/${order.id}`}
                          className="text-[#FF69B4] hover:text-[#FF1493] transition-colors"
                        >
                          View Details
                        </Link>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
                      {order.items.map((item, itemIndex) => (
                        <div key={itemIndex} className="flex items-center gap-3">
                          <div className="relative w-16 h-16 bg-linear-to-br from-[#FF69B4]/20 to-[#1E90FF]/20 rounded-lg overflow-hidden">
                            <Image
                              src={item.image}
                              alt={item.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div>
                            <h4 className="text-white font-medium text-sm">{item.name}</h4>
                            <p className="text-gray-400 text-xs">Qty: {item.quantity} • ${item.price}</p>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="flex justify-between items-center text-white border-t border-gray-600 pt-4">
                      <span className="font-medium">Total: ${order.total.toFixed(2)}</span>
                      {order.trackingNumber && (
                        <span className="text-[#1E90FF] text-sm">
                          Tracking: {order.trackingNumber}
                        </span>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            )}

            {/* Wishlist Tab */}
            {activeTab === 'wishlist' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-white">My Wishlist</h2>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {mockWishlist.map((item, index) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-[#1A1A1A] border border-[#FF69B4]/30 rounded-xl overflow-hidden hover:shadow-[0_0_30px_rgba(255,105,180,0.3)] transition-all duration-300 group"
                    >
                      <Link href={`/products/${item.id}`}>
                        <div className="aspect-square relative overflow-hidden bg-linear-to-br from-[#FF69B4]/20 to-[#1E90FF]/20">
                          <Image
                            src={item.image}
                            alt={item.name}
                            fill
                            className="object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                          {!item.inStock && (
                            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                              <span className="text-red-400 font-bold text-sm">OUT OF STOCK</span>
                            </div>
                          )}
                        </div>
                      </Link>

                      <div className="p-4">
                        <h3 className="text-white font-semibold mb-2 group-hover:text-[#FF69B4] transition-colors">
                          {item.name}
                        </h3>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="text-[#FF69B4] font-bold text-lg">
                              ${item.price}
                            </span>
                            {item.originalPrice && (
                              <span className="text-gray-500 line-through text-sm">
                                ${item.originalPrice}
                              </span>
                            )}
                          </div>
                          
                          <button
                            className="p-2 text-red-400 hover:text-red-300 transition-colors"
                            title="Remove from wishlist"
                          >
                            <Heart className="w-5 h-5 fill-current" />
                          </button>
                        </div>

                        <button
                          disabled={!item.inStock}
                          className="w-full mt-3 py-2 bg-[#FF69B4] text-black font-medium rounded-lg hover:bg-[#FF1493] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {item.inStock ? 'Add to Cart' : 'Out of Stock'}
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {/* Settings Tab */}
            {activeTab === 'settings' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-white">Account Settings</h2>
                
                {/* Password Section */}
                <div className="bg-[#1A1A1A] border border-[#FF69B4]/30 rounded-xl p-6">
                  <h3 className="text-white font-semibold text-lg mb-4">Change Password</h3>
                  
                  <div className="space-y-4 max-w-md">
                    <div>
                      <label htmlFor="current-password" className="block text-gray-300 text-sm font-medium mb-2">
                        Current Password
                      </label>
                      <div className="relative">
                        <input
                          id="current-password"
                          type={showPassword ? 'text' : 'password'}
                          className="w-full px-3 py-3 pr-10 bg-[#0D0D0D] border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-[#FF69B4] focus:outline-none transition-colors"
                          placeholder="Enter current password"
                          aria-label="Current Password"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                          aria-label={showPassword ? 'Hide password' : 'Show password'}
                        >
                          {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                        </button>
                      </div>
                    </div>

                    <div>
                      <label htmlFor="new-password" className="block text-gray-300 text-sm font-medium mb-2">
                        New Password
                      </label>
                      <input
                        id="new-password"
                        type="password"
                        className="w-full px-3 py-3 bg-[#0D0D0D] border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-[#FF69B4] focus:outline-none transition-colors"
                        placeholder="Enter new password"
                        aria-label="New Password"
                      />
                    </div>

                    <div>
                      <label htmlFor="confirm-password" className="block text-gray-300 text-sm font-medium mb-2">
                        Confirm New Password
                      </label>
                      <input
                        id="confirm-password"
                        type="password"
                        className="w-full px-3 py-3 bg-[#0D0D0D] border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-[#FF69B4] focus:outline-none transition-colors"
                        placeholder="Confirm new password"
                        aria-label="Confirm New Password"
                      />
                    </div>

                    <button className="px-6 py-3 bg-[#FF69B4] text-black font-medium rounded-lg hover:bg-[#FF1493] transition-colors">
                      Update Password
                    </button>
                  </div>
                </div>

                {/* Notifications Section */}
                <div className="bg-[#1A1A1A] border border-[#FF69B4]/30 rounded-xl p-6">
                  <h3 className="text-white font-semibold text-lg mb-4">Notification Preferences</h3>
                  
                  <div className="space-y-4">
                    <label htmlFor="email-notifications" className="flex items-center gap-3">
                      <input id="email-notifications" type="checkbox" className="w-4 h-4 text-[#FF69B4] bg-[#0D0D0D] border-gray-600 rounded focus:ring-[#FF69B4]" />
                      <span className="text-gray-300">Email notifications for new products</span>
                    </label>

                    <label htmlFor="order-updates" className="flex items-center gap-3">
                      <input id="order-updates" type="checkbox" className="w-4 h-4 text-[#FF69B4] bg-[#0D0D0D] border-gray-600 rounded focus:ring-[#FF69B4]" />
                      <span className="text-gray-300">Order status updates</span>
                    </label>

                    <label htmlFor="promotional-offers" className="flex items-center gap-3">
                      <input id="promotional-offers" type="checkbox" className="w-4 h-4 text-[#FF69B4] bg-[#0D0D0D] border-gray-600 rounded focus:ring-[#FF69B4]" />
                      <span className="text-gray-300">Promotional offers and discounts</span>
                    </label>

                    <label htmlFor="wishlist-alerts" className="flex items-center gap-3">
                      <input id="wishlist-alerts" type="checkbox" className="w-4 h-4 text-[#FF69B4] bg-[#0D0D0D] border-gray-600 rounded focus:ring-[#FF69B4]" />
                      <span className="text-gray-300">Wishlist item back in stock alerts</span>
                    </label>
                  </div>
                </div>

                {/* Delete Account Section */}
                <div className="bg-[#1A1A1A] border border-red-500/30 rounded-xl p-6">
                  <h3 className="text-red-400 font-semibold text-lg mb-4">Danger Zone</h3>
                  <p className="text-gray-300 mb-4">
                    Once you delete your account, there is no going back. Please be certain.
                  </p>
                  <button className="px-6 py-3 bg-red-500 text-white font-medium rounded-lg hover:bg-red-600 transition-colors">
                    Delete Account
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  )
}
