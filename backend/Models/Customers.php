<?php 

require './System/MVC/Model.php';
use MVC\Model;



////////////////////////////////////////////////////////////////////////////////////
//                                                                                //
//    Naming Convention: Model Class must follow the format: Models{Modelname}    //
//                                                                                //
////////////////////////////////////////////////////////////////////////////////////

class ModelsCustomers extends Model {

    public function getAllCustomers($param) {
        // sql statement
        $query = "SELECT * FROM customer";

        // pagination
        $this->pagination->total = $this->getCountCustomers();

        if (isset($param['page']) && is_numeric($param['page'])) {
            $this->pagination->page = (int) $param['page'];
        } else {
            $this->pagination->page = 1;
        }

        // render page data
        $page_data = $this->pagination->render();  
        $offset = ($this->pagination->page - 1) * $page_data['limit']; 

        $query .= " ORDER BY UserID ASC LIMIT ". $page_data['limit'] . " OFFSET $offset" ;

        // exec query
        $result = $this->db->query($query);
        $data = array();

        if ($result->num_rows > 0) {
            // output data of each row
            while($row = $result->fetch_assoc()) { 
                array_push($data, [
                    'id' => $row["UserID"],
                    'name' => $row["Name"],
                    'role' => $row["Role"],
                    'address' => $row["Address"],
                    'email' => $row["Email"],
                    'password' => $row["Password"],
                    'adminID' => $row["AdminID"],
                ]);
            }
          } else {
            echo "0 results";
        }
        
        return [
            'status' => 200,
            'details' => [
                'data' => $data,
                'pagination' => $page_data
            ]
        ];
    }

    public function getCustomer($param) {
        $id = isset($param['id']) ? $param['id'] : '';
        if ($id == '') {
            return [
                'status' => 400,
                'details' => [
                    'message' => 'Customer ID is required'
                ]
            ];
        }
    
        $query = "SELECT * FROM customer WHERE id = $id";
        $result = $this->db->query($query);
    
        if ($result->num_rows > 0) {
            // Fetch the first row as an object
            $row = $result->fetch_assoc();
    
            $data = [
                'id' => $row["id"],
                'name' => $row["name"],
                'address' => $row["address"],
                'email' => $row["email"],
                'phone_number' => $row["phone_number"]
            ];
    
            return [
                'status' => 200,
                'details' => [
                    'data' => $data
                ]
            ];
        } else {
            return [
                'status' => 400,
                'details' => [
                    'message' => 'Customer not found'
                ]
            ];
        }
    }
    

    public function createCustomer() {
        $body = json_decode(file_get_contents('php://input'), true);
        
        $name = isset($body['name']) ? $body['name'] : '';
        $role = isset($body['role']) ? $body['role'] : '';
        $address = isset($body['address']) ? $body['address'] : '';
        $email = isset($body['email']) ? $body['email'] : '';
        $password = isset($body['password']) ? $body['password'] : '';
//        $adminID = isset($body['adminID']) ? $body['adminID'] : '';
        
        if ($name == '' || $role == '' || $address == '' || $email == '' || $password == '') {
            return ['status' => 400,
                'details' => [
                    'message' => 'All fields are required'
                ]
            ];
        }

        try {
            $query = "INSERT INTO customer (Name, Role, Address, Email, Password) VALUES ('$name', '$role', '$address', '$email', '$password')";
            $this->db->query($query);
            return ['status' => 200,
                'details' => [
                    'message' => 'Customer created successfully'
                ]
            ];
        } catch (Exception $e) {
            return ['status' => 400,
                'details' => [
                    'message' => 'Error: ' . $e->getMessage()
                ]
            ];
        }
    }

    public function updateCustomer($param) {
        $id = isset($param['id']) ? $param['id'] : '';
        if ($id == '') {
            return ['status' => 400,
                'details' => [
                    'message' => 'Customer ID is required'
                ]
            ];
        }

        $body = json_decode(file_get_contents('php://input'), true);
        $name = isset($body['name']) ? $body['name'] : '';
        $address = isset($body['address']) ? $body['address'] : '';
        $email = isset($body['email']) ? $body['email'] : '';
        $phone = isset($body['phone']) ? $body['phone'] : '';

        if (!$this->checkCustomer($id)) {
            return ['status' => 400,
                'details' => [
                    'message' => 'Customer not found'
                ]
            ];
        }

        try {
            // create query for the case not all field is updated
            $query = "UPDATE Customer SET ";
$query .= "name = '$name', ";
$query .= "address = '$address', ";
$query .= "email = '$email', ";
$query .= "phone_number = '$phone' ";
$query .= "WHERE id = $id";

            $this->db->query($query);
            return ['status' => 200,
                'details' => [
                    'message' => 'Customer updated successfully'
                ]
            ];
        } catch (Exception $e) {
            return ['status' => 400,
                'details' => [
                    'message' => 'Error: ' . $e->getMessage()
                ]
            ];
        }
    }

    public function deleteCustomer($param) {
        $id = isset($param['id']) ? $param['id'] : '';
        if ($id == '') {
            return ['status' => 400,
                'details' => [
                    'message' => 'Customer ID is required'
                ]
            ];
        }

        if (!$this->checkCustomer($id)) {
            return ['status' => 400,
                'details' => [
                    'message' => 'Customer not found'
                ]
            ];
        }

        try {
            $query = "DELETE FROM customer WHERE UserID = $id";
            $this->db->query($query);
            return ['status' => 200,
                'details' => [
                    'message' => 'Customer deleted successfully'
                ]
            ];
        } catch (Exception $e) {
            return ['status' => 400,
                'details' => [
                    'message' => 'Error: ' . $e->getMessage()
                ]
            ];
        }
    }

    public function deleteMultipleCustomers() {
      $body = json_decode(file_get_contents('php://input'), true);
        $ids = isset($body['ids']) ? $body['ids'] : '';
        if ($ids == '' || $ids == []) {
            return ['status' => 400,
                'details' => [
                    'error' => 'Customer IDs are required',
                    'message' => 'ids fields must be specified in the request body'
                ]
            ];
        }

        $query = "DELETE FROM customer WHERE UserID IN (". implode(',', $ids) .")";
        $this->db->query($query);
        return ['status' => 200,
            'details' => [
                'message' => 'Customers deleted successfully'
            ]
        ];
    }

    private function checkCustomer($id) {
        $query = $this->db->query("SELECT * FROM Customer WHERE id = $id");
        return ($query->num_rows > 0);
    }

    private function getCountCustomers() {
        $query = $this->db->query("SELECT COUNT(*) as total FROM customer");
        return ($query->num_rows > 0) ? (int) $query->fetch_assoc()['total'] : 0;
    }

    public function getCustomerWishlist($user_id) {
      
        $query = "SELECT 
    p.id, 
    p.product_name AS name, 
    p.price, 
    p.description, 
    p.status, 
    p.slug,
    p.cover AS img, 
    COALESCE(p.discount, 0) AS discount, 
    COUNT(r.id) AS total_ratings, 
    COALESCE(AVG(r.star), 5) AS average_rating
FROM 
    Wishlist w
JOIN 
    Product p ON w.product_id = p.id
LEFT JOIN 
    Comment r ON p.id = r.product_id
WHERE 
    w.user_id = '$user_id' AND w.deleted_at IS NULL AND p.deleted_at IS NULL
GROUP BY 
    p.id, p.product_name, p.price, p.description, p.status, p.cover, p.discount, p.slug;
";
        $result = $this->db->query($query);
        $data = [];
    
        if ($result && $result->num_rows > 0) {
            while ($row = $result->fetch_assoc()) {
                $data[] = [
                    'id' => (int) $row["id"],
                    'name' => $row["name"],
                    'price' => (float) $row["price"],
                    'description' => $row["description"],
                    'status' => $row["status"],
                    'slug' => $row["slug"], 
                    'img' => $row["img"],
                    'discount' => (int) $row["discount"],
                    'total_ratings' =>(int) $row["total_ratings"],
                    'average_rating' => round((float) $row["average_rating"], 2)
                ];
            }
        }
        return [
            'status' => 200,
            'details' => [
                'data' => $data
            ]
        ];
    }

    public function changePassword($param) {
        $body = json_decode(file_get_contents('php://input'), true);
        $user_id = isset($param['id']) ? $param['id'] : '';
        $old_password = isset($body['old_password']) ? $body['old_password'] : '';
        $new_password = isset($body['new_password']) ? $body['new_password'] : '';
        $confirm_password = isset($body['confirm_password']) ? $body['confirm_password'] : '';
    
        if ($user_id == '' || $old_password == '' || $new_password == '' || $confirm_password == '') {
            return [
                'status' => 400,
                'details' => [
                    'message' => 'All fields are required'
                ]
            ];
        }
    
        if ($new_password != $confirm_password) {
            return [
                'status' => 400,
                'details' => [
                    'message' => 'New password and confirm password do not match'
                ]
            ];
        }
    
        $query = "SELECT * FROM Customer WHERE id = $user_id AND password = '$old_password'";
        $result = $this->db->query($query);
    
        if ($result->num_rows > 0) {
            $query = "UPDATE Customer SET password = '$new_password' WHERE id = $user_id";
            $this->db->query($query);
    
            return [
                'status' => 200,
                'details' => [
                    'message' => 'Password changed successfully'
                ]
            ];
        } else {
            return [
                'status' => 400,
                'details' => [
                    'message' => 'Invalid old password'
                ]
            ];
        }
    }

//     public function getCustomerOrders($user_id) {
//         $query = "SELECT
//     o.id AS order_id,
//     p.id AS product_id,
//     p.product_name AS name,
//     p.price,
//     p.description,
//     p.status,
//     p.slug,
//     p.cover AS img,
//     ci.quantity,
//     COALESCE(p.discount, 0) AS discount
// FROM
//     `Order` o
// JOIN
//     Order_item ci ON o.id = ci.order_id
// LEFT JOIN
//     Product p ON ci.product_id = p.id
// WHERE
//     o.customer_id = '$user_id' -- Replace '1' with the actual customer ID or keep it if '1' is the intended ID
// AND
//     o.deleted_at IS NULL -- Ensure to filter out soft-deleted orders if applicable
// ORDER BY
//     o.created_at DESC;

//     ";

//         $result = $this->db->query($query);
//         $data = [];

// if ($result && $result->num_rows > 0) {
//     while ($row = $result->fetch_assoc()) {
//         $orderId = (int) $row["order_id"];

//         // Initialize the order_id key if it doesn't exist
//         if (!isset($data[$orderId])) {
//             $data[$orderId] = [
//                 'order_id' => $orderId,
//                 'products' => []
//             ];
//         }

//         // Add the product to the 'products' array
//         $data[$orderId]['products'][] = [
//             'id' => (int) $row["product_id"],
//             'name' => $row["name"],
//             'price' => (float) $row["price"],
//             'description' => $row["description"],
//             'status' => $row["status"],
//             'slug' => $row["slug"], 
//             'img' => $row["img"],
//             'discount' => (int) $row["discount"],
//             'quantity' => (int) $row["quantity"]
//         ];
//     }
// }

// // Reindex the array to return a numerically indexed array (optional)
// $data = array_values($data);


//         // return to array of orders and its details



//         return [
//             'status' => 200,
//             'details' => [
//                 'data' => $data
//             ]
//         ];

//     }

    public function getCustomerOrders($user_id) {
        $query = "SELECT
    o.id AS order_id,
    o.status,
    o.created_at,
    COALESCE(SUM(p.price * ci.quantity), 0) AS total_price
FROM
    `Order` o
JOIN
    Order_item ci ON o.id = ci.order_id
LEFT JOIN
    Product p ON ci.product_id = p.id
WHERE
    o.customer_id = '$user_id'
AND
    o.deleted_at IS NULL
GROUP BY
    o.id, o.status, o.created_at
ORDER BY
    o.created_at DESC;
";

        $result = $this->db->query($query);
        $data = [];

if ($result && $result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $data[] = [
            'order_id' => (int) $row["order_id"],
            'status' => $row["status"],
            'created_at' => $row["created_at"],
            'total_price' => (float) $row["total_price"]
        ];
    }
}

        return [
            'status' => 200,
            'details' => [
                'data' => $data
            ]
        ];

    }


    
    
}
