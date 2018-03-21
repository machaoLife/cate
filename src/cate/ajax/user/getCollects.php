<?php 
header('Access-Control-Allow-Origin:*');
header('Access-Control-Allow-Method:POST,GET');
header("content-type:application/json;charset=utf-8");

require_once("cate/service/userService.php");
require_once("cate/model/responseResultInfo.php");

$result = new ResponseResultInfo(101 , "请求失败" , null);

// 获取用户的收藏
$userId = $_GET['userId'];

if(is_null($userId)){
	$result -> code = 103;
	$result -> message = "参数无效";
	$result -> data = null;
}

$collect = UserService::getCollects($userId);

if($collect){
	$result -> code = 100;
	$result -> message = "请求成功";
	$result -> data = $collect;
}

echo json_encode($result);