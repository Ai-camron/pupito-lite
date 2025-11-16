import Link from 'next/link'
import { Instagram, Youtube, Twitter, MessageCircle } from 'lucide-react'
import { STORE_OVERVIEW, SUPPORT_EMAIL } from '@/lib/site-info'

const footerLinks = {
  about: [
    {
      label: 'PUPITO fuses anime arcs with night-core streetwear — designed for fans who thrive after dark.'
    }
  ],
  help: [
    { label: 'FAQ', href: '/help/faq' },
    { label: 'Shipping & Returns', href: '/help/shipping' },
    { label: 'Size Guide', href: '/help/size-guide' },
    { label: 'Contact', href: '/help/contact' }
  ],
  shop: [
    { label: 'All Products', href: '/shop' },
    { label: 'New Arrivals', href: '/shop#featured' },
    { label: 'Limited Drops', href: '/shop#collections' },
    { label: 'Gift Cards', href: '/shop' }
  ]
}

const socialIcons = [
  { icon: Instagram, label: 'Instagram' },
  { icon: Youtube, label: 'Youtube' },
  { icon: Twitter, label: 'Twitter' },
  { icon: MessageCircle, label: 'Chat' }
]

export default function SiteFooter() {
  return (
    <footer className="bg-linear-to-t from-[#000000] via-[#0D0D0D] to-[#1A1A1A] text-white pt-8 pb-4 border-t border-[#FF69B4]/20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-sm">
        <div>
          <h4 className="font-semibold mb-2 bg-linear-to-r from-[#FF69B4] to-[#FF1493] bg-clip-text text-transparent">
            About
          </h4>
          <p className="text-white/70 leading-relaxed">
            {footerLinks.about[0].label}
          </p>
        </div>
        <div>
          <h4 className="font-semibold mb-2 bg-linear-to-r from-[#1E90FF] to-[#00FFFF] bg-clip-text text-transparent">
            Help
          </h4>
          <ul className="space-y-1 text-white/70">
            {footerLinks.help.map((item) => (
              <li key={item.label}>
                <Link href={item.href ?? '#'} className="hover:text-[#FF69B4] transition-colors cursor-pointer">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-2 bg-linear-to-r from-[#FFD700] to-[#FF6B6B] bg-clip-text text-transparent">
            Shop
          </h4>
          <ul className="space-y-1 text-white/70">
            {footerLinks.shop.map((item) => (
              <li key={item.label}>
                <Link href={item.href ?? '#'} className="hover:text-[#FF69B4] transition-colors cursor-pointer">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-2 bg-linear-to-r from-[#8A2BE2] to-[#FF00FF] bg-clip-text text-transparent">
            Socials
          </h4>
          <div className="flex items-center gap-3 mb-2">
            {socialIcons.map(({ icon: Icon, label }) => (
              <Icon key={label} className="w-4 h-4 hover:text-[#FF69B4] transition-colors cursor-pointer" />
            ))}
          </div>
          <div className="text-white/70 text-sm space-y-1">
            <p className="font-semibold text-white">Email</p>
            <p>{SUPPORT_EMAIL}</p>
            <p className="text-white/70">
              Online-only store fulfilled by Printful with updates sent through Mailchimp. No phone support or physical retail
              location.
            </p>
            <p className="text-white/60 text-xs">{STORE_OVERVIEW}</p>
          </div>
        </div>
      </div>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs text-white/50">
        <div>© {new Date().getFullYear()} PUPITO. All rights reserved.</div>
        <div className="flex gap-3">
          <span>Privacy</span>
          <span>Terms</span>
          <span>Accessibility</span>
        </div>
      </div>
    </footer>
  )
}

