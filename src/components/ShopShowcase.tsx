"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

const FEATURED_PRODUCTS = [
  {
    id: 1,
    name: "Celestial Rider Hoodie",
    price: "$82",
    badge: "New Drop",
    image: "/images/placeholder-hoodie.svg",
    alt: "Celestial Rider hoodie floating on neon backdrop",
  },
  {
    id: 2,
    name: "Streetlight Echo Tee",
    price: "$38",
    badge: "Limited",
    image: "/images/placeholder-tee.svg",
    alt: "Streetlight Echo tee with anime illustration",
  },
  {
    id: 3,
    name: "Arc Runner Joggers",
    price: "$64",
    badge: "Fan Favorite",
    image: "/images/placeholder-joggers.svg",
    alt: "Arc Runner joggers styled with neon grid",
  },
  {
    id: 4,
    name: "Signal Flare Cap",
    price: "$32",
    badge: "Restocked",
    image: "/images/placeholder-cap.svg",
    alt: "Signal Flare cap with embroidered icon",
  },
];

export const LOOKBOOK_SPREADS = [
  {
    id: "neon-rooftop",
    title: "Neon Rooftop Run",
    description: "Glowing trims and reflective inks built for midnight adventures above the skyline.",
    image: "/images/placeholder-hero.svg",
    alt: "Two friends in neon streetwear on a rooftop at night",
  },
  {
    id: "arcade-alley",
    title: "Arcade Alley Break",
    description: "Soft vintage washes meet electric palettes between coin-op battles and boba runs.",
    image: "/images/placeholder-tee.svg",
    alt: "Model wearing anime tee beside retro arcade cabinets",
  },
  {
    id: "rain-signal",
    title: "Rain-Signal Sprint",
    description: "Layered shells and heat-reactive inks glow through misty city streets.",
    image: "/images/placeholder-hoodie.svg",
    alt: "Hooded jacket glowing under rain-soaked city lights",
  },
];

const BENEFITS = [
  {
    title: "Artisan Prints",
    copy: "Studio-drawn anime panels with puff, metallic, and glow inks that survive every wash.",
  },
  {
    title: "Comfort Engineered",
    copy: "Tailored fits, brushed fleece, and breathable cotton so your main character energy lasts all day.",
  },
  {
    title: "Conscious Production",
    copy: "Small-batch runs, recycled mailers, and carbon-neutral shipping for planet-positive drops.",
  },
];

const gradientShell = "relative p-[1px] rounded-3xl bg-linear-to-r from-[#FF69B4] via-[#1E90FF] to-[#FFD700] shadow-[0_0_30px_rgba(255,105,180,0.3)]";

const ShopShowcase = () => {
  return (
    <div className="bg-[#0D0D0D] text-white">
      <section className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
        <div className={`${gradientShell}`}>
          <div className="rounded-[1.45rem] bg-linear-to-br from-[#101010] via-[#0D0D0D] to-[#151515] px-6 py-8 sm:px-10 sm:py-12 flex flex-col gap-6 overflow-hidden">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <div className="space-y-3">
                <p className="text-sm font-semibold text-[#00FFFF] uppercase tracking-[0.2em]">PUPITO LOOKBOOK</p>
                <h1 className="text-3xl sm:text-4xl font-black leading-tight">Anime streetwear that moves like you.</h1>
                <p className="text-gray-200 max-w-2xl text-base sm:text-lg">
                  Discover limited drops, hero fits, and neon-drenched layers built for every side quest.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link
                  href="#lookbook"
                  className="inline-flex items-center justify-center rounded-xl px-5 py-3 text-sm font-semibold bg-linear-to-r from-[#FF69B4] to-[#FF1493] hover:from-[#FFD700] hover:to-[#FF69B4] text-black transition-all duration-300 shadow-[0_0_20px_rgba(255,105,180,0.35)]"
                >
                  View the lookbook
                </Link>
                <Link
                  href="#shop"
                  className="inline-flex items-center justify-center rounded-xl px-5 py-3 text-sm font-semibold border border-[#1E90FF]/60 text-[#1E90FF] hover:bg-[#1E90FF] hover:text-black transition-all duration-300"
                >
                  Shop featured
                </Link>
              </div>
            </div>
          </div>
        </div>

        <section id="shop" aria-labelledby="featured-heading" className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <h2 id="featured-heading" className="text-2xl font-black">
              Featured drops
            </h2>
            <Link href="#lookbook" className="text-sm text-[#1E90FF] underline-offset-2 hover:underline">
              Jump to lookbook
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {FEATURED_PRODUCTS.map((product, idx) => (
              <motion.article
                key={product.id}
                whileHover={{ y: -6, scale: 1.01 }}
                className={`${gradientShell}`}
              >
                <div className="rounded-[1.35rem] h-full bg-linear-to-b from-[#131313] via-[#0F0F0F] to-[#111827] p-4 flex flex-col gap-4">
                  <div className="flex items-center justify-between text-xs uppercase tracking-[0.2em] text-[#FFD700]">
                    <span className="px-2 py-1 rounded-full bg-[#FF69B4]/15 text-[#FF69B4] font-bold">{product.badge}</span>
                    <span className="text-gray-400">0{idx + 1}</span>
                  </div>
                  <div className="relative h-32 rounded-2xl bg-[#1A1A1A] overflow-hidden">
                    <Image src={product.image} alt={product.alt} fill className="object-contain" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-lg font-semibold">{product.name}</h3>
                    <p className="text-sm text-gray-300">{product.price}</p>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </section>

        <section id="lookbook" aria-labelledby="lookbook-heading" className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div>
              <p className="text-sm font-semibold text-[#FF69B4] uppercase tracking-[0.18em]">Lookbook</p>
              <h2 id="lookbook-heading" className="text-2xl sm:text-3xl font-black">
                Scenes from the Pupito universe
              </h2>
              <p className="text-gray-300 max-w-2xl">
                Explore lifestyle spreads styled around neon city nights, arcade breaks, and storm-ready runs.
              </p>
            </div>
            <Link
              href="#shop-benefits"
              className="inline-flex h-11 items-center justify-center px-4 rounded-xl text-sm font-semibold border border-[#FF69B4]/60 text-[#FF69B4] hover:bg-[#FF69B4] hover:text-black transition-colors duration-300"
            >
              Why shoppers love us
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {LOOKBOOK_SPREADS.map((scene) => (
              <motion.figure
                key={scene.id}
                whileHover={{ y: -4 }}
                className={`${gradientShell}`}
              >
                <div className="rounded-[1.35rem] h-full bg-linear-to-br from-[#101010] via-[#0B0B0B] to-[#131826] overflow-hidden flex flex-col">
                  <div className="relative w-full aspect-[4/5]">
                    <Image src={scene.image} alt={scene.alt} fill className="object-cover" />
                  </div>
                  <div className="p-4 space-y-2">
                    <div className="flex items-center justify-between text-xs text-gray-400 uppercase tracking-[0.24em]">
                      <span>{scene.id.replace("-", " ")}</span>
                      <span className="h-px flex-1 mx-3 bg-gradient-to-r from-transparent via-[#FF69B4]/50 to-transparent" />
                      <span>Look</span>
                    </div>
                    <figcaption className="space-y-1">
                      <p className="text-lg font-semibold text-white">{scene.title}</p>
                      <p className="text-sm text-gray-300">{scene.description}</p>
                    </figcaption>
                  </div>
                </div>
              </motion.figure>
            ))}
          </div>
        </section>

        <section id="shop-benefits" aria-labelledby="benefits-heading" className="space-y-4">
          <div className="flex flex-col gap-1">
            <p className="text-sm font-semibold text-[#00FFFF] uppercase tracking-[0.2em]">Why Pupito</p>
            <h2 id="benefits-heading" className="text-2xl font-black">
              Built for the main character
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {BENEFITS.map((benefit, index) => (
              <div key={benefit.title} className={`${gradientShell}`}>
                <div className="rounded-[1.35rem] h-full bg-linear-to-br from-[#101010] via-[#0D0D0D] to-[#0F1224] p-5 space-y-3">
                  <div className="text-sm uppercase tracking-[0.2em] text-gray-400">0{index + 1}</div>
                  <h3 className="text-lg font-semibold text-white">{benefit.title}</h3>
                  <p className="text-sm text-gray-300 leading-relaxed">{benefit.copy}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </section>
    </div>
  );
};

export default ShopShowcase;
