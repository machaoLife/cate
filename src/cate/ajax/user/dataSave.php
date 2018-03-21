<?php 
header('Access-Control-Allow-Origin:*');
header('Access-Control-Allow-Method:POST,GET');
header("content-type:application/json;charset=utf-8");

require_once("cate/service/userService.php");
require_once("cate/model/responseResultInfo.php");
require_once('cate/ulit/globalSetting.php');

$userId = $_POST['userId'];
$sex = $_POST['sex'];
$nickName = $_POST['nickName'];
$isChange = $_POST['isChange'];

if($isChange == 1){
	$cover=$_FILES["header"];

	//检验有效性
	$types = $cover["type"];

	if(!($types == "image/jpeg"||$types=="image/png")){
		$result =[
			"code"=>103,
			"message"=>"文件格式必须为jpeg/png",
			"data"=>null
		];
		echo json_encode($result);
		exit;
	}


	$sizes = $cover["size"];

	if($sizes > 2 * 1024*1024){
		$result =[
			"code"=>104,
			"message"=>"文件不能超过2M",
			"data"=>null
		];
		echo json_encode($result);
		exit;
	}

	$ext=pathinfo($cover["name"],PATHINFO_EXTENSION);
	$fileName = md5(uniqid(microtime(true) . mt_rand())) . "." . $ext;

	$flag = move_uploaded_file($cover["tmp_name"] , "E:/PHP/www/cate/images/" . $fileName);

	if($flag){
		$header = $fileName;
	}
	else{
		$result -> code = 105;
		$result -> message = "图片上传失败";
		$result -> data = null;
		echo json_encode($result);
		exit;
	}

}
else{
	$header = $_POST['header'];
}

$user = UserService::dataSave($userId,$nickName,$header,$sex);

$result = new ResponseResultInfo(101 , "请求失败" , null);

if($user){
	$result -> code = 100;
	$result -> message = "请求成功";
	$result -> data = $user;
}

echo json_encode($result);