import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { readFileSync } from 'node:fs';
import path from 'node:path';

const baseDir = path.join(process.cwd(), 'child', 'kadence-pupito-child');

function fileText(relativePath) {
  return readFileSync(path.join(baseDir, relativePath), 'utf8');
}

describe('Kadence child theme package', () => {
  it('includes a WordPress style header with Kadence template', () => {
    const style = fileText('style.css');
    assert.match(style, /Theme Name:\s*PUPITO Kadence Child/i, 'Theme name header is present');
    assert.match(style, /Template:\s*kadence/i, 'Kadence template declaration is present');
  });

  it('enqueues child assets and loads translations', () => {
    const functionsPhp = fileText('functions.php');
    assert.ok(functionsPhp.includes('load_child_theme_textdomain'), 'Translation loading is configured');
    assert.ok(functionsPhp.includes('wp_enqueue_style'), 'Child styles are enqueued');
  });

  it('defines bilingual demo pages for activation', () => {
    const pagesPhp = fileText('inc/pages.php');
    const slugs = ['pupito-home', 'pupito-shop', 'pupito-about', 'pupito-contact', 'pupito-inicio', 'pupito-tienda', 'sobre-pupito', 'pupito-contacto'];
    for (const slug of slugs) {
      assert.ok(pagesPhp.includes(slug), `Slug ${slug} should be registered`);
    }
    assert.ok(pagesPhp.includes('after_switch_theme'), 'Pages are created during theme activation');
  });
});
