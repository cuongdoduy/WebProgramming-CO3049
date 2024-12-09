<?php 

require './System/MVC/Model.php';
use MVC\Model;



////////////////////////////////////////////////////////////////////////////////////
//                                                                                //
//    Naming Convention: Model Class must follow the format: Models{Modelname}    //
//                                                                                //
////////////////////////////////////////////////////////////////////////////////////

class ModelsTags extends Model {

    public function getAllTags() {
        $query = "SELECT * FROM Tags";
        $result = $this->db->query($query);
        $data = [];
        if ($result && $result->num_rows > 0) {
            while ($row = $result->fetch_assoc()) {
                $data[] = [
                    'id' => (int) $row["id"],
                    'name' => $row["name"],
                    'description' => $row["description"]
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

    private function getCountProducts() {
        $query = $this->db->query("SELECT COUNT(*) as total FROM product");
        return ($query->num_rows > 0) ? (int) $query->fetch_assoc()['total'] : 0;
    }

    public function getTagById($tag_id) {
        $query = "SELECT
    p.id AS product_id,
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
    Product p
LEFT JOIN
    Comment r
ON
    p.id = r.product_id
JOIN
    Tag_item pt
ON
    p.id = pt.product_id
WHERE
    pt.tag_id = '$tag_id'
GROUP BY
    p.id, p.product_name, p.price, p.description, p.status, p.slug, p.cover, p.discount
ORDER BY
    p.id DESC";
        $result = $this->db->query($query);
        $data = [];
        if ($result && $result->num_rows > 0) {
            while ($row = $result->fetch_assoc()) {
                $data[] = [
                    'id' => (int) $row["product_id"],
                    'name' => $row["name"],
                    'price' => (float) $row["price"],
                    'description' => $row["description"],
                    'status' => $row["status"],
                    'slug' => $row["slug"],
                    'img' => $row["img"],
                    'discount' => (int) $row["discount"],
                    'total_ratings' => (int) $row["total_ratings"],
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
}