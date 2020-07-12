<?php 
header("Access-Control-Allow-Orgin: *");
require 'restful_api.php';
require 'make_slug.php';
require 'upload_image.php';
class api extends restful_api {

	function __construct(){
		parent::__construct();

	}

	function products(){

		$servername = "localhost";
		$username = "root";
		$password = "122122";
		$database = "cafengockhanh";
		// Create connection
		$conn = mysqli_connect($servername, $username, $password, $database);

		// Check connection
		if ($conn->connect_error) {
		    die("Connection failed: " . $conn->connect_error);
		}

        date_default_timezone_set('Asia/Ho_Chi_Minh');

		if ($this->method == 'GET'){
			// Hãy viết code xử lý LẤY dữ liệu ở đây
			// trả về dữ liệu bằng cách gọi: $this->response(200, $data)
			
			$sql = "SELECT p.*, m.image, m.thumb 
					FROM nk_products AS p
					LEFT JOIN nk_media AS m
					ON p.image_id = m.id ";	
			if(!empty($this->params)){
				$id = (int)$this->params[0];
				$sql = $sql."WHERE p.id = ".$id;
			}
			$result = mysqli_query($conn, $sql);
			$data = array();
			if(!empty($result)){
				while($row = mysqli_fetch_assoc($result)) {
					$data[] = $row;
				}
			}

			$this->response(200, $data);

			mysqli_close($conn);
		}
		elseif ($this->method == 'POST'){
			// Hãy viết code xử lý THÊM dữ liệu ở đây
			// trả về dữ liệu bằng cách gọi: $this->response(200, $data)s
			$data = $this->post;
			$image = $this->image;
			$params = $this->params;
			// =================add product 
			if(!empty($params) && $params[0] == "add" && !isset($params[1])){
				$data['slug'] = to_slug($data['title']);
				$data['title'] =  ($data['title']);
				$data['description'] =  ($data['description']);
				if(empty($data['description'])){
					unset($data['description']);
				}
				if(empty($data['content'])){
					unset($data['content']);
				}
				$columns ='`'. implode('`,`',array_keys($data)). '`';
				$escaped_values =  array_values($data);
				$values  = '"'. implode('","', $escaped_values). '"';
				$sql = "INSERT INTO nk_products ($columns)
						VALUES ($values)";
				$conn->query($sql);
				$id = $conn->insert_id;
				$data['id'] = $id;
				$this->response(200, $data);
			}
			// ==================update product
			elseif(!empty($params) && $params[0] == "edit" && !empty($params[1])){
				$data['slug'] = to_slug($data['title']);
				$data['title'] =  ($data['title']);
				$data['description'] =  ($data['description']);
				$sql = "UPDATE nk_products SET title='{$data['title']}',
							description='{$data['description']}',
							content='{$data['content']}',
							image_id='{$data['image_id']}',
							price='{$data['price']}',
							discount='{$data['discount']}',
							status={$data['status']},
							category_id={$data['category_id']},
							slug='{$data['slug']}' WHERE id={$params[1]}";
				$conn->query($sql);
				$this->response(200, $data);
							// print_r($sql);
			} elseif (!empty($params) && $params[0] == 'delete') {
				# code...
				// print_r($this);
				// echo gettype($list);
				$count = 0;
				
				foreach ($data as $key => $value) {
					$sql = "DELETE FROM nk_products WHERE id = {$value}";
					$conn->query($sql);
					$count++;
					unset($sql);
				}
				// foreach ($data as $id) {
				// 	$sql = "DELETE FROM `nk_products` WHERE id = {$id}";
				// 	print_r($sql);
				// 	// $conn->query($sql);
				// 	$count++;
				// }
				if($count > 0){
					$this->response(200, $count);
				} else{
					$this->response(404);
				}
			}
			else {
				$this->response(404);
			}
			


		}
		elseif ($this->method == 'PUT'){
			// Hãy viết code xử lý CẬP NHẬT dữ liệu ở đây
			// trả về dữ liệu bằng cách gọi: $this->response(200, $data)
			
			

		}
		elseif ($this->method == 'DELETE'){
			// Hãy viết code xử lý XÓA dữ liệu ở đây
			// trả về dữ liệu bằng cách gọi: $this->response(200, $data)
		}
	}

	function category(){
		$servername = "localhost";
		$username = "root";
		$password = "122122";
		$database = "cafengockhanh";
		// Create connection
		$conn = mysqli_connect($servername, $username, $password, $database);
		// Check connection
		if ($conn->connect_error) {
		    die("Connection failed: " . $conn->connect_error);
		}

		date_default_timezone_set('Asia/Ho_Chi_Minh');
		if($this->method == 'GET'){
			$table= $this->params[0];
			$sql = "SELECT * from nk_{$table} ";	
			if(!empty($this->params[1])){
				$id = (int)$this->params[1];
				$sql = $sql."WHERE id = $id ";
			}
			$result = mysqli_query($conn, $sql);
			$data = array();
			if(!empty($result)){
				while($row = mysqli_fetch_assoc($result)) {
					$row['children'] = [];
					$row['parent_name'] = "";
					$row['status'] = $row['status'] == 1 ? true : false;
					$data[] = $row;
				}
			}
			if(isset($id)){
				$this->response(200, $data);
			}
			foreach ($data as $key => $value) {
				$temp = [];
				if($value['parent_id'] != 0){
					$temp = $value;
					foreach ($data as $key3 => $value3) {
						# code...
						if($temp['parent_id'] == $value3['id']){
							$temp['parent_name'] = $value3['title'];
						}
					}
					unset($data[$key]);
					// print_r($data);
					foreach ($data as $key2 => $value2) {
						if($value2['id'] == $temp['parent_id']){
							array_push($data[$key2]['children'],$temp );  	
						}
					}
				}
			}
			$this->response(200, $data);

			mysqli_close($conn);
		}elseif ($this->method == 'POST') {
			# code...
			$insData = $this->file;
			if(!empty($this->params[0])){
				$table = $this->params[0];
			}
			$data = json_decode($insData, true);
			// print_r($data);
			if(!isset($data['parent_id'])){
				$data['parent_id'] = 0;
			}
			if(!isset($data['status']) || $data['status'] == false ){
				$data['status'] = 0;
			}else{
				$data['status'] = 1;
			}
			if($data['status'] == true){
				$data['status'] = 1;
			}
			$data['slug'] = to_slug($data['title']);
			$data['date_created'] = strtotime(date('Y-m-d H:i:s'));
			// print_r($data);

			$columns ='`'. implode('`,`',array_keys($data)). '`';
			$escaped_values =  array_values($data);
			$values  = '"'. implode('","', $escaped_values). '"';
			$sql = "INSERT INTO nk_{$table} ($columns)
					VALUES ($values)";
			if($conn->query($sql)){
				if($table == 'product_category'){
					$redirect  = 'admin/product-category';
				}elseif($table == 'article_category'){
					$redirect = 'admin/article-category';
				}
				$this->response(200, $redirect);
			}

		}elseif( $this->method == 'PUT'){
			$insData = $this->file;
			if(isset($this->params)){
				$table = $this->params[0];
				$id = (int)$this->params[1];
			}

			$data = json_decode($insData, true);
			// print_r($data);
			if(!isset($data['parent_id'])){
				$data['parent_id'] = 0;
			}
			if(!isset($data['status']) || $data['status'] == false ){
				$data['status'] = 0;
			}
			if($data['status'] == true){
				$data['status'] = 1;
			}
			$data['slug'] = to_slug($data['title']);
			// $data['date_created'] = strtotime(date('Y-m-d H:i:s'));
			// print_r($data);
			$title = $data['title'];
			$parent_id = $data['parent_id'];
			$status = $data['status'];
			$slug = $data['slug'];
			$sql = "UPDATE nk_{$table} 
					SET title = '$title',
						parent_id = $parent_id,
						status = $status,
						slug = '$slug' 
					WHERE id = $id
			";
			
			if($conn->query($sql)){
				if($table == 'product_category'){
					$redirect  = 'admin/product-category';
				}elseif($table == 'article_category'){
					$redirect = 'admin/article-category';
				}
				$this->response(200, $redirect);
			}
			
		}elseif($this ->method == 'DELETE'){
			if(isset($this->params)){
				$table = $this->params[0];
				$id = (int)$this->params[1];
			}
			
			if($table == "product_category"){
				// chuyển product sang cate chưa phân loại
				$sql1 = "UPDATE nk_products SET category_id = 0 WHERE category_id = {$id}";
				$conn->query($sql1);
				// CHuyển child cate sang chưa phân loại
				$sql2 = "UPDATE nk_product_category SET parent_id = 0 WHERE parent_id = {$id}"; 
				$conn->query($sql2);
			}elseif ($table == "article_category") {
				$sql3 = "UPDATE nk_articles SET category_id = 0 WHERE category_id = {$id}";
				$conn->query($sql3);
				// CHuyển child cate sang chưa phân loại
				$sql4 = "UPDATE nk_article_category SET parent_id = 0 WHERE parent_id = {$id}"; 
				$conn->query($sql4);
			}
			$sql = "DELETE FROM `nk_{$table}` WHERE id = {$id}";
			$conn->query($sql);
			$this->response(200);
		}
	}



	function articles(){

		$servername = "localhost";
		$username = "root";
		$password = "122122";
		$database = "cafengockhanh";
		// Create connection
		$conn = mysqli_connect($servername, $username, $password, $database);

		// Check connection
		if ($conn->connect_error) {
		    die("Connection failed: " . $conn->connect_error);
		}

        date_default_timezone_set('Asia/Ho_Chi_Minh');

		if ($this->method == 'GET'){
			// Hãy viết code xử lý LẤY dữ liệu ở đây
			// trả về dữ liệu bằng cách gọi: $this->response(200, $data)
			
			$sql = "SELECT a.*, m.image, m.thumb 
					FROM nk_articles AS a
					LEFT JOIN nk_media AS m
					ON a.image_id = m.id ";	
			if(!empty($this->params)){
				$id = (int)$this->params[0];
				$sql = $sql."WHERE a.id = ".$id;
			}
			$result = mysqli_query($conn, $sql);
			$data = array();
			if(!empty($result)){
				while($row = mysqli_fetch_assoc($result)) {
					$data[] = $row;
				}
			}

			$this->response(200, $data);

			mysqli_close($conn);
		}
		elseif ($this->method == 'POST'){
			// Hãy viết code xử lý THÊM dữ liệu ở đây
			// trả về dữ liệu bằng cách gọi: $this->response(200, $data)s
			$data = $this->post;
			$image = $this->image;
			$params = $this->params;
			// =================add product 
			if(!empty($params) && $params[0] == "add" && !isset($params[1])){
				$data['slug'] = to_slug($data['title']);
				$data['title'] =  ($data['title']);
				$data['description'] =  ($data['description']);
				if(empty($data['description'])){
					unset($data['description']);
				}
				if(empty($data['content'])){
					unset($data['content']);
				}
				$columns ='`'. implode('`,`',array_keys($data)). '`';
				$escaped_values =  array_values($data);
				$values  = '"'. implode('","', $escaped_values). '"';
				$sql = "INSERT INTO nk_articles ($columns)
						VALUES ($values)";
				if($conn->query($sql)){
					$id = $conn->insert_id;
					$data['id'] = $id;
					$this->response(200, $data);
				};
				
			}
			// ==================update product
			elseif(!empty($params) && $params[0] == "edit" && !empty($params[1])){
				$data['slug'] = to_slug($data['title']);
				$data['title'] =  ($data['title']);
				$data['description'] =  ($data['description']);

				$sql = "UPDATE nk_articles SET title='{$data['title']}',
							description='{$data['description']}',
							content='{$data['content']}',
							image_id='{$data['image_id']}',
							status={$data['status']},
							category_id={$data['category_id']},
							slug='{$data['slug']}' WHERE id={$params[1]}";
				$conn->query($sql);
				$this->response(200, $data);
							// print_r($sql);
			} elseif (!empty($params) && $params[0] == 'delete') {
				# code...
				// print_r($this);
				// echo gettype($list);
				$count = 0;
				
				foreach ($data as $key => $value) {
					$sql = "DELETE FROM nk_articles WHERE id = {$value}";
					$conn->query($sql);
					$count++;
					unset($sql);
				}
				// foreach ($data as $id) {
				// 	$sql = "DELETE FROM `nk_products` WHERE id = {$id}";
				// 	print_r($sql);
				// 	// $conn->query($sql);
				// 	$count++;
				// }
				if($count > 0){
					$this->response(200, $count);
				} else{
					$this->response(404);
				}
			}
			else {
				$this->response(404);
			}
			


		}
		elseif ($this->method == 'PUT'){
			// Hãy viết code xử lý CẬP NHẬT dữ liệu ở đây
			// trả về dữ liệu bằng cách gọi: $this->response(200, $data)
			
			

		}
		elseif ($this->method == 'DELETE'){
			// Hãy viết code xử lý XÓA dữ liệu ở đây
			// trả về dữ liệu bằng cách gọi: $this->response(200, $data)
		}
	}

	function media(){

		$servername = "localhost";
		$username = "root";
		$password = "122122";
		$database = "cafengockhanh";
		// Create connection
		$conn = mysqli_connect($servername, $username, $password, $database);

		// Check connection
		if ($conn->connect_error) {
		    die("Connection failed: " . $conn->connect_error);
		}

        date_default_timezone_set('Asia/Ho_Chi_Minh');

		if ($this->method == 'GET'){
			// Hãy viết code xử lý LẤY dữ liệu ở đây
			// trả về dữ liệu bằng cách gọi: $this->response(200, $data)
			
			$sql = "SELECT * from nk_media ";	
			if(!empty($this->params)){
				$id = (int)$this->params[0];
				$sql = $sql."WHERE id = ".$id;
			}
			$result = mysqli_query($conn, $sql);
			$data = array();
			if(!empty($result)){
				while($row = mysqli_fetch_assoc($result)) {
					$data[] = $row;

				}
			}
			$this->response(200, $data);

			mysqli_close($conn);
		}
		elseif ($this->method == 'POST'){
			// Hãy viết code xử lý THÊM dữ liệu ở đây
			// trả về dữ liệu bằng cách gọi: $this->response(200, $data)s
			$params = $this->params;
			$imageObj=$this->image["image"];
			$data=array();
			// =================add
			if(!empty($params) && $params[0] == "add" && !isset($params[1])){
				for($i=0; $i < count($imageObj["tmp_name"]);$i++){
					$image[$i]["name"] = $imageObj["name"][$i];
					$image[$i]["type"] = $imageObj["type"][$i];
					$image[$i]["tmp_name"] = $imageObj["tmp_name"][$i];
					$image[$i]["error"] = $imageObj["error"][$i];
					$image[$i]["size"] = $imageObj["size"][$i];
					$upload[$i] = uploadImage($image[$i]);
					if(!empty($upload)){
						$data[$i]['name'] = $upload[$i]['name'];
						$data[$i]['image'] = $upload[$i]['image'];
						$data[$i]['thumb'] = $upload[$i]['thumb'];
						$data[$i]['size'] = $upload[$i]['size'];
						$data[$i]['date_created'] = strtotime(date('Y-m-d H:i:s'));

					}
					$columns[$i] ='`'. implode('`,`',array_keys($data[$i])). '`';
					$escaped_values[$i] =  array_values($data[$i]);
					$values[$i]  = '"'. implode('","', $escaped_values[$i]). '"';
					$sql[$i] = "INSERT INTO nk_media ($columns[$i])
							VALUES ($values[$i])";
					if($conn->query($sql[$i])){
						$id[$i] = $conn->insert_id;
						$data[$i]['id'] = $id[$i];
					};
				}
				
				$this->response(200, $data);
				// print_r($sql);
				
			}
			// ===================Delete
			if(!empty($params) && $params[0] == "delete" && !isset($params[1])){
				$data = json_decode($this->file, true);
				$error = [];
				if(!empty($data)){
					foreach ($data as $key => $value) {
						# code...

						if (file_exists($value["image"])) {
    						unlink($value["image"]);
    					}

    					if (file_exists($value["thumb"])) {
    						unlink($value["thumb"]);
    					}
						$sql = "DELETE FROM nk_media WHERE id = {$value['id']}";
						if(!$conn->query($sql)){
							$error['database'] = 'không xóa đc trên db';
						}
					}
					if(empty($error)){
						$this->response(200, $data);
					}
				
				}
				// print_r($sql);
				
			}
		}
		elseif ($this->method == 'PUT'){
			// Hãy viết code xử lý CẬP NHẬT dữ liệu ở đây
			// trả về dữ liệu bằng cách gọi: $this->response(200, $data)
			
			

		}
		elseif ($this->method == 'DELETE'){
			// Hãy viết code xử lý XÓA dữ liệu ở đây
			// trả về dữ liệu bằng cách gọi: $this->response(200, $data)
		}
	}

	function users(){

		$servername = "localhost";
		$username = "root";
		$password = "122122";
		$database = "cafengockhanh";
		// Create connection
		$conn = mysqli_connect($servername, $username, $password, $database);

		// Check connection
		if ($conn->connect_error) {
		    die("Connection failed: " . $conn->connect_error);
		}

        date_default_timezone_set('Asia/Ho_Chi_Minh');

		if ($this->method == 'GET'){
			// Hãy viết code xử lý LẤY dữ liệu ở đây
			// trả về dữ liệu bằng cách gọi: $this->response(200, $data)
			$sql = "SELECT u.*, m.image, m.thumb 
					FROM nk_users AS u
					LEFT JOIN nk_media AS m
					ON u.avatar = m.id ";	
					
			if(!empty($this->params)){
				$id = (int)$this->params[0];
				$sql = $sql."WHERE u.id = ".$id;
			}
			$result = mysqli_query($conn, $sql);
			$data = array();
			if(!empty($result)){
				while($row = mysqli_fetch_assoc($result)) {
					$data[] = $row;
				}
			}
			$this->response(200, $data);


			mysqli_close($conn);
			
		}
		elseif ($this->method == 'POST'){
			// Hãy viết code xử lý THÊM dữ liệu ở đây
			// trả về dữ liệu bằng cách gọi: $this->response(200, $data)
			$username = $this->post['username'];
			$password = md5($this->post['password']);
			$remember = $this->post['remember'];
			$params = $this->params;
			if(!empty($params) && $params[0] == "login" && !isset($params[1])){
				$sql = "SELECT * FROM nk_users WHERE `user_name` = '{$username}' AND `password` = '{$password}'";
				$result = mysqli_query($conn, $sql);
				$data = array();
				if(!empty($result)){
					while($row = mysqli_fetch_assoc($result)) {
						$data[] = $row;
					}
				}

				if(!empty($data)){
					$data[0]["remember"] = $remember;
					$this->response(200, $data);
				}else{
					$this->response(204,"Sai tên đăng nhập hoặc mật khẩu");
				}
			}
			if(!empty($params) && $params[0] == "edit" && isset($params[1])){
				$data = $this->post;
				$sql = "UPDATE nk_users 
						SET `first_name`='{$data['first_name']}',
							last_name='{$data['last_name']}',
							date_of_birth='{$data['date_of_birth']}',
							avatar='{$data['avatar']}',
							description='{$data['description']}',
							email='{$data['email']}',
							phone={$data['phone']}
						WHERE id={$params[1]}";
				$conn->query($sql);
				$this->response(200, $data);
			}
		}
		elseif ($this->method == 'PUT'){
			// Hãy viết code xử lý CẬP NHẬT dữ liệu ở đây
			// trả về dữ liệu bằng cách gọi: $this->response(200, $data)
			
			

		}
		elseif ($this->method == 'DELETE'){
			// Hãy viết code xử lý XÓA dữ liệu ở đây
			// trả về dữ liệu bằng cách gọi: $this->response(200, $data)
		}
	}
	function karaoke(){

		$servername = "localhost";
		$username = "root";
		$password = "122122";
		$database = "cafengockhanh";
		// Create connection
		$conn = mysqli_connect($servername, $username, $password, $database);

		// Check connection
		if ($conn->connect_error) {
		    die("Connection failed: " . $conn->connect_error);
		}

        date_default_timezone_set('Asia/Ho_Chi_Minh');

		if ($this->method == 'GET'){
			// Hãy viết code xử lý LẤY dữ liệu ở đây
			// trả về dữ liệu bằng cách gọi: $this->response(200, $data)
			$sql = "SELECT * 
					FROM nk_karaoke ";
					
			if(!empty($this->params)){
				$id = (int)$this->params[0];
				$sql = $sql."WHERE u.id = ".$id;
			}
			$result = mysqli_query($conn, $sql);
			$data = array();
			if(!empty($result)){
				while($row = mysqli_fetch_assoc($result)) {
					$data[] = $row;
				}
			}
			$time = strtotime(date('Y-m-d H:i:s'));
			if($data[0]['time_play'] == null || $data[0]['time_play'] == ""){
				
				$conn->query("UPDATE `nk_karaoke` SET `time_play`='{$time}' WHERE `video_id`='{$data[0]['video_id']}'");
				
			}else{
				if($time > (($data[0]['time_play']) + ($data[0]['duration']) )) {
					$conn->query("DELETE FROM `nk_karaoke` WHERE `video_id`='{$data[0]['video_id']}'");

				}
			}
			
			$this->response(200, $data);

			mysqli_close($conn);
			
		}
		elseif ($this->method == 'POST'){
			// Hãy viết code xử lý THÊM dữ liệu ở đây
			// trả về dữ liệu bằng cách gọi: $this->response(200, $data)
			$data = $this->post;
			$params = $this->params;
			if(!empty($params) && $params[0] == "add" && !isset($params[1])){
				$columns ='`'. implode('`,`',array_keys($data)). '`';
				$escaped_values =  array_values($data);
				$values  = '"'. implode('","', $escaped_values). '"';
				$sql = "INSERT INTO nk_karaoke ($columns)
						VALUES ($values)";
				if($conn->query($sql)){
					$this->response(200,"done!");
				}
			}
			if(!empty($params) && $params[0] == "delete" && isset($params[1])){
				if($params[1] == "all"){
				$sql = "DELETE FROM nk_karaoke";
			}else{
				$sql = "DELETE FROM nk_karaoke WHERE id = {$params['1']}";
			}
			
			if($conn->query($sql)){
				$this->response(200,"done!");
			}
			}

		}
		elseif ($this->method == 'PUT'){
			// Hãy viết code xử lý CẬP NHẬT dữ liệu ở đây
			// trả về dữ liệu bằng cách gọi: $this->response(200, $data)
			
			

		}
		elseif ($this->method == 'DELETE'){
			// Hãy viết code xử lý XÓA dữ liệu ở đây
			// trả về dữ liệu bằng cách gọi: $this->response(200, $data)
			$params = $this->params;
			if($params[0] == "all"){
				$sql = "DELETE FROM nk_karaoke";
			}else{
				$sql = "DELETE FROM nk_karaoke WHERE id = {$params['0']}";
			}
			
			if($conn->query($sql)){
				$this->response(200,"done!");
			}
		}
	}

	function config(){

		$servername = "localhost";
		$username = "root";
		$password = "122122";
		$database = "cafengockhanh";
		// Create connection
		$conn = mysqli_connect($servername, $username, $password, $database);

		// Check connection
		if ($conn->connect_error) {
		    die("Connection failed: " . $conn->connect_error);
		}

        date_default_timezone_set('Asia/Ho_Chi_Minh');

		if ($this->method == 'GET'){
			// Hãy viết code xử lý LẤY dữ liệu ở đây
			// trả về dữ liệu bằng cách gọi: $this->response(200, $data)
			$sql = "SELECT * FROM `nk_config` WHERE 1";
			$result = mysqli_query($conn, $sql);
			$data = array();
			if(!empty($result)){
				while($row = mysqli_fetch_assoc($result)) {
					$data[] = $row;
				}
			}
			$this->response(200, $data);
			
			// mysqli_close($conn);
			
		}
		elseif ($this->method == 'POST'){
			// Hãy viết code xử lý THÊM dữ liệu ở đây
			// trả về dữ liệu bằng cách gọi: $this->response(200, $data)
			$data = $this->post;
			foreach ($data as $key => $value) {
				# code...
				$sql = "UPDATE nk_config
						SET `{$key}`='{$value}'
						WHERE id = 1";
				$conn->query($sql);
			}
			$result = mysqli_query($conn, "SELECT * FROM nk_config WHERE 1");
			$config = array();
			if(!empty($result)){
				while($row = mysqli_fetch_assoc($result)) {
					$config[] = $row;
				}
			}
				$this->response(200, $config);

		}
		elseif ($this->method == 'PUT'){
			// Hãy viết code xử lý CẬP NHẬT dữ liệu ở đây
			// trả về dữ liệu bằng cách gọi: $this->response(200, $data)
			
			

		}
		elseif ($this->method == 'DELETE'){
			// Hãy viết code xử lý XÓA dữ liệu ở đây
			// trả về dữ liệu bằng cách gọi: $this->response(200, $data)

		}
	}


	function ckfinder(){

		$servername = "localhost";
		$username = "root";
		$password = "122122";
		$database = "cafengockhanh";
		// Create connection
		$conn = mysqli_connect($servername, $username, $password, $database);

		// Check connection
		if ($conn->connect_error) {
		    die("Connection failed: " . $conn->connect_error);
		}

        date_default_timezone_set('Asia/Ho_Chi_Minh');

		if ($this->method == 'GET'){
			// Hãy viết code xử lý LẤY dữ liệu ở đây
			// trả về dữ liệu bằng cách gọi: $this->response(200, $data)
			
		}
		elseif ($this->method == 'POST'){
			// Hãy viết code xử lý THÊM dữ liệu ở đây
			// trả về dữ liệu bằng cách gọi: $this->response(200, $data)
			$image = $this->image["upload"];
			$server_url = "http://api2.abc/";
			// print_r($image);
			$upload = uploadImage($image);
			$data["url"] = $server_url.$upload["image"];
			$data["uploaded"]=1;
			$data["fileName"]=$upload["name"];
			$this->response(200, $data);

		}
		elseif ($this->method == 'PUT'){
			// Hãy viết code xử lý CẬP NHẬT dữ liệu ở đây
			// trả về dữ liệu bằng cách gọi: $this->response(200, $data)
			
			

		}
		elseif ($this->method == 'DELETE'){
			// Hãy viết code xử lý XÓA dữ liệu ở đây
			// trả về dữ liệu bằng cách gọi: $this->response(200, $data)

		}
	}

	function api(){

		$servername = "localhost";
		$username = "root";
		$password = "122122";
		$database = "cafengockhanh";
		// Create connection
		$conn = mysqli_connect($servername, $username, $password, $database);

		// Check connection
		if ($conn->connect_error) {
		    die("Connection failed: " . $conn->connect_error);
		}

        date_default_timezone_set('Asia/Ho_Chi_Minh');

		if ($this->method == 'GET'){
			// Hãy viết code xử lý LẤY dữ liệu ở đây
			// trả về dữ liệu bằng cách gọi: $this->response(200, $data)
			$params = $this->params;
			$sql = "SELECT * FROM `nk_api_key` WHERE `in_use`=1";
			$result = mysqli_query($conn, $sql);
			if(!empty($result)){
				while($row = mysqli_fetch_assoc($result)) {
					$key = $row;
				}
			}
			if($params[0]=="get"){
				$this->response(200, $key);
			}
			if($params[0] =="change"){
				if($key["id"] <= 4){
					$new_id = $key['id']+1;
				} else{
					$new_id = 1;
				}
				$sql2 = "UPDATE `nk_api_key` SET `in_use`= 0 WHERE `id`={$key['id']}";
				$conn->query($sql2);
				$sql3 = "UPDATE `nk_api_key` SET `in_use`= 1 WHERE `id`={$new_id}";
				$conn->query($sql3);

				$sql4 = "SELECT * FROM `nk_api_key` WHERE `in_use`=1";
				$result = mysqli_query($conn, $sql);
				if(!empty($result)){
					while($row = mysqli_fetch_assoc($result)) {
						$new_key = $row;
					}
				}
				$this->response(200, $new_key);
			}
			
			
			// mysqli_close($conn);
			
		}
		elseif ($this->method == 'POST'){
			// Hãy viết code xử lý THÊM dữ liệu ở đây
			// trả về dữ liệu bằng cách gọi: $this->response(200, $data)
			$data = $this->post;
			foreach ($data as $key => $value) {
				# code...
				$sql = "UPDATE nk_config
						SET `{$key}`='{$value}'
						WHERE id = 1";
				$conn->query($sql);
			}
			$result = mysqli_query($conn, "SELECT * FROM nk_config WHERE 1");
			$config = array();
			if(!empty($result)){
				while($row = mysqli_fetch_assoc($result)) {
					$config[] = $row;
				}
			}
				$this->response(200, $config);

		}
		elseif ($this->method == 'PUT'){
			// Hãy viết code xử lý CẬP NHẬT dữ liệu ở đây
			// trả về dữ liệu bằng cách gọi: $this->response(200, $data)
			
			

		}
		elseif ($this->method == 'DELETE'){
			// Hãy viết code xử lý XÓA dữ liệu ở đây
			// trả về dữ liệu bằng cách gọi: $this->response(200, $data)

		}
	}
}

$user_api = new api();
?>