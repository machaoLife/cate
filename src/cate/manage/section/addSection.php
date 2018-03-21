<?php 
header('Access-Control-Allow-Origin:*');
header('Access-Control-Allow-Method:POST,GET');
header("content-type:application/json;charset=utf-8");

require_once("cate/service/dmlService.php");
require_once("cate/model/responseResultInfo.php");

$result = new ResponseResultInfo(101 , "请求失败" , null);


// 添加栏目类别

$name = $_GET["name"];

if(!$name){
	$result -> code = 102;
	$result -> message = "参数不正确";
	$result -> data = 0;
	echo json_encode($result);
	exit;
}

$menus = DmlService::addSection($name);


if($menus){
	$result -> code = 100;
	$result -> message = "请求成功";
	$result -> data = $menus;
}

echo json_encode($result);