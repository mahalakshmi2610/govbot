<?php
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
header("Access-Control-Allow-Methods: POST");
header("Content-Type: application/json; charset=UTF-8");

session_start();

$data = json_decode(file_get_contents("php://input"));

$username = isset($data->username) ? $data->username : null;
$password = isset($data->password) ? $data->password : null;

// $hashedPassword = password_hash($password, PASSWORD_DEFAULT);

$con = mysqli_connect("localhost:3306", "root", "", "react-register");

if($username && $password){
    $sql = "INSERT INTO user(username, password) VALUES ('$username', '$password')";
    $result = mysqli_query($con, $sql);

    if($result){

        $_SESSION['username'] = $username;

        $response['status'] = 'valid';
        echo json_encode($response);
    }
    else{
        $response['status'] = 'invalid';
        echo json_encode($response);
    }
}
?>
