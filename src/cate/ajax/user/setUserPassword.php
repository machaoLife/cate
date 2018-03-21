<?php 

header('Access-Control-Allow-Origin:*');
header('Access-Control-Allow-Method:POST,GET');
header("content-type:application/json;charset=utf-8");

require_once("cate/service/userService.php");
require_once("cate/model/responseResultInfo.php");

$result = new ResponseResultInfo(101 , "提交失败" , 0);

$userId = $_POST["userId"];
$oldPassword = $_POST["oldPassword"];
$newPassword = $_POST["newPassword"];

if(!$userId || !$oldPassword || !$newPassword){
	$result -> code = 102;
	$result -> message = "参数无效";
	$result -> data = 0;
	echo json_encode($result);
	exit;
}

//验证旧密码
$exist = UserService::validatePassword($userId,$oldPassword);

if(!$exist){
	$result -> code = 103;
	$result -> message = "旧密码不正确";
	$result -> data = 0;
	echo json_encode($result);
	exit;
}

// 向数据库保存
$flag = UserService::setUserPassword($userId,$newPassword);

if($flag){
	$result -> code = 100;
	$result -> message = "提交成功";
	$result -> data = 1;
}

echo json_encode($result);