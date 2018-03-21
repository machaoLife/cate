<?php 

header('Access-Control-Allow-Origin:*');
header('Access-Control-Allow-Method:POST,GET');
header("content-type:application/json;charset=utf-8");

require_once("cate/ulit/verifyCode.class.php");

$phone = $_GET["phone"];

// 发送请求

$response = VerifyCodeService::send($phone);

$result = [
	"code" => 101,
	"message" => "发送失败",
	"data" => $response
];

if($response == -1){
	$result = [
		"code" => 102,
		"message" => "手机号码格式无效."
	];
}
else if($response == 1){
	$result = [
		"code" => 100,
		"message" => "短信发送成功"
	];
}

echo json_encode($result);