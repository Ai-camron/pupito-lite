"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Truck, Package, RotateCcw, Shield, Clock, Globe } from "lucide-react";
import { STORE_CONTACT } from "@/lib/constants";
import OnlineStoreCallout from "@/components/OnlineStoreCallout";

const PolicySection = ({ icon: Icon, title, children }: {
  icon: React.ElementType;
  title: string;
  children: React.ReactNode;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="bg-linear-to-br from-[#1A1A1A]/80 to-[#2A2A2A]/60 border border-[#FF69B4]/20 rounded-2xl p-8 backdrop-blur"
  >
    <div className="flex items-center gap-3 mb-6">
      <div className="p-3 bg-linear-to-br from-[#FF69B4] to-[#FF1493] rounded-xl">
        <Icon className="w-6 h-6 text-black" />
      </div>
      <h2 className="text-2xl font-bold bg-linear-to-r from-[#FF69B4] to-[#FFD700] bg-clip-text text-transparent">
        {title}
      </h2>
    </div>
    <div className="space-y-4 text-gray-300">
      {children}
    </div>
  </motion.div>
);

export default function ShippingReturnsPage() {
  return (
    <div className="min-h-screen bg-[#0D0D0D] text-white font-[Lato]">
      {/* Header */}
      <div className="bg-linear-to-r from-[#1A1A1A] via-[#0D0D0D] to-[#1A1A1A] border-b border-[#FF69B4]/20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Link 
            href="/"
            className="inline-flex items-center gap-2 text-[#FF69B4] hover:text-[#FFD700] transition-colors mb-6 group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </Link>
          
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl font-black mb-4 bg-linear-to-r from-[#FF69B4] via-[#FFD700] to-[#00FFFF] bg-clip-text text-transparent">
              Shipping &amp; Returns
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              Fast shipping, easy returns, and hassle-free exchanges for your anime streetwear.
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <div className="text-center p-6 bg-linear-to-br from-[#FF69B4]/10 to-[#FF1493]/5 border border-[#FF69B4]/20 rounded-2xl">
            <Truck className="w-8 h-8 text-[#FF69B4] mx-auto mb-3" />
            <h3 className="font-bold text-[#FF69B4] mb-2">Free Shipping</h3>
            <p className="text-sm text-gray-400">On orders over $50</p>
          </div>
          <div className="text-center p-6 bg-linear-to-br from-[#1E90FF]/10 to-[#00FFFF]/5 border border-[#00FFFF]/20 rounded-2xl">
            <Clock className="w-8 h-8 text-[#00FFFF] mx-auto mb-3" />
            <h3 className="font-bold text-[#00FFFF] mb-2">Fast Delivery</h3>
            <p className="text-sm text-gray-400">3-7 business days</p>
          </div>
          <div className="text-center p-6 bg-linear-to-br from-[#FFD700]/10 to-[#FF6B6B]/5 border border-[#FFD700]/20 rounded-2xl">
            <RotateCcw className="w-8 h-8 text-[#FFD700] mx-auto mb-3" />
            <h3 className="font-bold text-[#FFD700] mb-2">Quality Guarantee</h3>
            <p className="text-sm text-gray-400">Made-to-order perfection</p>
          </div>
          <div className="text-center p-6 bg-linear-to-br from-[#32CD32]/10 to-[#8A2BE2]/5 border border-[#32CD32]/20 rounded-2xl">
            <Shield className="w-8 h-8 text-[#32CD32] mx-auto mb-3" />
            <h3 className="font-bold text-[#32CD32] mb-2">Secure Packaging</h3>
            <p className="text-sm text-gray-400">Protected delivery</p>
          </div>
        </div>

        {/* Policy Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Shipping Policy */}
          <PolicySection icon={Truck} title="Shipping Information">
            <div>
              <h3 className="text-lg font-semibold text-[#FF69B4] mb-3">Domestic Shipping (US)</h3>
              <ul className="space-y-2 mb-4">
                <li><strong className="text-white">Free Standard Shipping:</strong> Orders $50+ (3-7 business days)</li>
                <li><strong className="text-white">Standard Shipping:</strong> $8.99 (3-7 business days)</li>
                <li><strong className="text-white">Express Shipping:</strong> $15.99 (1-3 business days)</li>
                <li><strong className="text-white">Overnight Shipping:</strong> $29.99 (Next business day)</li>
              </ul>
              
              <h3 className="text-lg font-semibold text-[#00FFFF] mb-3">International Shipping</h3>
              <ul className="space-y-2 mb-4">
                <li><strong className="text-white">Canada:</strong> $15.99 (7-14 business days)</li>
                <li><strong className="text-white">Europe/UK:</strong> $24.99 (10-21 business days)</li>
                <li><strong className="text-white">Asia/Australia:</strong> $29.99 (14-28 business days)</li>
                <li><strong className="text-white">Rest of World:</strong> Contact us for rates</li>
              </ul>
              
              <p className="text-sm"><strong className="text-[#FFD700]">Note:</strong> International orders may be subject to customs fees and import duties determined by your country.</p>
            </div>
          </PolicySection>

          {/* Processing Time */}
          <PolicySection icon={Package} title="Order Processing">
            <div>
              <h3 className="text-lg font-semibold text-[#FF69B4] mb-3">Processing Times</h3>
              <ul className="space-y-2 mb-4">
                <li><strong className="text-white">Standard Items:</strong> 1-2 business days</li>
                <li><strong className="text-white">Custom/Personalized:</strong> 3-5 business days</li>
                <li><strong className="text-white">Limited Drops:</strong> 2-3 business days</li>
                <li><strong className="text-white">Pre-Orders:</strong> Ships on release date</li>
              </ul>
              
              <h3 className="text-lg font-semibold text-[#00FFFF] mb-3">Order Tracking</h3>
              <p className="mb-4">You&apos;ll receive a tracking number via email once your order ships. Track your package through:</p>
              <ul className="space-y-2 mb-4">
                <li>• Your PUPITO account dashboard</li>
                <li>• The tracking link in your shipping email</li>
                <li>• Directly on the carrier&apos;s website</li>
              </ul>
              
              <p className="text-sm"><strong className="text-[#FFD700]">Pro Tip:</strong> Create an account to save tracking info and get faster checkout on future orders!</p>
            </div>
          </PolicySection>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Returns Policy */}
          <PolicySection icon={RotateCcw} title="Returns &amp; Exchanges">
            <div>
              <h3 className="text-lg font-semibold text-[#FF69B4] mb-3">Made-to-Order Policy</h3>
              <p className="text-gray-300 mb-4">
                <strong>All PUPITO items are made-to-order</strong> just for you! This means each piece is custom printed when you place your order, ensuring the freshest quality and reducing waste. Due to the personalized nature of our products:
              </p>
              <ul className="space-y-2 mb-4">
                <li><strong className="text-white">No Standard Returns:</strong> Items cannot be returned for size, style, or color preferences</li>
                <li><strong className="text-white">Quality Guarantee:</strong> We only accept returns for printing defects or product damage</li>
                <li><strong className="text-white">Report Window:</strong> Contact us within 30 days of delivery for quality issues</li>
                <li><strong className="text-white">Photo Required:</strong> Please provide clear photos of any print or product defects</li>
              </ul>
              
              <h3 className="text-lg font-semibold text-[#00FFFF] mb-3">When We Accept Returns</h3>
              <p className="text-gray-300 mb-3">We&apos;ll gladly accept returns and provide replacements or refunds for:</p>
              <ul className="space-y-2 mb-4">
                <li>• <strong className="text-white">Print Quality Issues:</strong> Faded, cracked, or incorrectly printed designs</li>
                <li>• <strong className="text-white">Product Defects:</strong> Holes, tears, or manufacturing flaws in the garment</li>
                <li>• <strong className="text-white">Wrong Item Shipped:</strong> If we sent you the incorrect product</li>
                <li>• <strong className="text-white">Damaged in Transit:</strong> Items damaged during shipping</li>
                <li>• <strong className="text-white">Significant Color Variation:</strong> Major differences from product photos</li>
              </ul>
              
              <h3 className="text-lg font-semibold text-[#FFD700] mb-3">How to Report Quality Issues</h3>
              <ol className="space-y-2">
                <li>1. <strong className="text-white">Contact us immediately</strong> at {STORE_CONTACT.email} within 30 days of delivery</li>
                <li>2. <strong className="text-white">Include photos</strong> showing the print or product defect clearly</li>
                <li>3. <strong className="text-white">Provide order details</strong> including order number and item description</li>
                <li>4. <strong className="text-white">We&apos;ll review your case</strong> and respond within 24 hours</li>
                <li>5. <strong className="text-white">Approved returns:</strong> We&apos;ll send a prepaid return label and process replacement/refund</li>
              </ol>
              
              <p className="text-sm text-gray-400 mt-4">
                <strong className="text-[#FFD700]">Important:</strong> Please double-check your size and design choices before ordering, as we cannot accept returns for buyer&apos;s remorse or sizing mistakes.
              </p>
            </div>
          </PolicySection>

          {/* International & Special Cases */}
          <PolicySection icon={Globe} title="Special Policies">
            <div>
              <h3 className="text-lg font-semibold text-[#FF69B4] mb-3">International Returns</h3>
              <ul className="space-y-2 mb-4">
                <li><strong className="text-white">Same Policy:</strong> 30-day return window applies worldwide</li>
                <li><strong className="text-white">Return Shipping:</strong> Customer covers international return shipping costs</li>
                <li><strong className="text-white">Customs &amp; Duties:</strong> Any return customs fees are customer&apos;s responsibility</li>
                <li><strong className="text-white">Processing:</strong> International returns may take 2-4 weeks to process</li>
              </ul>
              
              <h3 className="text-lg font-semibold text-[#00FFFF] mb-3">Damaged or Wrong Items</h3>
              <p className="text-gray-300 mb-3">
                If you receive a damaged, defective, or wrong item, we&apos;ll make it right:
              </p>
              <ul className="space-y-2 mb-4">
                <li><strong className="text-white">Our Responsibility:</strong> We cover all return shipping costs</li>
                <li><strong className="text-white">Quick Resolution:</strong> Replacement sent immediately upon verification</li>
                <li><strong className="text-white">Photo Required:</strong> Please send photos of the issue</li>
                <li><strong className="text-white">Contact Within:</strong> 30 days of delivery for fastest resolution</li>
              </ul>
              
              <h3 className="text-lg font-semibold text-[#FFD700] mb-3">Resolution Options</h3>
              <p className="text-gray-300 mb-3">For approved quality issues, we offer:</p>
              <ul className="space-y-2">
                <li><strong className="text-white">Free Replacement:</strong> We&apos;ll reprint and ship a new item at no cost</li>
                <li><strong className="text-white">Full Refund:</strong> Complete refund including original shipping costs</li>
                <li><strong className="text-white">Store Credit:</strong> Credit toward future purchases (often processed faster)</li>
                <li><strong className="text-white">We Cover Costs:</strong> All return shipping and replacement costs covered by us</li>
              </ul>
            </div>
          </PolicySection>
        </div>

        {/* Contact Section */}
        <div className="text-center p-8 bg-linear-to-r from-[#FF69B4]/10 via-[#8A2BE2]/10 to-[#00FFFF]/10 border border-[#FF69B4]/20 rounded-3xl">
          <h3 className="text-2xl font-bold mb-4 bg-linear-to-r from-[#FF69B4] to-[#FFD700] bg-clip-text text-transparent">
            Questions About Your Order?
          </h3>
          <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
            Our Pup Squad support team is here to help with tracking, returns, exchanges, or any shipping questions. We typically respond within 4 hours during business hours!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/help/contact"
              className="bg-linear-to-r from-[#FF69B4] to-[#FF1493] hover:from-[#1E90FF] hover:to-[#00FFFF] text-black hover:text-white font-semibold px-8 py-3 rounded-xl transition-all duration-300 shadow-[0_0_20px_rgba(255,105,180,0.4)] hover:shadow-[0_0_25px_rgba(30,144,255,0.5)]"
            >
              Contact Support
            </Link>
            <Link
              href="/help/faq"
              className="border-2 border-[#FF69B4] text-[#FF69B4] hover:bg-[#FF69B4] hover:text-black font-semibold px-8 py-3 rounded-xl transition-all duration-300"
            >
              Check FAQ
            </Link>
          </div>
        </div>

        {/* Online Store Info */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
          <OnlineStoreCallout variant="compact" />
        </div>
      </div>
    </div>
  );
}