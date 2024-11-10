<?php

use MVC\Controller;
require './System/MVC/Controller.php';
require 'config_session.php';

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

        $userData = $model->getUser();
        if (!$userData) {
            $this->response->sendStatus(401);
            $this->response->setContent([
                'message' => 'Authentication failed'
            ]);
            return;
        }

        if ($this->isUserSignedInBefore()) {
            return;
        }

        // Create our own session id
        $newSessionId = session_create_id();
        $sessionId = $newSessionId . "_" . $userData[0]['Role'];

        // Set session id
//        session_id($sessionId); // This code will give warning in the JSON body
        $current_session_id = session_id();


        $_SESSION["user_id"] = $userData[0]['Id'];
        $_SESSION["role"] = $userData[0]['Role'];

        // Send Response if successful
        $this->response->sendStatus(200);
        $this->response->setContent([
            'message' => 'Authentication succeeded',
            'sessionId' => $current_session_id,
            'data' => $userData,
        ]);
    }

    // api endpoint: /logout
    public function logout() {
        if (isset($_SESSION["user_id"])) {
            unset($_SESSION["user_id"]);
            unset($_SESSION["role"]);
            session_destroy();
            $this->response->sendStatus(200);
            $this->response->setContent([
                'message' => 'Logout succeeded'
            ]);
        } else {
            $this->response->sendStatus(401);
            $this->response->setContent([
                'message' => 'You are not logged in'
            ]);
        }
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
        if (isset($_SESSION["user_id"]) && isset($_SESSION["role"])) {
            $this->response->sendStatus(400);
            $this->response->setContent([
                'message' => 'You are already logged in'
            ]);
            return true;
        }
    }
}
