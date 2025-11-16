# Pupito Kadence Child Theme

A Kadence child theme packaged for the Pupito storefront. It includes starter pages (English + Spanish) in `content/pupito-kadence-pages.xml` so you can import translated layouts immediately after activation.

## How to install
1. Zip the `kadence-child` folder (or upload the folder directly over SFTP).
2. In WordPress, go to **Appearance → Themes → Add New → Upload** and upload the ZIP.
3. Activate **Pupito Kadence Child**.
4. Navigate to **Tools → Import → WordPress** and import `content/pupito-kadence-pages.xml`.
   - Assign content to your admin user when prompted.
   - Check the option to **Download and import file attachments** to pull hero and product art placeholders.
5. Go to **Settings → Reading**. Under 'Homepage settings', select **A static page**, then choose **Home** as the homepage. Assign the **Shop** page to WooCommerce if you use it.

## Notes
- The child theme enqueues the Kadence parent stylesheet automatically.
- Translation hooks use the `pupito-kadence-child` text domain; drop `.po/.mo` files inside `languages/` to localize template overrides.
- Starter pages mirror the current Pupito layout: hero, category grid, featured items, testimonials, and newsletter signup CTA plus About and Help pages.
