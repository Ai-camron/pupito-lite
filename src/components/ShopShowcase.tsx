"use client";

import Image from "next/image";
import Link from "next/link";
import { Sparkles, ShieldCheck, Truck, HeartHandshake } from "lucide-react";
import { Button } from "@/components/ui/button";

export const SHOP_SECTIONS = [
  { id: "hero", label: "Hero" },
  { id: "collections", label: "Collections" },
  { id: "experience", label: "Experience" },
  { id: "faq", label: "FAQ" },
  { id: "join", label: "Join" },
];

export const SHOP_FAQ = [
  {
    question: "How fast is shipping?",
    answer:
      "Standard U.S. shipping arrives in 3-7 business days and international orders in 7-14. All packages include tracking so you can follow every step.",
  },
  {
    question: "What is your return policy?",
    answer:
      "We accept returns for defects or errors within 30 days. Reach out with photos and your order number so we can make it right fast.",
  },
  {
    question: "How does sizing run?",
    answer:
      "Our cuts are streetwear-relaxed and true to size. Check the size guide for exact measurements and size up for an oversized vibe.",
  },
  {
    question: "Do you have a loyalty program?",
    answer:
      "Join the Pup Squad to earn points on every purchase, unlock early drops, and redeem rewards on future fits.",
  },
];

const GlowPanel = ({ children }: { children: React.ReactNode }) => (
  <div className="rounded-3xl border border-[#FF69B4]/25 bg-linear-to-br from-[#121212] via-[#0D0D0D] to-[#1E90FF]/10 shadow-[0_0_30px_rgba(255,105,180,0.25)]">
    {children}
  </div>
);

const ShopShowcase = () => {
  return (
    <div className="min-h-screen bg-[#0D0D0D] text-white font-[Lato]">
      <header className="sticky top-0 z-30 backdrop-blur bg-[#0D0D0D]/70 border-b border-[#FF69B4]/20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <span className="text-lg font-black bg-linear-to-r from-[#FF69B4] via-[#FFD700] to-[#00FFFF] bg-clip-text text-transparent">
            PUPITO SHOP
          </span>
          <nav className="hidden sm:flex items-center gap-4 text-sm text-gray-300">
            {SHOP_SECTIONS.map((section) => (
              <Link key={section.id} href={`#${section.id}`} className="hover:text-[#FF69B4] transition-colors">
                {section.label}
              </Link>
            ))}
          </nav>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 sm:space-y-16 py-10 sm:py-14">
        <section
          id="hero"
          className="relative overflow-hidden rounded-3xl border border-[#FF69B4]/25 bg-linear-to-br from-[#1E90FF]/10 via-[#0D0D0D] to-[#FF69B4]/10 px-6 py-12 sm:px-10 sm:py-14"
        >
          <div className="absolute inset-0"> 
            <div className="absolute inset-0 bg-linear-to-br from-[#FF69B4]/10 via-transparent to-[#00FFFF]/15" />
            <Image
              src="/images/placeholder-hero.svg"
              alt="Anime streetwear models"
              fill
              className="object-cover opacity-20"
              priority
            />
          </div>
          <div className="relative z-10 grid gap-8 lg:grid-cols-2 lg:items-center">
            <div className="space-y-4">
              <p className="inline-flex items-center gap-2 text-xs font-semibold px-3 py-1 rounded-full bg-[#FF69B4]/10 text-[#FFD700] border border-[#FF69B4]/30">
                NEW DROP LIVE
              </p>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black leading-tight">
                Neon Noir streetwear crafted for every anime arc.
              </h1>
              <p className="text-base sm:text-lg text-gray-200 max-w-2xl">
                Layered textures, bold gradients, and breathable fabrics built to move with you in and out of the city.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link href="/products">
                  <Button className="bg-linear-to-r from-[#FF69B4] to-[#FF1493] hover:from-[#FFD700] hover:to-[#FF69B4] text-black hover:text-white font-semibold px-6 py-3 rounded-xl">
                    Shop the collection
                  </Button>
                </Link>
                <Link href="#collections" className="text-sm text-[#1E90FF] underline-offset-4 hover:underline">
                  Explore looks
                </Link>
              </div>
            </div>
            <GlowPanel>
              <div className="p-5 grid grid-cols-2 gap-4">
                {["Hoodies", "Tees", "Joggers", "Accessories"].map((item) => (
                  <div
                    key={item}
                    className="rounded-2xl bg-linear-to-br from-[#1A1A1A] to-[#131313] border border-[#FF69B4]/20 px-4 py-5 text-center"
                  >
                    <p className="text-xs uppercase tracking-wide text-gray-400">Category</p>
                    <p className="mt-1 text-lg font-semibold text-white">{item}</p>
                  </div>
                ))}
              </div>
            </GlowPanel>
          </div>
        </section>

        <section id="collections" className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl sm:text-3xl font-black">Featured collections</h2>
            <Link href="/products" className="text-sm text-[#1E90FF] underline-offset-4 hover:underline">
              View all
            </Link>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {["Arc Lightning", "Midnight Kitsune", "Skyline Sprint"].map((collection) => (
              <GlowPanel key={collection}>
                <div className="p-5 space-y-4">
                  <div className="relative h-36 rounded-2xl overflow-hidden bg-linear-to-br from-[#1E90FF]/20 via-[#FF69B4]/15 to-[#FFD700]/20">
                    <Image
                      src="/images/placeholder-hoodie.svg"
                      alt={`${collection} preview`}
                      fill
                      className="object-contain p-8"
                    />
                  </div>
                  <div className="space-y-1">
                    <p className="text-lg font-semibold">{collection}</p>
                    <p className="text-sm text-gray-300">Limited colorways, reflective finishes, and breathable mesh panels.</p>
                  </div>
                </div>
              </GlowPanel>
            ))}
          </div>
        </section>

        <section id="experience" className="space-y-6">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-[#FFD700]" />
            <h2 className="text-2xl sm:text-3xl font-black">Built for your everyday arc</h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[ 
              { icon: ShieldCheck, title: "Premium Craft", text: "Double-stitched seams, cloud-soft linings, and fade-resistant inks." },
              { icon: Truck, title: "Fast Delivery", text: "Tracked shipping, rush options, and careful packing on every order." },
              { icon: HeartHandshake, title: "Community", text: "Member perks, surprise drops, and early access for loyal pups." },
              { icon: Sparkles, title: "Styled Layers", text: "Mix-and-match pieces to move from day missions to neon nights." },
            ].map(({ icon: Icon, title, text }) => (
              <GlowPanel key={title}>
                <div className="p-5 space-y-2">
                  <Icon className="w-6 h-6 text-[#FF69B4]" />
                  <p className="text-lg font-semibold">{title}</p>
                  <p className="text-sm text-gray-300 leading-relaxed">{text}</p>
                </div>
              </GlowPanel>
            ))}
          </div>
        </section>

        <section id="faq" aria-labelledby="faq-heading" className="space-y-4">
          <div className="flex items-center gap-2">
            <h2 id="faq-heading" className="text-2xl sm:text-3xl font-black">
              FAQs
            </h2>
            <span className="text-xs px-2 py-1 rounded-full bg-[#FF69B4]/10 text-[#FFD700] border border-[#FF69B4]/20">
              Shipping · Returns · Sizing · Loyalty
            </span>
          </div>
          <div className="rounded-3xl border border-[#FF69B4]/20 bg-linear-to-br from-[#1A1A1A] via-[#0D0D0D] to-[#1E90FF]/5 divide-y divide-[#FF69B4]/15">
            {SHOP_FAQ.map((item) => (
              <details key={item.question} className="group">
                <summary className="flex w-full cursor-pointer list-none items-center justify-between px-5 py-4 text-left text-base font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FF69B4]">
                  <span className="group-open:text-[#FF69B4] transition-colors">{item.question}</span>
                  <span aria-hidden className="text-[#FF69B4] group-open:rotate-45 transition-transform">+</span>
                </summary>
                <div className="px-5 pb-5 text-sm text-gray-200 leading-relaxed">
                  {item.answer}
                </div>
              </details>
            ))}
          </div>
        </section>

        <section
          id="join"
          className="rounded-3xl border border-[#FF69B4]/30 bg-linear-to-r from-[#1E90FF]/15 via-[#0D0D0D] to-[#FF69B4]/15 px-6 py-10 sm:px-10 sm:py-12"
        >
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div className="space-y-3">
              <p className="text-sm uppercase tracking-[0.2em] text-[#FF69B4]">Join the pack</p>
              <h2 className="text-2xl sm:text-3xl font-black">Unlock early drops and loyalty rewards</h2>
              <p className="text-base text-gray-200 max-w-2xl">
                Sign up for the Pup Squad to collect points, grab limited codes, and get notified before the next neon run hits the shop.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 min-w-[280px]">
              <Link href="/login">
                <Button className="w-full sm:w-auto bg-linear-to-r from-[#FF69B4] to-[#FF1493] hover:from-[#FFD700] hover:to-[#FF69B4] text-black hover:text-white font-semibold px-6 py-3 rounded-xl">
                  Sign in
                </Button>
              </Link>
              <Link href="/account">
                <Button variant="outline" className="w-full sm:w-auto border-[#FF69B4] text-[#FF69B4] hover:bg-[#FF69B4]/10">
                  Create account
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default ShopShowcase;
