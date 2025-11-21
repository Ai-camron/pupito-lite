import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync, existsSync, statSync } from 'node:fs'
import { join } from 'node:path'

const themeDir = 'child/kadence-child'

test('kadence child theme has required files', () => {
  const requiredFiles = [
    'style.css',
    'functions.php',
    'README.md',
    'content/pupito-kadence-pages.xml',
    'languages/pupito-kadence-child.pot'
  ]

  requiredFiles.forEach(file => {
    const filePath = join(themeDir, file)
    assert.ok(
      existsSync(filePath),
      `Required file missing: ${file}`
    )
    
    const stats = statSync(filePath)
    assert.ok(
      stats.size > 0,
      `File ${file} should not be empty`
    )
  })
})

test('style.css contains valid theme headers', () => {
  const stylePath = join(themeDir, 'style.css')
  const styleContent = readFileSync(stylePath, 'utf8')

  const requiredHeaders = [
    'Theme Name: Pupito Kadence Child',
    'Template: kadence',
    'Text Domain: pupito-kadence-child',
    'Version: 1.0.0'
  ]

  requiredHeaders.forEach(header => {
    assert.ok(
      styleContent.includes(header),
      `style.css should contain header: ${header}`
    )
  })
})

test('functions.php enqueues parent and child styles', () => {
  const functionsPath = join(themeDir, 'functions.php')
  const functionsContent = readFileSync(functionsPath, 'utf8')

  assert.match(
    functionsContent,
    /wp_enqueue_scripts/,
    'functions.php should hook into wp_enqueue_scripts'
  )

  assert.match(
    functionsContent,
    /kadence-global/,
    'functions.php should reference parent kadence-global style'
  )

  assert.match(
    functionsContent,
    /pupito-kadence-child/,
    'functions.php should enqueue child theme stylesheet'
  )
})

test('functions.php implements automatic page creation', () => {
  const functionsPath = join(themeDir, 'functions.php')
  const functionsContent = readFileSync(functionsPath, 'utf8')

  assert.match(
    functionsContent,
    /after_switch_theme/,
    'functions.php should hook into after_switch_theme for auto-activation'
  )

  assert.match(
    functionsContent,
    /wp_insert_post/,
    'functions.php should use wp_insert_post to create pages'
  )

  assert.match(
    functionsContent,
    /page_on_front/,
    'functions.php should set the front page option'
  )

  assert.match(
    functionsContent,
    /pupito_child_pages_created/,
    'functions.php should track if pages have been created'
  )
})

test('functions.php generates bilingual content', () => {
  const functionsPath = join(themeDir, 'functions.php')
  const functionsContent = readFileSync(functionsPath, 'utf8')

  // Check for English content generators
  const englishPages = ['home', 'shop', 'about', 'help']
  englishPages.forEach(page => {
    assert.match(
      functionsContent,
      new RegExp(`pupito_child_get_${page}_content_en`),
      `functions.php should define English content generator for ${page}`
    )
  })

  // Check for Spanish content generators
  const spanishPages = ['home', 'shop', 'about', 'help']
  spanishPages.forEach(page => {
    assert.match(
      functionsContent,
      new RegExp(`pupito_child_get_${page}_content_es`),
      `functions.php should define Spanish content generator for ${page}`
    )
  })

  // Verify bilingual content
  assert.ok(
    functionsContent.includes('Wear Your Story'),
    'English home content should include "Wear Your Story"'
  )

  assert.ok(
    functionsContent.includes('Viste Tu Historia'),
    'Spanish home content should include "Viste Tu Historia"'
  )
})

test('functions.php loads translation text domain', () => {
  const functionsPath = join(themeDir, 'functions.php')
  const functionsContent = readFileSync(functionsPath, 'utf8')

  assert.match(
    functionsContent,
    /load_child_theme_textdomain/,
    'functions.php should load text domain for translations'
  )

  assert.match(
    functionsContent,
    /pupito-kadence-child/,
    'functions.php should use correct text domain'
  )
})

test('translation template contains theme metadata', () => {
  const potPath = join(themeDir, 'languages/pupito-kadence-child.pot')
  const potContent = readFileSync(potPath, 'utf8')

  assert.match(
    potContent,
    /Project-Id-Version: Pupito Kadence Child/,
    '.pot file should identify the project'
  )

  assert.match(
    potContent,
    /Content-Type: text\/plain; charset=UTF-8/,
    '.pot file should specify UTF-8 encoding'
  )

  assert.ok(
    potContent.includes('msgid "Pupito Kadence Child"'),
    '.pot file should include theme name for translation'
  )
})

test('XML content file contains bilingual pages', () => {
  const xmlPath = join(themeDir, 'content/pupito-kadence-pages.xml')
  const xmlContent = readFileSync(xmlPath, 'utf8')

  // Check for English pages
  const englishPages = [
    { title: 'Home', slug: 'home' },
    { title: 'Shop', slug: 'shop' },
    { title: 'About', slug: 'about' },
    { title: 'Help', slug: 'help' }
  ]

  englishPages.forEach(page => {
    assert.ok(
      xmlContent.includes(`<title>${page.title}</title>`),
      `XML should contain English page: ${page.title}`
    )
    assert.ok(
      xmlContent.includes(`<wp:post_name>${page.slug}</wp:post_name>`),
      `XML should contain slug for English page: ${page.slug}`
    )
  })

  // Check for Spanish pages
  const spanishPages = [
    { title: 'Inicio', slug: 'inicio' },
    { title: 'Tienda', slug: 'tienda' },
    { title: 'Acerca de', slug: 'acerca-de' },
    { title: 'Ayuda', slug: 'ayuda' }
  ]

  spanishPages.forEach(page => {
    assert.ok(
      xmlContent.includes(`<title>${page.title}</title>`),
      `XML should contain Spanish page: ${page.title}`
    )
    assert.ok(
      xmlContent.includes(`<wp:post_name>${page.slug}</wp:post_name>`),
      `XML should contain slug for Spanish page: ${page.slug}`
    )
  })
})

test('XML content file is valid WordPress export format', () => {
  const xmlPath = join(themeDir, 'content/pupito-kadence-pages.xml')
  const xmlContent = readFileSync(xmlPath, 'utf8')

  // Check WXR format requirements
  assert.match(
    xmlContent,
    /<\?xml version="1\.0" encoding="UTF-8"/,
    'XML should have proper XML declaration'
  )

  assert.match(
    xmlContent,
    /xmlns:wp="http:\/\/wordpress\.org\/export\/1\.2\/"/,
    'XML should include WordPress export namespace'
  )

  assert.match(
    xmlContent,
    /<wp:wxr_version>1\.2<\/wp:wxr_version>/,
    'XML should specify WXR version 1.2'
  )

  assert.match(
    xmlContent,
    /<wp:post_type>page<\/wp:post_type>/,
    'XML should contain page post types'
  )
})

test('README documents installation and activation', () => {
  const readmePath = join(themeDir, 'README.md')
  const readmeContent = readFileSync(readmePath, 'utf8')

  const requiredSections = [
    'How to install',
    'Appearance',
    'Activate',
    'import'
  ]

  requiredSections.forEach(section => {
    assert.ok(
      readmeContent.toLowerCase().includes(section.toLowerCase()),
      `README should mention: ${section}`
    )
  })

  // Verify automatic activation is documented
  assert.ok(
    readmeContent.toLowerCase().includes('after activation') || readmeContent.toLowerCase().includes('on activation'),
    'README should document automatic behavior on activation'
  )
})

test('functions.php creates all expected bilingual pages', () => {
  const functionsPath = join(themeDir, 'functions.php')
  const functionsContent = readFileSync(functionsPath, 'utf8')

  // Extract pages array definition
  const pagesMatch = functionsContent.match(/\$pages\s*=\s*\[([\s\S]*?)\];/)
  assert.ok(pagesMatch, 'functions.php should define $pages array')

  const pagesArray = pagesMatch[0]

  // Check for English page titles
  ;['Home', 'Shop', 'About', 'Help'].forEach(title => {
    assert.ok(
      pagesArray.includes(`'post_title'   => '${title}'`),
      `Pages array should include English page: ${title}`
    )
  })

  // Check for Spanish page titles
  ;['Inicio', 'Tienda', 'Acerca de', 'Ayuda'].forEach(title => {
    assert.ok(
      pagesArray.includes(`'post_title'   => '${title}'`),
      `Pages array should include Spanish page: ${title}`
    )
  })
})

test('theme structure is ready for WordPress packaging', () => {
  // Check that no unexpected files exist that would bloat the theme package
  const functionsPath = join(themeDir, 'functions.php')
  const functionsContent = readFileSync(functionsPath, 'utf8')

  // Ensure no development artifacts are referenced
  assert.doesNotMatch(
    functionsContent,
    /console\.log|var_dump|print_r\s*\(/,
    'functions.php should not contain debug statements'
  )

  // Verify version constant is defined
  assert.match(
    functionsContent,
    /define\(\s*'PUPITO_CHILD_VERSION'/,
    'functions.php should define version constant'
  )
})
