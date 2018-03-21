<?php 

header('Access-Control-Allow-Origin:*');
header('Access-Control-Allow-Method:POST,GET');
header("content-type:application/json;charset=utf-8");

require_once("cate/service/dmlService.php");
require_once("cate/model/responseResultInfo.php");

$result = new ResponseResultInfo(101 , "提交失败" , 0);

$title = $_POST["title"];
$firstDescribe = $_POST["firstDescribe"];
$secondDescribe = $_POST["secondDescribe"];
$firstCover = $_FILES["firstCover"];
$secondCover = $_FILES["secondCover"];

if(!$title || !$firstDescribe || !$secondDescribe || !$firstCover || !$secondCover){
	$result -> code = 102;
	$result -> message = "参数无效";
	$result -> data = 0;
	echo json_encode($result);
	exit;
}


//检验有效性
$types = $firstCover["type"];

if(!($types == "image/jpeg"||$types=="image/png")){
	$result =[
		"code"=>103,
		"message"=>"文件格式必须为jpeg/png",
		"data"=>null
	];
	echo json_encode($result);
	exit;
}


$sizes = $firstCover["size"];

if($sizes > 2 * 1024*1024){
	$result =[
		"code"=>104,
		"message"=>"文件不能超过2M",
		"data"=>null
	];
	echo json_encode($result);
	exit;
}

$ext=pathinfo($firstCover["name"],PATHINFO_EXTENSION);
$fileName = md5(uniqid(microtime(true) . mt_rand())) . "." . $ext;

$flag = move_uploaded_file($firstCover["tmp_name"] , "E:/PHP/www/cate/images/" . $fileName);

//检验有效性
$type2 = $secondCover["type"];

if(!($type2 == "image/jpeg"||$type2=="image/png")){
	$result =[
		"code"=>103,
		"message"=>"文件格式必须为jpeg/png",
		"data"=>null
	];
	echo json_encode($result);
	exit;
}


$size2 = $secondCover["size"];

if($size2 > 2 * 1024*1024){
	$result =[
		"code"=>104,
		"message"=>"文件不能超过2M",
		"data"=>null
	];
	echo json_encode($result);
	exit;
}

$ext2=pathinfo($secondCover["name"],PATHINFO_EXTENSION);
$fileName2 = md5(uniqid(microtime(true) . mt_rand())) . "." . $ext2;

$flag2 = move_uploaded_file($secondCover["tmp_name"] , "E:/PHP/www/cate/images/" . $fileName2);

if($flag && $flag2){
	// 向数据库保存
	$rs = DmlService::addHealthy($title,$firstDescribe,$secondDescribe,$fileName,$fileName2);

	if($rs){
		$result -> code = 100;
		$result -> message = "提交成功";
		$result -> data = 1;
	}

	echo json_encode($result);
	exit;
}
else{

	$result -> code = 105;
	$result -> message = "图片上传失败";
	$result -> data = 0;
	
	echo json_encode($result);
	exit;
}