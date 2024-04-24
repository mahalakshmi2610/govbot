<?php
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
header("Access-Control-Allow-Methods: POST");
header("Content-Type: application/json; charset=UTF-8");

// Start the session
session_start();

$data = json_decode(file_get_contents("php://input"));
// console.log($data);
$username = isset($data->uname) ? $data->uname : null;
$password = isset($data->pass) ? $data->pass : null;

// Your database connection code here
$con = mysqli_connect("localhost:3306", "root", "", "react-register");

if ($username && $password) {
    $query = "SELECT * FROM user WHERE username='$username'";
    $result = mysqli_query($con, $query);

    if (mysqli_num_rows($result) > 0) {
        $user = mysqli_fetch_assoc($result);
        // $storedHashedPassword = $user['password'];
      
        if ($user['password'] === $password) { // Check password as plain text
            $_SESSION['username'] = $username;
            $_SESSION['isLoggedIn'] = true;
            $response['status'] = 'success';
            echo json_encode($response); // Output only the JSON response
        } else {
            $response['status'] = 'error';
            $response['message'] = 'Invalid username or password.';
            echo json_encode($response); // Output only the JSON response
        }
    } else {
        $response['status'] = 'error';
        $response['message'] = 'User not found.';
        echo json_encode($response); // Output only the JSON response
    }
} else {
    $response['status'] = 'error';
    $response['message'] = 'Username or password not provided.';
    echo json_encode($response); // Output only the JSON response
}


// Close the database connection
mysqli_close($con);
?>
