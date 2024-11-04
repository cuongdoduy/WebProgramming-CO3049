<?php 

use MVC\Controller;
require './System/MVC/Controller.php';

class Products  extends Controller {

    public function products($param) {
        // Connect to database
        $model = $this->model('products');

        // Get all products
        $data_list = $model->getAllProducts($param);

        // Send Response
        $this->response->sendStatus(200);
        $this->response->setContent($data_list);
    }

    public function create() {
        // Connect to database
        $model = $this->model('products');

        // Create product
        $data_list = $model->createProduct();

        // Send Response
        $this->response->sendStatus(200);
        $this->response->setContent($data_list);
    }

    public function update($param) {
        // Connect to database
        $model = $this->model('products');

        // Update product
        $data_list = $model->updateProduct($param);

        // Send Response
        $this->response->sendStatus(200);
        $this->response->setContent($data_list);
    }

    public function delete($param) {
        // Connect to database
        $model = $this->model('products');

        // Delete product
        $data_list = $model->deleteProduct($param);

        // Send Response
        $this->response->sendStatus(200);
        $this->response->setContent($data_list);
    }
}
