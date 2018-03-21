<?php 

require_once("cate/model/dataInfo.php");

class Packaging{
	//封装所有菜谱数据
	public static function packagingAllMenu($rs){
		$menus = [];

		foreach($rs as $row){
			$menu = new MenuInfo();

			$menu -> id = $row[0];
			$menu -> name = $row[1];
			$menu -> describe = $row[2];
			$menu -> likecount = $row[3];
			$menu -> cover = $row[4];
			$menu -> covers = explode("," , $menu->cover);
			$menu -> areaId = $row[5];
			$menu -> typeId = $row[6]; 
			$menu -> main = $row[7];
			$menu -> mainList = explode("," , $menu->main);
			$menu -> assist = $row[8]; 
			$menu -> assistList = explode("," , $menu->assist);
			
			$count = count($menu->covers);
			for($i = 0 ; $i < $count; $i++){
				$menu->covers[$i] = GlobalSetting::IMAGE_URL_ROOT . $menu->covers[$i] ;
			}


			$menus[] = $menu;
		}

		return $menus;
	}

	//封装关键字菜谱数据
	public static function packagingKeywordMenu($rs){
		$menus = [];

		foreach($rs as $row){
			$menu = new MenuInfo();

			$menu -> id = $row[0];
			$menu -> name = $row[1];
			$menu -> describe = $row[2];
			$menu -> likecount = $row[3];
			$menu -> cover = $row[4];
			$menu -> covers = explode("," , $menu->cover);
			$menu -> areaId = $row[5];
			$menu -> typeId = $row[6]; 
			$menu -> main = $row[7];
			$menu -> mainList = explode("," , $menu->main);
			$menu -> assist = $row[8]; 
			$menu -> assistList = explode("," , $menu->assist);
			$menu -> typeName = $row[9];
			$menu -> areaName = $row[10];
			
			$count = count($menu->covers);
			for($i = 0 ; $i < $count; $i++){
				$menu->covers[$i] = GlobalSetting::IMAGE_URL_ROOT . $menu->covers[$i] ;
			}


			$menus[] = $menu;
		}

		return $menus;
	}

	//封装单个菜谱数据
	public static function packagingSingleMenu($rs){
		$menu = null;
		if($rs){
			$row = $rs[0];

			$menu = new MenuInfo();

			$menu -> id = $row[0];
			$menu -> name = $row[1];
			$menu -> describe = $row[2];
			$menu -> likecount = $row[3];
			$menu -> cover = $row[4];
			$menu -> covers = explode("," , $menu->cover);
			$menu -> areaId = $row[5];
			$menu -> typeId = $row[6];
			$menu -> main = $row[7];
			$menu -> mainList = explode("," , $menu->main);
			$menu -> assist = $row[8]; 
			$menu -> assistList = explode("," , $menu->assist);

			
			$count = count($menu->covers);
			for($i = 0 ; $i < $count; $i++){
				$menu->covers[$i] = GlobalSetting::IMAGE_URL_ROOT . $menu->covers[$i] ;
			}
		}

		return $menu;
	}
	//封装所有食材数据
	public static function packagingAllFood($rs){
		$foods = [];

		foreach($rs as $row){
			$food = new FoodInfo();

			$food -> id = $row[0];
			$food -> name = $row[1];
			$food -> describe = $row[2];
			$food -> categoryId = $row[3];
			$food -> image = $row[4];
			$food -> images = explode("," , $food->image);


			
			$count = count($food->images);
			for($i = 0 ; $i < $count; $i++){
				$food->images[$i] = GlobalSetting::IMAGE_URL_ROOT . $food->images[$i] ;
			}


			$foods[] = $food;
		}

		return $foods;
	}
	//封装单个食材数据
	public static function packagingSingleFood($rs){
		$food = null;
		if($rs){
			$row = $rs[0];

			$food = new FoodInfo();

			$food -> id = $row[0];
			$food -> name = $row[1];
			$food -> describe = $row[2];
			$food -> categoryId = $row[3];
			$food -> image = $row[4];
			$food -> images = explode("," , $food->image);

			
			$count = count($food->images);
			for($i = 0 ; $i < $count; $i++){
				$food->images[$i] = GlobalSetting::IMAGE_URL_ROOT . $food->images[$i] ;
			}
		}

		return $food;
	}

	//封装栏目
	public static function packagingCategory($rs){
		$categorys = [];

		foreach($rs as $row){
			$category = new SectionInfo();

			$category -> id = $row[0];
			$category -> name = $row[1];

			$categorys[] = $category;
		}

		return $categorys;
	}

	//封装新闻集合
	public static function packagingAllNews($rs){
		$news = [];

		foreach($rs as $row){
			$new = new NewsInfo();

			$new -> id = $row[0];
			$new -> title = $row[1];
			$new -> firstCover = GlobalSetting::IMAGE_URL_ROOT .$row[2];
			$new -> firstDescribe = $row[3];
			$new -> secondCover = GlobalSetting::IMAGE_URL_ROOT .$row[4];
			$new -> secondDescribe = $row[5];
			$new -> createTime = $row[6];

			$news[] = $new;
		}

		return $news;
	}

	//封装单个新闻
	public static function packagingsingleNews($rs){
		$news = null;

		$row=$rs[0];

		$news = new NewsInfo();

		$news -> id = $row[0];
		$news -> title = $row[1];
		$news -> firstCover = GlobalSetting::IMAGE_URL_ROOT .$row[2];
		$news -> firstDescribe = $row[3];
		$news -> secondCover = GlobalSetting::IMAGE_URL_ROOT .$row[4];
		$news -> secondDescribe = $row[5];
		$news -> createTime = $row[6];

		return $news;
	}


	//封装菜单步骤
	public static function packagingStep($rs){
		$steps = [];

		foreach($rs as $row){
			$step = new StepInfo();

			$step -> id = $row[0];
			$step -> menuId = $row[1];
			$step -> image = $row[2];
			if(!$row[2]){
				$step -> imageList= null;
			}
			else{
				$step -> imageList = explode("," , $step->image);
			}
			$step -> describe = $row[3];
			$step -> describeList = explode("|" , $step->describe);

			$count = count($step->imageList);
			for($i = 0 ; $i < $count; $i++){
				$step->imageList[$i] = GlobalSetting::IMAGE_URL_ROOT . $step->imageList[$i] ;
			}

			$steps[] = $step;
		}

		return $steps;
	}

	//封装菜单评论
	public static function packagingComment($rs){
		$comments = [];

		foreach($rs as $row){
			$comment = new MenuCommentInfo();

			$comment -> id = $row[0];
			$comment -> menuId = $row[1];
			$comment -> content = $row[2];
			$comment -> userId = $row[3];
			$comment -> commentTime = $row[4];
			$comment -> header = GlobalSetting::IMAGE_URL_ROOT . $row[5];
			$comment -> nickName = $row[6];


			$comments[] = $comment;
		}

		return $comments;
	}

	//封装论坛帖子
	public static function packagingInvitations($rs){
		$invitations = [];

		foreach($rs as $row){
			$invitation = new InvitationInfo();

			$invitation -> id = $row[0];
			$invitation -> title = $row[1];
			$invitation -> content = $row[2];
			$invitation -> images = $row[3];
			$invitation -> imageList = explode("," , $invitation -> images);
			$invitation -> issueTime = $row[4];
			$invitation -> userId = $row[5];
			$invitation -> header = GlobalSetting::IMAGE_URL_ROOT . $row[6];
			$invitation -> nickName = $row[7];
			$invitation -> state =$row[8];

			$count = count($invitation->imageList);
			for($i = 0 ; $i < $count; $i++){
				$invitation->imageList[$i] = GlobalSetting::IMAGE_URL_ROOT . $invitation->imageList[$i] ;
			}

			$invitations[] = $invitation;
		}

		return $invitations;
	}

	//封装单个帖子
	public static function packagingSingleInvitation($rs){
		$invitation = null;

			$row=$rs[0];

			$invitation = new InvitationInfo();

			$invitation -> id = $row[0];
			$invitation -> title = $row[1];
			$invitation -> content = $row[2];
			$invitation -> images = $row[3];
			$invitation -> imageList = explode("," , $invitation -> images);
			$invitation -> issueTime = $row[4];
			$invitation -> userId = $row[5];
			$invitation -> header = GlobalSetting::IMAGE_URL_ROOT . $row[6];
			$invitation -> nickName = $row[7];

			$count = count($invitation->imageList);
			for($i = 0 ; $i < $count; $i++){
				$invitation->imageList[$i] = GlobalSetting::IMAGE_URL_ROOT . $invitation->imageList[$i] ;
			}

		return $invitation;
	}

	//封装帖子下评论
	public static function packagingInvitationComment($rs){
		$comments = [];

		foreach($rs as $row){
			$comment = new CommentInfo();

			$comment -> id = $row[0];
			$comment -> invitationId = $row[1];
			$comment -> content = $row[2];
			$comment -> userId = $row[3];
			$comment -> commentTime = $row[4];
			$comment -> header = GlobalSetting::IMAGE_URL_ROOT . $row[5];
			$comment -> nickName = $row[6];


			$comments[] = $comment;
		}

		return $comments;
	}

	//封装用户
	public static function packagingUser($rs){
		$user = null;

		$row=$rs[0];

		$user = new UserInfo();

		$user -> id = $row[0];
		$user -> phone = $row[1];
		$user -> nickName = $row[2];
		$user -> header = GlobalSetting::IMAGE_URL_ROOT .$row[3];
		$user -> sex =$row[4];

		return $user;
	}

	//封装管理员用户
	public static function packagingUserAdmin($rs){
		$user = null;

		$row=$rs[0];

		$user = new AdministratorInfo();

		$user -> id = $row[0];
		$user -> name = $row[1];
		$user -> nick = $row[2];

		return $user;

	}
}


