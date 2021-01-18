<?php 
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Methods: HEAD, GET, POST, PUT, PATCH, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method,Access-Control-Request-Headers, Authorization");
header('Content-Type: application/json');

include("./connection.php");

 $request_method = $_SERVER['REQUEST_METHOD'];

  switch($request_method){
    case 'GET':
		fetchUsers();
		break;	
	case 'POST':
		login();
		break;
	case 'OPTIONS':
		header('Access-Control-Allow-Origin: *');
		header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method,Access-Control-Request-Headers, Authorization");
		// header("HTTP/1.1 200 OK");
		die();
    default:
        header('HTTP/1.0 405 Method Not Allowed');
        break;
  }
  
  function fetchUsers(){
	  global $con;
	  if($con){
			$sql = "SELECT * FROM user";
			$data = mysqli_query($con,$sql);
			$rows=array();
			while($r=mysqli_fetch_assoc($data)){
		  		$rows[]=$r;
		 	 }
		  echo json_encode($rows,JSON_PRETTY_PRINT);
		 }
  }
  function login(){
	global $con;
	$rest_json = file_get_contents("php://input");
	$_POST = json_decode($rest_json, true); 

	$email = $_POST['email'];
	$password = $_POST['password'];

	if($con) {
		$sql = "SELECT email, password,auth_key,username FROM user WHERE email='$email' and password='$password'";
		$data = mysqli_query($con,$sql);

		$result = $data->fetch_array(MYSQLI_ASSOC);
		
		if($result != null){
		 	echo json_encode($result);

		} else {
			
			http_response_code(400);
			echo json_encode($result);
		}	
	} 
}
	
?>