<?php 

use MVC\Controller;
require './System/MVC/Controller.php';

class Products  extends Controller {

    public function getAllProducts() {

        // Connect to database
        $model = $this->model('products');

        // Get all products
        $data_list = $model->getAllProducts();

        // Send Response
        $this->response->sendStatus(200);
        $this->response->setContent($data_list);
    }
}
