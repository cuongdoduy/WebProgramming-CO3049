<?php 

require './System/MVC/Model.php';
use MVC\Model;



////////////////////////////////////////////////////////////////////////////////////
//                                                                                //
//    Naming Convention: Model Class must follow the format: Models{Modelname}    //
//                                                                                //
////////////////////////////////////////////////////////////////////////////////////

class ModelsCart extends Model {

    public function addToCart($param) {

        $cart_id = $param['id'];

        $body = json_decode(file_get_contents('php://input'), true);

        $product_id = $body['product_id'];
        $quantity = $body['quantity'];

        $query = "INSERT INTO Cart_item (cart_id, product_id, quantity) VALUES ('$cart_id', '$product_id', '$quantity')";
        $result = $this->db->query($query);

        if ($result) {
            return [
                'status' => 200,
                'details' => [
                    'message' => 'Product added to cart successfully'
                ]
            ];
        } else {
            return [
                'status' => 400,
                'details' => [
                    'message' => 'Failed to add product to cart'
                ]
            ];
        }
    }

    public function getCart($cart_id) {
        $query = "SELECT 
    p.id, 
    p.product_name AS name, 
    p.price, 
    p.description, 
    p.status, 
    p.slug,
    p.cover AS img,
    ci.quantity,
    COALESCE(p.discount, 0) AS discount, 
    COUNT(r.id) AS total_ratings, 
    COALESCE(AVG(r.star), 5) AS average_rating
FROM 
    Cart_item ci 
JOIN 
    Product p ON ci.product_id = p.id
LEFT JOIN 
    Comment r ON p.id = r.product_id
WHERE 
    ci.cart_id = '$cart_id'
GROUP BY 
    p.id, p.product_name, p.price, p.description, p.status, p.cover, p.discount, p.slug
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
                    'average_rating' => round((float) $row["average_rating"], 2),
                    'quantity' => (int) $row["quantity"]

                ];
            }
        }
        
        return [
            'status' => 200,
            'details' => $data
        ];
    }

    public function updateCart($param) {

        $cart_id = $param['id'];

        $body = json_decode(file_get_contents('php://input'), true);

        $product_id = $body['product_id'];
        $quantity = $body['quantity'];

        $query = "UPDATE Cart_item SET quantity = '$quantity' WHERE product_id = '$product_id' AND cart_id = '$cart_id'";
        $result = $this->db->query($query);

        if ($result) {
            return [
                'status' => 200,
                'details' => [
                    'message' => 'Cart updated successfully'
                ]
            ];
        } else {
            return [
                'status' => 400,
                'details' => [
                    'message' => 'Failed to update cart'
                ]
            ];
        }
    }

    public function deleteItemFromCart($param) {

        $cart_id = $param['id'];

        $body = json_decode(file_get_contents('php://input'), true);

        $product_id = $body['product_id'];

        $query = "DELETE FROM Cart_item WHERE product_id = '$product_id' AND cart_id = '$cart_id'";
        $result = $this->db->query($query);

        if ($result) {
            return [
                'status' => 200,
                'details' => [
                    'message' => 'Item deleted from cart successfully'
                ]
            ];
        } else {
            return [
                'status' => 400,
                'details' => [
                    'message' => 'Failed to delete item from cart'
                ]
            ];
        }
    }

}
