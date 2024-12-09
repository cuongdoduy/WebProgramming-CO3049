<?php 

use MVC\Controller;
require './System/MVC/Controller.php';

class Customers  extends Controller {

    public function customers($param) {
        // Connect to database
        $model = $this->model('customers');

        // Get customer(s)
        $response = null;
        if(isset($param['id'])) {
            $response = $model->getCustomer($param);
        } else {
            $response = $model->getAllCustomers($param);
        }
        // Send Response
        $this->response->sendStatus($response['status']);
        $this->response->setContent($response['details']);
    }

    public function create() {
        // Connect to database
        $model = $this->model('customers');

        // Create product
        $response = $model->createCustomer();

        // Send Response
        $this->response->sendStatus($response['status']);
        $this->response->setContent($response['details']);
    }

    public function update($param) {
        // Connect to database
        $model = $this->model('customers');

        // Create product
        $response = $model->updateCustomer($param);

        // Update Response
        $this->response->sendStatus($response['status']);
        $this->response->setContent($response['details']);
    }

    public function delete($param) {
        // Connect to database
        $model = $this->model('customers');

        // Delete product
        $response = $model->deleteCustomer($param);

        // Send Response
        $this->response->sendStatus($response['status']);
        $this->response->setContent($response['details']);
    }

    public function deleteMultiple() {
        // Connect to database
        $model = $this->model('customers');

        // Delete product
        $response = $model->deleteMultipleCustomers();

        // Send Response
        $this->response->sendStatus($response['status']);
        $this->response->setContent($response['details']);
    }

    public function getCustomerWishlist($param) {
        // Connect to database
        $model = $this->model('customers');

        // Get customer(s)
        $response = $model->getCustomerWishlist($param['id']);

        // Send Response
        $this->response->sendStatus($response['status']);
        $this->response->setContent($response['details']);
    }

    public function getCustomerOrders($param) {
        // Connect to database
        $model = $this->model('customers');

        // Get customer(s)
        $response = $model->getCustomerOrders($param['id']);

        // Send Response
        $this->response->sendStatus($response['status']);
        $this->response->setContent($response['details']);
    }

    public function changePassword($param) {
        // Connect to database
        $model = $this->model('customers');

        // Get customer(s)
        $response = $model->changePassword($param);

        // Send Response
        $this->response->sendStatus($response['status']);
        $this->response->setContent($response['details']);
    }
}
