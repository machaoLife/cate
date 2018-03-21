<?php 
header('Access-Control-Allow-Origin:*');
header('Access-Control-Allow-Method:POST,GET');
header("content-type:application/json;charset=utf-8");

require_once("cate/service/dataService.php");
require_once("cate/model/responseResultInfo.php");

$result = new ResponseResultInfo(101 , "请求失败" , null);

// 获取单个资讯

	$healthyId=$_GET["id"];

	if(!$healthyId){
		$result -> code = 104;
		$result -> message = "参数不正确";
		$result -> data = null;
		echo json_encode($result);
		exit;
	}

	$news = DataService::getsingleNews($healthyId);

	if($news){
		$result -> code = 100;
		$result -> message = "请求成功";
		$result -> data = $news;
	}
	else{
		$result -> code = 103;
		$result -> message = "食材信息不存在";
		$result -> data = $news;
	}

echo json_encode($result);