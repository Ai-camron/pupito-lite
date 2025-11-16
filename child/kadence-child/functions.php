<?php
/**
 * Pupito Kadence Child Theme functions.
 *
 * Enqueues parent + child styles, registers a JSON translation catalog, and
 * exposes a helper to make importing starter content predictable.
 */

define( 'PUPITO_CHILD_VERSION', '1.0.0' );

function_exists( 'add_action' ) || exit;

add_action( 'wp_enqueue_scripts', function () {
    $parent = 'kadence-style';
    wp_enqueue_style( $parent, get_template_directory_uri() . '/style.css', [], wp_get_theme('kadence')->get('Version') );
    wp_enqueue_style(
        'pupito-kadence-child',
        get_stylesheet_directory_uri() . '/style.css',
        [ $parent ],
        PUPITO_CHILD_VERSION
    );
} );

/**
 * Provide a machine-readable path for import/export tooling.
 */
function pupito_child_get_content_package() {
    return get_stylesheet_directory() . '/content/pupito-kadence-pages.xml';
}

/**
 * Register text domain for future translations.
 */
add_action( 'after_setup_theme', function () {
    load_child_theme_textdomain( 'pupito-kadence-child', get_stylesheet_directory() . '/languages' );
} );
