# Pupito Kadence Child Theme

A Kadence child theme packaged for the Pupito storefront with automatic bilingual page generation and translations ready to use.

## Features
- **Automatic Page Creation**: On activation, creates 8 bilingual demo pages (English + Spanish)
- **Auto Front Page Setup**: Automatically sets the Home page as your site's front page
- **Translation Ready**: Includes `.pot` template for custom translations
- **Kadence Compatible**: Designed for seamless integration with Kadence theme

## How to install

### Quick Installation (Recommended)
1. Zip the `kadence-child` folder (or upload the folder directly over SFTP).
2. In WordPress, go to **Appearance → Themes → Add New → Upload** and upload the ZIP.
3. Activate **Pupito Kadence Child**.
4. **Done!** Pages are automatically created and the front page is set.

### What Gets Created Automatically
On theme activation, the following pages are generated:

**English Pages:**
- Home (set as front page)
- Shop
- About
- Help

**Spanish Pages:**
- Inicio
- Tienda
- Acerca de
- Ayuda

### Manual Import Option (Alternative)
If you prefer to manually import content or need to reset pages:
1. Navigate to **Tools → Import → WordPress** and import `content/pupito-kadence-pages.xml`.
2. Assign content to your admin user when prompted.
3. Check the option to **Download and import file attachments** to pull hero and product art placeholders.
4. Go to **Settings → Reading**. Under 'Homepage settings', select **A static page**, then choose **Home** as the homepage.

## Translation Support
- Translation template: `languages/pupito-kadence-child.pot`
- Text domain: `pupito-kadence-child`
- Drop `.po/.mo` files inside `languages/` to localize template overrides

## Page Content
Starter pages mirror the Pupito brand aesthetic:
- **Hero sections** with neon gradients and anime-inspired visuals
- **Category grids** for product organization
- **Featured items** showcasing bestsellers and new drops
- **Testimonials** from the Pup Squad community
- **Newsletter signup** CTA integrated with Pupito's email flow
- **Help center** with FAQs about sizing, shipping, and returns

## Technical Details
- Automatically enqueues Kadence parent stylesheet
- Uses WordPress `after_switch_theme` hook for one-time page creation
- Prevents duplicate page creation with `pupito_child_pages_created` option
- Compatible with multilingual plugins for further localization

## Notes
- Pages are only created once on initial activation to avoid duplicates
- If you need to recreate pages, delete the `pupito_child_pages_created` option from the database
- All content is customizable through the WordPress editor after creation
