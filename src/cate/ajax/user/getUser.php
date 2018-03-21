<?php 
header('Access-Control-Allow-Origin:*');
header('Access-Control-Allow-Method:POST,GET');
header("content-type:application/json;charset=utf-8");

require_once("cate/service/userService.php");
require_once("cate/model/responseResultInfo.php");

$userId = $_GET['userId'];
$user = UserService::getUser($userId);

$result = new ResponseResultInfo(101 , "请求失败" , null);

if($user){
	$result -> code = 100;
	$result -> message = "请求成功";
	$result -> data = $user;
}

echo json_encode($result);