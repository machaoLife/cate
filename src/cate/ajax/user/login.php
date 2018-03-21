<?php 
header('Access-Control-Allow-Origin:*');
header('Access-Control-Allow-Method:POST,GET');
header("content-type:application/json;charset=utf-8");

require_once("cate/service/userService.php");
require_once("cate/service/sqlService.php");
require_once("cate/model/responseResultInfo.php");

$result = new ResponseResultInfo(101 , "请求失败" , null);

// 获取所有的栏目
$phone = $_POST['phone'];
$password = $_POST['password'];
$code = $_POST['code'];
$code = md5($code);

$loginCode = SqlService::getLoginCode();

//验证码检验
if(strcasecmp($code,$loginCode[0][0]) == 0){
	$result -> code = 102;
	$result -> message = "验证码不正确";
	$result -> data = null;
	echo json_encode($result);
	exit;
}


$user = UserService::login($phone,$password);

if($user){
	$result -> code = 100;
	$result -> message = "登录成功";
	$result -> data = $user;
}

echo json_encode($result);