<?php 

header('Access-Control-Allow-Origin:*');
header('Access-Control-Allow-Method:POST,GET');
header("content-type:application/json;charset=utf-8");

require_once('cate/ulit/globalSetting.php');

$cover=$_FILES["cover"];

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

$result =[
	"code"=>102,
	"message"=>"上传失败",
	"data"=>null
];

if($flag){
	$result=[
		"code"=>100,
		"message"=>"上传成功",
		"data"=>[
			"path"=>GlobalSetting::IMAGE_URL_ROOT .$fileName,
			"name"=>$fileName
		]
	];
}


echo json_encode($result);