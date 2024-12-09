<?php 

use MVC\Controller;
require './System/MVC/Controller.php';

class Wishlist extends Controller {
    public function add($param) {
        // Connect to database
        $model = $this->model('wishlist');

        // Create product
        $response = $model->createWishlist();

        // Send Response
        $this->response->sendStatus($response['status']);
        $this->response->setContent($response['details']);
    }

    public function delete($param) {
        // Connect to database
        $model = $this->model('wishlist');

        // Delete product
        $response = $model->deleteWishlist($param);

        // Send Response
        $this->response->sendStatus($response['status']);
        $this->response->setContent($response['details']);
    }
}
