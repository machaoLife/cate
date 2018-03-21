/**
 * Created by Administrator on 2018/1/15.
 */
(function(){
    angular.module('app.service',[])
        .constant('ROOT_URL','http://192.168.12.117:9088/cate/manage/')
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
            //获取食材分类
            this.getFoodCategory = function(){
                //食材分类
                return $http.get(ROOT_URL+'food/foodCategory.php');
            };

            //添加新分类
            this.addCategory = function(name){
                return $http.get(ROOT_URL+'food/addCategory.php?name='+name);
            };

            //编辑新分类
            this.editCategory = function(formData){
                return $http({
                    url:ROOT_URL+'food/editCategory.php',
                    method:'POST',
                    data:formData,
                    headers: { 'Content-Type': undefined },
                    transformRequest: angular.identity
                });
            };

            //获取所有食材
            this.getFoods = function(categoryId,keyword){
                var cateId;
                var word=keyword||'';
                if(categoryId && categoryId.id != 0){
                    cateId=categoryId.id;
                }
                else{
                    cateId='';
                }

                return $http.get(ROOT_URL+'food/food.php',{
                    params:{
                        categoryId:cateId,
                        keyword:word
                    }
                });
            };


            //获取单个食材
            this.singleFood = function(id){
                return $http.get(ROOT_URL+'food/singleFood.php?id='+id);
            };

            //添加食材
            this.addFood = function(fromData){
                return $http({
                    url:ROOT_URL+'food/addFood.php',
                    method:'POST',
                    data:fromData,
                    headers: { 'Content-Type': undefined },
                    transformRequest: angular.identity
                });
            };

            //编辑食材
            this.editFood = function(fromData){
                return $http({
                    url:ROOT_URL+'food/editFood.php',
                    method:'POST',
                    data:fromData,
                    headers: { 'Content-Type': undefined },
                    transformRequest: angular.identity
                });
            }



        })
        .service('sectionService',function($http,ROOT_URL){
            //获取栏目分类
            this.getSection = function(){
                //食材分类
                return $http.get(ROOT_URL+'section/section.php');
            };

            //添加新分类
            this.addSection = function(name){
                return $http.get(ROOT_URL+'section/addSection.php?name='+name);
            };

            //编辑新分类
            this.editSection = function(formData){
                return $http({
                    url:ROOT_URL+'section/editSection.php',
                    method:'POST',
                    data:formData,
                    headers: { 'Content-Type': undefined },
                    transformRequest: angular.identity
                });
            };
        })
        .service('menuService',function($http,ROOT_URL){
            //获取所有图书
            this.getMenus = function(){
                return $http.get(ROOT_URL+'menu/menu.php');
            };

            //获取菜系分类
            this.getType = function(){
                return $http.get(ROOT_URL+'menu/menuType.php');
            };

            //获取地区分类
            this.getArea = function(){
                return $http.get(ROOT_URL+'menu/menuArea.php');
            };
            //获取菜谱ID
            this.singleMenu = function(menuId){
                return $http.get(ROOT_URL+'menu/singleMenu.php?menuId='+menuId);
            };
            //编辑菜谱
            this.editMenu = function(formDate){
                return $http({
                    url:ROOT_URL+'menu/update.php',
                    method:'POST',
                    data:formDate,
                    headers: { 'Content-Type': undefined },
                    transformRequest: angular.identity
                });
            };

        })
        .service('healthyService',function($http,ROOT_URL){
            this.getHelathy = function(){
                return $http.get(ROOT_URL+'healthy/healthy.php');
            };
            this.singleHealthy = function(id){
                return $http.get(ROOT_URL+'healthy/singleHealthy.php?id='+id);
            };
            this.addHealthy = function(formDate){
                return $http({
                    url:ROOT_URL+'healthy/create.php',
                    method:'POST',
                    data:formDate,
                    headers: { 'Content-Type': undefined },
                    transformRequest: angular.identity
                });
            };

            this.editHealthy = function(formDate){
                return $http({
                    url:ROOT_URL+'healthy/update.php',
                    method:'POST',
                    data:formDate,
                    headers: { 'Content-Type': undefined },
                    transformRequest: angular.identity
                });
            }
        })
        .service('invitationService',function($http,ROOT_URL){
            this.getInvitation = function(){
                return $http.get(ROOT_URL+'invitation/invitation.php');
            };
            this.singleInvitation = function(id){
                return $http.get(ROOT_URL+'invitation/singleInvitation.php?id='+id);
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

            //通过审核
            this.checkPass = function(id){
                return $http.get(ROOT_URL+'invitation/checkPass.php?id='+id);
            };

            //未通过审核
            this.notPass = function(id){
                return $http.get(ROOT_URL+'invitation/notPass.php?id='+id);
            };
        });
}());
