<?php 

require './System/MVC/Model.php';
use MVC\Model;



////////////////////////////////////////////////////////////////////////////////////
//                                                                                //
//    Naming Convention: Model Class must follow the format: Models{Modelname}    //
//                                                                                //
////////////////////////////////////////////////////////////////////////////////////

class ModelsProducts extends Model {

    public function getAllProducts($param) {
        // sql statement
        $query = "SELECT * FROM product";

        // pagination
        $this->pagination->total = $this->getCountProducts();

        if (isset($param['page']) && is_numeric($param['page'])) {
            $this->pagination->page = (int) $param['page'];
        } else {
            $this->pagination->page = 1;
        }

        // render page data
        $page_data = $this->pagination->render();  
        $offset = ($this->pagination->page - 1) * $page_data['limit']; 

        $query .= " ORDER BY ProductID ASC LIMIT ". $page_data['limit'] . " OFFSET $offset" ;

        // exec query
        $result = $this->db->query($query);
        $data = array();

        if ($result->num_rows > 0) {
            // output data of each row
            while($row = $result->fetch_assoc()) { 
                array_push($data, [
                    'id' => $row["ProductID"],
                    'name' => $row["ProductName"],
                    'price' => $row["Price"],
                    'description' => $row["Description"],
                    'cartID' => $row["cart_ID"],
                    'status' => $row["Status"],
                    'adminID' => $row["AdminID"],
                    'img' => $row["image"],
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

    public function createProduct() {
        $body = json_decode(file_get_contents('php://input'), true);
        $name = isset($body['name']) ? $body['name'] : '';
        $price = isset($body['price']) ? $body['price'] : '';
        $description = isset($body['description']) ? $body['description'] : '';
        $status = isset($body['status']) ? $body['status'] : '';
        $adminID = isset($body['adminID']) ? $body['adminID'] : '';
        $image = isset($body['image']) ? $body['image'] : '';
        
        if ($name == '' || $price == '' || $description == '' || $status == '' || $adminID == '' || $image == '') {
            return ['status' => 400,
                'details' => [
                    'message' => 'All fields are required'
                ]
            ];
        }

        try {
            $query = "INSERT INTO product (ProductName, Price, Description, Status, AdminID, image) VALUES ('$name', $price, '$description', '$status', $adminID, '$image')";
            echo $query;
            $this->db->query($query);
            return ['status' => 200,
                'details' => [
                    'message' => 'Product created successfully'
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

    private function getCountProducts() {
        $query = $this->db->query("SELECT COUNT(*) as total FROM product");
        return ($query->num_rows > 0) ? (int) $query->fetch_assoc()['total'] : 0;
    }
}
