<?php

add_action('wp_enqueue_scripts', 'enqueue_multiple');
function enqueue_multiple()
{
    wp_register_script('theme-react-bundle', plugin_dir_url(__FILE__) . 'dist/bundle.js', array(), time(), 'all');

    wp_localize_script('theme-react-bundle', 'wpApiSettings', array(
        'root' => esc_url_raw(rest_url()),
        'nonce' => wp_create_nonce('wp_rest'),
        'wprb_ajax_base' => defined('WPRB_AJAX_BASE') ? WPRB_AJAX_BASE : '',
        'wprb_basic_auth' => defined('WPRB_AJAX_BASIC_AUTH') ? WPRB_AJAX_BASIC_AUTH : null,
    ));

    wp_enqueue_script('theme-react-bundle');
    wp_add_inline_script('theme-react-bundle', '', 'before');

    wp_enqueue_style('theme-react-bundle-styles', plugin_dir_url(__FILE__) . 'dist/style.bundle.css', array(), time(), 'all');
}
