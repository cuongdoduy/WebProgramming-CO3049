<?php

use MVC\Controller;
require './System/MVC/Controller.php';

class Authentication extends Controller {
    // api endpoint: /login
    public function login() {
        // Connect to database
        $model = $this->model('authentication');

        // MORE ERROR HANDLER CODE HERE
        if (!$this->isEmptyFields()) {
            return;
        }
        if (!$this->validateEmailFormat()) {
            return;
        }

        if ($this->isUserSignedInBefore()) {
            return;
        }

        $userData = $model->getUser();
        if (!$userData) {
            $this->response->sendStatus(401);
            $this->response->setContent([
                'message' => 'Authentication failed'
            ]);
            return;
        }

        
        
        
        // Send Response if successful
        $this->response->sendStatus(200);
        $this->response->setContent([
            'message' => 'Authentication succeeded',
            'data' => $userData,
        ]);
        $this->response->setcookie('access_token', $userData[0]['token'], time() + 3600, '/');
    }

    // api endpoint: /logout
    public function logout() {
        // Clear token in database
        $model = $this->model('authentication');
        $model->clearToken($_COOKIE['access_token']);

        $this->response->sendStatus(200);
        $this->response->setContent([
            'message' => 'You are logged out'
        ]);
        $this->response->setcookie('access_token', '', time() - 3600, '/');
    }

    // api endpoint: /showinfo
    public function showinfo() {
        if (isset($_SESSION["user_id"])) {
            $this->response->sendStatus(200);
            $this->response->setContent([
                'message' => 'You are logged in',
                'user_id' => $_SESSION["user_id"],
                'role' => $_SESSION["role"]
            ]);
        } else {
            $this->response->sendStatus(401);
            $this->response->setContent([
                'message' => 'You are not logged in'
            ]);
        }
    }

    // Validate login credentials
    private function isEmptyFields() : bool {
        $body = json_decode(file_get_contents('php://input'), true);
        $email = $body['email'];
        $password = $body['password'];

        if (empty($email) || empty($password)) {
            $this->response->sendStatus(400);
            $this->response->setContent([
                'message' => 'Email and Password are required'
            ]);
            return false;
        }
        return true;
    }

    private function validateEmailFormat() : bool {
        $body = json_decode(file_get_contents('php://input'), true);
        $email = $body['email'];

        if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
            $this->response->sendStatus(400);
            $this->response->setContent([
                'message' => 'Invalid Email'
            ]);
            return false;
        }
        return true;
    }

    private function isUserSignedInBefore() {
        // Check if access_token in cookie is valid
        if (isset($_COOKIE['access_token'])) {
            $model = $this->model('authentication');
            $userData = $model->getUserByAccessToken($_COOKIE['access_token']);
            if ($userData) {
                $this->response->sendStatus(200);
                $this->response->setContent([
                    'message' => 'You are already signed in',
                    'data' => $userData,
                ]);
                return true;
            }
        } 
        return false;
    }
}
