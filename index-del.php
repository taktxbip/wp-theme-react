<?php

/*
* Plugin Name: WP Plugin React
* Plugin URI: https://evdesign.ru/
* Description: WP Theme React Boilerplate
* Version: 0.0.1
* Author: evdesign
* Author URI: https://evdesign.ru/
* License: GPLv2 or later
* Text Domain: wp-plugin
*/

class WP_Plugin_React
{
    public $plugin_domain;
    public $views_dir;
    public $version;

    public function __construct()
    {
        $this->plugin_domain = 'wp-react-boilerplate';
        $this->views_dir     = trailingslashit(dirname(__FILE__)) . 'server/views';
        $this->version       = '0.0.1';

        require_once __DIR__ . '/server/wprb-rest-server.php';
        $wprb_rest_server = new WPRB_Rest_Server();
        $wprb_rest_server->init();

    }
}

new WP_Plugin_React();
