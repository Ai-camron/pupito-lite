'use client'

import { WOOCOMMERCE_SHORTCODES, SUPPORT_EMAIL, STORE_OVERVIEW } from '@/lib/site-info'

interface SeoShortcodeCalloutProps {
  context: string
}

export default function SeoShortcodeCallout({ context }: SeoShortcodeCalloutProps) {
  return (
    <section className="mt-8 rounded-2xl border border-[#FF69B4]/30 bg-[#1A1A1A]/70 p-6 text-sm text-gray-200 shadow-lg">
      <h3 className="mb-2 text-lg font-semibold text-white">Search-ready store details</h3>
      <p className="mb-2 text-gray-300">
        {STORE_OVERVIEW} We operate fully online with print-on-demand fulfillment through Printful, so there is no
        phone line or physical retail location—reach us at {SUPPORT_EMAIL} for everything from product questions to
        newsletter preferences powered by Mailchimp.
      </p>
      <p className="text-gray-300">
        This page mirrors the WordPress WooCommerce shortcode flow for {context}: {WOOCOMMERCE_SHORTCODES.shop} powers
        discovery, {WOOCOMMERCE_SHORTCODES.cart} holds picks, {WOOCOMMERCE_SHORTCODES.checkout} completes payment, and
        {WOOCOMMERCE_SHORTCODES.account} keeps account records SEO-friendly for Google.
      </p>
    </section>
  )
}
