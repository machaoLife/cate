<?php 

require_once("dbHelper.php");
require_once("cate/ulit/packaging.php");
require_once("cate/ulit/globalSetting.php");
// 获取所有图书信息

class DataService{

	/**
		获取菜系分类
	*/
	public static function getAreaMenus(){
		$sql = "select id,name  from menuareas order by name";

		$rs = DBHelper::executeQuery($sql);

		if(is_bool($rs)){
			return false;
		}

		return Packaging::packagingCategory($rs);
	}


	/**
		获取菜单地区分类
	*/
	public static function getTypeMenus(){
		$sql = "select id , name  from menutypes order by name";

		$rs = DBHelper::executeQuery($sql);

		if(is_bool($rs)){
			return false;
		}

		return Packaging::packagingCategory($rs);
	}


	/**
		获取所有菜单
	*/
	public static function getAllMenus(){
		$sql = "select id , name ,des ,likecount,cover,areaId,typeId,main,assist from menus order by likecount desc";

		$rs = DBHelper::executeQuery($sql);

		if(is_bool($rs)){
			return false;
		}

		return Packaging::packagingAllMenu($rs);
	}

	/*
		获取关键字菜谱
	*/
	public static function getKeywordMenus(){
		$sql = "select m.id , m.name ,m.des ,m.likecount,m.cover,m.areaId,m.typeId,m.main,m.assist,t.name,a.name from menus m inner join menutypes t on m.typeId=t.id inner join menuareas a on m.areaId=a.id order by likecount desc";

		$rs = DBHelper::executeQuery($sql);

		if(is_bool($rs)){
			return false;
		}

		return Packaging::packagingKeywordMenu($rs);
	}


	/*
		获取菜谱Id
	*/

	public static function getMenuId($id){
		$sql = "select id , name ,des ,likecount,cover,areaId,typeId,main,assist from menus where id = '{$id}'";

		$rs = DBHelper::executeQuery($sql);

		if(is_bool($rs)){
			return false;
		}

		if($rs){
			return Packaging::packagingSingleMenu($rs);
		}
		else{
			return $rs;
		}
	}

	/*
		获取首页的食材
	*/

	public static function getAllFoods(){
		$sql = "select id , name ,des ,categoryId,images from foods order by name";

		$rs = DBHelper::executeQuery($sql);

		if(is_bool($rs)){
			return false;
		}

		return Packaging::packagingAllFood($rs);
	}

	/*
		获取关键字的食材
	*/

	public static function getFoods($cateId,$keyword){
		$sql = "select id , name ,des ,categoryId,images from foods where 1=1";

		if($cateId){
			$sql = $sql . " and categoryId='{$cateId}'";
		}
		if($keyword){
			$sql = $sql . " and locate('{$keyword}', name)";
		}

		$rs = DBHelper::executeQuery($sql);

		if(is_bool($rs)){
			return false;
		}

		return Packaging::packagingAllFood($rs);
	}

	/*
		获取食材的分类
	*/

	public static function getFoodCategory(){
		
		$sql = "select id , name from fondcategorys order by name";

		$rs = DBHelper::executeQuery($sql);

		if(is_bool($rs)){
			return false;
		}

		return Packaging::packagingCategory($rs);
	}

	/*
		获取特定分类食材
	*/

	public static function getCategoryFoods($categoryId="9cfd2a8c-1f7c-11e8-93de-14dda97c53a3"){
		//默认蔬菜类食材
		$sql = "select id , name ,des ,categoryId,images from foods where categoryId='{$categoryId}' order by name";

		$rs = DBHelper::executeQuery($sql);

		if(is_bool($rs)){
			return false;
		}

		return Packaging::packagingAllFood($rs);
	}

	/*
		获取食材相关菜谱
	*/

	public static function getmenuFoods($materialId){

		$sql = "select m.id , m.name ,m.des ,m.likecount,m.cover,m.areaId,m.typeId,m.main,m.assist from menus m inner join menufoods mf on m.id=mf.menuId inner join foods f on mf.foodId=f.id where f.id='{$materialId}' order by m.name";

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

	/*
		获取食材Id
	*/

	public static function getFoodId($id){
		$sql = "select id , name ,des ,categoryId,images from foods where id='{$id}'";

		$rs = DBHelper::executeQuery($sql);

		if(is_bool($rs)){
			return false;
		}

		if($rs){
			return Packaging::packagingSingleFood($rs);
		}
		else{
			return $rs;
		}

	}

	/*
		获取所有栏目
	*/
		public static function getAllSection(){
			$sql = "select id,name from sections ORDER BY name";

			$rs = DBHelper::executeQuery($sql);

			if(is_bool($rs)){
				return false;
			}

			return Packaging::packagingCategory($rs);
		}

	/*
		获取栏目下菜谱
	*/
		public static function getSectionMenus($sectionId="7d79a10b-1f8c-11e8-93de-14dda97c53a3"){
			$sql = "select m.id , m.name ,m.des ,m.likecount,m.cover,m.areaid,m.typeid,m.main,m.assist FROM menus m INNER JOIN menusections s  ON m.id=s.menuid INNER JOIN sections on s.sectionid=sections.id WHERE sections.id='{$sectionId}' order by likecount";

			$rs = DBHelper::executeQuery($sql);

			if(is_bool($rs)){
				return false;
			}

			return Packaging::packagingAllMenu($rs);
		}

		/*
			获取首页新闻
		*/
		public static function getHomeNews(){
			$sql = "select id,title,firstCover,firstDescribe,secondCover,secondDescribe,createTime from news order by title";

			$rs = DBHelper::executeQuery($sql);

			if(is_bool($rs)){
				return false;
			}

			return Packaging::packagingAllNews($rs);
		}

		/*
			获取单个新闻详情
		*/
		public static function getsingleNews($newsId){
			$sql = "select id,title,firstCover,firstDescribe,secondCover,secondDescribe,createTime from news where id='{$newsId}'";

			$rs = DBHelper::executeQuery($sql);

			if(is_bool($rs)){
				return false;
			}
			if($rs){
				return Packaging::packagingsingleNews($rs);
			}
			else{
				return $rs;
			}
		}

		/*
			获取菜单步骤
		*/
		public static function getMenuStep($menuId){
			$sql = "select id,menuId,images,des from steps where menuId='{$menuId}'";

			$rs = DBHelper::executeQuery($sql);

			if(is_bool($rs)){
				return false;
			}
			if($rs){
				return Packaging::packagingStep($rs);
			}
			else{
				return $rs;
			}
		}

		/*
			获取菜单评论
		*/
		public static function getMenuComment($menuId){
			$sql = "select m.id,m.menuId,m.content,m.userId,m.commentTime,u.header,u.nickName from menucomments m INNER JOIN users u on u.id=m.userId where menuId='{$menuId}'";

			$rs = DBHelper::executeQuery($sql);

			if(is_bool($rs)){
				return false;
			}

			if($rs){
				return Packaging::packagingComment($rs);
			}
			else{
				return $rs;
			}
		}


		/*
			获取论坛帖子
		*/
		public static function getInvitations(){
			$sql = "select i.id,i.title,i.content,i.images,i.issueTime,i.userId,u.header,u.nickName,i.state from invitations i inner join users u on i.userId=u.id where state=2 or state=4 order by state desc,i.issueTime desc";

			$rs = DBHelper::executeQuery($sql);

			if(is_bool($rs)){
				return false;
			}

			return Packaging::packagingInvitations($rs);
		}

		/*
			获取所有帖子
		*/
		public static function getAllInvitations(){
			$sql = "select i.id,i.title,i.content,i.images,i.issueTime,i.userId,u.header,u.nickName,i.state from invitations i inner join users u on i.userId=u.id order by u.id desc";

			$rs = DBHelper::executeQuery($sql);

			if(is_bool($rs)){
				return false;
			}

			return Packaging::packagingInvitations($rs);
		}

		/*
			获取单个帖子id
		*/
		public static function getSingleInvitation($forumId){
			$sql = "select i.id,i.title,i.content,i.images,i.issueTime,i.userId,u.header,u.nickName from invitations i inner join users u on i.userId=u.id where i.id='{$forumId}'";

			$rs = DBHelper::executeQuery($sql);

			if(is_bool($rs)){
				return false;
			}

			if($rs){
				return Packaging::packagingSingleInvitation($rs);
			}
			else{
				return $rs;
			}
		}

		/*
			获取帖子下评论
		*/
		public static function getInvitationComments($forumId){
			$sql = "select c.id,i.id,c.content,u.id,c.commentTime,u.header,u.nickName FROM invitations i inner join comments c on c.invitationId=i.id inner join users u on u.id=c.userId  where i.id='{$forumId}'";

			$rs = DBHelper::executeQuery($sql);

			if(is_bool($rs)){
				return false;
			}

			if($rs){
				return Packaging::packagingInvitationComment($rs);
			}
			else{
				return $rs;
			}
		}

		/*
			获取是否存在该收藏
		*/
		public static function getCollectId($userId,$menuId){
			$sql = "select id from collects where userId='{$userId}' and menuId='{$menuId}'";

			$rs = DBHelper::executeQuery($sql);

			if(is_bool($rs)){
				return false;
			}

			return $rs;
		}
		/*
			获取关键字菜谱
		*/
		public static function searchMenus($keyword){
			$sql = "select id , name ,des ,likecount,cover,areaId,typeId,main,assist from menus where locate('{$keyword}', name) or locate('{$keyword}', main)";

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


/*
	public static function delete($id){
		$sql = "delete from books where id = '{$id}'";

		return DBHelper::executeNonQuery($sql);
	}


	public static function insert(BookInfo $book){
		$sql = "insert into books(id , name , price ,image) values('{$book->id}','{$book->name}',$book->price,'{$book->image}')";

		return DBHelper::executeNonQuery($sql);
	}*/
}