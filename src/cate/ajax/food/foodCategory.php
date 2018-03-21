<?php 
header('Access-Control-Allow-Origin:*');
header('Access-Control-Allow-Method:POST,GET');
header("content-type:application/json;charset=utf-8");

require_once("cate/service/dataService.php");
require_once("cate/model/responseResultInfo.php");

// 获取所有的栏目

$sections = DataService::getFoodCategory();

$result = new ResponseResultInfo(101 , "请求失败" , null);

if($sections){
	$result -> code = 100;
	$result -> message = "请求成功";
	$result -> data = $sections;
}

echo json_encode($result);