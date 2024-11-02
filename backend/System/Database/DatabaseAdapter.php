<?php

/**
 *
 * This file is part of mvc-rest-api for PHP.
 *
 */
namespace Database;

require 'DB/PDO.php';
require 'DB/MySQLi.php';

class DatabaseAdapter {
    
    /**
     *  Database Connection
     *
     * @var
     */
    private $dbConnection;

    /**
     * Database constructor. set connection driver [pdo, mysqli, mysql,...]
     *
     * @param $driver
     * @param $hostname
     * @param $username
     * @param $password
     * @param $database
     */   
    public function __construct($driver, $hostname, $username, $password, $database, $port) {
        if ($driver == 'PDO') {
            $this->dbConnection = new DB\PDO($hostname, $username, $password, $database, $port);
        } else {
            $this->dbConnection = new DB\MySQLi($hostname, $username, $password, $database, $port);
        }
    }

    /**
     * @param $sql
     * @return mixed
     */
    public function query($sql) {
        return $this->dbConnection->query($sql);
    }

    /**
     * @param $value
     * @return mixed
     */
    public function escape($value) {
        return $this->dbConnection->escape($value);
    }

    /**
     * @return mixed
     */
    public function getLastId() {
        return $this->dbConnection->getLastId();
    }
}
