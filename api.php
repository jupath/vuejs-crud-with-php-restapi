<?php
/*
* CREATE DB CONNECTION
*/
$conn = new mysqli("localhost", "root", "", "vuephpcrud");
if($conn->connect_error){
	die("Could not connect to database!");
}

$conn->set_charset("utf8mb4");

$res = array('error' => false);

$action = 'read';

if(isset($_GET['action'])){
	$action = $_GET['action'];
}

/*
* FETCH ALL USERS
*/
if($action == 'read'){
	$result = $conn->query("SELECT * FROM `users`");
	$users = array();

	while($row = $result->fetch_assoc()){

		$user = array(
			'id' 					=> $row['id'],
			'name' 				=> $row['name'],
			'email' 			=> $row['email'],
			'phone' 			=> $row['phone'],
			'gender' 			=> $row['gender'],
			'services' 		=> $row['services'],
			'country'			=> $row['country'],
			'newsletter'	=> $row['newsletter'],
		);

		array_push($users, $user);
	}

	$res['users'] = $users;
}

/*
* ADD NEW USER
*/
if($action == 'create'){

	$stmt = $conn->prepare("SELECT `id` FROM `users` WHERE `email` = ?");
	$stmt->bind_param("s", $_POST['email']);
	$stmt->execute();
	$result = $stmt->get_result();

	if ($result->num_rows != 0) {
		$res['error'] = true;
		$res['message'] = "This email address already exists!";
	} else {

		$password = hash('sha256', $_POST['password']);

		$stmt = $conn->prepare("INSERT INTO `users` (`name`, `email`, `phone`, `gender`, `password`, `services`, `country`, `newsletter`) VALUES (?, ?, ?, ?, ?, ?, ?, ?)");
		$stmt->bind_param("ssssssss", $_POST['name'], $_POST['email'], $_POST['phone'], $_POST['gender'], $password, $_POST['services'], $_POST['country'], $_POST['newsletter']);

		if($stmt->execute()){
			$res['message'] = "User added successfully!";
		} else{
			$res['error'] = true;
			$res['message'] = "Could not insert user!";
		}
	}
}

/*
* UPDATE USER
*/
if($action == 'update'){

	$stmt = $conn->prepare("UPDATE `users` SET `name` = ?, `email` = ?, `phone` = ?, `gender` = ?, `services` = ?, `country` = ?, `newsletter` = ? WHERE `id` = ?");
	$stmt->bind_param("sssssssi", $_POST['name'], $_POST['email'], $_POST['phone'], $_POST['gender'], $_POST['services'], $_POST['country'], $_POST['newsletter'], $_POST['id'] );

	if($stmt->execute()){
		$res['message'] = "User updated successfully";
	} else{
		$res['error'] = true;
		$res['message'] = "Could not update user";
	}
}

/*
* DELETE USER
*/
if($action == 'delete'){

	$stmt = $conn->prepare("DELETE FROM `users` WHERE `id` = ?");
	$stmt->bind_param("i", $_POST['id']);

	if($stmt->execute()){
		$res['message'] = "User deleted successfully!";
	} else{
		$res['error'] = true;
		$res['message'] = "Could not delete user!";
	}
}

$conn->close();

/*
* json_encode needs response to be utf-8
*/
function utf8ize($d) {
	if (is_array($d)) {
			foreach ($d as $k => $v) {
					$d[$k] = utf8ize($v);
			}
	} else if (is_string ($d)) {
			return utf8_encode($d);
	}
	return $d;
}

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
echo json_encode(utf8ize($res));

die();
