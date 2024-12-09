<?php 

require './System/MVC/Model.php';
use MVC\Model;



////////////////////////////////////////////////////////////////////////////////////
//                                                                                //
//    Naming Convention: Model Class must follow the format: Models{Modelname}    //
//                                                                                //
////////////////////////////////////////////////////////////////////////////////////

class ModelsOrder extends Model {

    public function createOrder($param) {

        $body = json_decode(file_get_contents('php://input'), true);

        $cart_id = $body['cart_id'];

        $customer_id = $body['customer_id'];
        $first_name = $body['first_name'];
        $last_name = $body['last_name'];
        $street_address = $body['street_address'];
        $apartment_floor = $body['apartment_floor'];
        $town_city = $body['town_city'];
        $phone_number = $body['phone_number'];
        $email_address = $body['email_address'];
        $status = 'Pending';

        $query = "INSERT INTO `Order` (customer_id, first_name, last_name, street_address, apartment_floor, town_city, phone_number, email_address, status) VALUES ('$customer_id', '$first_name', '$last_name', '$street_address', '$apartment_floor', '$town_city', '$phone_number', '$email_address', '$status')";
        $result = $this->db->query($query);

        if ($result) {
            $order_id = $this->db->getLastId();
            $query = "INSERT INTO Order_item (order_id, product_id, quantity) SELECT '$order_id', product_id, quantity FROM Cart_item WHERE cart_id = '$cart_id'";
            $result = $this->db->query($query);

            if ($result) {
                $query = "DELETE FROM Cart_item WHERE cart_id = '$cart_id'";
                $result = $this->db->query($query);

                if ($result) {
                    return [
                        'status' => 200,
                        'details' => [
                            'message' => 'Order created successfully'
                        ]
                    ];
                } else {
                    return [
                        'status' => 400,
                        'details' => [
                            'message' => 'Failed to create order'
                        ]
                    ];
                }
            } else {
                return [
                    'status' => 400,
                    'details' => [
                        'message' => 'Failed to create order'
                    ]
                ];
            }
        } else {
            return [
                'status' => 400,
                'details' => [
                    'message' => 'Failed to create order'
                ]
            ];
        }
    }
}
