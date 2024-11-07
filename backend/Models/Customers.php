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
            return ['status' => 400,
                'details' => [
                    'message' => 'Customer ID is required'
                ]
            ];
        }

        $query = "SELECT * FROM customer WHERE UserID = $id";
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
            return ['status' => 400,
                'details' => [
                    'message' => 'Customer not found'
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
        $role = isset($body['role']) ? $body['role'] : '';
        $address = isset($body['address']) ? $body['address'] : '';
        $email = isset($body['email']) ? $body['email'] : '';
        $password = isset($body['password']) ? $body['password'] : '';
        $adminID = isset($body['adminID']) ? $body['adminID'] : '';
        
        if ($name == '' && $role == '' && $address == '' && $email == '' && $password == '' && $adminID == '') {
            return ['status' => 400,
                'details' => [
                    'message' => 'At least one field is required'
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
            // create query for the case not all field is updated
            $query = "UPDATE customer SET ";
            $query .= ($name != '') ? "Name = '$name', " : "";
            $query .= ($role != '') ? "Role = '$role', " : "";
            $query .= ($address != '') ? "Address = '$address', " : "";
            $query .= ($email != '') ? "Email = '$email', " : "";
            $query .= ($password != '') ? "Password = '$password', " : "";
            $query .= ($adminID != '') ? "AdminID = $adminID, " : "";
            $query .= "WHERE UserID = $id";
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
        $query = $this->db->query("SELECT * FROM customer WHERE UserID = $id");
        return ($query->num_rows > 0);
    }

    private function getCountCustomers() {
        $query = $this->db->query("SELECT COUNT(*) as total FROM customer");
        return ($query->num_rows > 0) ? (int) $query->fetch_assoc()['total'] : 0;
    }
}
