<?php
/**
 * PUPITO Kadence Child theme bootstrap.
 */

if (!defined('ABSPATH')) {
    exit; // Exit if accessed directly.
}

add_action('after_setup_theme', function () {
    load_child_theme_textdomain('pupito-child', get_stylesheet_directory() . '/languages');
});

add_action('wp_enqueue_scripts', function () {
    wp_enqueue_style('kadence-style', get_template_directory_uri() . '/style.css', [], null);
    // Enqueue child theme's root style.css for CSS variables
    wp_enqueue_style(
        'pupito-child-root-style',
        get_stylesheet_uri(),
        ['kadence-style'],
        '1.0.0'
    );
    wp_enqueue_style(
        'pupito-child-style',
        get_stylesheet_directory_uri() . '/assets/css/theme.css',
        ['pupito-child-root-style'],
        '1.0.0'
    );
}, 20);

require_once get_stylesheet_directory() . '/inc/content.php';
require_once get_stylesheet_directory() . '/inc/pages.php';
