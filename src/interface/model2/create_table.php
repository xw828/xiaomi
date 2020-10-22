<?php
require('./_connect.php');

//书写sql语句
$sql = "CREATE TABLE user (
			id INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
			username VARCHAR(300) NOT NULL,
			password VARCHAR(30) NOT NULL,
			submission_date TIMESTAMP	
)";
$result = mysqli_query($conn,$sql);
if($result){
	echo "数据表创建成功";
}else{
	echo "数据表创建失败";
}

?>