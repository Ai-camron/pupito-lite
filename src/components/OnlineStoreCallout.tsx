'use client'

import { motion } from 'framer-motion'
import { Globe, Package, Truck, Mail } from 'lucide-react'
import { STORE_CONTACT, STORE_INFO } from '@/lib/constants'

interface OnlineStoreCalloutProps {
  variant?: 'default' | 'compact'
  className?: string
}

export default function OnlineStoreCallout({ variant = 'default', className = '' }: OnlineStoreCalloutProps) {
  if (variant === 'compact') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className={`bg-linear-to-r from-[#1E90FF]/10 via-[#FF69B4]/10 to-[#FFD700]/10 border border-[#FF69B4]/20 rounded-xl p-4 ${className}`}
      >
        <div className="flex items-center justify-center gap-2 text-center">
          <Globe className="w-4 h-4 text-[#00FFFF] shrink-0" />
          <p className="text-sm text-gray-300">
            <span className="font-semibold text-[#FF69B4]">Online Only Store</span> • Made-to-order via {STORE_INFO.fulfillmentPartner} • Ships worldwide
          </p>
        </div>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`bg-linear-to-br from-[#1A1A1A]/80 to-[#2A2A2A]/60 border border-[#FF69B4]/30 rounded-2xl p-6 backdrop-blur ${className}`}
    >
      <div className="flex items-center gap-3 mb-4">
        <div className="p-3 bg-linear-to-br from-[#1E90FF] to-[#00FFFF] rounded-xl">
          <Globe className="w-6 h-6 text-black" />
        </div>
        <h3 className="text-xl font-bold bg-linear-to-r from-[#1E90FF] to-[#00FFFF] bg-clip-text text-transparent">
          Online Only Store
        </h3>
      </div>

      <div className="space-y-4">
        <p className="text-gray-300 leading-relaxed">
          PUPITO is a <span className="text-[#FF69B4] font-semibold">100% online store</span> - we don&apos;t have physical retail locations. 
          All our anime-inspired streetwear is made-to-order when you place your order, ensuring fresh quality and reducing waste.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
          <div className="flex items-start gap-3">
            <Package className="w-5 h-5 text-[#FF69B4] shrink-0 mt-0.5" />
            <div>
              <h4 className="text-white font-semibold text-sm mb-1">Made-to-Order</h4>
              <p className="text-gray-400 text-xs">Crafted via {STORE_INFO.fulfillmentPartner} when you order</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Truck className="w-5 h-5 text-[#00FFFF] shrink-0 mt-0.5" />
            <div>
              <h4 className="text-white font-semibold text-sm mb-1">Ships Worldwide</h4>
              <p className="text-gray-400 text-xs">Direct to your door from our fulfillment center</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Mail className="w-5 h-5 text-[#FFD700] shrink-0 mt-0.5" />
            <div>
              <h4 className="text-white font-semibold text-sm mb-1">Online Support</h4>
              <p className="text-gray-400 text-xs">Contact us at {STORE_CONTACT.email}</p>
            </div>
          </div>
        </div>

        <div className="pt-2 text-center">
          <p className="text-xs text-gray-400">
            Newsletter powered by {STORE_INFO.emailProvider} • Fulfillment by {STORE_INFO.fulfillmentPartner}
          </p>
        </div>
      </div>
    </motion.div>
  )
}
