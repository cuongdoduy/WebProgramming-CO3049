<?php 

use MVC\Controller;
require './System/MVC/Controller.php';

class Cart extends Controller {

    public function getCart($param) {
        // Connect to database
        $model = $this->model('cart');

        // Get cart
        $response = $model->getCart($param['id']);

        // Send Response
        $this->response->sendStatus($response['status']);
        $this->response->setContent($response['details']);
    }

    public function add($param) {
        // Connect to database
        $model = $this->model('cart');

        // Create product
        $response = $model->addToCart($param);

        // Send Response
        $this->response->sendStatus($response['status']);
        $this->response->setContent($response['details']);
    }

    public function delete($param) {
        // Connect to database
        $model = $this->model('cart');

        // Delete product
        $response = $model->deleteItemFromCart($param);

        // Send Response
        $this->response->sendStatus($response['status']);
        $this->response->setContent($response['details']);
    }

    public function update($param) {
        // Connect to database
        $model = $this->model('cart');

        // Update product
        $response = $model->updateCart($param);

        // Send Response
        $this->response->sendStatus($response['status']);
        $this->response->setContent($response['details']);
    }
}
