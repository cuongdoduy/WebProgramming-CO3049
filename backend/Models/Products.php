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

    public function searchByName($param) {
        $query = "SELECT * FROM product WHERE ProductName LIKE '%". $param['name'] ."%'";
        
        // total data find
        $total = $this->db->query("SELECT COUNT(*) as total from product WHERE ProductName LIKE '%". $param['name'] ."%'");
    
        // pagination
        $this->pagination->total = ($total->num_rows > 0) ? (int) $total->fetch_assoc()['total'] : 0;

        // check valid page
        if (isset($param['page']) && is_numeric($param['page'])) {
            $this->pagination->page = (int) $param['page'];
        } else {
            $this->pagination->page = 1;
        }

        // render page data
        $page_data = $this->pagination->render();  
        $offset = ($this->pagination->page - 1) * $page_data['limit'];

        // read products with limit of page
        $query .= " ORDER BY ProductID ASC LIMIT " . $offset . ", " . $page_data['limit'];
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
            return ['status' => 200,
                'details' => [
                    'message' => 'Found 0 product'
                ]
            ];
        }

        return [
            'status' => 200,
            'details' => [
                'data' => $data,
                'pagination' => $page_data
            ]
        ];
    }

    public function getProduct($param) {
        $id = isset($param['id']) ? $param['id'] : '';
        if ($id == '' || !is_numeric($id)) {
            return ['status' => 400,
                'details' => [
                    'message' => 'Product ID is required or invalid'
                ]
            ];
        }

        $query = "SELECT * FROM product WHERE ProductID = $id";
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
            return ['status' => 400,
                'details' => [
                    'message' => 'Product not found'
                ]
            ];
        }
        
        return [
            'status' => 200,
            'details' => [
                'data' => $data
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

    public function updateProduct($param) {
        $id = isset($param['id']) ? $param['id'] : '';
        if ($id == '') {
            return ['status' => 400,
                'details' => [
                    'message' => 'Product ID is required'
                ]
            ];
        }

        $body = json_decode(file_get_contents('php://input'), true);
        $name = isset($body['name']) ? $body['name'] : '';
        $price = isset($body['price']) ? $body['price'] : '';
        $description = isset($body['description']) ? $body['description'] : '';
        $status = isset($body['status']) ? $body['status'] : '';
        $adminID = isset($body['adminID']) ? $body['adminID'] : '';
        $image = isset($body['image']) ? $body['image'] : '';
        
        if ($name == '' && $price == '' && $description == '' && $status == '' && $adminID == '' && $image == '') {
            return ['status' => 400,
                'details' => [
                    'message' => 'Please provide at least one field to update'
                ]
            ];
        }

        if (!$this->checkProduct($id)) {
            return ['status' => 400,
                'details' => [
                    'message' => 'Product not found'
                ]
            ];
        }

        try {
            // create query for the case where not all field is updated
            $query = "UPDATE product SET ";
            $query .= ($name != '') ? "ProductName = '$name', " : "";
            $query .= ($price != '') ? "Price = $price, " : "";
            $query .= ($description != '') ? "Description = '$description', " : "";
            $query .= ($status != '') ? "Status = '$status', " : "";
            $query .= ($adminID != '') ? "AdminID = $adminID, " : "";
            $query .= ($image != '') ? "image = '$image' " : "";
            $query .= "WHERE ProductID = $id";

            $this->db->query($query);
            return ['status' => 200,
                'details' => [
                    'message' => 'Product updated successfully'
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

    public function deleteProduct($param) {
        $id = isset($param['id']) ? $param['id'] : '';
        if ($id == '') {
            return ['status' => 400,
                'details' => [
                    'message' => 'Product ID is required'
                ]
            ];
        }

        if (!$this->checkProduct($id)) {
            return ['status' => 400,
                'details' => [
                    'message' => 'Product not found'
                ]
            ];
        }

        try {
            $query = "DELETE FROM product WHERE ProductID = $id";
            $this->db->query($query);
            return ['status' => 200,
                'details' => [
                    'message' => 'Product deleted successfully'
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

    public function deleteMultipleProducts() {
        $body = json_decode(file_get_contents('php://input'), true);
        $ids = isset($body['ids']) ? $body['ids'] : '';
        if ($ids == '' || $ids == []) {
            return ['status' => 400,
                'details' => [
                    'error' => 'Product IDs are required',
                    'message' => 'ids fields must be specified in the request body'
                ]
            ];
        }

        $query = "DELETE FROM product WHERE ProductID IN (". implode(',', $ids) .")";
        $this->db->query($query);
        return ['status' => 200,
            'details' => [
                'message' => 'Products deleted successfully'
            ]
        ];
    }

    private function checkProduct($id) {
        $query = $this->db->query("SELECT * FROM product WHERE ProductID = $id");
        return ($query->num_rows > 0);
    }

    private function getCountProducts() {
        $query = $this->db->query("SELECT COUNT(*) as total FROM product");
        return ($query->num_rows > 0) ? (int) $query->fetch_assoc()['total'] : 0;
    }
}
