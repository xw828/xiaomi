<?php
//1 接收前端数据
$username = $_POST['username'];
$password = $_POST['password'];

//2 连接数据库
$conn = mysqli_connect('localhost','root','root','users');

//3 书写SQL语句
$sql = "SELECT * FROM `user` WHERE `username`='$username'";

//4 执行SQL语句
$result = mysqli_query($conn,$sql);

//5 解析查询结果
$data = mysqli_fetch_assoc($result);

if($data){
    // 如果查询到,说明该用户已经存在于数据库,无法注册了
    $arr = array('code'=>0);
}else{
    // 如果没查询到,可以注册
    // 书写插入的sql语句
    $sql = "INSERT INTO `user` (`username`,`password`) VALUES ('$username','$password')";
    // 执行插入语句
    $result = mysqli_query($conn,$sql);
    // 不需要解析,因为结果是布尔值
    if($result){
        $arr = array('code'=>1,'data'=>array('username'=>$username));
    }else{
        $arr = array('code'=>0,'msg'=>'后端出错了');
    }

}

//6 给前端返回json数据
echo json_encode($arr);

//7 测试接口
?>