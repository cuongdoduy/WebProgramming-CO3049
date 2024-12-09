<?php 

use MVC\Controller;
require './System/MVC/Controller.php';

class Tags extends Controller {
    public function tags($param) {
        // Connect to database
        $model = $this->model('tags');

        $response = $model->getAllTags();
        // Send Response
        $this->response->sendStatus($response['status']);
        $this->response->setContent($response['details']);
    }

    public function getTagById($param) {
        // Connect to database
        $model = $this->model('tags');

        $response = $model->getTagById($param['id']);
        // Send Response
        $this->response->sendStatus($response['status']);
        $this->response->setContent($response['details']);
    }
}
