<?php

require './System/MVC/Model.php';
use MVC\Model;

////////////////////////////////////////////////////////////////////////////////////
//                                                                                //
//    Naming Convention: Model Class must follow the format: Models{Modelname}    //
//                                                                                //
////////////////////////////////////////////////////////////////////////////////////

class ModelsAuthentication extends Model {
    // Only use when Email and Password are correct
    // return TRUE/FALSE
    public function getUser()
    {
        $body = json_decode(file_get_contents('php://input'), true);
        /// Here is the body of JSON request
        /// {
        //    "email": "admin@example.com",
        //    "password": "adminpassword"
        //  }
        $email = $body['email'];
        $password = $body['password'];
        $data = array();
        try {

            // to find admin in the database
            $query = "SELECT * FROM Admin WHERE email = '$email' AND password = '$password'";
            $result = $this->db->query($query);
            if (!$result)
                return null;

            if ($result && $result->num_rows > 0) {
                // If the admin is found

                    // output data of each row
                    while ($row = $result->fetch_assoc()) {
                        array_push($data, [
                            'id' => $row["id"],
                            'email' => $row["email"],
                            'role' => 'Admin'
                        ]);
                    }
                return $data;
            } else {
                $query = "SELECT * FROM Customer WHERE email = '$email' AND password = '$password'";
                $result = $this->db->query($query);

                if ($result && $result->num_rows > 0) {
                    // output data of each row
                    $access_token = trim((string) bin2hex(random_bytes(16)));

                    while ($row = $result->fetch_assoc()) {
                        array_push($data, [
                            'id' =>(int) $row["id"],
                            'email' => $row["email"],
                            'role' => 'Customer',
                            'token' => $access_token,
                            'cart_id' =>(int) $this->getCartId($row["id"])[0]['id']
                            
                        ]);
                    }     
                    $query = "UPDATE Customer SET token = '$access_token' WHERE email = '$email'";
                    $this->db->query($query);

                }
                return $data;
            }
        }
        catch (Exception $e) {
            return null;
        }
    }

    public function getUserByAccessToken($access_token) {
        $data = array();
        try {
            $query = "SELECT * FROM Customer WHERE token = '$access_token'";
            $result = $this->db->query($query);
            if ($result && $result->num_rows > 0) {
                // output data of each row
                while ($row = $result->fetch_assoc()) {
                    array_push($data, [
                        'id' => $row["id"],
                        'email' => $row["email"],
                        'role' => 'Customer'
                    ]);
                }
                return $data;
            }
        }
        catch (Exception $e) {
            echo $e;
            return null;
        }
    }

    public function clearToken($access_token) {
        try {
            $query = "UPDATE Customer SET token = NULL WHERE token = '$access_token'";
            $this->db->query($query);
        }
        catch (Exception $e) {
            echo $e;
        }
    }

    public function getCartId($customer_id) {
        $data = array();
        try {
            $query = "SELECT * FROM Cart WHERE customer_id = '$customer_id'";
            $result = $this->db->query($query);
            if ($result && $result->num_rows > 0) {
                // output data of each row
                while ($row = $result->fetch_assoc()) {
                    array_push($data, [
                        'id' => $row["id"],
                        'customer_id' => $row["customer_id"]
                    ]);
                }
                return $data;
            } else {
                $query = "INSERT INTO Cart (customer_id) VALUES ('$customer_id')";
                $this->db->query($query);
                $query = "SELECT * FROM Cart WHERE customer_id = '$customer_id'";
                $result = $this->db->query($query);
                if ($result && $result->num_rows > 0) {
                    // output data of each row
                    while ($row = $result->fetch_assoc()) {
                        array_push($data, [
                            'id' => $row["id"],
                            'customer_id' => $row["customer_id"]
                        ]);
                    }
                    return $data;
                }
            }
        }
        catch (Exception $e) {
            echo $e;
            return null;
        }
    }

    // Only use when Email is correct
    // return TRUE/FALSE
//    public function getEmail() {
//        $body = json_decode(file_get_contents('php://input'), true);
//        $email = $body['Email'];
//
//        try {
//            $query = "SELECT * FROM admin WHERE Email = '$email'";
//            $result = $this->db->query($query);
//
//            if (!$result) {
//                $query = "SELECT * FROM customer WHERE Email = '$email'";
//                $this->db->query($query);
//            }
//
//            if ($result->num_rows > 0) {
//                return true;
//            }
//        }
//        catch (Exception $e) {
//            return false;
//        }
//    }
}