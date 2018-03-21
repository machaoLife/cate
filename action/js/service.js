/**
 * Created by Administrator on 2018/1/6.
 */
(function(){
    angular.module('app.service',[])
        .constant('ROOT_URL','http://127.0.0.1:9088/cate/ajax/')
        .service('CacheService',function($window){
            //本地存储 localStorage
            this.set = function(key,value){
                $window.localStorage.setItem(key,JSON.stringify(value));
            };
            this.get = function(key){
                var value=JSON.parse($window.localStorage.getItem(key));
                if(value){
                    return value
                }
                return null;
            };
            this.cancel = function(key){
                var value=$window.localStorage.getItem(key);
                if(value){
                    $window.localStorage.removeItem(key);
                    return true;
                }
                return false;
            };
            //本地会话存储
            this.setSession = function(key,value){
                $window.sessionStorage.setItem(key,JSON.stringify(value));
            };
            this.getSession = function(key){
                var value=JSON.parse($window.sessionStorage.getItem(key));
                if(value){
                    return value
                }
                return null;
            };
            this.cancelSession = function(key){
                var value=$window.sessionStorage.getItem(key);
                if(value){
                    $window.sessionStorage.removeItem(key);
                    return true;
                }
                return false;
            }
        })
        .service('foodService',function($http,ROOT_URL){
            //获取特定类的蔬菜
            this.getCategoryFood = function(){
                return $http.get(ROOT_URL+'food/food.php');
            };

            //获取食材分类
            this.getFoodCategory = function(){
                return $http.get(ROOT_URL+'food/foodCategory.php');
            };


            //添加图书分类
            this.addCategory = function(name,icon){
                var fd = new FormData();
                fd.append('name',name);
                fd.append('icon',icon);
                return $http({
                    url:ROOT_URL+'category/create',
                    method:'POST',
                    data:fd,
                    headers: { 'Content-Type': undefined },
                    transformRequest: angular.identity
                });
            };


        })
        .service('menuService',function($http,ROOT_URL,$window){
            //获取菜品分类
            this.getTypeMenus = function(){
                return $http.get(ROOT_URL+'menu/menuTypes.php');
            };
            //获取地区分类
            this.getAreaMenus = function(){
                return $http.get(ROOT_URL+'menu/menuAreas.php');
            };

            //获取所有菜谱
            this.getAllMenus = function(){
                return $http.get(ROOT_URL+'menu/menu.php');
            };

            //获取菜单页推荐菜谱
            this.getRecommendMenus = function(){
                return $http.get(ROOT_URL+'section/menuSection.php');
            };

            //获取模糊搜索菜谱
            this.searchMenus = function(keyword){
                return $http.get(ROOT_URL+'menu/searchMenus.php?keyword='+keyword);
            }
        })
        .service('sectionService',function($http,ROOT_URL){
            //栏目分类
            this.getAllSections = function(){
                return $http.get(ROOT_URL+'section/section.php');
            };
            //栏目下菜谱
            this.getSectionMenus = function($id){
                return $http.get(ROOT_URL+'section/menuSection.php?sectionId='+$id);
            };


        })
        .service('menuDetailsService',function($http,ROOT_URL){
            //获取菜谱详情
            this.getMenuDetails = function($menuId){
                return $http.get(ROOT_URL+'menu/singleMenu.php?menuId='+$menuId);
            };

            //获取菜谱步骤
            this.getMenuStep = function($menuId){
                return $http.get(ROOT_URL+'menu/step.php?menuId='+$menuId);
            };

            //获取菜谱评论
            this.getMenuComment = function($menuId){
                return $http.get(ROOT_URL+'menu/menuComment.php?menuId='+$menuId);
            };
            //菜谱是否已经收藏
            this.isMenuCollect = function(formData){
                return $http({
                    url:ROOT_URL+'menu/isMenuCollect.php',
                    method:'POST',
                    data:formData,
                    headers: { 'Content-Type': undefined },
                    transformRequest: angular.identity
                });
            };

            //点击收藏
            this.collect = function(formData){
                return $http({
                    url:ROOT_URL+'menu/collect.php',
                    method:'POST',
                    data:formData,
                    headers: { 'Content-Type': undefined },
                    transformRequest: angular.identity
                });
            };
            //取消收藏
            this.deleteCollect = function(formData){
                return $http({
                    url:ROOT_URL+'menu/deleteCollect.php',
                    method:'POST',
                    data:formData,
                    headers: { 'Content-Type': undefined },
                    transformRequest: angular.identity
                });
            };

            //点赞
            this.likeMenu = function(menuId){
                return $http.get(ROOT_URL+'menu/likeMenu.php?menuId='+menuId);
            };

            //提交菜谱评论
            this.setMenuComment = function(formData){
                return $http({
                    url:ROOT_URL+'menu/setMenuComment.php',
                    method:'POST',
                    data:formData,
                    headers: { 'Content-Type': undefined },
                    transformRequest: angular.identity
                });
            };
        })
        .service('materialDetailsService',function($http,ROOT_URL){
            //获取食材详情
            this.getmaterialDetails = function(materialId){
                return $http.get(ROOT_URL+'food/singleFood.php?materialId='+materialId);
            };

            //获取食材相关菜谱
            this.getmaterialMenu = function(materialId){
                return $http.get(ROOT_URL+'food/menuFood.php?materialId='+materialId);
            };

        })
        .service('healthyService',function($http,ROOT_URL){
            //获取首页健康资讯
            this.gethomeHealthy = function(){
                return $http.get(ROOT_URL+'healthy/healthy.php');
            };

            //获取健康详情
            this.getSingleHealthy = function(healthyId){
                return $http.get(ROOT_URL+'healthy/singleHealthy.php?healthyId='+healthyId);
            };
        })
        .service('forumService',function($http,ROOT_URL){
            //获取帖子
            this.getInvitations = function(){
                return $http.get(ROOT_URL+'invitation/invitation.php');
            };

            //获取帖子ID
            this.getInvitationId = function(forumId){
                return $http.get(ROOT_URL+'invitation/singleInvitation.php?forumId='+forumId);
            };

            //获取帖子评论
            this.getInvitationComments = function(forumId){
                return $http.get(ROOT_URL+'invitation/comment.php?forumId='+forumId);
            };

            //上传图片
            this.uploadFile = function(formData){
                return $http({
                    url:ROOT_URL+'invitation/upload.php',
                    method:'POST',
                    data:formData,
                    headers: { 'Content-Type': undefined },
                    transformRequest: angular.identity
                });
            };

            //发布帖子
            this.uploadIssue = function(formData){
                return $http({
                    url:ROOT_URL+'invitation/uploadIssue.php',
                    method:'POST',
                    data:formData,
                    headers: { 'Content-Type': undefined },
                    transformRequest: angular.identity
                });
            };

            //提交帖子下评论
            this.setInvitationComment = function(formData){
                return $http({
                    url:ROOT_URL+'invitation/setInvitationComment.php',
                    method:'POST',
                    data:formData,
                    headers: { 'Content-Type': undefined },
                    transformRequest: angular.identity
                });
            };
        })
        .service('userService',function($http,ROOT_URL){
            //登录
            this.loginSerive = function(formData){
                return $http({
                    url:ROOT_URL+'user/login.php',
                    method:'POST',
                    data:formData,
                    headers: { 'Content-Type': undefined },
                    transformRequest: angular.identity
                });
            };

            //获取验证码
            this.getCard = function(phone){
                return $http.get(ROOT_URL+'user/sendCode.php?phone='+phone);
            };

            //注册
            this.registerSerive = function(formData){
                return $http({
                    url:ROOT_URL+'user/register.php',
                    method:'POST',
                    data:formData,
                    headers: { 'Content-Type': undefined },
                    transformRequest: angular.identity
                });
            };

            //获取用户收藏菜谱
            this.getCollects = function(userId){
                return $http.get(ROOT_URL+'user/getCollects.php?userId='+userId);
            };

            //获取用户帖子
            this.getUserInvitations = function(userId){
                return $http.get(ROOT_URL+'user/userInvitations.php?userId='+userId);
            };

            //获取用户资料
            this.getUser = function(userId){
                return $http.get(ROOT_URL+'user/getUser.php?userId='+userId);
            };

            //保存用户资料
            this.setUserMesage = function(formData){
                return $http({
                    url:ROOT_URL+'user/dataSave.php',
                    method:'POST',
                    data:formData,
                    headers: { 'Content-Type': undefined },
                    transformRequest: angular.identity
                });
            };

            //保存密码
            this.setUserPassword = function(formData){
                return $http({
                    url:ROOT_URL+'user/setUserPassword.php',
                    method:'POST',
                    data:formData,
                    headers: { 'Content-Type': undefined },
                    transformRequest: angular.identity
                });
            }



        })
        .service('historyService',function(){
            //创建查询历史记录
            this.createHistory = function(txt){
                var isEqual=false;

                var history=[];
                if(localStorage.getItem('history')!=null){
                    history=JSON.parse(localStorage.getItem('history'));
                }
                for(var i=0;i<history.length;i++){
                    if(history[0]==txt)
                    {
                        isEqual=true;
                        break;
                    }
                }
                if(!isEqual){
                    history.push(txt);

                    localStorage.setItem('history',JSON.stringify(history));
                }
            };

            //清除查询历史记录
            this.clearHistory = function(){
                var clear=[];
                localStorage.setItem('history',JSON.stringify(clear));
            };

            //创建用户历史记录
            this.createUser = function(txt){
                $window.localStorage.setItem('user',JSON.stringify(txt));
            };

            //注销用户信息
            this.clearUser = function(){
                $window.localStorage.removeItem('user');
            };

        });


}());