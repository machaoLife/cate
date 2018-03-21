<?php 
require_once("dbHelper.php");

class SqlService{
	//保存验证码
	public static function setLoginCode($captcha){

		$captcha=md5($captcha);
		
		$sql = "update code set code='{$captcha}' where id='e5839889-226f-11e8-8cb2-14dda97c53a3'";

		return DBHelper::executeNonQuery($sql);
	}

	//获取验证码
	public static function getLoginCode(){
		$sql = "select code from code where id='e5839889-226f-11e8-8cb2-14dda97c53a3'";

		return DBHelper::executeQuery($sql);
	}
}