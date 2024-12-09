<?php 

use MVC\Controller;
require './System/MVC/Controller.php';

class Products  extends Controller {

    public function products($param) {
        // Connect to database
        $model = $this->model('products');

        // Get product(s)
        $response = null;

        if (isset($_GET['slug'])) {
            $response = $model->getProductBySlug($param);
        } else if(isset($param['id'])) {
            $response = $model->getProduct($param);
        } else {
            $response = $model->getAllProducts($param);
        }
        // Send Response
        $this->response->sendStatus($response['status']);
        $this->response->setContent($response['details']);
    }

    public function create() {
        // Connect to database
        $model = $this->model('products');

        // Create product
        $response = $model->createProduct();

        // Send Response
        $this->response->sendStatus($response['status']);
        $this->response->setContent($response['details']);
    }

    public function update($param) {
        // Connect to database
        $model = $this->model('products');

        // Create product
        $response = $model->updateProduct($param);

        // Update Response
        $this->response->sendStatus($response['status']);
        $this->response->setContent($response['details']);
    }

    public function delete($param) {
        // Connect to database
        $model = $this->model('products');

        // Delete product
        $response = $model->deleteProduct($param);

        // Send Response
        $this->response->sendStatus($response['status']);
        $this->response->setContent($response['details']);
    }

    public function deleteMultiple() {
        // Connect to database
        $model = $this->model('products');

        // Delete product
        $response = $model->deleteMultipleProducts();

        // Send Response
        $this->response->sendStatus($response['status']);
        $this->response->setContent($response['details']);
    }

    public function searchByName($param) {
        if (isset($param['name']) && $this->validSearchName($param['name'])) {
            $model = $this->model('products');
            $response = $model->searchByName($param);
            $this->response->sendStatus($response['status']);
            $this->response->setContent($response['details']);
        } else {
            $this->response->sendStatus(200);
            $this->response->setContent([
                'message' => 'Invalid search name'
            ]);
        }
    }

    private function validSearchName($name) {
        // filter special characters
        $name = preg_replace('/[^a-zA-Z0-9\s]/', '', $name);
        return !empty($name) && !is_numeric($name) && strlen((string) $name) > 0;
    }
}
