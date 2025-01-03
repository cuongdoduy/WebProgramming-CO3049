<?php

/**
 *
 * This file is part of mvc-rest-api for PHP.
 *
 */

namespace MVC;

require '././System/Database/DatabaseAdapter.php';

class Model {

    /**
     * @var
     */
    public $db;

    /**
     *  Construct
     */
    public function __construct() {
        $this->db = new \Database\DatabaseAdapter(
            DATABASE['Driver'],
            DATABASE['Host'],
            DATABASE['User'],
            DATABASE['Pass'],
            DATABASE['Name'],
            DATABASE['Port']    
        );
        // Pagination
        $this->pagination = $GLOBALS['pagination'];
    }
    
}
