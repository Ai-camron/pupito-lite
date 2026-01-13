# Kadence Child Theme Migration

## Notice
The Pupito Kadence Child WordPress theme has been separated into its own repository for better maintainability and version control.

## Previous Location
- **Old Path**: `child/kadence-child/` in this repository
- **Removed**: November 2025

## New Repository
The Kadence child theme is now available in its own dedicated repository:
- **Repository**: `Ai-camron/pupito-kadence-child` (or the appropriate new repository name)
- **Purpose**: WordPress child theme for Kadence that mirrors the Pupito storefront

## What Was Moved
The following files and directories were moved to the new repository:
- `functions.php` - Theme functions and enqueue scripts
- `style.css` - Theme stylesheet with metadata
- `README.md` - Installation and usage instructions
- `content/pupito-kadence-pages.xml` - Starter pages (English + Spanish)
- `languages/` - Translation directory

## Why Was It Separated?
The Kadence child theme was separated from the main pupito-lite repository because:
1. **Different Technology Stack**: WordPress/PHP vs Next.js/TypeScript
2. **Different Purpose**: WordPress theme vs e-commerce web application
3. **Independent Deployment**: The theme and Next.js app deploy to different platforms
4. **Better Versioning**: Each can be versioned and maintained independently
5. **Clearer Repository Focus**: This repository focuses on the Next.js e-commerce frontend

## Installation
To use the Pupito Kadence Child theme:
1. Clone or download the new repository
2. Follow the installation instructions in the theme's README.md
3. Upload to your WordPress installation via Appearance → Themes

## Questions?
If you need access to the historical version of the theme files, check the git history of this repository before this migration.
