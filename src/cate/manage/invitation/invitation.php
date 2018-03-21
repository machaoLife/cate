<?php 
header('Access-Control-Allow-Origin:*');
header('Access-Control-Allow-Method:POST,GET');
header("content-type:application/json;charset=utf-8");

require_once("cate/service/dataService.php");
require_once("cate/model/responseResultInfo.php");


// 获取特定类的食材

$invitation = DataService::getAllInvitations();

$result = new ResponseResultInfo(101 , "请求失败" , null);

if($invitation){
	$result -> code = 100;
	$result -> message = "请求成功";
	$result -> data = $invitation;
}

echo json_encode($result);