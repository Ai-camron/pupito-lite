// Centralized store contact details and metadata

export const STORE_CONTACT = {
  email: 'Hello@pupitowear.com',
  supportHours: 'Monday - Friday: 9:00 AM - 6:00 PM PST',
  responseTime: 'Usually within 4 hours'
} as const;

export const STORE_INFO = {
  name: 'PUPITO',
  tagline: 'Anime-Inspired Streetwear',
  description: 'PUPITO is an anime-inspired streetwear brand with a dark neon aesthetic, blending Japanese pop culture with urban style.',
  url: 'https://www.pupitowear.com',
  fulfillmentPartner: 'Printful',
  emailProvider: 'Mailchimp'
} as const;

export const SEO_METADATA = {
  about: {
    title: 'About PUPITO | Anime-Inspired Streetwear Brand',
    description: 'Learn about PUPITO - where anime culture meets street fashion. Founded by anime enthusiasts, creating bold, authentic pieces that celebrate Japanese pop culture.',
    keywords: 'anime streetwear, PUPITO brand, anime clothing, Japanese streetwear, neon aesthetic'
  },
  products: {
    title: 'Shop Products | PUPITO Anime Streetwear',
    description: 'Discover our premium anime-inspired streetwear collection. Hoodies, tees, joggers, and accessories featuring original designs from PUPITO.',
    keywords: 'anime hoodies, streetwear tees, anime clothing, PUPITO products, anime fashion'
  },
  shop: {
    title: 'Shop Pupito | Midnight Market',
    description: 'Explore the Pupito Midnight Market to discover anime-inspired streetwear capsules, limited drops, and community favorites.',
    keywords: 'anime streetwear shop, PUPITO store, limited drops, anime fashion'
  },
  help: {
    title: 'Help Center | PUPITO Support',
    description: 'Get help with orders, shipping, returns, and more. Our support team is here to assist you with all your PUPITO streetwear needs.',
    keywords: 'PUPITO support, shipping help, returns policy, customer service'
  }
} as const;

// WooCommerce-style shortcode references (for documentation/integration)
export const WOOCOMMERCE_REFERENCES = {
  productGrid: '[products limit="12" columns="4" orderby="popularity"]',
  featuredProducts: '[featured_products per_page="6" columns="3"]',
  productCategories: '[product_categories number="4" parent="0"]',
  recentProducts: '[recent_products per_page="6" columns="3"]',
  saleProducts: '[sale_products per_page="6" columns="3"]'
} as const;
