<?php 
header('Access-Control-Allow-Origin:*');
header('Access-Control-Allow-Method:POST,GET');
header("content-type:application/json;charset=utf-8");

require_once("cate/service/dataService.php");
require_once("cate/model/responseResultInfo.php");

$result = new ResponseResultInfo(101 , "请求失败" , null);

// 获取栏目下的菜谱
if(array_key_exists("sectionId",$_GET)){
	$sectionId=$_GET["sectionId"];
	$menus = DataService::getSectionMenus($sectionId);
}
else{
	$menus = DataService::getSectionMenus();
}

if($menus){
	$result -> code = 100;
	$result -> message = "请求成功";
	$result -> data = $menus;
}

echo json_encode($result);