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
            $query = "SELECT * FROM admin WHERE Email = '$email' AND Password = '$password'";
            $result = $this->db->query($query);
            if (!$result)
                return null;

            if ($result && $result->num_rows > 0) {
                // If the admin is found

                    // output data of each row
                    while ($row = $result->fetch_assoc()) {
                        array_push($data, [
                            'Id' => $row["Id"],
                            'Email' => $row["Email"],
                            'Role' => $row["Role"]
                        ]);
                    }
                return $data;
            } else {
                $query = "SELECT * FROM customer WHERE Email = '$email' AND Password = '$password'";
                $result = $this->db->query($query);

                if ($result && $result->num_rows > 0) {
                    // output data of each row
                    while ($row = $result->fetch_assoc()) {
                        array_push($data, [
                            'Id' => $row["Id"],
                            'Email' => $row["Email"],
                            'Role' => $row["Role"]
                        ]);
                    }
                }
                return $data;
            }
        }
        catch (Exception $e) {
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