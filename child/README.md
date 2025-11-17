# Pupito WordPress Themes

This directory contains WordPress theme packages for the Pupito brand. These themes allow you to deploy the Pupito brand and content on WordPress-based platforms alongside the main Next.js e-commerce site.

## Available Themes

### Kadence Child Theme
Located in: `kadence-child/`

A child theme for the [Kadence WordPress theme](https://www.kadencewp.com/) that brings the Pupito anime streetwear aesthetic to WordPress.

**Features:**
- 🎨 Pupito brand styling hooks ready for customization
- 🌍 Bilingual starter content (English & Spanish)
- 📦 8 pre-built pages ready to import
- 🔧 Translation-ready with proper text domain
- ⚡ Lightweight and performance-optimized

**What's Included:**
- `style.css` - WordPress theme metadata
- `functions.php` - Theme functionality and hooks
- `content/pupito-kadence-pages.xml` - Importable starter pages
- `languages/` - Translation files directory
- `README.md` - Detailed installation instructions

**Starter Pages:**
1. Home / Inicio - Hero section, categories, featured products
2. Shop / Tienda - Product browsing page
3. About / Acerca de - Brand story page
4. Help / Ayuda - Support and FAQ center

## Usage

Each theme directory contains its own README with specific installation and usage instructions.

## Development

To validate the theme packages, run:
```bash
npm test
```

This will run tests that verify:
- Theme structure integrity
- WordPress standards compliance
- Content format validation
- Version consistency
- Translation infrastructure

## Integration with Next.js Site

These WordPress themes complement the main Next.js e-commerce site found in the `src/` directory. Use them for:
- WordPress-based content management
- Maintaining brand consistency across platforms
- Leveraging WordPress ecosystem (plugins, hosting, etc.)
- Supporting customers who prefer WordPress

## Contributing

When adding new themes or updating existing ones:
1. Follow WordPress theme development standards
2. Include comprehensive README with installation steps
3. Provide starter content in WXR format when applicable
4. Add test coverage in `tests/` directory
5. Ensure text domain consistency for translations
6. Document version numbers in both style.css and functions.php
