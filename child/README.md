# PUPITO Kadence Child Theme

A Kadence child theme that ships with bilingual (English/Spanish) demo pages for the PUPITO brand. Drop the `kadence-pupito-child` folder into `wp-content/themes/` or compress it as a `.zip` to upload through the WordPress admin.

## Contents
- Theme headers and styling prepared for Kadence.
- Auto-generated demo pages with English and Spanish content on activation.
- Translation template file at `languages/pupito-child.pot`.

## Usage
1. Zip the `kadence-pupito-child` directory or copy it directly to `wp-content/themes/`.
2. Activate **PUPITO Kadence Child** in Appearance → Themes.
3. On activation the theme will create English and Spanish pages and set the English home page as the front page. Existing pages with the same slugs will be left untouched except for the addition of metadata markers (such as the `_pupito_child_language` custom field).
4. Translate or edit content from Pages as needed. Use the `_pupito_child_language` custom field to identify generated language variants.
