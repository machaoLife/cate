
<?php 
header('Access-Control-Allow-Origin:*');
header('Access-Control-Allow-Method:POST,GET');
header("content-type:application/json;charset=utf-8");

require_once("cate/service/userService.php");
require_once("cate/service/sqlService.php");
require_once("cate/model/responseResultInfo.php");

$result = new ResponseResultInfo(101 , "请求失败" , null);

// 管理员登录验证
$name = $_POST['name'];
$password = $_POST['password'];


if(!$name || !$password){
	$result -> code = 102;
	$result -> message = "参数不正确";
	$result -> data = null;
	echo json_encode($result);
	exit;
}

$user = UserService::loginAdmin($name,$password);

if($user){
	$result -> code = 100;
	$result -> message = "登录成功";
	$result -> data = $user;
}

echo json_encode($result);