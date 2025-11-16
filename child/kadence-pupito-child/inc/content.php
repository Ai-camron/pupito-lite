<?php
/**
 * Reusable page content strings.
 */

if (!defined('ABSPATH')) {
    exit;
}

function pupito_child_home_content_en(): string
{
    return <<<HTML
<!-- wp:cover {"overlayColor":"black","dimRatio":50,"minHeight":520,"style":{"color":{"duotone":["#0D0D0D","#1E90FF"]}}} -->
<div class="wp-block-cover" style="min-height:520px"><span aria-hidden="true" class="wp-block-cover__background has-black-background-color has-background-dim"></span><div class="wp-block-cover__inner-container"><h1 class="wp-block-heading">Wear Your Story</h1><p class="has-text-align-center">Anime-inspired streetwear engineered for neon city nights.</p><div class="wp-block-buttons"><div class="wp-block-button"><a class="wp-block-button__link wp-element-button" href="#pupito-shop">Shop the drop</a></div><div class="wp-block-button is-style-outline"><a class="wp-block-button__link wp-element-button" href="#pupito-about">Meet the brand</a></div></div></div></div>
<!-- /wp:cover -->

<!-- wp:separator {"opacity":"css","className":"is-style-default"} -->
<hr class="wp-block-separator has-css-opacity is-style-default"/>
<!-- /wp:separator -->

<!-- wp:columns {"align":"wide"} -->
<div class="wp-block-columns alignwide" id="pupito-shop"><!-- wp:column -->
<div class="wp-block-column"><h2 class="wp-block-heading">Spotlight Products</h2><p>Galaxy Arc Tee, Neon Kitsune Hoodie, Hero Runner Joggers, and Pixel Pup Cap crafted for comfort that keeps up with the rave.</p></div>
<!-- /wp:column -->

<!-- wp:column -->
<div class="wp-block-column"><h3 class="wp-block-heading">Why PUPITO</h3><ul><li>Layerable silhouettes with cyber-punk gradients.</li><li>Premium cotton and tech fleece that move with you.</li><li>Inclusive sizing and genderless fits.</li></ul></div>
<!-- /wp:column --></div>
<!-- /wp:columns -->

<!-- wp:group {"align":"wide","style":{"border":{"width":"1px","radius":"18px"},"spacing":{"padding":{"top":"24px","right":"24px","bottom":"24px","left":"24px"}}},"borderColor":"vivid-cyan-blue"} -->
<div class="wp-block-group alignwide has-border-color has-vivid-cyan-blue-border-color" style="border-width:1px;border-radius:18px;padding-top:24px;padding-right:24px;padding-bottom:24px;padding-left:24px"><h3 class="wp-block-heading">Customer Energy</h3><p>“Feels like walking through Tokyo at night — electric, alive, cinematic.” – Kai / @ArcRunner</p><p>“Glows under club lights. It’s streetwear and story in one.” – Mika / @SakuraSketch</p></div>
<!-- /wp:group -->

<!-- wp:group {"align":"wide","style":{"border":{"radius":"16px"},"spacing":{"padding":{"top":"28px","right":"28px","bottom":"28px","left":"28px"}}},"backgroundColor":"black"} -->
<div class="wp-block-group alignwide has-black-background-color has-background" style="border-radius:16px;padding-top:28px;padding-right:28px;padding-bottom:28px;padding-left:28px" id="pupito-about"><h3 class="wp-block-heading">Made for midnight explorers</h3><p>PUPITO blends anime storytelling, concert-grade fabrics, and neon palettes to keep you comfortable from day missions to after-hours drops.</p><div class="wp-block-buttons"><div class="wp-block-button"><a class="wp-block-button__link wp-element-button" href="#pupito-contact">Talk to us</a></div></div></div>
<!-- /wp:group -->
HTML;
}

function pupito_child_home_content_es(): string
{
    return <<<HTML
<!-- wp:cover {"overlayColor":"black","dimRatio":50,"minHeight":520,"style":{"color":{"duotone":["#0D0D0D","#1E90FF"]}}} -->
<div class="wp-block-cover" style="min-height:520px"><span aria-hidden="true" class="wp-block-cover__background has-black-background-color has-background-dim"></span><div class="wp-block-cover__inner-container"><h1 class="wp-block-heading">Viste tu historia</h1><p class="has-text-align-center">Streetwear inspirado en el anime, diseñado para noches de neón.</p><div class="wp-block-buttons"><div class="wp-block-button"><a class="wp-block-button__link wp-element-button" href="#pupito-tienda">Compra la colección</a></div><div class="wp-block-button is-style-outline"><a class="wp-block-button__link wp-element-button" href="#pupito-sobre">Conoce la marca</a></div></div></div></div>
<!-- /wp:cover -->

<!-- wp:separator {"opacity":"css","className":"is-style-default"} -->
<hr class="wp-block-separator has-css-opacity is-style-default"/>
<!-- /wp:separator -->

<!-- wp:columns {"align":"wide"} -->
<div class="wp-block-columns alignwide" id="pupito-tienda"><!-- wp:column -->
<div class="wp-block-column"><h2 class="wp-block-heading">Productos destacados</h2><p>Galaxy Arc Tee, Neon Kitsune Hoodie, Hero Runner Joggers y Pixel Pup Cap con comodidad lista para el club.</p></div>
<!-- /wp:column -->

<!-- wp:column -->
<div class="wp-block-column"><h3 class="wp-block-heading">Por qué PUPITO</h3><ul><li>Silhouetas para capas con gradientes ciberpunk.</li><li>Algodón premium y fleece técnico que se mueve contigo.</li><li>Tallas inclusivas y fits sin género.</li></ul></div>
<!-- /wp:column --></div>
<!-- /wp:columns -->

<!-- wp:group {"align":"wide","style":{"border":{"width":"1px","radius":"18px"},"spacing":{"padding":{"top":"24px","right":"24px","bottom":"24px","left":"24px"}}},"borderColor":"vivid-cyan-blue"} -->
<div class="wp-block-group alignwide has-border-color has-vivid-cyan-blue-border-color" style="border-width:1px;border-radius:18px;padding-top:24px;padding-right:24px;padding-bottom:24px;padding-left:24px"><h3 class="wp-block-heading">Opiniones</h3><p>“Se siente como caminar por Tokio de noche: eléctrico y cinematográfico.” – Kai / @ArcRunner</p><p>“Brilla en las luces del club. Es streetwear y narrativa en una sola prenda.” – Mika / @SakuraSketch</p></div>
<!-- /wp:group -->

<!-- wp:group {"align":"wide","style":{"border":{"radius":"16px"},"spacing":{"padding":{"top":"28px","right":"28px","bottom":"28px","left":"28px"}}},"backgroundColor":"black"} -->
<div class="wp-block-group alignwide has-black-background-color has-background" style="border-radius:16px;padding-top:28px;padding-right:28px;padding-bottom:28px;padding-left:28px" id="pupito-sobre"><h3 class="wp-block-heading">Hecho para exploradores nocturnos</h3><p>PUPITO combina narrativa anime, telas de concierto y paletas de neón para acompañarte del día a los lanzamientos nocturnos.</p><div class="wp-block-buttons"><div class="wp-block-button"><a class="wp-block-button__link wp-element-button" href="#pupito-contacto">Hablemos</a></div></div></div>
<!-- /wp:group -->
HTML;
}

function pupito_child_shop_content_en(): string
{
    return <<<HTML
<!-- wp:heading -->
<h2 class="wp-block-heading">Shop Collections</h2>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>Curated drops inspired by arc runners, club nights, and high-speed anime chases.</p>
<!-- /wp:paragraph -->

<!-- wp:list -->
<ul><li>Tees &amp; hoodies with glow-reactive gradients.</li><li>Joggers and cargos with stash pockets.</li><li>Accessories engineered for festivals and travel.</li></ul>
<!-- /wp:list -->
HTML;
}

function pupito_child_shop_content_es(): string
{
    return <<<HTML
<!-- wp:heading -->
<h2 class="wp-block-heading">Colecciones</h2>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>Gotas curadas inspiradas en corredores de arco, noches de club y persecuciones de anime.</p>
<!-- /wp:paragraph -->

<!-- wp:list -->
<ul><li>Playeras y hoodies con gradientes reactivos a la luz.</li><li>Joggers y cargos con bolsillos ocultos.</li><li>Accesorios diseñados para festivales y viajes.</li></ul>
<!-- /wp:list -->
HTML;
}

function pupito_child_about_content_en(): string
{
    return <<<HTML
<!-- wp:heading -->
<h2 class="wp-block-heading">About PUPITO</h2>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>PUPITO was born from late-night sketch sessions and anime marathons. Every piece mixes bold illustration with performance fabrics so you can move fast and stay comfortable.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>We keep sustainability in focus with short runs, recycled mailers, and partners that prioritize fair labor.</p>
<!-- /wp:paragraph -->
HTML;
}

function pupito_child_about_content_es(): string
{
    return <<<HTML
<!-- wp:heading -->
<h2 class="wp-block-heading">Sobre PUPITO</h2>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>PUPITO nació de sesiones de bocetos nocturnas y maratones de anime. Cada prenda mezcla ilustración audaz con telas de desempeño para moverte libremente.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Mantenemos la sustentabilidad con tirajes cortos, sobres reciclados y socios que priorizan el trabajo justo.</p>
<!-- /wp:paragraph -->
HTML;
}

function pupito_child_contact_content_en(): string
{
    return <<<HTML
<!-- wp:heading -->
<h2 class="wp-block-heading">Contact</h2>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>Email <a href="mailto:hello@pupito.example.com">hello@pupito.example.com</a> for wholesale, collabs, or support.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Response window: under 24h on weekdays.</p>
<!-- /wp:paragraph -->
HTML;
}

function pupito_child_contact_content_es(): string
{
    return <<<HTML
<!-- wp:heading -->
<h2 class="wp-block-heading">Contacto</h2>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>Escríbenos a <a href="mailto:hola@pupito.example.com">hola@pupito.example.com</a> para mayoreo, colaboraciones o soporte.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Respondemos en menos de 24h en días laborales.</p>
<!-- /wp:paragraph -->
HTML;
}
