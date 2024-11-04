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
        
        return $data;
    }

    public function createProduct() {
        // $post = json_decode(file_get_contents('php://input'), true);

        $query = "INSERT INTO product (ProductName, Price, Description, cart_ID, Status, AdminID, image) VALUES ('New Product', 0, 'New Product', 0, 1, 0, 'default.jpg')";

        if ($this->db->query($query) === TRUE) {
            return ['message' => 'New record created successfully'];
        } else {
            return ['message' => 'Error: ' . $query . '<br>' . $this->db->error];
        }
    }


    private function getCountProducts() {
        $query = $this->db->query("SELECT COUNT(*) as total FROM product");


        return ($query->num_rows > 0) ? (int) $query->fetch_assoc()['total'] : 0;
    }
}
