<?php 

header('Access-Control-Allow-Origin:*');
header('Access-Control-Allow-Method:POST,GET');
header("content-type:application/json;charset=utf-8");

require_once("cate/service/dmlService.php");
require_once("cate/model/responseResultInfo.php");

$result = new ResponseResultInfo(101 , "提交失败" , 0);

$id = $_POST["id"];
$name = $_POST["name"];
$describe = $_POST["describe"];
$typeId = $_POST["typeId"];
$areaId = $_POST["areaId"];
$isCover = $_POST["isCover"];
$main = $_POST["main"];
$assist = $_POST["assist"];
$step = $_POST["step"];

if(!$name || !$describe || !$id || !$typeId || !$areaId || !$main || !$assist){
		$result -> code = 102;
		$result -> message = "参数无效";
		$result -> data = 0;
		echo json_encode($result);
		exit;
	}

if($isCover == 1){
	$cover = $_FILES["cover"];

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
		// 向数据库保存
		$rs = DmlService::editMenu($id,$name,$describe,$typeId,$areaId,$main,$assist,$fileName);

		if($rs){
			$rstep = DmlService::createStep($id,$step);
			if($rstep){
				$result -> code = 100;
				$result -> message = "提交成功";
				$result -> data = 1;
			}
			else{
				$result -> code = 107;
				$result -> message = "提交步骤食材";
				$result -> data = 0;
			}
		
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
}else{
	$fileName = null;
	$rs = DmlService::editMenu($id,$name,$describe,$typeId,$areaId,$main,$assist,$fileName);

	if($rs){
		$rstep = DmlService::createStep($id,$step);
			if($rstep){
				$result -> code = 100;
				$result -> message = "提交成功";
				$result -> data = 1;
			}
			else{
				$result -> code = 107;
				$result -> message = "提交步骤食材";
				$result -> data = 0;
			}
	}

	echo json_encode($result);
	exit;
}