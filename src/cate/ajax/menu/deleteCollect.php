<?php 

header('Access-Control-Allow-Origin:*');
header('Access-Control-Allow-Method:POST,GET');
header("content-type:application/json;charset=utf-8");

require_once("cate/service/dmlService.php");
require_once("cate/model/responseResultInfo.php");

$result = new ResponseResultInfo(101 , "提交失败" , null);

$userId = $_POST["userId"];
$menuId = $_POST["menuId"];

if(!$userId || !$menuId){
	$result -> code = 102;
	$result -> message = "参数无效";
	$result -> data = null;
	echo json_encode($result);
	exit;
}

// 向数据库保存
$flag = DmlService::DeleteCollect($userId,$menuId);

if($flag){
	$result -> code = 100;
	$result -> message = "提交成功";
	$result -> data = 1;
}

echo json_encode($result);