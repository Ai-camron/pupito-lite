"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Ruler, Shirt, Users, Info } from "lucide-react";

const sizeData = {
  tees: {
    name: "T-Shirts & Tank Tops",
    icon: Shirt,
    description: "Relaxed streetwear fit with room to move",
    sizes: [
      { size: "XS", chest: "34-36", length: "26", shoulder: "16" },
      { size: "S", chest: "36-38", length: "27", shoulder: "17" },
      { size: "M", chest: "38-40", length: "28", shoulder: "18" },
      { size: "L", chest: "40-42", length: "29", shoulder: "19" },
      { size: "XL", chest: "42-44", length: "30", shoulder: "20" },
      { size: "2XL", chest: "44-46", length: "31", shoulder: "21" },
      { size: "3XL", chest: "46-48", length: "32", shoulder: "22" }
    ]
  },
  hoodies: {
    name: "Hoodies & Sweatshirts", 
    icon: Shirt,
    description: "Oversized anime streetwear style",
    sizes: [
      { size: "XS", chest: "38-40", length: "24", shoulder: "18", sleeve: "24" },
      { size: "S", chest: "40-42", length: "25", shoulder: "19", sleeve: "25" },
      { size: "M", chest: "42-44", length: "26", shoulder: "20", sleeve: "26" },
      { size: "L", chest: "44-46", length: "27", shoulder: "21", sleeve: "27" },
      { size: "XL", chest: "46-48", length: "28", shoulder: "22", sleeve: "28" },
      { size: "2XL", chest: "48-50", length: "29", shoulder: "23", sleeve: "29" },
      { size: "3XL", chest: "50-52", length: "30", shoulder: "24", sleeve: "30" }
    ]
  },
  joggers: {
    name: "Joggers & Pants",
    icon: Users,
    description: "Comfortable tapered fit",
    sizes: [
      { size: "XS", waist: "26-28", inseam: "28", rise: "10" },
      { size: "S", waist: "28-30", inseam: "29", rise: "10.5" },
      { size: "M", waist: "30-32", inseam: "30", rise: "11" },
      { size: "L", waist: "32-34", inseam: "31", rise: "11.5" },
      { size: "XL", waist: "34-36", inseam: "32", rise: "12" },
      { size: "2XL", waist: "36-38", inseam: "32", rise: "12.5" },
      { size: "3XL", waist: "38-40", inseam: "32", rise: "13" }
    ]
  },
  accessories: {
    name: "Caps & Accessories",
    icon: Ruler,
    description: "One size fits most with adjustable features",
    sizes: [
      { size: "OS", circumference: "21-24", depth: "4", brim: "2.75" }
    ]
  }
};

const SizeTable = ({ data }: {
  data: typeof sizeData[keyof typeof sizeData];
}) => {
  const Icon = data.icon;
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-linear-to-br from-[#1A1A1A]/80 to-[#2A2A2A]/60 border border-[#FF69B4]/20 rounded-2xl overflow-hidden backdrop-blur"
    >
      {/* Header */}
      <div className="p-6 border-b border-[#FF69B4]/20">
        <div className="flex items-center gap-3 mb-3">
          <div className="p-2 bg-linear-to-br from-[#FF69B4] to-[#FF1493] rounded-lg">
            <Icon className="w-5 h-5 text-black" />
          </div>
          <h3 className="text-xl font-bold bg-linear-to-r from-[#FF69B4] to-[#FFD700] bg-clip-text text-transparent">
            {data.name}
          </h3>
        </div>
        <p className="text-gray-400 text-sm">{data.description}</p>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-[#FF69B4]/10">
              <th className="text-left p-4 text-sm font-semibold text-[#FF69B4]">Size</th>
              {Object.keys(data.sizes[0]).filter(key => key !== 'size').map((measurement) => (
                <th key={measurement} className="text-left p-4 text-sm font-semibold text-[#FF69B4] capitalize">
                  {measurement === 'chest' ? 'Chest (in)' : 
                   measurement === 'length' ? 'Length (in)' :
                   measurement === 'shoulder' ? 'Shoulder (in)' :
                   measurement === 'sleeve' ? 'Sleeve (in)' :
                   measurement === 'waist' ? 'Waist (in)' :
                   measurement === 'inseam' ? 'Inseam (in)' :
                   measurement === 'rise' ? 'Rise (in)' :
                   measurement === 'circumference' ? 'Circumference (in)' :
                   measurement === 'depth' ? 'Depth (in)' :
                   measurement === 'brim' ? 'Brim (in)' : measurement}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.sizes.map((sizeInfo, index) => (
              <tr key={sizeInfo.size} className={index % 2 === 0 ? 'bg-[#1A1A1A]/30' : ''}>
                <td className="p-4 font-semibold text-white">{sizeInfo.size}</td>
                {Object.entries(sizeInfo).filter(([key]) => key !== 'size').map(([_, value]) => (
                  <td key={`${sizeInfo.size}-${_}`} className="p-4 text-gray-300">{value}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
};

export default function SizeGuidePage() {
  const [activeTab, setActiveTab] = useState('tees');
  
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
              Size Guide
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              Find your perfect fit with our detailed sizing charts and measurement guide.
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Measurement Tips */}
        <div className="bg-linear-to-r from-[#FF69B4]/10 via-[#8A2BE2]/10 to-[#00FFFF]/10 border border-[#FF69B4]/20 rounded-3xl p-8 mb-12">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <Info className="w-6 h-6 text-[#FF69B4]" />
                <h2 className="text-2xl font-bold text-[#FF69B4]">How to Measure</h2>
              </div>
              <ul className="space-y-3 text-gray-300">
                <li><strong className="text-white">Chest:</strong> Measure around the fullest part of your chest, under your arms</li>
                <li><strong className="text-white">Length:</strong> From the highest point of the shoulder to the bottom hem</li>
                <li><strong className="text-white">Shoulder:</strong> From shoulder seam to shoulder seam across the back</li>
                <li><strong className="text-white">Waist:</strong> Around your natural waistline where you&apos;d wear a belt</li>
              </ul>
            </div>
            <div>
              <div className="flex items-center gap-3 mb-4">
                <Ruler className="w-6 h-6 text-[#00FFFF]" />
                <h2 className="text-2xl font-bold text-[#00FFFF]">Fit Guide</h2>
              </div>
              <ul className="space-y-3 text-gray-300">
                <li><strong className="text-white">Relaxed Fit:</strong> Our tees have a comfortable, not-too-tight streetwear vibe</li>
                <li><strong className="text-white">Oversized Fit:</strong> Hoodies are designed to be roomy for that anime aesthetic</li>
                <li><strong className="text-white">Size Up:</strong> When in doubt, go bigger for the authentic streetwear look</li>
                <li><strong className="text-white">Questions?</strong> Hit us up at hello@pupito.com for sizing help!</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap gap-2 mb-8 justify-center">
          {Object.entries(sizeData).map(([key, data]) => (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
              className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                activeTab === key
                  ? 'bg-linear-to-r from-[#FF69B4] to-[#FF1493] text-black shadow-[0_0_20px_rgba(255,105,180,0.4)]'
                  : 'bg-[#1A1A1A]/80 text-gray-300 hover:text-[#FF69B4] border border-[#FF69B4]/20'
              }`}
            >
              {data.name}
            </button>
          ))}
        </div>

        {/* Size Tables */}
        <div className="space-y-8">
          {Object.entries(sizeData).map(([key, data]) => (
            <div 
              key={key} 
              className={activeTab === key ? 'block' : 'hidden'}
            >
              <SizeTable data={data} />
            </div>
          ))}
        </div>

        {/* Additional Info */}
        <div className="grid md:grid-cols-2 gap-8 mt-12">
          <div className="bg-linear-to-br from-[#1A1A1A]/80 to-[#2A2A2A]/60 border border-[#FF69B4]/20 rounded-2xl p-6">
            <h3 className="text-xl font-bold text-[#FF69B4] mb-4">Size Chart Notes</h3>
            <ul className="space-y-2 text-gray-300 text-sm">
              <li>• All measurements are in inches</li>
              <li>• Measurements may vary by ±0.5&quot; due to manufacturing</li>
              <li>• Models in photos typically wear size M (5&apos;10&quot;, 160lbs)</li>
              <li>• Garments are pre-shrunk but may shrink slightly after washing</li>
              <li>• For between sizes, we recommend sizing up</li>
            </ul>
          </div>

          <div className="bg-linear-to-br from-[#1A1A1A]/80 to-[#2A2A2A]/60 border border-[#00FFFF]/20 rounded-2xl p-6">
            <h3 className="text-xl font-bold text-[#00FFFF] mb-4">Still Unsure?</h3>
            <p className="text-gray-300 text-sm mb-4">
              Our Pup Squad team is here to help you find the perfect fit! We know every product inside and out.
            </p>
            <div className="space-y-2">
              <Link 
                href="/help/contact"
                className="inline-block bg-linear-to-r from-[#FF69B4] to-[#FF1493] hover:from-[#1E90FF] hover:to-[#00FFFF] text-black hover:text-white font-semibold px-4 py-2 rounded-lg text-sm transition-all duration-300"
              >
                Get Sizing Help
              </Link>
              <p className="text-xs text-gray-500">
                Free exchanges within 30 days if the fit isn&apos;t perfect!
              </p>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12 p-8 bg-linear-to-r from-[#FF69B4]/10 via-[#8A2BE2]/10 to-[#00FFFF]/10 border border-[#FF69B4]/20 rounded-3xl">
          <h3 className="text-2xl font-bold mb-4 bg-linear-to-r from-[#FF69B4] to-[#FFD700] bg-clip-text text-transparent">
            Ready to Find Your Perfect Anime Fit?
          </h3>
          <p className="text-gray-300 mb-6">
            Now that you know your size, check out our latest drops and limited collections!
          </p>
          <Link
            href="/#shop"
            className="inline-block bg-linear-to-r from-[#FF69B4] to-[#FF1493] hover:from-[#1E90FF] hover:to-[#00FFFF] text-black hover:text-white font-semibold px-8 py-3 rounded-xl transition-all duration-300 shadow-[0_0_20px_rgba(255,105,180,0.4)] hover:shadow-[0_0_25px_rgba(30,144,255,0.5)]"
          >
            Shop Now
          </Link>
        </div>
      </div>
    </div>
  );
}