'use client'

import { motion } from 'framer-motion'
import { 
  Zap, 
  Heart, 
  Globe, 
  Users, 
  Award, 
  Target,
  Sparkles,
  TrendingUp
} from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

const stats = [
  { icon: Users, label: 'Happy Customers', value: '50K+' },
  { icon: Globe, label: 'Countries Shipped', value: '25+' },
  { icon: Award, label: 'Awards Won', value: '12' },
  { icon: TrendingUp, label: 'Years of Excellence', value: '5+' }
]

const values = [
  {
    icon: Zap,
    title: 'Innovation',
    description: 'We constantly push the boundaries of streetwear design, blending cutting-edge aesthetics with timeless anime culture.'
  },
  {
    icon: Heart,
    title: 'Community',
    description: 'PUPITO is more than a brand - we\'re a community of anime lovers, dreamers, and street culture enthusiasts.'
  },
  {
    icon: Target,
    title: 'Quality',
    description: 'Every piece is crafted with premium materials and attention to detail, ensuring durability and comfort.'
  },
  {
    icon: Sparkles,
    title: 'Authenticity',
    description: 'We stay true to our roots while evolving with the culture, creating authentic pieces that resonate with our community.'
  }
]

const timeline = [
  {
    year: '2019',
    title: 'The Beginning',
    description: 'Started as a passion project by anime enthusiasts who wanted to bridge the gap between Japanese culture and streetwear.'
  },
  {
    year: '2020',
    title: 'First Collection',
    description: 'Launched our debut collection "Neon Dreams" featuring cyberpunk-inspired hoodies and tees that sold out in 24 hours.'
  },
  {
    year: '2021',
    title: 'Global Expansion',
    description: 'Expanded internationally, bringing PUPITO to anime fans across North America, Europe, and Asia.'
  },
  {
    year: '2022',
    title: 'Collaborations',
    description: 'Partnered with renowned anime artists and influencers to create limited edition collections.'
  },
  {
    year: '2023',
    title: 'Sustainability Initiative',
    description: 'Launched our eco-friendly production line using sustainable materials and ethical manufacturing processes.'
  },
  {
    year: '2024',
    title: 'Future Vision',
    description: 'Continuing to innovate with AR/VR experiences and next-gen wearable tech integrated into our designs.'
  }
]

const organizationData = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'PUPITO',
  url: 'https://www.pupito.com', // Replace with your actual domain
  logo: 'https://www.pupito.com/logo.png', // Replace with your actual logo URL
  description: 'PUPITO is an anime-inspired streetwear brand with a dark neon aesthetic, blending Japanese pop culture with urban style.',
  sameAs: [
    // Add social media links here when available
  ],
};

export default function AboutPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationData) }}
      />
      <div className="min-h-screen bg-linear-to-br from-[#0D0D0D] via-[#1A1A1A] to-[#0D0D0D]">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-r from-[#FF69B4]/20 via-[#1E90FF]/20 to-[#FFD700]/20" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-7xl font-bold bg-linear-to-r from-[#FF69B4] via-[#1E90FF] to-[#FFD700] bg-clip-text text-transparent mb-8">
              ABOUT PUPITO
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
              Where anime culture meets street fashion. We create bold, authentic pieces that celebrate 
              the vibrant world of Japanese pop culture while pushing the boundaries of urban style.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-[#1A1A1A]/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="w-16 h-16 bg-linear-to-br from-[#FF69B4] to-[#FF1493] rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-8 h-8 text-black" />
                  </div>
                  <div className="text-3xl md:text-4xl font-bold text-[#FF69B4] mb-2">
                    {stat.value}
                  </div>
                  <div className="text-gray-300 font-medium">
                    {stat.label}
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-white">
                Our <span className="text-[#FF69B4]">Story</span>
              </h2>
              <div className="space-y-4 text-gray-300 leading-relaxed">
                <p>
                  PUPITO was born from a simple observation: the incredible artistry and creativity of anime 
                  deserved to be celebrated in the world of fashion. Founded by a group of passionate anime 
                  enthusiasts and streetwear designers, we set out to create something unique.
                </p>
                <p>
                  Our name, PUPITO, represents the playful yet powerful spirit of anime culture - where 
                  imagination knows no bounds and every story can inspire. We believe that clothing should 
                  be more than just fabric; it should be a canvas for self-expression and a way to connect 
                  with the communities you love.
                </p>
                <p>
                  From our headquarters in the heart of the city, we design every piece with meticulous 
                  attention to detail, drawing inspiration from classic anime aesthetics, cyberpunk visuals, 
                  and contemporary street culture. Each collection tells a story, and we invite you to be 
                  part of that narrative.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="relative"
            >
              <div className="aspect-square bg-linear-to-br from-[#FF69B4]/30 to-[#1E90FF]/30 rounded-2xl overflow-hidden">
                <Image
                  src="/images/placeholder-hero.svg"
                  alt="PUPITO Team"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-linear-to-br from-[#FFD700] to-[#FF69B4] rounded-2xl opacity-80" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 bg-[#1A1A1A]/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Our <span className="text-[#1E90FF]">Values</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              These core principles guide everything we do, from design to customer service.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon
              return (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-[#1A1A1A] border border-[#FF69B4]/30 rounded-xl p-8 hover:shadow-[0_0_30px_rgba(255,105,180,0.2)] transition-all duration-300"
                >
                  <div className="w-12 h-12 bg-linear-to-br from-[#1E90FF] to-[#00FFFF] rounded-lg flex items-center justify-center mb-6">
                    <Icon className="w-6 h-6 text-black" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4">{value.title}</h3>
                  <p className="text-gray-300 leading-relaxed">{value.description}</p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Our <span className="text-[#FFD700]">Journey</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              From a passion project to a global brand - here&apos;s how we&apos;ve grown.
            </p>
          </motion.div>

          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-linear-to-b from-[#FF69B4]/30 via-[#1E90FF]/30 to-[#FFD700]/30 rounded-full -z-10 opacity-50" />
            
            <div className="space-y-16">
              {timeline.map((item, index) => (
                <motion.div
                  key={item.year}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.2 }}
                  className={`flex items-center ${
                    index % 2 === 0 ? 'lg:flex-row-reverse' : ''
                  }`}
                >
                  {/* Content */}
                  <div className={`w-full lg:w-5/12 ${
                    index % 2 === 0 ? 'lg:text-right lg:pr-8' : 'lg:pl-8'
                  }`}>
                    <div className="bg-[#1A1A1A] border border-[#FF69B4]/30 rounded-xl p-6">
                      <div className="text-[#FF69B4] font-bold text-lg mb-2">{item.year}</div>
                      <h3 className="text-white font-bold text-xl mb-3">{item.title}</h3>
                      <p className="text-gray-300 leading-relaxed">{item.description}</p>
                    </div>
                  </div>

                  {/* Center Dot */}
                  <div className="hidden lg:flex w-2/12 justify-center">
                    <div className="w-4 h-4 bg-linear-to-br from-[#FF69B4] to-[#1E90FF] rounded-full border-4 border-[#0D0D0D]" />
                  </div>

                  {/* Spacer */}
                  <div className="hidden lg:block w-5/12" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-linear-to-r from-[#FF69B4]/20 via-[#1E90FF]/20 to-[#FFD700]/20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            <h2 className="text-4xl md:text-6xl font-bold text-white">
              Join the <span className="text-[#FF69B4]">PUPITO</span> Family
            </h2>
            <p className="text-xl text-gray-300 leading-relaxed">
              Ready to express your love for anime culture through fashion? 
              Explore our latest collections and become part of our growing community.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/products"
                className="px-8 py-4 bg-linear-to-r from-[#FF69B4] to-[#FF1493] hover:from-[#1E90FF] hover:to-[#00FFFF] text-black hover:text-white font-bold rounded-xl transition-all duration-300 shadow-[0_0_30px_rgba(255,105,180,0.3)] hover:shadow-[0_0_40px_rgba(30,144,255,0.4)]"
              >
                Shop Now
              </Link>
              <Link
                href="/help/contact"
                className="px-8 py-4 border-2 border-[#FF69B4] text-[#FF69B4] hover:bg-[#FF69B4] hover:text-black font-bold rounded-xl transition-all duration-300"
              >
                Get in Touch
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
    </>
  )
}
