<?php

// paths

// Pattern: $router->get('/path', callBack);
// example
$router->get('/', function() {
    echo '<div style="text-align: center;width: 350px;margin: 50px auto;font-size: 25px;padding: 50px;box-shadow: 0 0 10px #dedede;border-radius: 5px;">
        Hello World!!
    </div>';
});

////////////////////////////////////////////////////////////////////////////////////
//                                                                                //
//     Pattern: $router->get('/path:{param}', 'Controller@ControllerMethod');     //
//                                                                                //
////////////////////////////////////////////////////////////////////////////////////

// example
// products router
$router->get('/products', 'Products@products');
$router->get('/products/:page', 'Products@products');
$router->post('/products', 'Products@create');
$router->put('/products/:id', 'Products@update');
$router->delete('/products/:id', 'Products@delete');
