<?php 
header('Access-Control-Allow-Origin:*');
header('Access-Control-Allow-Method:POST,GET');
header("content-type:application/json;charset=utf-8");

require_once("cate/service/dataService.php");
require_once("cate/model/responseResultInfo.php");

$result = new ResponseResultInfo(101 , "请求失败" , null);

// 获取栏目下的菜谱
if(array_key_exists("menuId",$_GET)){
	$menuId=$_GET["menuId"];
	$menu = DataService::getMenuId($menuId);

	if($menu){
		$result -> code = 100;
		$result -> message = "请求成功";
		$result -> data = $menu;
	}
	else{
		$result -> code = 103;
		$result -> message = "菜谱信息不存在";
		$result -> data = $menu;
	}
}else{
	$result -> code = 104;
	$result -> message = "参数不正确";
	$result -> data = $menu;
}

echo json_encode($result);