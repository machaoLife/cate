<?php 
header('Access-Control-Allow-Origin:*');
header('Access-Control-Allow-Method:POST,GET');
header("content-type:application/json;charset=utf-8");

require_once("cate/service/dataService.php");
require_once("cate/model/responseResultInfo.php");

$result = new ResponseResultInfo(101 , "请求失败" , null);


// 获取关键字 菜谱
$keyword = $_GET['keyword'];

if(!$keyword){
	$result -> code = 103;
	$result -> message = "参数不正确";
	$result -> data = null;
	echo json_encode($result);
	exit;
}

$menus = DataService::searchMenus($keyword);


if($menus){
	$result -> code = 100;
	$result -> message = "请求成功";
	$result -> data = $menus;
}

echo json_encode($result);