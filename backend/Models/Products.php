<?php 

require './System/MVC/Model.php';
use MVC\Model;



////////////////////////////////////////////////////////////////////////////////////
//                                                                                //
//    Naming Convention: Model Class must follow the format: Models{Modelname}    //
//                                                                                //
////////////////////////////////////////////////////////////////////////////////////

class ModelsProducts extends Model {

    public function getAllProducts() {
        // sql statement
        $query = "SELECT * FROM products";

        // exec query
        $result = $this->db->query($query);
        $data = array();

        if ($result->num_rows > 0) {
            // output data of each row
            while($row = $result->fetch_assoc()) { 
                array_push($data, [
                    'id' => $row["id"],
                    'name' => $row["name"],
                    'price' => $row["price"],
                    'description' => $row["description"],
                ]);
            }
          } else {
            echo "0 results";
        }
        
        return $data;
    }
}
