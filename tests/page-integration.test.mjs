import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import path from 'node:path'

// Test that key pages have SEO metadata
test('about page has SEO metadata layout', () => {
  const layoutPath = path.resolve('src/app/about/layout.tsx')
  const source = readFileSync(layoutPath, 'utf8')
  
  assert.match(source, /import.*SEO_METADATA.*from.*constants/, 'About layout should import SEO_METADATA')
  assert.match(source, /metadata.*Metadata/, 'About layout should export metadata')
  assert.match(source, /SEO_METADATA\.about/, 'About layout should use SEO_METADATA.about')
})

test('products page uses centralized SEO metadata', () => {
  const layoutPath = path.resolve('src/app/products/layout.tsx')
  const source = readFileSync(layoutPath, 'utf8')
  
  assert.match(source, /import.*SEO_METADATA.*from.*constants/, 'Products layout should import SEO_METADATA')
  assert.match(source, /SEO_METADATA\.products/, 'Products layout should use SEO_METADATA.products')
  assert.match(source, /STORE_INFO\.url/, 'Products layout should use STORE_INFO.url for structured data')
})

test('shop page uses centralized SEO metadata', () => {
  const pagePath = path.resolve('src/app/shop/page.tsx')
  const source = readFileSync(pagePath, 'utf8')
  
  assert.match(source, /import.*SEO_METADATA.*from.*constants/, 'Shop page should import SEO_METADATA')
  assert.match(source, /SEO_METADATA\.shop/, 'Shop page should use SEO_METADATA.shop')
})

test('help pages have SEO metadata layout', () => {
  const layoutPath = path.resolve('src/app/help/layout.tsx')
  const source = readFileSync(layoutPath, 'utf8')
  
  assert.match(source, /import.*SEO_METADATA.*from.*constants/, 'Help layout should import SEO_METADATA')
  assert.match(source, /SEO_METADATA\.help/, 'Help layout should use SEO_METADATA.help')
})

// Test that pages include OnlineStoreCallout component
test('shop page includes OnlineStoreCallout component', () => {
  const componentPath = path.resolve('src/components/ShopShowcase.tsx')
  const source = readFileSync(componentPath, 'utf8')
  
  assert.match(source, /import.*OnlineStoreCallout/, 'ShopShowcase should import OnlineStoreCallout')
  assert.match(source, /<OnlineStoreCallout/, 'ShopShowcase should render OnlineStoreCallout')
})

test('cart page includes OnlineStoreCallout component', () => {
  const pagePath = path.resolve('src/app/cart/page.tsx')
  const source = readFileSync(pagePath, 'utf8')
  
  assert.match(source, /import.*OnlineStoreCallout/, 'Cart page should import OnlineStoreCallout')
  assert.match(source, /<OnlineStoreCallout.*variant="compact"/, 'Cart page should use compact variant')
})

test('checkout page includes OnlineStoreCallout component', () => {
  const pagePath = path.resolve('src/app/checkout/page.tsx')
  const source = readFileSync(pagePath, 'utf8')
  
  assert.match(source, /import.*OnlineStoreCallout/, 'Checkout page should import OnlineStoreCallout')
  assert.match(source, /<OnlineStoreCallout.*variant="compact"/, 'Checkout page should use compact variant')
})

test('help contact page includes OnlineStoreCallout component', () => {
  const pagePath = path.resolve('src/app/help/contact/page.tsx')
  const source = readFileSync(pagePath, 'utf8')
  
  assert.match(source, /import.*OnlineStoreCallout/, 'Contact page should import OnlineStoreCallout')
  assert.match(source, /<OnlineStoreCallout.*variant="compact"/, 'Contact page should use compact variant')
})

test('help FAQ page includes OnlineStoreCallout component', () => {
  const pagePath = path.resolve('src/app/help/faq/page.tsx')
  const source = readFileSync(pagePath, 'utf8')
  
  assert.match(source, /import.*OnlineStoreCallout/, 'FAQ page should import OnlineStoreCallout')
  assert.match(source, /<OnlineStoreCallout.*variant="compact"/, 'FAQ page should use compact variant')
})

test('help shipping page includes OnlineStoreCallout component', () => {
  const pagePath = path.resolve('src/app/help/shipping/page.tsx')
  const source = readFileSync(pagePath, 'utf8')
  
  assert.match(source, /import.*OnlineStoreCallout/, 'Shipping page should import OnlineStoreCallout')
  assert.match(source, /<OnlineStoreCallout.*variant="compact"/, 'Shipping page should use compact variant')
})

// Test that contact pages use centralized contact info
test('contact page uses STORE_CONTACT constants', () => {
  const pagePath = path.resolve('src/app/help/contact/page.tsx')
  const source = readFileSync(pagePath, 'utf8')
  
  assert.match(source, /import.*STORE_CONTACT.*from.*constants/, 'Contact page should import STORE_CONTACT')
  assert.match(source, /STORE_CONTACT\.email/, 'Contact page should use STORE_CONTACT.email')
  assert.match(source, /STORE_CONTACT\.responseTime/, 'Contact page should use STORE_CONTACT.responseTime')
})

test('FAQ page uses STORE_CONTACT constants', () => {
  const pagePath = path.resolve('src/app/help/faq/page.tsx')
  const source = readFileSync(pagePath, 'utf8')
  
  assert.match(source, /import.*STORE_CONTACT.*from.*constants/, 'FAQ page should import STORE_CONTACT')
  assert.match(source, /STORE_CONTACT\.email/, 'FAQ page should use STORE_CONTACT.email')
})

test('shipping page uses STORE_CONTACT constants', () => {
  const pagePath = path.resolve('src/app/help/shipping/page.tsx')
  const source = readFileSync(pagePath, 'utf8')
  
  assert.match(source, /import.*STORE_CONTACT.*from.*constants/, 'Shipping page should import STORE_CONTACT')
  assert.match(source, /STORE_CONTACT\.email/, 'Shipping page should use STORE_CONTACT.email')
})
