<?php
	$name = $_POST['name'];
	$price = $_POST['price'];
	$category = $_POST['category'];
	$desc = $_POST['desc'];
	$photo = $_FILES['photo'];
	$photoname = $photo['name'];

	//upload file
	$basepath = "img/";
	//photo/one.jpg
	$fullpath = $basepath . $photoname;
	echo $fullpath;
	move_uploaded_file($photo['tmp_name'], $fullpath);

	$menu = array(
		"photo" => $fullpath,
		"name" => $name,
		"price" => number_format($price),
		"category" => number_format($category),
		"description" => $desc
	);
	//get JSON Data from JSON File
	$jsondata = file_get_contents('sushi_list.json');
	if(!$jsondata){
		$jsondata = '[]';
	}	
	// convert into array from json
	$data_arr = json_decode($jsondata);
	array_push($data_arr, $menu);
	$jsondata = json_encode($data_arr, JSON_PRETTY_PRINT);
	file_put_contents('sushi_list.json', $jsondata);
	header("location:index.php");
?>