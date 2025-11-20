"use client";

import type { ElementType } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Sparkles,
  Leaf,
  ShieldCheck,
  Truck,
  ShoppingBag,
  Clock,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import OnlineStoreCallout from "@/components/OnlineStoreCallout";

type FeaturedProduct = {
  id: number;
  name: string;
  price: string;
  description: string;
  badge: string;
  image: string;
  alt: string;
};

type CollectionHighlight = {
  id: number;
  name: string;
  tagline: string;
  colors: string;
  description: string;
};

type LookbookSpread = {
  id: number;
  title: string;
  description: string;
  image: string;
  alt: string;
};

type CraftHighlight = {
  id: number;
  label: string;
  value: string;
  detail: string;
};

type ShopFaq = {
  id: number;
  question: string;
  answer: string;
};

type StoreBenefit = {
  id: number;
  icon: ElementType;
  title: string;
  description: string;
};

const FEATURED_PRODUCTS: FeaturedProduct[] = [
  {
    id: 1,
    name: "Neon Kitsune Hoodie",
    price: "$68",
    description: "Glow-in-the-dark glyphs, plush interior, cosmic comfort.",
    badge: "Fan Favorite",
    image: "/images/placeholder-hoodie.svg",
    alt: "Neon Kitsune hoodie with glowing accents",
  },
  {
    id: 2,
    name: "Hero Runner Joggers",
    price: "$58",
    description: "Tapered fit with reflective anime panels for motion arcs.",
    badge: "New Drop",
    image: "/images/placeholder-joggers.svg",
    alt: "Dark joggers with reflective anime inspired panels",
  },
  {
    id: 3,
    name: "Galaxy Arc Tee",
    price: "$36",
    description: "Ultra-soft tee with nebula gradients and Pupito crest.",
    badge: "Limited",
    image: "/images/placeholder-tee.svg",
    alt: "Galaxy themed Pupito tee with neon gradients",
  },
  {
    id: 4,
    name: "Pixel Pup Cap",
    price: "$28",
    description: "Structured cap with embroidered pixel pup badge and glow brim.",
    badge: "Back in Stock",
    image: "/images/placeholder-cap.svg",
    alt: "Pixel pup cap with neon embroidery",
  },
];

const COLLECTIONS: CollectionHighlight[] = [
  {
    id: 1,
    name: "MIDNIGHT CITY",
    tagline: "Neon Noir Staples",
    colors: "from-[#1E90FF] via-[#8A2BE2] to-[#FF00FF]",
    description: "Layer electric blues with ultraviolet shadows for every skyline meet-up.",
  },
  {
    id: 2,
    name: "DREAMER ARC",
    tagline: "Soft Core Anime",
    colors: "from-[#FF69B4] via-[#FFD700] to-[#FF6B6B]",
    description: "Pastel gradients and cinematic embroidery for gentle energy main characters.",
  },
  {
    id: 3,
    name: "LIMITED SUMMONS",
    tagline: "Numbered Drops",
    colors: "from-[#32CD32] via-[#00FFFF] to-[#1E90FF]",
    description: "Seasonal collabs with artists from the Pupito creator network.",
  },
];

const BENEFITS: StoreBenefit[] = [
  {
    id: 1,
    icon: Truck,
    title: "Free US Shipping",
    description: "Complimentary shipping on orders over $50 with planet-friendly packaging.",
  },
  {
    id: 2,
    icon: ShieldCheck,
    title: "Quality Guaranteed",
    description: "Premium fabrics tested for comfort, durability, and color brilliance.",
  },
  {
    id: 3,
    icon: Leaf,
    title: "Earth-Minded",
    description: "Small-batch manufacturing with recycled inks and low-waste partners.",
  },
  {
    id: 4,
    icon: Clock,
    title: "Support 24/7",
    description: "Message the Pupito crew anytime for fit advice or order support.",
  },
];

const LOOKBOOK_SPREADS: LookbookSpread[] = [
  {
    id: 1,
    title: "Night Market Neon",
    description: "Reflective inks and prism gradients glow under subway lights after the late show.",
    image: "/images/placeholder-hoodie.svg",
    alt: "Two friends in neon hoodies under city lights sharing street food",
  },
  {
    id: 2,
    title: "Arcade Rivals",
    description: "Match joggers and caps tuned for high-score marathons and quick dash animations.",
    image: "/images/placeholder-joggers.svg",
    alt: "Pupito joggers styled with gaming arcade cabinets in the background",
  },
  {
    id: 3,
    title: "Studio Glow",
    description: "Breathable tees and crop layers built for creators filming neon-lit edits and reels.",
    image: "/images/placeholder-tee.svg",
    alt: "Creator recording in a studio wearing a neon gradient tee",
  },
  {
    id: 4,
    title: "Sunrise Cooldown",
    description: "Earth-minded fleece and recycled inks for morning cooldowns on rooftops and parks.",
    image: "/images/placeholder-cap.svg",
    alt: "Athlete stretching on a rooftop in a cap and hoodie at sunrise",
  },
];

const CRAFT_HIGHLIGHTS: CraftHighlight[] = [
  {
    id: 1,
    label: "Fulfillment",
    value: "3–7 days",
    detail: "On-demand production with global partners keeps waste low while speeding up delivery windows.",
  },
  {
    id: 2,
    label: "Shipping ETA",
    value: "3–20 days",
    detail: "Regional hubs ship closest to you: 3–4 days in the US, up to 20 days for international routes.",
  },
  {
    id: 3,
    label: "Craft & Care",
    value: "Recycled inks",
    detail: "Vibrant color with lower environmental impact, paired with quality checks on every batch.",
  },
  {
    id: 4,
    label: "Support",
    value: "24/7 crew",
    detail: "Email support@pupito.club with order numbers, sizing help, or exchange questions anytime.",
  },
];

const SHOP_FAQ: ShopFaq[] = [
  {
    id: 1,
    question: "When will I get my order?",
    answer:
      "Most orders are fulfilled in 3–7 days, then ship out. US deliveries land in 3–4 business days; international routes can take 10–20 days depending on customs.",
  },
  {
    id: 2,
    question: "How are Pupito products made?",
    answer:
      "We partner with on-demand production studios worldwide so your gear prints and ships from the facility that can complete it most efficiently.",
  },
  {
    id: 3,
    question: "What if something arrives damaged?",
    answer:
      "Email support@pupito.club within a week with your order number and photos. We replace wrong or damaged items fast.",
  },
  {
    id: 4,
    question: "Do you offer returns or exchanges?",
    answer:
      "Because each piece is made on demand we don’t process returns or exchanges, but we’ll fix any issue with incorrect or damaged items right away.",
  },
  {
    id: 5,
    question: "Can I track my order?",
    answer:
      "Yes—once your package ships, you’ll receive a tracking link via email so you can follow it home.",
  },
];

const MOTION_VARIANTS = {
  fadeUp: {
    initial: { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    transition: { duration: 0.4 },
    viewport: { once: true, amount: 0.25 },
  },
};

const ShopShowcase = () => {
  return (
    <div className="min-h-screen bg-[#0D0D0D] text-white font-[Lato]">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,#1E90FF22,transparent_55%),radial-gradient(circle_at_bottom,#FF69B422,transparent_55%)]" />

      <section
        id="hero"
        aria-labelledby="shop-hero"
        className="relative overflow-hidden border-b border-white/5"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="grid gap-10 lg:grid-cols-[1.1fr,0.9fr] items-center"
          >
            <div className="space-y-6">
              <p className="inline-flex items-center gap-2 rounded-full bg-white/5 px-4 py-2 text-sm font-semibold uppercase tracking-[0.25em] text-[#FF69B4]">
                <Sparkles className="h-4 w-4" aria-hidden="true" />
                New Era Drop
              </p>
              <h1 id="shop-hero" className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight">
                Shop Pupito Midnight Market
              </h1>
              <p className="text-lg sm:text-xl text-gray-200 max-w-xl">
                Streetwear tuned for anime dreamers. Layer neon gradients, magnetic textures, and story-coded silhouettes for every late-night arc.
              </p>
              <div className="flex flex-col gap-3 sm:flex-row">
                <Button asChild className="bg-gradient-to-r from-[#1E90FF] to-[#00FFFF] hover:from-[#FFD700] hover:to-[#FF69B4] hover:text-black text-white font-semibold rounded-xl px-6 py-3 shadow-[0_0_20px_rgba(30,144,255,0.4)]">
                  <Link href="/checkout">Secure Checkout</Link>
                </Button>
                <Button asChild variant="outline" className="border-2 border-[#FF69B4] bg-transparent text-[#FF69B4] hover:bg-gradient-to-r hover:from-[#FF6B6B] hover:to-[#FF1493] hover:text-black hover:border-[#FF1493] rounded-xl px-6 py-3">
                  <Link href="#collections">Browse Collections</Link>
                </Button>
              </div>
              <div className="flex flex-wrap gap-6 text-sm text-gray-300" aria-label="Pupito promises">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4 text-[#00FFFF]" aria-hidden="true" />
                  Ethically made
                </div>
                <div className="flex items-center gap-2">
                  <Leaf className="h-4 w-4 text-[#32CD32]" aria-hidden="true" />
                  Recycled inks
                </div>
                <div className="flex items-center gap-2">
                  <Truck className="h-4 w-4 text-[#FFD700]" aria-hidden="true" />
                  Ships in 48h
                </div>
              </div>
            </div>

            <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur">
              <div className="absolute inset-0 bg-linear-to-br from-[#FF1493]/40 via-transparent to-[#1E90FF]/40" aria-hidden="true" />
              <div className="relative space-y-6">
                <div className="flex items-center gap-3">
                  <div className="grid h-12 w-12 place-items-center rounded-full bg-white/10">
                    <ShoppingBag className="h-6 w-6 text-[#FFD700]" aria-hidden="true" />
                  </div>
                  <div>
                    <p className="text-sm uppercase tracking-[0.35em] text-[#FF69B4]">Drop Radar</p>
                    <p className="text-lg font-semibold text-white">1,200+ community reviews</p>
                  </div>
                </div>
                <Card className="border-white/10 bg-black/30">
                  <CardContent className="flex items-center gap-4 p-4">
                    <Image
                      src="/images/placeholder-tee.svg"
                      width={80}
                      height={80}
                      alt="Galaxy Arc tee illustration"
                      className="rounded-xl border border-white/10"
                    />
                    <div>
                      <p className="text-sm uppercase tracking-wider text-[#00FFFF]">Tonight&apos;s Highlight</p>
                      <p className="text-lg font-semibold">Galaxy Arc Tee</p>
                      <p className="text-sm text-gray-300">Members unlock pre-release colorways + loyalty XP.</p>
                    </div>
                  </CardContent>
                </Card>
                <div className="grid gap-4 sm:grid-cols-2" role="list" aria-label="Membership perks">
                  <div className="rounded-2xl border border-white/10 bg-black/30 p-4" role="listitem">
                    <p className="text-sm font-semibold text-[#FFD700]">Loyalty XP</p>
                    <p className="text-xs text-gray-300">Earn double points on every limited drop purchase.</p>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-black/30 p-4" role="listitem">
                    <p className="text-sm font-semibold text-[#00FFFF]">Creator Collabs</p>
                    <p className="text-xs text-gray-300">Access community-voted artist capsules first.</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section
        id="collections"
        aria-labelledby="collections-heading"
        className="border-b border-white/5 bg-[#0D0D0D]/90"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <motion.div {...MOTION_VARIANTS.fadeUp}>
            <h2 id="collections-heading" className="text-3xl sm:text-4xl font-black text-center">
              Collections Engineered for Every Arc
            </h2>
            <p className="mt-3 text-center text-gray-300 max-w-2xl mx-auto">
              Build your wardrobe with curated capsules designed around energy modes: stealth, spotlight, and serene.
            </p>
          </motion.div>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {COLLECTIONS.map((collection) => (
              <motion.article
                key={collection.id}
                {...MOTION_VARIANTS.fadeUp}
                className={`group relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br ${collection.colors} p-[1px]`}
                aria-labelledby={`collection-${collection.id}`}
              >
                <div className="relative h-full rounded-[calc(theme(borderRadius.3xl)-4px)] bg-black/80 p-6">
                  <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-white/10 via-transparent to-transparent" aria-hidden="true" />
                  <header className="relative space-y-2">
                    <p className="text-xs uppercase tracking-[0.4em] text-[#FF69B4]">
                      {collection.tagline}
                    </p>
                    <h3 id={`collection-${collection.id}`} className="text-2xl font-bold text-white">
                      {collection.name}
                    </h3>
                  </header>
                  <p className="relative mt-4 text-sm text-gray-200">{collection.description}</p>
                  <div className="relative mt-8">
                    <Link
                      href="/products"
                      className="inline-flex items-center text-sm font-semibold text-[#00FFFF] transition hover:text-white"
                    >
                      View drop details
                      <span aria-hidden="true" className="ml-2 transition-transform group-hover:translate-x-1">
                        →
                      </span>
                    </Link>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section
        id="featured"
        aria-labelledby="featured-heading"
        className="border-b border-white/5 bg-black/60"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <motion.div {...MOTION_VARIANTS.fadeUp} className="flex flex-col items-center text-center">
            <h2 id="featured-heading" className="text-3xl sm:text-4xl font-black">
              Featured Fits from the Pupito Crew
            </h2>
            <p className="mt-3 max-w-2xl text-gray-300">
              Each piece is pattern-tested by our community for motion, comfort, and neon-stage visibility.
            </p>
          </motion.div>
          <div className="mt-12 grid gap-8 sm:grid-cols-2 xl:grid-cols-4">
            {FEATURED_PRODUCTS.map((product) => (
              <motion.article
                key={product.id}
                {...MOTION_VARIANTS.fadeUp}
                className="group flex h-full flex-col overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] shadow-[0_0_30px_rgba(255,105,180,0.12)]"
                aria-labelledby={`product-${product.id}`}
              >
                <div className="relative aspect-[4/5] bg-black/60">
                  <Image
                    src={product.image}
                    alt={product.alt}
                    fill
                    sizes="(min-width: 1280px) 250px, (min-width: 640px) 45vw, 90vw"
                    className="object-contain p-6"
                    priority={product.id === 1}
                  />
                  <div className="absolute left-6 top-6 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-[#FFD700]">
                    {product.badge}
                  </div>
                </div>
                <div className="flex flex-1 flex-col gap-4 p-6">
                  <header>
                    <h3 id={`product-${product.id}`} className="text-xl font-semibold text-white">
                      {product.name}
                    </h3>
                    <p className="mt-1 text-sm text-gray-300">{product.description}</p>
                  </header>
                  <div className="mt-auto flex items-center justify-between">
                    <span className="text-lg font-semibold text-[#00FFFF]">{product.price}</span>
                    <Button
                      asChild
                      size="sm"
                      className="rounded-lg bg-linear-to-r from-[#FF69B4] to-[#FF1493] text-white hover:from-[#FFD700] hover:to-[#FF69B4] hover:text-black"
                    >
                      <Link href={`/products/${product.id}`}>View Fit</Link>
                    </Button>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section
        id="lookbook"
        aria-labelledby="lookbook-heading"
        className="border-b border-white/5 bg-[#0B0B0F]"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-8">
          <motion.div {...MOTION_VARIANTS.fadeUp} className="text-center max-w-3xl mx-auto">
            <h2 id="lookbook-heading" className="text-3xl sm:text-4xl font-black">
              Pupito Pack Lookbook
            </h2>
            <p className="mt-3 text-gray-300">
              Scenes from the community—night market meetups, arcade battles, sunrise cool-downs, and neon-lit studios.
            </p>
          </motion.div>
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {LOOKBOOK_SPREADS.map((spread) => (
              <motion.figure
                key={spread.id}
                {...MOTION_VARIANTS.fadeUp}
                className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04]"
              >
                <div className="relative aspect-[4/5]">
                  <Image
                    src={spread.image}
                    alt={spread.alt}
                    fill
                    sizes="(min-width: 1280px) 260px, (min-width: 768px) 45vw, 100vw"
                    className="object-contain p-6"
                  />
                  <div className="absolute inset-0 bg-linear-to-b from-transparent via-black/10 to-black/40" aria-hidden="true" />
                </div>
                <figcaption className="space-y-2 p-6">
                  <p className="text-xs uppercase tracking-[0.35em] text-[#FF69B4]">Community fit #{spread.id}</p>
                  <h3 className="text-lg font-semibold text-white">{spread.title}</h3>
                  <p className="text-sm text-gray-300">{spread.description}</p>
                </figcaption>
              </motion.figure>
            ))}
          </div>
        </div>
      </section>

      <section
        id="craft"
        aria-labelledby="craft-heading"
        className="border-b border-white/5 bg-black/60"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <motion.div {...MOTION_VARIANTS.fadeUp} className="text-center max-w-3xl mx-auto">
            <h2 id="craft-heading" className="text-3xl sm:text-4xl font-black">
              Crafted with Care, Delivered at Pace
            </h2>
            <p className="mt-3 text-gray-300">
              Transparent timelines, recycled inks, and responsive support keep every Pupito drop accountable.
            </p>
          </motion.div>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 xl:grid-cols-4" role="list" aria-label="Craft and sustainability highlights">
            {CRAFT_HIGHLIGHTS.map((highlight) => (
              <motion.article
                key={highlight.id}
                {...MOTION_VARIANTS.fadeUp}
                role="listitem"
                className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] p-6"
              >
                <div className="absolute inset-0 bg-linear-to-br from-[#1E90FF]/15 via-transparent to-[#FF69B4]/15" aria-hidden="true" />
                <div className="relative space-y-3">
                  <p className="text-xs uppercase tracking-[0.35em] text-[#FFD700]">{highlight.label}</p>
                  <h3 className="text-2xl font-bold text-white">{highlight.value}</h3>
                  <p className="text-sm text-gray-300">{highlight.detail}</p>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section
        id="benefits"
        aria-labelledby="benefits-heading"
        className="bg-[#050505]"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <motion.div {...MOTION_VARIANTS.fadeUp} className="text-center">
            <h2 id="benefits-heading" className="text-3xl font-black sm:text-4xl">
              Why the Pack Shops Pupito
            </h2>
            <p className="mt-3 text-gray-300">
              Our promise is style, comfort, and accountability with every stitch.
            </p>
          </motion.div>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 xl:grid-cols-4" role="list" aria-label="Store benefits">
            {BENEFITS.map((benefit) => {
              const Icon = benefit.icon;
              return (
                <motion.div
                  key={benefit.id}
                  {...MOTION_VARIANTS.fadeUp}
                  role="listitem"
                  className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 text-left shadow-[0_0_25px_rgba(0,0,0,0.35)]"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10">
                    <Icon className="h-6 w-6 text-[#FF69B4]" aria-hidden="true" />
                  </div>
                  <h3 className="mt-4 text-lg font-semibold text-white">{benefit.title}</h3>
                  <p className="mt-2 text-sm text-gray-300">{benefit.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <section
        id="faq"
        aria-labelledby="faq-heading"
        className="border-t border-b border-white/10 bg-[#0D0D12]"
      >
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-8">
          <motion.div {...MOTION_VARIANTS.fadeUp} className="text-center">
            <h2 id="faq-heading" className="text-3xl sm:text-4xl font-black">Pupito Shop FAQ</h2>
            <p className="mt-3 text-gray-300">Shipping windows, craft details, and support policies inspired by our Printful partners.</p>
          </motion.div>
          <div className="space-y-4" role="list" aria-label="Shop frequently asked questions">
            {SHOP_FAQ.map((faq) => (
              <motion.details
                key={faq.id}
                {...MOTION_VARIANTS.fadeUp}
                className="group rounded-2xl border border-white/10 bg-white/[0.03] p-4"
              >
                <summary className="cursor-pointer text-left text-lg font-semibold text-white">
                  {faq.question}
                </summary>
                <p className="mt-3 text-sm text-gray-300 leading-relaxed">{faq.answer}</p>
              </motion.details>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-white/10 bg-[#0D0D0D]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <OnlineStoreCallout />
        </div>
      </section>

      <section id="join" aria-labelledby="cta-heading" className="border-t border-white/10 bg-linear-to-r from-[#1E1B4B] via-[#0D0D0D] to-[#1E90FF]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <motion.div
            {...MOTION_VARIANTS.fadeUp}
            className="flex flex-col gap-8 overflow-hidden rounded-3xl border border-white/10 bg-black/50 p-8 text-center sm:p-12"
          >
            <h2 id="cta-heading" className="text-3xl sm:text-4xl font-black">
              Ready for Your Next Transformation?
            </h2>
            <p className="text-lg text-gray-200">
              Join the Pupito pack to unlock exclusive previews, restock alerts, and early access capsules tailored to your vibe.
            </p>
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button
                asChild
                className="rounded-xl bg-gradient-to-r from-[#FF69B4] via-[#FF1493] to-[#8A2BE2] px-8 py-3 text-base font-semibold text-white shadow-[0_0_25px_rgba(255,105,180,0.35)] hover:from-[#FFD700] hover:via-[#FF69B4] hover:to-[#1E90FF] hover:text-black"
              >
                <Link href="/login">Join the Pack</Link>
              </Button>
              <Button
                asChild
                variant="ghost"
                className="px-8 py-3 text-base font-semibold text-[#00FFFF] hover:text-white"
              >
                <Link href="/help/contact">Talk to a stylist</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default ShopShowcase;
