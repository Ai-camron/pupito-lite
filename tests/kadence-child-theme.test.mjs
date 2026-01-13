/**
 * Test suite for Kadence child theme package validation
 * Ensures all required files exist and contain proper content
 */

import { test } from 'node:test';
import { strict as assert } from 'node:assert';
import { readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const THEME_DIR = join(process.cwd(), 'child', 'kadence-child');

test('Kadence child theme directory structure exists', () => {
  assert.ok(existsSync(THEME_DIR), 'Theme directory should exist');
  assert.ok(existsSync(join(THEME_DIR, 'style.css')), 'style.css should exist');
  assert.ok(existsSync(join(THEME_DIR, 'functions.php')), 'functions.php should exist');
  assert.ok(existsSync(join(THEME_DIR, 'README.md')), 'README.md should exist');
  assert.ok(existsSync(join(THEME_DIR, 'content')), 'content directory should exist');
  assert.ok(existsSync(join(THEME_DIR, 'languages')), 'languages directory should exist');
});

test('style.css contains required WordPress theme headers', () => {
  const styleContent = readFileSync(join(THEME_DIR, 'style.css'), 'utf8');
  
  assert.ok(styleContent.includes('Theme Name:'), 'Should have Theme Name header');
  assert.ok(styleContent.includes('Pupito Kadence Child'), 'Should specify correct theme name');
  assert.ok(styleContent.includes('Template: kadence'), 'Should reference kadence parent theme');
  assert.ok(styleContent.includes('Text Domain:'), 'Should have Text Domain header');
  assert.ok(styleContent.includes('pupito-kadence-child'), 'Should have correct text domain');
  assert.ok(styleContent.includes('Version:'), 'Should have version number');
  assert.ok(styleContent.includes('Author:'), 'Should have author information');
});

test('functions.php contains required WordPress child theme functionality', () => {
  const functionsContent = readFileSync(join(THEME_DIR, 'functions.php'), 'utf8');
  
  assert.ok(functionsContent.includes('<?php'), 'Should be a PHP file');
  assert.ok(functionsContent.includes('PUPITO_CHILD_VERSION'), 'Should define version constant');
  assert.ok(functionsContent.includes('wp_enqueue_scripts'), 'Should enqueue scripts/styles');
  assert.ok(functionsContent.includes('kadence-global'), 'Should reference parent theme stylesheet');
  assert.ok(functionsContent.includes('pupito-kadence-child'), 'Should enqueue child theme stylesheet');
  assert.ok(functionsContent.includes('after_setup_theme'), 'Should have theme setup action');
  assert.ok(functionsContent.includes('load_child_theme_textdomain'), 'Should load text domain for translations');
  assert.ok(functionsContent.includes('pupito_child_get_content_package'), 'Should have content package helper function');
});

test('content package XML file exists and is well-formed', () => {
  const contentPath = join(THEME_DIR, 'content', 'pupito-kadence-pages.xml');
  assert.ok(existsSync(contentPath), 'Content XML file should exist');
  
  const xmlContent = readFileSync(contentPath, 'utf8');
  assert.ok(xmlContent.includes('<?xml version="1.0"'), 'Should have XML declaration');
  assert.ok(xmlContent.includes('<rss version="2.0"'), 'Should be valid RSS/WXR format');
  assert.ok(xmlContent.includes('xmlns:wp="http://wordpress.org/export/1.2/"'), 'Should have WordPress export namespace');
  assert.ok(xmlContent.includes('wp:wxr_version'), 'Should specify WXR version');
  
  // Check for starter pages in English
  assert.ok(xmlContent.includes('<title>Home</title>'), 'Should have Home page in English');
  assert.ok(xmlContent.includes('<title>Shop</title>'), 'Should have Shop page in English');
  assert.ok(xmlContent.includes('<title>About</title>'), 'Should have About page in English');
  assert.ok(xmlContent.includes('<title>Help</title>'), 'Should have Help page in English');
  
  // Check for starter pages in Spanish
  assert.ok(xmlContent.includes('<title>Inicio</title>'), 'Should have Home page in Spanish');
  assert.ok(xmlContent.includes('<title>Tienda</title>'), 'Should have Shop page in Spanish');
  assert.ok(xmlContent.includes('<title>Acerca de</title>'), 'Should have About page in Spanish');
  assert.ok(xmlContent.includes('<title>Ayuda</title>'), 'Should have Help page in Spanish');
});

test('README.md provides installation and usage instructions', () => {
  const readmeContent = readFileSync(join(THEME_DIR, 'README.md'), 'utf8');
  
  assert.ok(readmeContent.includes('# Pupito Kadence Child Theme'), 'Should have main heading');
  assert.ok(readmeContent.includes('How to install'), 'Should have installation section');
  assert.ok(readmeContent.includes('Appearance → Themes'), 'Should mention WordPress theme installation');
  assert.ok(readmeContent.includes('Tools → Import → WordPress'), 'Should mention content import');
  assert.ok(readmeContent.includes('pupito-kadence-pages.xml'), 'Should reference the XML content file');
  assert.ok(readmeContent.includes('Settings → Reading'), 'Should mention homepage settings');
  assert.ok(readmeContent.toLowerCase().includes('translation'), 'Should mention translation support');
});

test('theme version consistency across files', () => {
  const styleContent = readFileSync(join(THEME_DIR, 'style.css'), 'utf8');
  const functionsContent = readFileSync(join(THEME_DIR, 'functions.php'), 'utf8');
  
  // Extract version from style.css
  const styleVersionMatch = styleContent.match(/Version:\s*(\d+\.\d+\.\d+)/);
  assert.ok(styleVersionMatch, 'style.css should have a version number');
  
  // Extract version from functions.php
  const functionsVersionMatch = functionsContent.match(/PUPITO_CHILD_VERSION.*?'(\d+\.\d+\.\d+)'/);
  assert.ok(functionsVersionMatch, 'functions.php should have a version constant');
  
  // Versions should match
  assert.strictEqual(
    styleVersionMatch[1],
    functionsVersionMatch[1],
    'Version numbers should be consistent across files'
  );
});

test('languages directory is ready for translation files', () => {
  const languagesDir = join(THEME_DIR, 'languages');
  assert.ok(existsSync(languagesDir), 'Languages directory should exist');
  assert.ok(existsSync(join(languagesDir, '.gitkeep')), 'Should have .gitkeep to preserve directory');
});

test('theme content includes Pupito branding elements', () => {
  const xmlContent = readFileSync(join(THEME_DIR, 'content', 'pupito-kadence-pages.xml'), 'utf8');
  
  // Check for brand-specific content
  assert.ok(xmlContent.includes('Pupito'), 'Content should mention Pupito brand');
  assert.ok(xmlContent.includes('anime'), 'Content should reference anime theme');
  assert.ok(xmlContent.includes('streetwear'), 'Content should reference streetwear');
  assert.ok(xmlContent.includes('neon'), 'Content should reference neon aesthetic');
  
  // Check for product examples
  assert.ok(xmlContent.includes('Galaxy Arc Tee'), 'Should include sample product names');
  assert.ok(xmlContent.includes('Neon Kitsune'), 'Should include anime-inspired product names');
});
