<?php 

	header('Access-Control-Allow-Origin:*');
	header('Access-Control-Allow-Method:POST,GET');
	header("content-type:application/json;charset=utf-8");

	require_once("cate/service/dmlService.php");
	require_once("cate/model/responseResultInfo.php");

	$result = new ResponseResultInfo(101 , "提交失败" , 0);

	$id = $_POST["id"];
	$title = $_POST["title"];
	$firstDescribe = $_POST["firstDescribe"];
	$secondDescribe = $_POST["secondDescribe"];
	$isFirstCover = $_POST["isFirstCover"];
	$isSecondCover = $_POST["isSecondCover"];

	if(!$id || !$title || !$firstDescribe || !$secondDescribe){
		$result -> code = 102;
		$result -> message = "参数无效";
		$result -> data = 0;
		echo json_encode($result);
		exit;
	}

	if($isFirstCover == 1){

	$firstCover = $_FILES["firstCover"];

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

	if(!$flag){
		$result -> code = 105;
		$result -> message = "图片上传失败";
		$result -> data = 0;
		
		echo json_encode($result);
		exit;
	}
	}
	else{
		$fileName = null;
	}

	if($isSecondCover == 1){

	$secondCover = $_FILES["secondCover"];
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

	if(!$flag2){
		$result -> code = 105;
		$result -> message = "图片上传失败";
		$result -> data = 0;
		
		echo json_encode($result);
		exit;
	}
	}else{
		$fileName2 = null;
	}

	// 向数据库保存
	$rs = DmlService::editHealthy($id,$title,$firstDescribe,$secondDescribe,$fileName,$fileName2);

	if($rs){
		$result -> code = 100;
		$result -> message = "提交成功";
		$result -> data = 1;
	}

	echo json_encode($result);
	exit;

