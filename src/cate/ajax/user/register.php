<?php 
header('Access-Control-Allow-Origin:*');
header('Access-Control-Allow-Method:POST,GET');
header("content-type:application/json;charset=utf-8");

require_once("cate/service/userService.php");
require_once("cate/ulit/verifyCode.class.php");
require_once("cate/model/responseResultInfo.php");

$result = new ResponseResultInfo(101 , "注册失败" , null);

// 获取所有的栏目
$phone = $_POST['phone'];
$password = $_POST['password'];
$code = $_POST['code'];

$response = VerifyCodeService::validate($phone,$code);

if(!$phone || !$password || !$code){
	$result -> code = 103;
	$result -> message = "参数无效";
	$result -> data = null;
	echo json_encode($result);
	exit;
}

//手机号码检验
if($response == -1){
	$result -> code = 104;
	$result -> message = "手机号码不正确";
	$result -> data = null;
	echo json_encode($result);
	exit;
}

//验证码检验
if($response == 0){
	$result -> code = 102;
	$result -> message = "验证码不正确";
	$result -> data = null;
	echo json_encode($result);
	exit;
}

if($response == 1){
	$user = UserService::register($phone,$password);

	if($user){
		$result -> code = 100;
		$result -> message = "注册成功";
		$result -> data = $user;
	}
}

echo json_encode($result);