<?php 

//食材分类
class FoodCategoryInfo{
	public $id;
	public $name;
}

//食材
class FoodInfo{
	public $id;
	public $name;
	public $describe;
	public $categoryId;
	public $images;
}

//菜谱地区
class MenuAreaInfo{
	public $id;
	public $name;
}

//菜谱类型
class MenuTypeInfo{
	public $id;
	public $name;
}

//菜谱
class MenuInfo{
	public $id;
	public $name;
	public $describe;
	public $likecount;
	public $cover;
	public $areaId;
	public $typeId;
	public $main;
	public $mainList;
	public $assist;
	public $assistList;
}

//栏目
class SectionInfo{
	public $id;
	public $name;
}

//栏目菜谱表
class MenuSectionInfo{
	public $id;
	public $sectionId;
	public $menuId;
}

//菜品食材表
class MenuFoodInfo{
	public $id;
	public $menuId;
	public $foodId;
	public $describe;
}

//制作步骤表
class StepInfo{
	public $id;
	public $menuId;
	public $image;
	public $imageList;
	public $describe;
	public $describeList;
}

//菜谱评论
class MenuCommentInfo{
	public $id;
	public $menuId;
	public $content;
	public $userId;
	public $commentTime;
	public $header;
	public $nickName;
}

//新闻动态表
class NewsInfo{
	public $id;
	public $title;
	public $firstCover;
	public $firstDescribe;
	public $secondCover;
	public $secondDescribe;
	public $createTime;
}

//会员
class UserInfo{
	public $id;
	public $phone;
	public $password;
	public $nickName;
	public $header;
	public $sex;
}

//帖子
class InvitationInfo{
	public $id;
	public $title;
	public $content;
	public $images;
	public $imageList;
	public $issueTime;
	public $header;
	public $userId;
	public $nickName;
	public $state;
}

//跟帖
class CommentInfo{
	public $id;
	public $invitationId;
	public $content;
	public $userId;
	public $commentTime;
}

//收藏
class CollectInfo{
	public $id;
	public $userId;
	public $menuId;
	public $collectTime;
}

//管理员
class AdministratorInfo{
	public $id;
	public $name;
	public $nick;
}


