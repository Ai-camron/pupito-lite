"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronDown, ChevronUp, ArrowLeft, MessageCircle, Mail, Clock } from "lucide-react";
import { SUPPORT_EMAIL } from "@/lib/site-info";
import SeoShortcodeCallout from "@/components/SeoShortcodeCallout";

const FAQ_DATA = [
  {
    category: "Orders & Shipping",
    questions: [
      {
        q: "How long does shipping take?",
        a: "We offer free shipping on orders over $50. Standard shipping takes 3-7 business days within the US. Express shipping (1-3 days) is available for $15."
      },
      {
        q: "Do you ship internationally?",
        a: "Yes! We ship worldwide. International shipping takes 7-14 business days and starts at $20. Customs fees may apply depending on your country."
      },
      {
        q: "Can I track my order?",
        a: "Absolutely! Once your order ships, you'll receive a tracking number via email. You can also check your order status in your account dashboard."
      },
      {
        q: "What if my package is lost or damaged?",
        a: "We've got you covered! Contact us within 48 hours of delivery with photos of any damage. Lost packages are covered by our shipping insurance."
      }
    ]
  },
  {
    category: "Products & Sizing",
    questions: [
      {
        q: "How do PUPITO sizes run?",
        a: "Our sizes run true to fit with a slightly relaxed streetwear cut. Check our size guide for exact measurements. When in doubt, size up for that perfect oversized anime vibe!"
      },
      {
        q: "What materials do you use?",
        a: "We use premium cotton blends (80% cotton, 20% polyester) for comfort and durability. Our hoodies feature a soft fleece lining, and all prints are high-quality DTG (direct-to-garment)."
      },
      {
        q: "Are your designs original?",
        a: "Every PUPITO design is 100% original, created by our in-house artists inspired by anime culture and streetwear aesthetics. No bootlegs, just pure creative energy!"
      },
      {
        q: "Do colors fade after washing?",
        a: "Our DTG prints are designed to last! Follow our care instructions (wash inside-out in cold water) and your designs will stay vibrant for years."
      }
    ]
  },
  {
    category: "Returns & Exchanges",
    questions: [
      {
        q: "Can I return items if I don't like them?",
        a: "All PUPITO items are made-to-order just for you, so we don't accept returns for size, style, or color preferences. We only accept returns for print defects, product damage, or if we made an error. Please check our size guide carefully before ordering!"
      },
      {
        q: "What if there's something wrong with my order?",
        a: "We'll absolutely make it right! If there's a print quality issue, product defect, or we sent the wrong item, contact us within 30 days with photos. We'll provide a replacement or full refund and cover all return costs."
      },
      {
        q: "Do you offer exchanges for different sizes?",
        a: "Since all items are made-to-order, we don't offer direct exchanges. However, if there's a quality issue with your item, we'll gladly send a replacement in the correct size. For sizing questions, check our detailed size guide or contact us before ordering."
      },
      {
        q: "How do I report a problem with my order?",
        a: `Email us at ${SUPPORT_EMAIL} within 30 days of delivery with clear photos of any print or product issues. Include your order number and we'll respond within 24 hours with a solution - either a replacement or full refund for our Printful-fulfilled orders.`
      }
    ]
  },
  {
    category: "Account & Technical",
    questions: [
      {
        q: "I forgot my password, help!",
        a: "No worries! Click 'Forgot Password' on the login page and we'll send you a reset link. Check your spam folder if you don't see it within 5 minutes."
      },
      {
        q: "Can I change my shipping address after ordering?",
        a: "If your order hasn't shipped yet, we can update it! Contact us ASAP. Once it's shipped, we can't change the address but can help with delivery issues."
      },
      {
        q: "Do you offer student discounts?",
        a: "Yes! Students get 15% off with valid .edu email verification. Sign up for our newsletter to get the student discount code sent to your inbox."
      },
      {
        q: "How do I join the Pup Squad rewards?",
        a: "Just create an account and you're automatically in! Earn points with every purchase: 1 point = $1 spent. 100 points = $10 off your next order."
      }
    ]
  }
];

const FAQItem = ({ question, answer, isOpen, onToggle }: {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    className="border border-[#FF69B4]/20 rounded-2xl bg-linear-to-br from-[#1A1A1A]/80 to-[#2A2A2A]/60 backdrop-blur overflow-hidden"
  >
    <button
      onClick={onToggle}
      className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-[#FF69B4]/5 transition-all duration-300 group"
    >
      <span className="text-base font-semibold text-white group-hover:text-[#FF69B4] transition-colors">
        {question}
      </span>
      <div className="text-[#FF69B4] group-hover:text-[#FFD700] transition-colors">
        {isOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
      </div>
    </button>
    
    <motion.div
      initial={false}
      animate={{ height: isOpen ? "auto" : 0 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="overflow-hidden"
    >
      <div className="px-6 pb-4 border-t border-[#FF69B4]/10">
        <p className="text-gray-300 leading-relaxed pt-4">
          {answer}
        </p>
      </div>
    </motion.div>
  </motion.div>
);

const CategorySection = ({ category, questions }: {
  category: string;
  questions: Array<{ q: string; a: string }>;
}) => {
  const [openItems, setOpenItems] = useState<Set<number>>(new Set());

  const toggleItem = (index: number) => {
    const newOpenItems = new Set(openItems);
    if (newOpenItems.has(index)) {
      newOpenItems.delete(index);
    } else {
      newOpenItems.add(index);
    }
    setOpenItems(newOpenItems);
  };

  return (
    <div className="mb-12">
      <h3 className="text-2xl font-black mb-6 bg-linear-to-r from-[#FF69B4] via-[#FFD700] to-[#00FFFF] bg-clip-text text-transparent">
        {category}
      </h3>
      <div className="space-y-4">
        {questions.map((item, index) => (
          <FAQItem
            key={index}
            question={item.q}
            answer={item.a}
            isOpen={openItems.has(index)}
            onToggle={() => toggleItem(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default function FAQPage() {
  return (
    <div className="min-h-screen bg-[#0D0D0D] text-white font-[Lato]">
      {/* Header */}
      <div className="bg-linear-to-r from-[#1A1A1A] via-[#0D0D0D] to-[#1A1A1A] border-b border-[#FF69B4]/20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Link 
            href="/"
            className="inline-flex items-center gap-2 text-[#FF69B4] hover:text-[#FFD700] transition-colors mb-6 group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </Link>
          
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl font-black mb-4 bg-linear-to-r from-[#FF69B4] via-[#FFD700] to-[#00FFFF] bg-clip-text text-transparent">
              FAQ
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              Got questions? We&apos;ve got answers! Everything you need to know about PUPITO.
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Quick Contact */}
        <div className="bg-linear-to-r from-[#FF69B4]/10 via-[#8A2BE2]/10 to-[#00FFFF]/10 border border-[#FF69B4]/20 rounded-3xl p-8 mb-12">
          <h2 className="text-2xl font-bold text-center mb-6 text-[#FFD700]">
            Still Need Help? 🤝
          </h2>
          <div className="grid md:grid-cols-3 gap-6 text-center">
            <div className="space-y-2">
              <MessageCircle className="w-8 h-8 text-[#FF69B4] mx-auto" />
              <h3 className="font-semibold text-[#FF69B4]">Live Chat</h3>
              <p className="text-sm text-gray-400">Mon-Fri 9AM-6PM PST</p>
            </div>
            <div className="space-y-2">
              <Mail className="w-8 h-8 text-[#00FFFF] mx-auto" />
              <h3 className="font-semibold text-[#00FFFF]">Email Support</h3>
              <p className="text-sm text-gray-400">{SUPPORT_EMAIL}</p>
            </div>
            <div className="space-y-2">
              <Clock className="w-8 h-8 text-[#FFD700] mx-auto" />
              <h3 className="font-semibold text-[#FFD700]">Response Time</h3>
              <p className="text-sm text-gray-400">Usually within 4 hours</p>
            </div>
          </div>
        </div>

        {/* FAQ Categories */}
        {FAQ_DATA.map((category, index) => (
          <CategorySection
            key={index}
            category={category.category}
            questions={category.questions}
          />
        ))}

        {/* Bottom CTA */}
        <div className="text-center mt-16 p-8 bg-linear-to-r from-[#1A1A1A]/60 to-[#2A2A2A]/40 border border-[#FF69B4]/20 rounded-3xl">
          <h3 className="text-2xl font-bold mb-4 text-[#FF69B4]">
            Didn&apos;t Find What You&apos;re Looking For?
          </h3>
          <p className="text-gray-300 mb-6">
            Our Pup Squad support team is here to help with any questions about your anime streetwear journey!
          </p>
          <Link
            href="/help/contact"
            className="inline-block bg-linear-to-r from-[#FF69B4] to-[#FF1493] hover:from-[#1E90FF] hover:to-[#00FFFF] text-black hover:text-white font-semibold px-8 py-3 rounded-xl transition-all duration-300 shadow-[0_0_20px_rgba(255,105,180,0.4)] hover:shadow-[0_0_25px_rgba(30,144,255,0.5)]"
          >
            Contact Support
          </Link>
        </div>
        <SeoShortcodeCallout context="self-serve FAQs for our WooCommerce-style experience" />
      </div>
    </div>
  );
}