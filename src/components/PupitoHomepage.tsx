"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ShoppingCart, Star, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import SignupPopup from "@/components/SignupPopup";
import Chatbot from "@/components/Chatbot";
import globalStyles from "./Navigation.module.css";

// PUPITO Dark Mode Variant
// Theme: Neon Noir x Anime Streetwear
// Extended Color Palette (Blue / Teal forward):
// - Core: Charcoal #0D0D0D, Sky Blue #0EA5E9, Electric Cyan #22D3EE, Anime Yellow #FFD700
// - Cool Variants: Indigo #6366F1, Deep Teal #14B8A6, Azure #1E90FF
// - Accent Colors: Electric Purple #8A2BE2, Cyan #00FFFF, Lime Green #32CD32
// - Gradients: Blue-Cyan, Teal-Cyan, Indigo-Blue

const CATEGORIES = [
  "Tees",
  "Hoodies",
  "Joggers",
  "Accessories",
  "Stickers",
  "Limited Drops",
];

const FEATURED = [
  {
    id: 1,
    name: "Galaxy Arc Tee",
    price: "$34",
    tag: "NEW",
    rating: 5,
  },
  {
    id: 2,
    name: "Neon Kitsune Hoodie",
    price: "$62",
    tag: "Fan Favorite",
    rating: 5,
  },
  {
    id: 3,
    name: "Hero Runner Joggers",
    price: "$54",
    tag: "Trending",
    rating: 4,
  },
  {
    id: 4,
    name: "Pixel Pup Cap",
    price: "$26",
    tag: "NEW",
    rating: 4,
  },
];

const TESTIMONIALS = [
  {
    id: 1,
    name: "Kai / @ArcRunner",
    text: "Wearing it feels like walking through Tokyo at night — electric, alive, cinematic.",
  },
  {
    id: 2,
    name: "Mika / @SakuraSketch",
    text: "The Neon Kitsune hoodie glows under club lights. It's streetwear and story in one.",
  },
];

const BRAND_ART = [
  {
    title: "Pupito Crest Patch",
    description: "A midnight badge for the pack — stitched gradients that glow under city lights.",
    image: "/images/pupito-crest.svg",
    alt: "Pupito crest patch with neon paw print",
  },
  {
    title: "Sticker Wall Drop",
    description: "Collectible stickers that stack your story with holographic Pupito icons.",
    image: "/images/pupito-sticker-wall.svg",
    alt: "Collage of Pupito stickers with neon outlines",
  },
  {
    title: "Arcade Aura Poster",
    description: "Limited screen print that blends anime heat with Pupito’s neon noir palette.",
    image: "/images/pupito-arcade-aura.svg",
    alt: "Poster artwork with Pupito mascot in an arcade glow",
  },
];

const Section = ({ id, children }: { id?: string; children: React.ReactNode }) => (
  <section
    id={id}
    className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10"
  >
    {children}
  </section>
);

const StarDisplay = ({ rating: n }: { rating: number }) => (
  <div className="flex gap-1">
    {Array.from({ length: 5 }).map((_, i) => (
      <Star key={i} className={`w-3 h-3 ${i < n ? "fill-[#FFD700]" : "text-gray-700"}`} />
    ))}
  </div>
);

// Main PUPITO Homepage Component
const PUPITOHomepage = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [signupEmail, setSignupEmail] = useState("");
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);

  const handleEmailSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email.trim()) {
      setError("Please enter your email address");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: email.trim() }),
      });

      const data = await response.json();

      if (response.ok) {
        setSignupEmail(email);
        setEmail("");
        setShowPopup(true);
      } else {
        setError(data.error || "Something went wrong. Please try again.");
      }
    } catch {
      setError("Network error. Please check your connection and try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0D0D0D] text-white font-[Lato]">
      {/* HERO */}
      <Section id="hero">
        <div className="relative overflow-hidden rounded-3xl min-h-[420px] flex flex-col items-center justify-center text-center">
          {/* Background Image */}
          <div className="absolute inset-0 rounded-3xl">
            <Image
              src="/images/pupito-lookbook-hero.svg"
              alt="Pupito streetwear looks styled in a neon city backdrop"
              fill
              className="object-cover opacity-55"
              priority
            />
          </div>
          {/* Enhanced gradient overlay */}
          <div className="absolute inset-0 bg-linear-to-br from-[#FF1493]/30 via-[#0D0D0D]/40 to-[#00FFFF]/30 rounded-3xl" />
          <div className="absolute inset-0 bg-linear-to-t from-[#0D0D0D]/60 via-transparent to-[#FF69B4]/10 rounded-3xl" />
          <div className="absolute top-6 right-6">
            <Image
              src="/images/pupito-crest.svg"
              alt="Pupito neon crest badge"
              width={120}
              height={120}
              className="drop-shadow-[0_10px_25px_rgba(255,105,180,0.5)]"
              priority
            />
          </div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="relative z-10 px-4 flex flex-col items-center gap-4"
          >
            <p className={`${globalStyles.glow} text-xs uppercase tracking-[0.3em] text-[#FFD700] bg-[#0D0D0D]/60 px-3 py-2 rounded-full border border-[#FFD700]/40 shadow-[0_0_20px_rgba(255,215,0,0.25)]`}>
              Pupito Design House
            </p>
            <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-white drop-shadow-[0_6px_12px_rgba(255,20,147,0.6)]">
              WEAR YOUR STORY
            </h1>
            <p className="text-lg sm:text-xl text-gray-200 max-w-md drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
              Anime apparel for every arc of you — now in midnight mode.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 mt-3">
              <Link href="/shop">
                <Button className="bg-linear-to-r from-[#1E90FF] to-[#00FFFF] hover:from-[#FFD700] hover:to-[#22d3ee] hover:text-black text-white font-semibold rounded-xl px-8 py-3 shadow-[0_0_20px_rgba(30,144,255,0.4)] hover:shadow-[0_0_25px_rgba(34,211,238,0.45)] transition-all duration-300">
                  Shop Now
                </Button>
              </Link>
              <Link href="/shop#collections">
                <Button className="bg-transparent border-2 border-[#22d3ee] text-[#22d3ee] hover:bg-linear-to-r hover:from-[#22d3ee] hover:to-[#0ea5e9] hover:text-black hover:border-[#0ea5e9] font-semibold rounded-xl px-8 py-3 shadow-[0_0_15px_rgba(34,211,238,0.3)] transition-all duration-300">
                  View Collections
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </Section>

      {/* BRAND DESIGN */}
      <Section id="design-lab">
        <div className="relative overflow-hidden rounded-3xl border border-[#FF69B4]/15 bg-linear-to-br from-[#0F0F10] via-[#0C0C0F] to-[#111118] mb-8">
          <div className="absolute inset-0 pointer-events-none opacity-60">
            <Image
              src="/images/pupito-collection-mesh.svg"
              alt="Pattern of Pupito patches, tees, and hoodies"
              fill
              className="object-cover"
            />
          </div>
          <div className="relative flex flex-col gap-2 text-center px-5 sm:px-8 py-8">
            <p className="text-xs uppercase tracking-[0.3em] text-[#00FFFF]">Pupito Visual Lab</p>
            <h2 className="text-2xl sm:text-3xl font-black text-white">Original art you can wear</h2>
            <p className="text-sm text-gray-300 max-w-2xl mx-auto">
              Every drop ships with bespoke Pupito artwork — crest patches, sticker walls, and posters that amplify your fits.
            </p>
          </div>
        </div>
        <div className="grid gap-4 sm:grid-cols-3">
          {BRAND_ART.map((art) => (
            <Card
              key={art.title}
              className="bg-linear-to-b from-[#121212] to-[#1A1A1A] border border-[#1E90FF]/30 rounded-2xl overflow-hidden shadow-[0_0_25px_rgba(30,144,255,0.2)]"
            >
              <CardContent className="p-0 flex flex-col h-full">
                <div className="relative h-40 bg-linear-to-br from-[#1E90FF]/10 via-[#FF69B4]/10 to-[#FFD700]/10">
                  <Image
                    src={art.image}
                    alt={art.alt}
                    fill
                    className="object-contain p-6 drop-shadow-[0_6px_20px_rgba(255,105,180,0.35)]"
                    sizes="(min-width: 1024px) 33vw, 100vw"
                  />
                </div>
                <div className="p-4 flex flex-col gap-2 flex-1">
                  <h3 className="text-lg font-semibold text-white">{art.title}</h3>
                  <p className="text-sm text-gray-300 flex-1">{art.description}</p>
                  <div className="text-xs font-semibold text-[#FFD700] uppercase tracking-[0.15em]">
                    Limited + Personalized
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </Section>

      {/* CATEGORY GRID */}
      <Section id="categories">
        <h2 className="text-2xl sm:text-3xl text-center mb-6 font-black text-white">
          SHOP BY CATEGORY
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {CATEGORIES.map((label, index) => {
            const colors = [
              "from-[#22d3ee] to-[#0ea5e9]", // Pink variants
              "from-[#1E90FF] to-[#00FFFF]", // Blue-Cyan
              "from-[#FFD700] to-[#14b8a6]", // Yellow-Coral
              "from-[#8A2BE2] to-[#6366f1]", // Purple-Magenta
              "from-[#32CD32] to-[#00FFFF]", // Green-Cyan
              "from-[#0ea5e9] to-[#8A2BE2]", // Hot Pink-Purple
            ];
            const gradientClass = colors[index % colors.length];
            
            return (
              <Link href="/shop#collections" key={label}>
                <motion.div
                  whileHover={{ 
                    y: -5, 
                    scale: 1.02,
                    boxShadow: "0 10px 30px rgba(34,211,238,0.35)" 
                  }}
                  className="h-28 sm:h-32 rounded-2xl bg-linear-to-br from-[#1A1A1A] to-[#2A2A2A] flex flex-col items-center justify-center gap-2 border border-[#22d3ee]/30 cursor-pointer relative overflow-hidden group transition-all duration-300"
                >
                <div className="absolute inset-0 bg-linear-to-br from-[#22d3ee]/10 to-[#1E90FF]/10 opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
                <div className={`w-8 h-8 rounded-full bg-linear-to-br ${gradientClass} shadow-[0_0_15px_rgba(34,211,238,0.3)]`} />
                <span className="text-base sm:text-lg font-semibold text-white group-hover:text-[#22d3ee] transition-colors duration-300 relative z-10">
                  {label}
                </span>
                </motion.div>
              </Link>
            );
          })}
        </div>
      </Section>

      {/* FEATURED */}
      <Section id="shop">
        <div className="relative overflow-hidden rounded-2xl border border-[#1E90FF]/15 bg-[#0F0F10] mb-6">
          <div className="absolute inset-0 pointer-events-none opacity-50">
            <Image
              src="/images/pupito-streetwear-grid.svg"
              alt="Pupito apparel silhouettes and icons"
              fill
              className="object-cover"
            />
          </div>
          <div className="relative flex flex-col sm:flex-row items-center sm:justify-between gap-2 px-4 sm:px-6 py-5 text-center sm:text-left">
            <h2 className="text-xl sm:text-2xl font-black text-white drop-shadow-[0_4px_10px_rgba(0,0,0,0.45)]">
              FEATURED DROPS
            </h2>
            <Link href="/shop#featured" className="text-sm text-[#1E90FF] underline-offset-2 hover:underline">
              View all
            </Link>
          </div>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {FEATURED.map((p) => {
            const productImages = [
              "/images/placeholder-tee.svg",
              "/images/placeholder-hoodie.svg", 
              "/images/placeholder-joggers.svg",
              "/images/placeholder-cap.svg"
            ];
            
            return (
              <Link key={p.id} href={`/products/${p.id}`}>
                <Card
                  className="group rounded-2xl border border-[#22d3ee]/30 bg-linear-to-b from-[#1A1A1A] to-[#141414] overflow-hidden flex flex-col hover:shadow-[0_0_30px_rgba(34,211,238,0.35)] hover:border-[#0ea5e9]/50 transition-all duration-300"
                >
                <CardContent className="p-0 flex-1 flex flex-col">
                  <div className="relative h-28 bg-linear-to-br from-[#1E90FF]/10 via-[#8A2BE2]/5 to-[#22d3ee]/10 flex items-center justify-center overflow-hidden">
                    <span className="absolute top-2 left-2 text-[9px] px-2 py-1 rounded-full bg-linear-to-r from-[#22d3ee] to-[#0ea5e9] text-black font-semibold uppercase shadow-[0_0_10px_rgba(14,165,233,0.45)]">
                      {p.tag}
                    </span>
                    <div className="relative w-16 h-16 group-hover:scale-110 transition-transform duration-300">
                      <Image
                        src={productImages[p.id - 1]}
                        alt={p.name}
                        fill
                        className="object-contain"
                      />
                    </div>
                    {/* Animated background particles */}
                    <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-[#FFD700] opacity-60 animate-pulse" />
                    <div className="absolute bottom-3 left-3 w-1 h-1 rounded-full bg-[#00FFFF] opacity-80 animate-pulse" />
                  </div>
                  <div className="p-3 flex flex-col flex-1">
                    <div className="text-sm font-semibold text-white leading-snug group-hover:text-[#22d3ee] transition-colors duration-300">
                      {p.name}
                    </div>
                    <StarDisplay rating={p.rating} />
                    <div className="mt-auto flex items-center justify-between pt-1">
                      <span className="text-sm font-bold bg-linear-to-r from-[#22d3ee] to-[#FFD700] bg-clip-text text-transparent">
                        {p.price}
                      </span>
                      <button className="opacity-0 group-hover:opacity-100 transition-all duration-300 text-xs px-2 py-1 rounded-lg bg-linear-to-r from-[#22d3ee] to-[#0ea5e9] hover:from-[#FFD700] hover:to-[#14b8a6] text-black font-semibold flex items-center gap-1 shadow-[0_0_10px_rgba(34,211,238,0.35)]">
                        <ShoppingCart className="w-3 h-3" /> Add
                      </button>
                    </div>
                  </div>
                </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      </Section>

      {/* TESTIMONIALS */}
      <Section>
        <h2 className="text-2xl font-black text-center mb-6 text-white">
          PUP SQUAD STORIES
        </h2>
        <div className="grid gap-6 sm:grid-cols-2">
          {TESTIMONIALS.map((t, index) => (
            <motion.div
              key={t.id}
              whileHover={{ scale: 1.03, y: -5 }}
              className={`rounded-2xl border p-5 shadow-[0_0_30px_rgba(30,144,255,0.2)] relative overflow-hidden group ${
                index === 0 
                  ? "border-[#1E90FF]/30 bg-linear-to-br from-[#121212] to-[#1A1A2E]"
                  : "border-[#22d3ee]/30 bg-linear-to-br from-[#121212] to-[#2E1A1A]"
              }`}
            >
              {/* Animated background glow */}
              <div className={`absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 ${
                index === 0 
                  ? "bg-linear-to-br from-[#1E90FF]/20 to-[#00FFFF]/20"
                  : "bg-linear-to-br from-[#22d3ee]/20 to-[#0ea5e9]/20"
              }`} />
              
              <p className="text-base text-gray-200 mb-3 relative z-10 leading-relaxed">&ldquo;{t.text}&rdquo;</p>
              <span className={`text-sm font-semibold relative z-10 ${
                index === 0 ? "text-[#00FFFF]" : "text-[#22d3ee]"
              }`}>
                {t.name}
              </span>
              
              {/* Floating accent dots */}
              <div className="absolute top-3 right-3 w-2 h-2 rounded-full bg-[#FFD700] opacity-60 animate-pulse" />
              <div className="absolute bottom-3 left-3 w-1 h-1 rounded-full bg-[#32CD32] opacity-80 animate-pulse" />
            </motion.div>
          ))}
        </div>
      </Section>

      {/* NEWSLETTER */}
      <Section>
        <div className="rounded-2xl border border-[#22d3ee]/30 bg-linear-to-r from-[#1E90FF]/15 via-[#0D0D0D] to-[#22d3ee]/15 px-4 py-6 sm:px-6 sm:py-8 flex flex-col md:flex-row md:items-center md:justify-between gap-6 relative overflow-hidden">
          {/* Animated background elements */}
          <div className="absolute top-0 left-0 w-20 h-20 bg-linear-to-br from-[#22d3ee]/10 to-[#0ea5e9]/5 rounded-full blur-xl animate-pulse" />
          <div className="absolute bottom-0 right-0 w-32 h-32 bg-linear-to-br from-[#00FFFF]/10 to-[#1E90FF]/5 rounded-full blur-xl animate-pulse [animation-delay:1s]" />
          
          <div className="relative z-10">
            <h3 className="text-xl font-black bg-linear-to-r from-[#22d3ee] via-[#FFD700] to-[#00FFFF] bg-clip-text text-transparent mb-1">
              Join the Pup Squad
            </h3>
            <p className="text-sm sm:text-base text-gray-300 max-w-sm">
              Secret drops, limited codes, and exclusive story arcs delivered to your inbox.
            </p>
          </div>
          <form onSubmit={handleEmailSignup} className="flex flex-col sm:flex-row gap-3 w-full sm:max-w-lg relative z-10">
            <input
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 h-12 px-4 text-base rounded-xl border border-[#22d3ee]/30 bg-[#1A1A1A]/80 backdrop-blur text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#22d3ee] focus:border-[#0ea5e9] transition-all duration-300 shadow-[0_0_10px_rgba(34,211,238,0.2)] focus:shadow-[0_0_20px_rgba(34,211,238,0.35)]"
              disabled={isLoading}
            />
            <Button 
              type="submit"
              disabled={isLoading}
              className="h-12 px-6 text-base bg-linear-to-r from-[#22d3ee] to-[#0ea5e9] hover:from-[#1E90FF] hover:to-[#00FFFF] text-black hover:text-white font-semibold rounded-xl shadow-[0_0_15px_rgba(34,211,238,0.35)] hover:shadow-[0_0_20px_rgba(30,144,255,0.4)] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "Joining..." : "Sign Up"}
            </Button>
          </form>
          {error && (
            <p className="text-xs text-red-400 mt-2 relative z-10 text-center sm:text-left">
              {error}
            </p>
          )}
        </div>
      </Section>

      {/* Floating Chat Button */}
      {!isChatbotOpen && (
        <motion.button
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 1 }}
          onClick={() => setIsChatbotOpen(true)}
          className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40 p-3 sm:p-4 bg-linear-to-r from-[#22d3ee] to-[#0ea5e9] hover:from-[#1E90FF] hover:to-[#00FFFF] text-black hover:text-white rounded-full shadow-[0_0_30px_rgba(14,165,233,0.45)] hover:shadow-[0_0_40px_rgba(30,144,255,0.6)] transition-all duration-300"
          title="Chat with PupiBot"
        >
          <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6" />
        </motion.button>
      )}

      {/* Chatbot */}
      <Chatbot 
        isOpen={isChatbotOpen} 
        onToggle={() => setIsChatbotOpen(!isChatbotOpen)} 
      />

      {/* Signup Success Popup */}
      <SignupPopup
        isOpen={showPopup}
        onClose={() => setShowPopup(false)}
        email={signupEmail}
      />
    </div>
  );
};

export default PUPITOHomepage;
