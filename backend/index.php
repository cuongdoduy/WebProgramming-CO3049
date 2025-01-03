<?php

// load config and startup file
require 'config.php';
require 'System/Http/Request.php';
require 'System/Http/Response.php';
require 'System/Router/Router.php';
require 'System/Pagination/Pagination.php';

// create object of request and response class
$request = new Http\Request();
$response = new Http\Response();

// pagination
$pagination = new Pagination\Pagination();

// set default header
$response->setHeader('Access-Control-Allow-Origin: *');
$response->setHeader("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
$response->setHeader('Content-Type: application/json; charset=UTF-8');

// set request url and method
$router = new Router\Router('/' . strtolower($request->getUrl()), $request->getMethod());

//echo '/' . strtolower($request->getUrl()), $request->getMethod() . "\n";

// import router file
require 'Router/Router.php';

// Router Run Request
$router->run();

// Response Render Content
$response->render();
