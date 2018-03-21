<?php 
header('Access-Control-Allow-Origin:*');
header('Access-Control-Allow-Method:POST,GET');
header("content-type:application/json;charset=utf-8");

require_once("cate/service/dataService.php");
require_once("cate/model/responseResultInfo.php");

// 获取栏目下的菜谱
if(array_key_exists("materialId",$_GET)){
	$materialId=$_GET["materialId"];
	$menus = DataService::getmenuFoods($materialId);
}

$result = new ResponseResultInfo(101 , "请求失败" , null);


$result -> code = 100;
$result -> message = "请求成功";
$result -> data = $menus;

echo json_encode($result);