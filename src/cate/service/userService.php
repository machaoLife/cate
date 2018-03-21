<?php 

require_once("dbHelper.php");
require_once("cate/ulit/packaging.php");
require_once("cate/ulit/globalSetting.php");

class UserService{
	//登录验证
	public static function login($phone,$password){

		$password=md5($password);

		$sql = "select id,phone,nickName,header,sex  from users where phone='{$phone}' and password='{$password}'";

		$rs = DBHelper::executeQuery($sql);

		if(is_bool($rs)){
			return false;
		}
		if($rs){
			return Packaging::packagingUser($rs);
		}
		else{
			return $rs;
		}
		
	}

	//注册
	public static function register($phone,$password){
		$password=md5($password);

		$sql = "insert into users(id,phone,password) values(uuid(),'{$phone}','{$password}');";

		return DBHelper::executeNonQuery($sql);
	}

	//获取用户收藏
	public static function getCollects($userId){

		$sql = "select m.id,m.name,m.des,m.likecount,m.cover,m.areaId,m.typeId,m.main,m.assist from menus m inner join collects c on m.id=c.menuId where c.userId='{$userId}'";

		$rs = DBHelper::executeQuery($sql);

		if(is_bool($rs)){
			return false;
		}

		if($rs){
			return Packaging::packagingAllMenu($rs);
		}
		else{
			return $rs;
		}

	}

	//获取用户帖子
	public static function getUserInvitations($userId){

		$sql = "select i.id,i.title,i.content,i.images,i.issueTime,i.userId,u.header,u.nickName,i.state from invitations i inner join users u on i.userId=u.id where u.id='{$userId}'";

		$rs = DBHelper::executeQuery($sql);

		if(is_bool($rs)){
			return false;
		}
		if($rs){
			return Packaging::packagingInvitations($rs);
		}
		else{
			return $rs;
		}

	}

	//获取用户资料
	public static function getUser($userId){
		$sql = "select id,phone,nickName,header,sex from users where id='{$userId}'";

		$rs = DBHelper::executeQuery($sql);

		if(is_bool($rs)){
			return false;
		}

		if($rs){
			return Packaging::packagingUser($rs);
		}
		else{
			return $rs;
		}
	}

	//保存用户资料
	public static function dataSave($userId,$nickName,$header,$sex){
		$sql = "update users set nickName='{$nickName}',header='{$header}',sex='{$sex}'  where id='{$userId}'";

		return DBHelper::executeNonQuery($sql);
	}

	//验证用户密码
	public static function validatePassword($userId,$password){
		$password=md5($password);

		$sql = "select id,phone,nickName,header,sex  from users where id='{$userId}' and password='{$password}'";

		$rs = DBHelper::executeQuery($sql);

		if(is_bool($rs)){
			return false;
		}

		if($rs){
			return Packaging::packagingUser($rs);
		}
		else{
			return $rs;
		}

	}

	//修改用户密码
	public static function setUserPassword($userId,$password){
		$password=md5($password);
		
		$sql = "update users set password='{$password}' where id='{$userId}'";

		return DBHelper::executeNonQuery($sql);
	}

	//管理员登录
	public static function loginAdmin($name,$password){
		$password=md5($password);

		$sql = "select id,name,nick  from administrator where name='{$name}' and password='{$password}'";

		$rs = DBHelper::executeQuery($sql);

		if(is_bool($rs)){
			return false;
		}
		if($rs){
			return Packaging::packagingUserAdmin($rs);
		}
		else{
			return $rs;
		}
	}

}