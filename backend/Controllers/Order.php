<?php 

use MVC\Controller;
require './System/MVC/Controller.php';

class Order extends Controller {
    
    public function create($param) {
        // Connect to database
        $model = $this->model('order');

        // Create order
        $response = $model->createOrder($param);

        // Send Response
        $this->response->sendStatus($response['status']);
        $this->response->setContent($response['details']);
    }
}
