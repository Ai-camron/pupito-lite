'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import {
  ClipboardList,
  PackageCheck,
  ShoppingBag,
  Boxes,
  ExternalLink,
  ShieldCheck,
  Upload,
  ImagePlus
} from 'lucide-react'
import { useAuth } from '@/lib/auth-context'

const stats = [
  {
    title: 'Today’s Revenue',
    value: '$2,840.15',
    change: '+12.4% vs last week',
    icon: ShoppingBag
  },
  {
    title: 'Orders in Flight',
    value: '46',
    change: '9 awaiting Printful sync',
    icon: ClipboardList
  },
  {
    title: 'Active Products',
    value: '128',
    change: '5 new designs queued',
    icon: Boxes
  },
  {
    title: 'Fulfillment Health',
    value: '98.2%',
    change: 'Printful SLA met this week',
    icon: PackageCheck
  }
]

const printfulLinks = [
  {
    title: 'Printful Dashboard',
    description: 'Review fulfillment status, billing, and store settings.',
    href: 'https://www.printful.com/dashboard'
  },
  {
    title: 'Product Templates',
    description: 'Create new templates and mockups for upcoming drops.',
    href: 'https://www.printful.com/dashboard/templates'
  },
  {
    title: 'Orders & Shipping',
    description: 'Track and sync orders going out to customers.',
    href: 'https://www.printful.com/dashboard/orders'
  }
]

type ProductDraft = {
  name: string
  sku: string
  category: string
  price: string
  description: string
  printfulTemplate: string
}

type ImageDraft = {
  fileName: string
  altText: string
  tags: string
}

const defaultProductDraft: ProductDraft = {
  name: '',
  sku: '',
  category: '',
  price: '',
  description: '',
  printfulTemplate: ''
}

const defaultImageDraft: ImageDraft = {
  fileName: '',
  altText: '',
  tags: ''
}

export default function OwnerDashboardPage() {
  const { user, isOwner } = useAuth()
  const router = useRouter()
  const [productDraft, setProductDraft] = useState<ProductDraft>(defaultProductDraft)
  const [imageDraft, setImageDraft] = useState<ImageDraft>(defaultImageDraft)
  const [draftProducts, setDraftProducts] = useState<ProductDraft[]>([])
  const [draftImages, setDraftImages] = useState<ImageDraft[]>([])

  useEffect(() => {
    if (!user) {
      router.push('/login?redirect=/owner-dashboard')
      return
    }

    if (!isOwner) {
      router.push('/account')
    }
  }, [user, isOwner, router])

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0D0D0D] via-[#0a1a24] to-[#0D0D0D] flex items-center justify-center px-4">
        <div className="max-w-md w-full rounded-2xl border border-[#22d3ee]/20 bg-[#0f172a]/80 p-8 text-center shadow-[0_0_40px_rgba(34,211,238,0.25)]">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-[#22d3ee] to-[#0ea5e9] shadow-[0_0_25px_rgba(34,211,238,0.3)]">
            <ShieldCheck className="h-6 w-6 text-[#0b1224]" aria-hidden="true" />
          </div>
          <h1 className="text-xl font-bold text-white">Confirming owner access…</h1>
          <p className="mt-2 text-sm text-white/70">Redirecting to sign in so the owner dashboard stays private.</p>
        </div>
      </div>
    )
  }

  if (!isOwner) {
    return (
      <div className="min-h-screen bg-linear-to-br from-[#0D0D0D] via-[#0a1a24] to-[#0D0D0D] flex items-center justify-center px-4">
        <div className="max-w-md w-full rounded-2xl border border-[#22d3ee]/20 bg-[#0f172a]/80 p-8 text-center shadow-[0_0_40px_rgba(34,211,238,0.25)]">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-linear-to-br from-[#22d3ee] to-[#0ea5e9] shadow-[0_0_25px_rgba(34,211,238,0.3)]">
            <ShieldCheck className="h-6 w-6 text-[#0b1224]" aria-hidden="true" />
          </div>
          <h1 className="text-xl font-bold text-white">Owner access required</h1>
          <p className="mt-2 text-sm text-white/70">Only the store owner can view the Printful command center.</p>
          <Link
            href="/account"
            className="mt-6 inline-flex items-center justify-center rounded-full bg-[#22d3ee] px-5 py-2 text-sm font-semibold text-black hover:bg-[#0ea5e9]"
          >
            Return to account
          </Link>
        </div>
      </div>
    )
  }

  const handleProductSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    setDraftProducts((prev) => [productDraft, ...prev])
    setProductDraft(defaultProductDraft)
  }

  const handleImageSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    setDraftImages((prev) => [imageDraft, ...prev])
    setImageDraft(defaultImageDraft)
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-[#0D0D0D] via-[#081926] to-[#0D0D0D] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col gap-3"
        >
          <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.28em] text-[#22d3ee]">
            <ShieldCheck className="h-4 w-4" aria-hidden="true" />
            Owner command center
          </p>
          <div className="flex flex-col gap-2">
            <h1 className="text-4xl md:text-5xl font-black bg-linear-to-r from-[#22d3ee] via-[#FFD700] to-[#1E90FF] bg-clip-text text-transparent">
              E-commerce Dashboard
            </h1>
            <p className="text-white/70 max-w-2xl">
              Track Printful fulfillment, monitor store performance, and publish new products and imagery in one place.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 text-sm text-white/70">
            <span className="inline-flex items-center gap-2 rounded-full border border-[#22d3ee]/40 bg-[#0f172a]/60 px-3 py-1">
              <ShieldCheck className="h-4 w-4 text-[#22d3ee]" aria-hidden="true" />
              Logged in as {user.email}
            </span>
            <span className="inline-flex items-center gap-2 rounded-full border border-[#22d3ee]/30 bg-[#0f172a]/60 px-3 py-1">
              <PackageCheck className="h-4 w-4 text-[#22d3ee]" aria-hidden="true" />
              Printful sync enabled
            </span>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
          {stats.map((stat) => {
            const Icon = stat.icon
            return (
              <div
                key={stat.title}
                className="rounded-2xl border border-[#22d3ee]/25 bg-linear-to-br from-[#0f172a]/80 via-[#0b1224]/70 to-[#0f172a]/80 p-5 shadow-[0_0_30px_rgba(34,211,238,0.18)]"
              >
                <div className="flex items-center justify-between">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-linear-to-br from-[#22d3ee]/20 to-[#0ea5e9]/30 border border-[#22d3ee]/30">
                    <Icon className="h-5 w-5 text-[#22d3ee]" aria-hidden="true" />
                  </span>
                  <span className="text-xs text-[#22d3ee]/80 uppercase tracking-[0.2em]">Live</span>
                </div>
                <p className="mt-4 text-sm text-white/60">{stat.title}</p>
                <p className="text-2xl font-semibold text-white">{stat.value}</p>
                <p className="mt-2 text-xs text-white/60">{stat.change}</p>
              </div>
            )
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 rounded-3xl border border-[#22d3ee]/25 bg-linear-to-br from-[#0f172a]/80 via-[#0b1224]/80 to-[#0f172a]/80 p-6 shadow-[0_0_30px_rgba(34,211,238,0.15)]">
            <div className="flex flex-col gap-4">
              <div>
                <h2 className="text-2xl font-semibold text-white">Printful Quick Actions</h2>
                <p className="text-sm text-white/70">Jump directly to Printful tools for templates, orders, and store settings.</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {printfulLinks.map((link) => (
                  <a
                    key={link.title}
                    href={link.href}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-2xl border border-[#22d3ee]/20 bg-[#0b1224]/80 p-4 text-left transition hover:border-[#22d3ee]/60 hover:bg-[#0f1b2d]"
                  >
                    <div className="flex items-center justify-between">
                      <p className="font-semibold text-white">{link.title}</p>
                      <ExternalLink className="h-4 w-4 text-[#22d3ee]" aria-hidden="true" />
                    </div>
                    <p className="mt-2 text-xs text-white/60">{link.description}</p>
                  </a>
                ))}
              </div>
              <div className="rounded-2xl border border-[#22d3ee]/20 bg-[#0b1224]/70 p-4">
                <p className="text-sm font-semibold text-white">Connection health</p>
                <p className="mt-2 text-sm text-white/70">
                  Printful API is authenticated. Last sync timestamp shown here is placeholder data and should be replaced with the real value from your Printful integration.
                </p>
                <Link
                  href="https://www.printful.com/docs"
                  target="_blank"
                  rel="noreferrer"
                  className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-[#22d3ee] hover:text-[#0ea5e9]"
                >
                  Review Printful API documentation
                  <ExternalLink className="h-4 w-4" aria-hidden="true" />
                </Link>
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-[#22d3ee]/25 bg-linear-to-br from-[#0f172a]/80 via-[#0b1224]/80 to-[#0f172a]/80 p-6 shadow-[0_0_30px_rgba(34,211,238,0.15)]">
            <h2 className="text-xl font-semibold text-white">Draft queue</h2>
            <p className="mt-2 text-sm text-white/60">Recent items staged for Printful publishing.</p>
            <div className="mt-4 space-y-4">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-[#22d3ee]">Products</p>
                {draftProducts.length === 0 ? (
                  <p className="mt-2 text-sm text-white/60">No products queued yet.</p>
                ) : (
                  <ul className="mt-2 space-y-2 text-sm text-white/80">
                    {draftProducts.slice(0, 3).map((product) => (
                      <li key={`${product.name}-${product.sku}`} className="rounded-xl border border-[#22d3ee]/20 bg-[#0b1224]/60 px-3 py-2">
                        <p className="font-semibold text-white">{product.name || 'Untitled product'}</p>
                        <p className="text-xs text-white/60">SKU: {product.sku || 'Pending'}</p>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-[#22d3ee]">Images</p>
                {draftImages.length === 0 ? (
                  <p className="mt-2 text-sm text-white/60">No images uploaded yet.</p>
                ) : (
                  <ul className="mt-2 space-y-2 text-sm text-white/80">
                    {draftImages.slice(0, 3).map((image) => (
                      <li key={`${image.fileName}-${image.altText}`} className="rounded-xl border border-[#22d3ee]/20 bg-[#0b1224]/60 px-3 py-2">
                        <p className="font-semibold text-white">{image.fileName || 'Untitled image'}</p>
                        <p className="text-xs text-white/60">Alt text: {image.altText || 'Pending'}</p>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="rounded-3xl border border-[#22d3ee]/25 bg-linear-to-br from-[#0f172a]/80 via-[#0b1224]/80 to-[#0f172a]/80 p-6 shadow-[0_0_30px_rgba(34,211,238,0.15)]">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-semibold text-white">Add a new product</h2>
                <p className="text-sm text-white/70">Stage products before pushing them to Printful.</p>
              </div>
              <Upload className="h-6 w-6 text-[#22d3ee]" aria-hidden="true" />
            </div>
            <form onSubmit={handleProductSubmit} className="mt-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-white/80" htmlFor="product-name">Product name</label>
                  <input
                    id="product-name"
                    type="text"
                    value={productDraft.name}
                    onChange={(event) => setProductDraft((prev) => ({ ...prev, name: event.target.value }))}
                    className="mt-2 w-full rounded-xl border border-[#22d3ee]/30 bg-[#0b1224] px-3 py-2 text-sm text-white focus:border-[#22d3ee] focus:outline-none"
                    placeholder="Neon Shinobi Hoodie"
                    required
                  />
                </div>
                <div>
                  <label className="text-sm text-white/80" htmlFor="product-sku">SKU</label>
                  <input
                    id="product-sku"
                    type="text"
                    value={productDraft.sku}
                    onChange={(event) => setProductDraft((prev) => ({ ...prev, sku: event.target.value }))}
                    className="mt-2 w-full rounded-xl border border-[#22d3ee]/30 bg-[#0b1224] px-3 py-2 text-sm text-white focus:border-[#22d3ee] focus:outline-none"
                    placeholder="PUP-NEON-001"
                  />
                </div>
                <div>
                  <label className="text-sm text-white/80" htmlFor="product-category">Category</label>
                  <input
                    id="product-category"
                    type="text"
                    value={productDraft.category}
                    onChange={(event) => setProductDraft((prev) => ({ ...prev, category: event.target.value }))}
                    className="mt-2 w-full rounded-xl border border-[#22d3ee]/30 bg-[#0b1224] px-3 py-2 text-sm text-white focus:border-[#22d3ee] focus:outline-none"
                    placeholder="Hoodies"
                  />
                </div>
                <div>
                  <label className="text-sm text-white/80" htmlFor="product-price">Price</label>
                  <input
                    id="product-price"
                    type="text"
                    inputMode="decimal"
                    value={productDraft.price}
                    onChange={(event) => setProductDraft((prev) => ({ ...prev, price: event.target.value }))}
                    className="mt-2 w-full rounded-xl border border-[#22d3ee]/30 bg-[#0b1224] px-3 py-2 text-sm text-white focus:border-[#22d3ee] focus:outline-none"
                    placeholder="$84.00"
                    aria-describedby="product-price-helper"
                  />
                  <p id="product-price-helper" className="mt-1 text-xs text-white/50">Use your storefront list price.</p>
                </div>
              </div>
              <div>
                <label className="text-sm text-white/80" htmlFor="product-description">Description</label>
                <textarea
                  id="product-description"
                  value={productDraft.description}
                  onChange={(event) => setProductDraft((prev) => ({ ...prev, description: event.target.value }))}
                  className="mt-2 min-h-[110px] w-full rounded-xl border border-[#22d3ee]/30 bg-[#0b1224] px-3 py-2 text-sm text-white focus:border-[#22d3ee] focus:outline-none"
                  placeholder="Describe the design, fabric, and key highlights."
                />
              </div>
              <div>
                <label className="text-sm text-white/80" htmlFor="product-template">Printful template link</label>
                <input
                  id="product-template"
                  type="url"
                  value={productDraft.printfulTemplate}
                  onChange={(event) => setProductDraft((prev) => ({ ...prev, printfulTemplate: event.target.value }))}
                  className="mt-2 w-full rounded-xl border border-[#22d3ee]/30 bg-[#0b1224] px-3 py-2 text-sm text-white focus:border-[#22d3ee] focus:outline-none"
                  placeholder="https://www.printful.com/dashboard/templates"
                />
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 rounded-full bg-[#22d3ee] px-5 py-2 text-sm font-semibold text-black hover:bg-[#0ea5e9]"
                >
                  Save product draft
                </button>
                <a
                  href="https://www.printful.com/dashboard/templates"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-[#22d3ee]/40 px-5 py-2 text-sm font-semibold text-[#22d3ee] hover:border-[#22d3ee] hover:text-white"
                >
                  Open Printful templates
                  <ExternalLink className="h-4 w-4" aria-hidden="true" />
                </a>
              </div>
            </form>
          </div>

          <div className="rounded-3xl border border-[#22d3ee]/25 bg-linear-to-br from-[#0f172a]/80 via-[#0b1224]/80 to-[#0f172a]/80 p-6 shadow-[0_0_30px_rgba(34,211,238,0.15)]">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-semibold text-white">Add new images</h2>
                <p className="text-sm text-white/70">Upload assets and tag them for Printful mockups.</p>
              </div>
              <ImagePlus className="h-6 w-6 text-[#22d3ee]" aria-hidden="true" />
            </div>
            <form onSubmit={handleImageSubmit} className="mt-6 space-y-4">
              <div>
                <label className="text-sm text-white/80" htmlFor="image-file">Upload image</label>
                <input
                  id="image-file"
                  type="file"
                  accept="image/*"
                  className="mt-2 w-full rounded-xl border border-[#22d3ee]/30 bg-[#0b1224] px-3 py-2 text-sm text-white file:mr-4 file:rounded-full file:border-0 file:bg-[#22d3ee] file:px-4 file:py-2 file:text-sm file:font-semibold file:text-black hover:file:bg-[#0ea5e9]"
                  aria-describedby="image-file-helper"
                  onChange={(event) =>
                    setImageDraft((prev) => ({
                      ...prev,
                      fileName: event.target.files?.[0]?.name ?? ''
                    }))
                  }
                />
                <p id="image-file-helper" className="mt-1 text-xs text-white/50">Recommended: PNG, 3000px wide, transparent background.</p>
              </div>
              <div>
                <label className="text-sm text-white/80" htmlFor="image-alt">Alt text</label>
                <input
                  id="image-alt"
                  type="text"
                  value={imageDraft.altText}
                  onChange={(event) => setImageDraft((prev) => ({ ...prev, altText: event.target.value }))}
                  className="mt-2 w-full rounded-xl border border-[#22d3ee]/30 bg-[#0b1224] px-3 py-2 text-sm text-white focus:border-[#22d3ee] focus:outline-none"
                  placeholder="Close-up of Neon Shinobi artwork"
                  required
                />
              </div>
              <div>
                <label className="text-sm text-white/80" htmlFor="image-tags">Tags</label>
                <input
                  id="image-tags"
                  type="text"
                  value={imageDraft.tags}
                  onChange={(event) => setImageDraft((prev) => ({ ...prev, tags: event.target.value }))}
                  className="mt-2 w-full rounded-xl border border-[#22d3ee]/30 bg-[#0b1224] px-3 py-2 text-sm text-white focus:border-[#22d3ee] focus:outline-none"
                  placeholder="hoodie, neon, front"
                />
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 rounded-full bg-[#22d3ee] px-5 py-2 text-sm font-semibold text-black hover:bg-[#0ea5e9]"
                >
                  Save image draft
                </button>
                <a
                  href="https://www.printful.com/dashboard/library"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-[#22d3ee]/40 px-5 py-2 text-sm font-semibold text-[#22d3ee] hover:border-[#22d3ee] hover:text-white"
                >
                  Open Printful library
                  <ExternalLink className="h-4 w-4" aria-hidden="true" />
                </a>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
