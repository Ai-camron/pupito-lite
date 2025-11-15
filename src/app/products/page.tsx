'use client'

import { motion } from 'framer-motion'

export default function ProductsPage() {
  return (
    <div className="min-h-screen bg-linear-to-br from-[#0D0D0D] via-[#1A1A1A] to-[#0D0D0D]">
      <div className="bg-linear-to-r from-[#FF69B4]/20 via-[#1E90FF]/20 to-[#FFD700]/20 border-b border-[#FF69B4]/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-6xl font-bold bg-linear-to-r from-[#FF69B4] via-[#1E90FF] to-[#FFD700] bg-clip-text text-transparent mb-4">
              Products
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Discover our premium anime-inspired streetwear collection
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center py-20">
          <h2 className="text-2xl text-white mb-4">Products Coming Soon</h2>
          <p className="text-gray-400">We are preparing our amazing collection for you!</p>
        </div>
      </div>
    </div>
  )
}
