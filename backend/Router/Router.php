<?php

// paths

// Pattern: $router->get('/path', callBack);
// example
global $router;
$router->get('/', function() {
//    echo '<div style="text-align: center;width: 350px;margin: 50px auto;font-size: 25px;padding: 50px;box-shadow: 0 0 10px #dedede;border-radius: 5px;">
//        Hello World!!!
//    </div>';
    echo "Hello World!!!";
});

$router->get('/product', function() {
    $GLOBALS['response']->sendStatus(400);
    $GLOBALS['response']->setContent([
        'message' => 'Product ID is required'
    ]);
});

$router->put('/product', function() {
    $GLOBALS['response']->sendStatus(400);
    $GLOBALS['response']->setContent([
        'message' => 'Product ID is required'
    ]);
});

$router->delete('/product', function() {
    $GLOBALS['response']->sendStatus(400);
    $GLOBALS['response']->setContent([
        'message' => 'Product ID is required'
    ]);
});

////////////////////////////////////////////////////////////////////////////////////
//                                                                                //
//     Pattern: $router->get('/path:{param}', 'Controller@ControllerMethod');     //
//                                                                                //
////////////////////////////////////////////////////////////////////////////////////

// products router
$router->get('/products', 'Products@products');
$router->get('/products/:page', 'Products@products');
$router->get('/product/:id', 'Products@products');
$router->post('/product', 'Products@create');
$router->put('/product/:id', 'Products@update');
$router->delete('/product/:id', 'Products@delete');
$router->delete('/products', 'Products@deleteMultiple');
//search product
$router->get('/products/name/:name', 'Products@searchByName');
$router->get('/products/name/:name/:page', 'Products@searchByName');


// customers router
$router->get('/customers', 'Customers@customers');
$router->get('/customer/:id', 'Customers@customers');
$router->get('/customers/:page', 'Customers@customers');
$router->post('/customer', 'Customers@create');
$router->put('/customer/:id', 'Customers@update');
$router->delete('/customer/:id', 'Customers@delete');
$router->delete('/customers', 'Customers@deleteMultiple');

// authentication router
$router->post('/login', 'Authentication@login');
$router->get('/logout', 'Authentication@logout');
$router->get('/showinfo', 'Authentication@showinfo');
