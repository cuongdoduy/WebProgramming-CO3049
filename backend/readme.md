# Setup

Make sure xampp is running with database open. Put backend folder in xampp's root folder


# Config

Change database config at `config.php`
	
	define('DATABASE', [
		'Port' => '3306',
		'Host' => 'localhost',
		'Driver' => 'PDO',
		'Name' => 'shopping',
		'User' => 'root',
		'Pass' => '',
		'Prefix' => ''	
	]);

## Create database

> import the script in `SQL` to create database

## File structure
### System
> Define Classes for MVC model and Database connection

**!!! Do not touch the folder unless you know what you are doing !!!**
### Controllers
> Control how data should be handled
+ Define Controllers here extend the class Controller
+ Example: `class  Products  extends  Controller {}`
### Models
>Interact with database, define data logic
+ Naming Convention: Model Class must follow the format:  `Models{Modelname}`
+ Model must extend the Model class
+ Example: `class  ModelsProducts  extends  Model {}`
### Router 
> Define routes for our app
+ When define a route, ones must follow the format:
 `$router->[CRUD method]('/path:{params}', 'Controller@ControllerMethod');`

+ Example: `$router->get('/all', 'Products@getAllProducts');`
