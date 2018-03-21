<?php 
header('Access-Control-Allow-Origin:*');
header('Access-Control-Allow-Method:POST,GET');
header("content-type:application/json;charset=utf-8");

require_once("cate/service/dataService.php");
require_once("cate/model/responseResultInfo.php");


$result = new ResponseResultInfo(101 , "请求失败" , null);

// 获取栏目下的菜谱

	$forumId=$_GET["forumId"];
	
	if(!$forumId){
		$result -> code = 104;
		$result -> message = "参数不正确";
		$result -> data = null;
		echo json_encode($result);
		exit;
	}
	$menu = DataService::getInvitationComments($forumId);


	if($menu){
		$result -> code = 100;
		$result -> message = "请求成功";
		$result -> data = $menu;
	}
	else{
		$result -> code = 103;
		$result -> message = "帖子信息不存在";
		$result -> data = $menu;
	}


echo json_encode($result);