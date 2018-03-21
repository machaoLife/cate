<?php 

require_once("dbHelper.php");
require_once("cate/ulit/packaging.php");
require_once("cate/ulit/globalSetting.php");

class DmlService{
	//提交菜谱评论
	public static function setMenuComment($userId,$menuId,$content){

		$sql = "insert into menucomments values(UUID(),'{$menuId}','{$content}','{$userId}',now())";

		return DBHelper::executeNonQuery($sql);
	}

	//提交帖子评论
	public static function setInvitationComment($userId,$forumId,$content){
		$sql = "insert into comments values(UUID(),'{$forumId}','{$content}','{$userId}',now())";

		return DBHelper::executeNonQuery($sql);
	}

	//发布帖子
	public static function uploadIssue($userId,$images,$title,$content){
		$sql = "insert into invitations values(UUID(),'{$title}','{$content}','{$images}',now(),'{$userId}',1)";

		return DBHelper::executeNonQuery($sql);
	}

	//发布管理员帖子
	public static function uploadAdminIssue($images,$title,$content){
		$sql = "insert into invitations values(UUID(),'{$title}','{$content}','{$images}',now(),'11111111111',4)";

		return DBHelper::executeNonQuery($sql);
	}

	//收藏
	public static function collect($userId,$menuId){
		$sql = "insert into collects values(UUID(),'{$userId}','{$menuId}',now())";

		return DBHelper::executeNonQuery($sql);
	}
	//取消收藏
	public static function DeleteCollect($userId,$menuId){
		$sql = "delete from collects where userId='{$userId}' and menuId='{$menuId}'";

		return DBHelper::executeNonQuery($sql);
	}

	//点赞
	public static function likeMenu($menuId){
		$sql = "update menus set likecount=likecount+1 where id='{$menuId}'";

		return DBHelper::executeNonQuery($sql);
	}

	//添加食材分类
	public static function addCategory($name){
		$sql = "insert into fondcategorys values(uuid(),'{$name}');";

		return DBHelper::executeNonQuery($sql);
	}

	//编辑食材分类
	public static function editCategory($id,$name){
		$sql = "update fondcategorys set name='{$name}' where id='{$id}';";

		return DBHelper::executeNonQuery($sql);
	}

	//添加食材
	public static function addFood($name,$describe,$category,$fileName){
		$sql = "insert into foods values(uuid(),'{$name}','{$describe}','{$category}','{$fileName}');";

		return DBHelper::executeNonQuery($sql);
	}

	//编辑食材
	public static function editFood($id,$name,$describe,$category,$fileName){
		if(!is_null($fileName)){
			$sql = "update foods set name='{$name}',des='{$describe}',images='{$fileName}',categoryId='{$category}' where id='{$id}';";
		}else{
			$sql = "update foods set name='{$name}',des='{$describe}',categoryId='{$category}' where id='{$id}';";
		}

		return DBHelper::executeNonQuery($sql);
	}

	//添加栏目类别
	public static function addSection($name){
		$sql = "insert into sections values(uuid(),'{$name}');";

		return DBHelper::executeNonQuery($sql);
	}

	//编辑栏目类别
	public static function editSection($id,$name){
		$sql = "update sections set name='{$name}' where id='{$id}';";

		return DBHelper::executeNonQuery($sql);
	}

	//添加菜谱
	public static function addMenu($name,$typeId,$areaId,$main,$assist,$describe,$fileName){
		$sql = "insert into menus values(uuid(),'{$name}','{$describe}',0,'{$fileName}','{$areaId}','{$typeId}','{$main}','{$assist}');";

		return DBHelper::executeNonQuery($sql);
	}

	//编辑菜谱
	public static function editMenu($id,$name,$describe,$typeId,$areaId,$main,$assist,$fileName){
		if(!is_null($fileName)){
			$sql = "update menus set name='{$name}',des='{$describe}',cover='{$fileName}',typeId='{$typeId}',areaId='{$areaId}',main='{$main}',assist='{$assist}' where id='{$id}';";
		}else{
			$sql = "update menus set name='{$name}',des='{$describe}',typeId='{$typeId}',areaId='{$areaId}',main='{$main}',assist='{$assist}' where id='{$id}';";
		}

		return DBHelper::executeNonQuery($sql);
	}

	//添加菜谱步骤
	public static function createStep($menuId,$des){
		$sql="insert into steps values(uuid(),'{$menuId}','','{$des}')";

		return DBHelper::executeNonQuery($sql);
	}

	//添加资讯
	public static function addHealthy($title,$firstDescribe,$secondDescribe,$fileName,$fileName2){
		$sql="insert into news values(uuid(),'{$title}','{$fileName}','{$firstDescribe}','{$fileName2}','{$secondDescribe}',now())";

		return DBHelper::executeNonQuery($sql);
	}

	//编辑资讯
	public static function editHealthy($id,$title,$firstDescribe,$secondDescribe,$fileName,$fileName2){

		if(!$fileName&&!$fileName2){
			$sql="update news set title='{$title}',firstDescribe='{$firstDescribe}',secondDescribe='{$secondDescribe}' where id='{$id}'";
		}elseif ($fileName&&!$fileName2) {
			$sql="update news set title='{$title}',firstDescribe='{$firstDescribe}',secondDescribe='{$secondDescribe}',firstCover='{$fileName}' where id='{$id}'";
		}elseif (!$fileName&&$fileName2) {
			$sql="update news set title='{$title}',firstDescribe='{$firstDescribe}',secondDescribe='{$secondDescribe}',secondCover='{$fileName2}' where id='{$id}'";
		}elseif($fileName&&$fileName2){
			$sql="update news set title='{$title}',firstDescribe='{$firstDescribe}',secondDescribe='{$secondDescribe}',firstCover='{$fileName}',secondCover='{$fileName2}' where id='{$id}'";
		}

		return DBHelper::executeNonQuery($sql);
	}

	//审核通过
	public static function checkPass($forumId){
		$sql = "update invitations set state=2 where id='{$forumId}';";

		return DBHelper::executeNonQuery($sql);
	}

	//审核失败
	public static function notPass($forumId){
		$sql = "update invitations set state=0 where id='{$forumId}';";

		return DBHelper::executeNonQuery($sql);
	}
}