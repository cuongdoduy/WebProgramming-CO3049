<?php

/**
 *
 * This file is part of mvc-rest-api for PHP.
 *
 */
namespace Database\DB;

/**
 *  Global Class MySQLi
 */
class MySQLi {

    /**
     * @var
     */
    private $mysqli = null;

    /**
     *  Construct, create opject of MySQLi class
     */
    public function __construct($hostname, $username, $password, $database, $port) {
      $this->mysqli = new \mysqli($hostname, $username, $password, $database, $port);
      if ($this->mysqli->connect_error) {
        die('Connect Error (' . $this->mysqli->connect_errno . ') ' . $this->mysqli->connect_error);
      }

        // set default setting database

    }
    
    public function query($sql) {
      $result = $this->mysqli->query($sql);
      return $result;
    }

    public function getLastId() {
        return $this->mysqli->insert_id;
    }

    /**
     *  claen data
     */
    public function escape($value) {
        $search = array("\\", "\0", "\n", "\r", "\x1a", "'", '"');
        $replace = array("\\\\", "\\0", "\\n", "\\r", "\Z", "\'", '\"');
        return str_replace($search, $replace, $value);
    }

    public function __destruct() {
        $this->mysqli = null;
    }
}
