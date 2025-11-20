import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import path from 'node:path'

const constantsPath = path.resolve('src/lib/constants.ts')
const constantsSource = readFileSync(constantsPath, 'utf8')

const calloutPath = path.resolve('src/components/OnlineStoreCallout.tsx')
const calloutSource = readFileSync(calloutPath, 'utf8')

const footerPath = path.resolve('src/components/SiteFooter.tsx')
const footerSource = readFileSync(footerPath, 'utf8')

test('constants define centralized contact details', () => {
  assert.match(constantsSource, /email: 'Hello@pupitowear\.com'/, 'STORE_CONTACT should define Hello@pupitowear.com email')
  assert.match(constantsSource, /supportHours:/, 'STORE_CONTACT should define support hours')
  assert.match(constantsSource, /responseTime:/, 'STORE_CONTACT should define response time')
})

test('constants reference Printful and Mailchimp', () => {
  assert.match(constantsSource, /fulfillmentPartner: 'Printful'/, 'STORE_INFO should reference Printful as fulfillment partner')
  assert.match(constantsSource, /emailProvider: 'Mailchimp'/, 'STORE_INFO should reference Mailchimp as email provider')
})

test('constants include SEO metadata for key pages', () => {
  assert.match(constantsSource, /about:/, 'SEO_METADATA should include about page metadata')
  assert.match(constantsSource, /products:/, 'SEO_METADATA should include products page metadata')
  assert.match(constantsSource, /shop:/, 'SEO_METADATA should include shop page metadata')
  assert.match(constantsSource, /help:/, 'SEO_METADATA should include help page metadata')
})

test('constants include WooCommerce shortcode references', () => {
  assert.match(constantsSource, /WOOCOMMERCE_REFERENCES/, 'Should define WooCommerce shortcode references')
  assert.match(constantsSource, /productGrid:/, 'Should include product grid shortcode reference')
  assert.match(constantsSource, /featuredProducts:/, 'Should include featured products shortcode reference')
})

test('OnlineStoreCallout component supports variants', () => {
  assert.match(calloutSource, /variant\?: 'default' \| 'compact'/, 'Component should support default and compact variants')
  assert.match(calloutSource, /Online Only Store/, 'Component should display online-only store message')
})

test('OnlineStoreCallout references Printful and contact info', () => {
  assert.match(calloutSource, /STORE_INFO\.fulfillmentPartner/, 'Component should display fulfillment partner')
  assert.match(calloutSource, /STORE_INFO\.emailProvider/, 'Component should display email provider')
  assert.match(calloutSource, /STORE_CONTACT\.email/, 'Component should display contact email')
})

test('OnlineStoreCallout describes made-to-order and shipping', () => {
  assert.match(calloutSource, /Made-to-Order/, 'Component should mention made-to-order process')
  assert.match(calloutSource, /Ships Worldwide/, 'Component should mention worldwide shipping')
  assert.match(calloutSource, /Online Support/, 'Component should mention online support')
})

test('footer displays updated contact email', () => {
  assert.match(footerSource, /STORE_CONTACT\.email/, 'Footer should display contact email from constants')
  assert.match(footerSource, /import.*STORE_CONTACT.*from.*constants/, 'Footer should import STORE_CONTACT')
})

test('footer highlights Printful and Mailchimp operations', () => {
  assert.match(footerSource, /Fulfillment by.*STORE_INFO\.fulfillmentPartner/, 'Footer should mention Printful fulfillment')
  assert.match(footerSource, /Newsletter powered by.*STORE_INFO\.emailProvider/, 'Footer should mention Mailchimp newsletter')
})
