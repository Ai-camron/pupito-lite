<?php
/**
 * Create demo pages with translations when the child theme activates.
 */

if (!defined('ABSPATH')) {
    exit;
}

/**
 * Insert demo content pages (English and Spanish) on first activation.
 */
function pupito_child_register_pages(): void
{
    $pages = [
        [
            'slug' => 'pupito-home',
            'title' => __('PUPITO Home', 'pupito-child'),
            'content' => pupito_child_home_content_en(),
            'language' => 'en',
            'set_front' => true,
        ],
        [
            'slug' => 'pupito-shop',
            'title' => __('Shop', 'pupito-child'),
            'content' => pupito_child_shop_content_en(),
            'language' => 'en',
        ],
        [
            'slug' => 'pupito-about',
            'title' => __('About PUPITO', 'pupito-child'),
            'content' => pupito_child_about_content_en(),
            'language' => 'en',
        ],
        [
            'slug' => 'pupito-contact',
            'title' => __('Contact', 'pupito-child'),
            'content' => pupito_child_contact_content_en(),
            'language' => 'en',
        ],
        [
            'slug' => 'pupito-inicio',
            'title' => __('Inicio', 'pupito-child'),
            'content' => pupito_child_home_content_es(),
            'language' => 'es',
        ],
        [
            'slug' => 'pupito-tienda',
            'title' => __('Tienda', 'pupito-child'),
            'content' => pupito_child_shop_content_es(),
            'language' => 'es',
        ],
        [
            'slug' => 'sobre-pupito',
            'title' => __('Sobre PUPITO', 'pupito-child'),
            'content' => pupito_child_about_content_es(),
            'language' => 'es',
        ],
        [
            'slug' => 'pupito-contacto',
            'title' => __('Contacto', 'pupito-child'),
            'content' => pupito_child_contact_content_es(),
            'language' => 'es',
        ],
    ];

    $front_page_id = null;

    foreach ($pages as $page) {
        $existing = get_page_by_path($page['slug'], OBJECT, 'page');

        if ($existing instanceof WP_Post) {
            if (!metadata_exists('post', $existing->ID, '_pupito_child_language')) {
                update_post_meta($existing->ID, '_pupito_child_language', $page['language']);
            }
            if (!metadata_exists('post', $existing->ID, '_pupito_child_generated')) {
                update_post_meta($existing->ID, '_pupito_child_generated', '1');
            }
            if (!empty($page['set_front'])) {
                $front_page_id = $existing->ID;
            }
            continue;
        }

        $page_id = wp_insert_post([
            'post_title'   => $page['title'],
            'post_name'    => $page['slug'],
            'post_content' => $page['content'],
            'post_status'  => 'publish',
            'post_type'    => 'page',
        ]);

        if (!is_wp_error($page_id)) {
            update_post_meta($page_id, '_pupito_child_language', $page['language']);
            update_post_meta($page_id, '_pupito_child_generated', '1');
            if (!empty($page['set_front'])) {
                $front_page_id = $page_id;
            }
        }
    }

    if ($front_page_id) {
        update_option('show_on_front', 'page');
        update_option('page_on_front', $front_page_id);
    }
}
add_action('after_switch_theme', 'pupito_child_register_pages');
