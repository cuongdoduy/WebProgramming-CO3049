<?php 

require './System/MVC/Model.php';
use MVC\Model;



////////////////////////////////////////////////////////////////////////////////////
//                                                                                //
//    Naming Convention: Model Class must follow the format: Models{Modelname}    //
//                                                                                //
////////////////////////////////////////////////////////////////////////////////////

class ModelsWishlist extends Model {

    public function createWishlist() {
        $body = json_decode(file_get_contents('php://input'), true);
        /// Here is the body of JSON request
        /// {
        //    "email": "admin@example.com",
        //    "password": "adminpassword"
        //  }
        $product_id = $body['product_id'];
        $customer_id = $body['customer_id'];

        //Check if product already exists in wishlist but in state of deleted
        $query = "SELECT * FROM Wishlist WHERE product_id = '$product_id' AND user_id = '$customer_id'";
        $result = $this->db->query($query);

        if ($result && $result->num_rows > 0) {
            $query = "UPDATE Wishlist SET deleted_at = NULL WHERE product_id = '$product_id' AND user_id = '$customer_id'";
            $result = $this->db->query($query);

            if ($result) {
                return [
                    'status' => 200,
                    'details' => [
                        'message' => 'Wishlist created successfully'
                    ]
                ];
            } else {
                return [
                    'status' => 400,
                    'details' => [
                        'message' => 'Failed to create wishlist'
                    ]
                ];
            }
        }

        $data = array();

        $query = "INSERT INTO Wishlist (product_id, user_id) VALUES ('$product_id', '$customer_id')";
        $result = $this->db->query($query);

        if ($result) {
            return [
                'status' => 200,
                'details' => [
                    'message' => 'Wishlist created successfully'
                ]
            ];
        } else {
            return [
                'status' => 400,
                'details' => [
                    'message' => 'Failed to create wishlist'
                ]
            ];
        }
            
    }

    public function deleteWishlist($param) {

        $body = json_decode(file_get_contents('php://input'), true);
        
        $product_id = $body['product_id'];
        $customer_id = $body['customer_id'];


        $query = "UPDATE Wishlist SET deleted_at = NOW() WHERE product_id = '$product_id' AND user_id = '$customer_id'";
        $result = $this->db->query($query);

        if ($result) {
            return [
                'status' => 200,
                'details' => [
                    'message' => 'Wishlist deleted successfully'
                ]
            ];
        } else {
            return [
                'status' => 400,
                'details' => [
                    'message' => 'Failed to delete wishlist'
                ]
            ];
        }
    }

}
