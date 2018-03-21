<?php 
header('Access-Control-Allow-Origin:*');
header('Access-Control-Allow-Method:POST,GET');
header("content-type:application/json;charset=utf-8");

require_once("cate/service/dataService.php");
require_once("cate/model/responseResultInfo.php");


// 获取特定类的食材

$menus = DataService::getAreaMenus();

$result = new ResponseResultInfo(101 , "请求失败" , null);

if($menus){
	$result -> code = 100;
	$result -> message = "请求成功";
	$result -> data = $menus;
}

echo json_encode($result);