<?php
/**
 * Pupito Kadence Child Theme functions.
 *
 * Enqueues parent + child styles, registers a text domain for translations, and
 * exposes a helper to make importing starter content predictable.
 */

define( 'PUPITO_CHILD_VERSION', '1.0.0' );

function_exists( 'add_action' ) || exit;

add_action( 'wp_enqueue_scripts', function () {
    $parent = 'kadence-global';
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

/**
 * Automatically create bilingual demo pages and set front page on theme activation.
 */
add_action( 'after_switch_theme', function () {
    // Check if pages have already been created
    if ( get_option( 'pupito_child_pages_created' ) ) {
        return;
    }

    // Define bilingual page structure
    $pages = [
        // English pages
        [
            'post_title'   => 'Home',
            'post_name'    => 'home',
            'post_content' => pupito_child_get_home_content_en(),
            'post_status'  => 'publish',
            'post_type'    => 'page',
            'menu_order'   => 0,
        ],
        [
            'post_title'   => 'Shop',
            'post_name'    => 'shop',
            'post_content' => pupito_child_get_shop_content_en(),
            'post_status'  => 'publish',
            'post_type'    => 'page',
            'menu_order'   => 1,
        ],
        [
            'post_title'   => 'About',
            'post_name'    => 'about',
            'post_content' => pupito_child_get_about_content_en(),
            'post_status'  => 'publish',
            'post_type'    => 'page',
            'menu_order'   => 2,
        ],
        [
            'post_title'   => 'Help',
            'post_name'    => 'help',
            'post_content' => pupito_child_get_help_content_en(),
            'post_status'  => 'publish',
            'post_type'    => 'page',
            'menu_order'   => 3,
        ],
        // Spanish pages
        [
            'post_title'   => 'Inicio',
            'post_name'    => 'inicio',
            'post_content' => pupito_child_get_home_content_es(),
            'post_status'  => 'publish',
            'post_type'    => 'page',
            'menu_order'   => 4,
        ],
        [
            'post_title'   => 'Tienda',
            'post_name'    => 'tienda',
            'post_content' => pupito_child_get_shop_content_es(),
            'post_status'  => 'publish',
            'post_type'    => 'page',
            'menu_order'   => 5,
        ],
        [
            'post_title'   => 'Acerca de',
            'post_name'    => 'acerca-de',
            'post_content' => pupito_child_get_about_content_es(),
            'post_status'  => 'publish',
            'post_type'    => 'page',
            'menu_order'   => 6,
        ],
        [
            'post_title'   => 'Ayuda',
            'post_name'    => 'ayuda',
            'post_content' => pupito_child_get_help_content_es(),
            'post_status'  => 'publish',
            'post_type'    => 'page',
            'menu_order'   => 7,
        ],
    ];

    $home_page_id = null;

    // Create pages
    foreach ( $pages as $page ) {
        $page_id = wp_insert_post( $page );
        if ( $page_id && ! is_wp_error( $page_id ) && $page['post_name'] === 'home' ) {
            $home_page_id = $page_id;
        }
    }

    // Set the Home page as the front page
    if ( $home_page_id ) {
        update_option( 'show_on_front', 'page' );
        update_option( 'page_on_front', $home_page_id );
    }

    // Mark pages as created
    update_option( 'pupito_child_pages_created', true );
} );

/**
 * Content generators for bilingual pages
 */
function pupito_child_get_home_content_en() {
    return <<<HTML
<h1>Wear Your Story</h1>
<p>Anime apparel for every arc of you — now in midnight mode. Explore neon gradients, hero blues, and hot pink overlays that mirror the Pupito storefront.</p>
<p><a href="/shop">Shop Now</a> or <a href="/shop#collections">View Collections</a></p>

<h2>Shop by Category</h2>
<ul>
    <li>Tees</li>
    <li>Hoodies</li>
    <li>Joggers</li>
    <li>Accessories</li>
    <li>Stickers</li>
    <li>Limited Drops</li>
</ul>

<h2>Featured</h2>
<ul>
    <li>Galaxy Arc Tee — \$34 (New)</li>
    <li>Neon Kitsune Hoodie — \$62 (Fan Favorite)</li>
    <li>Hero Runner Joggers — \$54 (Trending)</li>
    <li>Pixel Pup Cap — \$26 (New)</li>
</ul>

<h2>Testimonials</h2>
<p><strong>Kai / @ArcRunner:</strong> "Wearing it feels like walking through Tokyo at night — electric, alive, cinematic."</p>
<p><strong>Mika / @SakuraSketch:</strong> "The Neon Kitsune hoodie glows under club lights. It's streetwear and story in one."</p>

<h2>Newsletter</h2>
<p>Join the drop list for limited editions and collabs. Our newsletter integrates with the Pupito signup flow.</p>
HTML;
}

function pupito_child_get_home_content_es() {
    return <<<HTML
<h1>Viste Tu Historia</h1>
<p>Moda inspirada en el anime para cada etapa de tu aventura. Gradientes neón, azules heroicos y rosas intensos replican la experiencia de Pupito.</p>
<p><a href="/shop">Comprar ahora</a> o <a href="/shop#collections">Ver colecciones</a></p>

<h2>Categorías</h2>
<ul>
    <li>Camisetas</li>
    <li>Sudaderas</li>
    <li>Joggers</li>
    <li>Accesorios</li>
    <li>Pegatinas</li>
    <li>Ediciones Limitadas</li>
</ul>

<h2>Destacados</h2>
<ul>
    <li>Camiseta Galaxy Arc — \$34 (Nuevo)</li>
    <li>Sudadera Neon Kitsune — \$62 (Favorita)</li>
    <li>Joggers Hero Runner — \$54 (Tendencia)</li>
    <li>Gorra Pixel Pup — \$26 (Nuevo)</li>
</ul>

<h2>Testimonios</h2>
<p><strong>Kai / @ArcRunner:</strong> "Se siente como caminar por Tokio de noche: eléctrico, vivo, cinematográfico."</p>
<p><strong>Mika / @SakuraSketch:</strong> "La sudadera Neon Kitsune brilla bajo las luces del club. Es moda urbana e historia en uno."</p>

<h2>Boletín</h2>
<p>Únete a la lista de lanzamientos y colaboraciones. Nuestro boletín se integra con el flujo de registro de Pupito.</p>
HTML;
}

function pupito_child_get_shop_content_en() {
    return <<<HTML
<h1>Shop Pupito</h1>
<p>Browse the latest collections featuring anime-inspired streetwear with neon aesthetics. All products are print-on-demand through Printful for quality and sustainability.</p>

<h2 id="collections">Collections</h2>
<ul>
    <li>Galaxy Arc Collection</li>
    <li>Neon Kitsune Series</li>
    <li>Hero Runner Line</li>
    <li>Pixel Pup Accessories</li>
</ul>

<h2>Featured Products</h2>
<p>New drops and fan favorites available now.</p>
HTML;
}

function pupito_child_get_shop_content_es() {
    return <<<HTML
<h1>Tienda Pupito</h1>
<p>Explora las últimas colecciones con ropa urbana inspirada en el anime y estética neón. Todos los productos son bajo demanda a través de Printful para calidad y sostenibilidad.</p>

<h2 id="collections">Colecciones</h2>
<ul>
    <li>Colección Galaxy Arc</li>
    <li>Serie Neon Kitsune</li>
    <li>Línea Hero Runner</li>
    <li>Accesorios Pixel Pup</li>
</ul>

<h2>Productos Destacados</h2>
<p>Nuevos lanzamientos y favoritos disponibles ahora.</p>
HTML;
}

function pupito_child_get_about_content_en() {
    return <<<HTML
<h1>About Pupito</h1>
<p>Pupito blends anime storytelling with streetwear silhouettes. This page summarizes the brand story and production standards.</p>

<h2>Our Story</h2>
<p>Born from the intersection of anime culture and urban fashion, Pupito creates apparel that tells your story.</p>

<h2>Production</h2>
<p>We partner with Printful for ethical, on-demand manufacturing that reduces waste and ensures quality.</p>
HTML;
}

function pupito_child_get_about_content_es() {
    return <<<HTML
<h1>Sobre Pupito</h1>
<p>Pupito combina narrativas de anime con siluetas de streetwear. Esta página resume la historia de la marca y los estándares de producción.</p>

<h2>Nuestra Historia</h2>
<p>Nacido de la intersección entre la cultura del anime y la moda urbana, Pupito crea ropa que cuenta tu historia.</p>

<h2>Producción</h2>
<p>Colaboramos con Printful para fabricación ética bajo demanda que reduce residuos y asegura calidad.</p>
HTML;
}

function pupito_child_get_help_content_en() {
    return <<<HTML
<h1>Help Center</h1>
<p>FAQs for sizing, shipping, returns, and preorder drops. Use Kadence accordions or tabs for structured support content.</p>

<h2>Frequently Asked Questions</h2>

<h3>When will I get my order?</h3>
<p>Most orders ship within 3-5 business days and arrive within 7-10 business days.</p>

<h3>How are Pupito products made?</h3>
<p>All products are print-on-demand through our partner Printful, ensuring quality and reducing waste.</p>

<h3>What if something arrives damaged?</h3>
<p>Contact us immediately and we'll send a replacement at no charge.</p>

<h3>Do you offer returns or exchanges?</h3>
<p>Yes, we accept returns within 30 days of delivery for unworn items.</p>
HTML;
}

function pupito_child_get_help_content_es() {
    return <<<HTML
<h1>Centro de Ayuda</h1>
<p>Preguntas frecuentes sobre tallas, envíos, devoluciones y preventas. Usa acordeones o pestañas de Kadence para organizar el soporte.</p>

<h2>Preguntas Frecuentes</h2>

<h3>¿Cuándo recibiré mi pedido?</h3>
<p>La mayoría de los pedidos se envían en 3-5 días hábiles y llegan en 7-10 días hábiles.</p>

<h3>¿Cómo se fabrican los productos Pupito?</h3>
<p>Todos los productos son bajo demanda a través de nuestro socio Printful, asegurando calidad y reduciendo residuos.</p>

<h3>¿Qué pasa si algo llega dañado?</h3>
<p>Contáctanos inmediatamente y te enviaremos un reemplazo sin cargo.</p>

<h3>¿Ofrecen devoluciones o cambios?</h3>
<p>Sí, aceptamos devoluciones dentro de los 30 días posteriores a la entrega para artículos sin usar.</p>
HTML;
}
