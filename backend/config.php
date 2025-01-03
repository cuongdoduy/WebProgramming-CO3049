<?php

// Http Default Url
define('HTTP_URL', 'localhost');

// Define Path Application
define('SYSTEM', 'System/');
define('CONTROLLERS', 'Controllers/');
define('MODELS', 'Models/');

// Config Database
define('DATABASE', [
    'Port'   => '3306',
    'Host'   => 'localhost',
    'Driver' => 'MySQLi',
    'Name'   => 'shopping',
    'User'   => 'root',
    'Pass'   => '',
    'Prefix' => ''
]);

// DB_PREFIX
define('DB_PREFIX', '');

// Pagination
define('PAGE_LIMIT', 5);
