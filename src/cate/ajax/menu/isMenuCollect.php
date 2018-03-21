<?php 
header('Access-Control-Allow-Origin:*');
header('Access-Control-Allow-Method:POST,GET');
header("content-type:application/json;charset=utf-8");

require_once("cate/service/dataService.php");
require_once("cate/model/responseResultInfo.php");


// 获取收藏id
$userId = $_POST["userId"];
$menuId = $_POST["menuId"];

if(!$userId || !$menuId){
	$result -> code = 102;
	$result -> message = "参数无效";
	$result -> data = null;
	echo json_encode($result);
	exit;
}
$collect = DataService::getCollectId($userId,$menuId);

$result = new ResponseResultInfo(101 , "菜谱未收藏" , null);

if($collect){
	$result -> code = 100;
	$result -> message = "菜谱已收藏";
	$result -> data = $collect;
}

echo json_encode($result);