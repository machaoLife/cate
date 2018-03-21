/**
 * Created by Administrator on 2018/1/15.
 */
(function(){
    angular.module('app.controller',[])
        .controller('homeController',function($scope,CacheService,foodService){
            //食材分类
            $scope.user = CacheService.get('user');
            $scope.verify={
                isVacancy:false,
                categoryName:'',
                id:''
            };

            if(!$scope.user){
                location.href = 'login.html';
            }

            //获取食材分类
            function getFoodCategory(){
                foodService.getFoodCategory().then(function(response){
                    if(response.data.code == 100){
                        $scope.category = response.data.data;
                    }
                });
            }
            getFoodCategory();

            //添加新分类
            $scope.addCategory = function(){
                $scope.isAdd = true;
                $scope.verify.categoryName = '';
            };

            //编辑新分类
            $scope.editCategory = function(id,name){
                $scope.isAdd = false;
                $scope.verify.categoryName = name;
                $scope.verify.id = id;
            };

            //关闭
            $scope.cancelMesage = function(){
                $scope.verify.isVacancy = false;
            };

            //保存分类
            $scope.saveCategory = function(){
                if($scope.isAdd){
                    //添加
                    foodService.addCategory($scope.verify.categoryName).then(function(response){
                        if(response.data.code == 100){
                            getFoodCategory();
                            $('#myModal').modal('hide');
                            $scope.verify.isVacancy = false;

                        }
                        else{
                            $scope.verify.isVacancy = true;
                        }
                    });
                }
                else{
                    //编辑
                    var formData = new FormData();
                    formData.append('id',$scope.verify.id);
                    formData.append('name',$scope.verify.categoryName);

                    foodService.editCategory(formData).then(function(response){
                        if(response.data.code == 100){
                            getFoodCategory();
                            $('#myModal').modal('hide');
                        }
                    });
                }
            }
        })
        .controller('foodController',function($scope,foodService,$state){
            $scope.pageMessage={
                pageIndex:1,
                pageSize:10,
                totalPage:0
            };
            //获取食材分类信息
            foodService.getFoodCategory().then(function(response){
                if(response.data.code == 100){
                    $scope.classify=response.data.data;
                    $scope.classify.unshift({'id':0,'name':'全部类别'});
                    $scope.categoryId= $scope.classify[0];
                }
            });

            function getFoods(){
                $scope.pageMessage.total=[];
                $scope.pageMessage.pageIndex=1;

                foodService.getFoods($scope.categoryId,$scope.searchText).then(function(response){
                    if(response.data.code == 100){
                        $scope.food = response.data.data;
                        $scope.pageList=$scope.food.slice(($scope.pageMessage.pageIndex-1)*$scope.pageMessage.pageSize,$scope.pageMessage.pageIndex*$scope.pageMessage.pageSize);
                        $scope.pageMessage.totalPage=parseInt(Math.ceil( $scope.food.length/$scope.pageMessage.pageSize));
                    }
                    else{
                        $scope.pageList = null;
                        $scope.pageMessage.totalPage=0;
                    }
                });
            }
            getFoods();

            //点击页码
            $scope.btnPage = function(){
                $scope.pageList=$scope.food.slice(($scope.pageMessage.pageIndex-1)*$scope.pageMessage.pageSize,$scope.pageMessage.pageIndex*$scope.pageMessage.pageSize);
            };

            //下拉框改变 搜索图书
            $scope.serarchFood = function(){
                getFoods();
            };

            //添加新图书
            $scope.addBook = function(){
                $state.go('addFood');
            };
            //编辑
            $scope.editBook = function(id){
                $state.go('editFood',{foodId:id});
            };

            //搜索
            $scope.search = function(){
                getFoods();
            };

        })
        .controller('addFoodController',function($scope,$stateParams,foodService,$window,$state) {
            $scope.food ={
                name:'',
                describe:''
            };
            $scope.regulation={
                rule:{
                    size:800*1024,
                    type:['image/jpeg','image/png']
                },
                message:{
                    size:'图片必须小于8KB',
                    type:'图片的格式必须是jpeg/png'
                }
            };

            //获取食材分类信息
            foodService.getFoodCategory().then(function(response){
                if(response.data.code == 100){
                    $scope.classify=response.data.data;
                    $scope.classify.unshift({'id':0,'name':'全部类别'});
                    $scope.categoryId= $scope.classify[0];
                }
            });

            //取消
            $scope.goBack = function(){
                $window.history.back();
            };

            //保存
            $scope.saveFood = function(){
                var frmData = new FormData();
                for(var key in $scope.food){
                    frmData.append(key,$scope.food[key]);
                }
                frmData.append('categoryId',$scope.categoryId.id);
                frmData.append('cover',$scope.fileImage);

                foodService.addFood(frmData).then(function(response){
                    if(response.data.code == 100){
                        $state.go('food');
                    }
                });
            };
        })
        .controller('editFoodController',function($scope,$stateParams,foodService,$window,$state) {
            var foodId=$stateParams.foodId;
            $scope.regulation={
                rule:{
                    size:800*1024,
                    type:['image/jpeg','image/png']
                },
                message:{
                    size:'图片必须小于8KB',
                    type:'图片的格式必须是jpeg/png'
                }
            };

            //获取编辑图书信息
            foodService.singleFood(foodId).then(function(response){
                if(response.data.code == 100) {
                    $scope.data=response.data.data;
                    $scope.food = {
                        id: $scope.data.id,
                        name: $scope.data.name,
                        describe: $scope.data.describe,
                        images: $scope.data.images,
                        image:$scope.data.image
                    };
                    $scope.imageSrc=$scope.food.images[0];

                    //获取图书分类信息
                    foodService.getFoodCategory().then(function(response){
                        if(response.data.code == 100){
                            $scope.classify=response.data.data;
                            for(var i = 0;i<$scope.classify.length;i++){
                                if($scope.classify[i].id == $scope.data.categoryId){
                                    $scope.categoryItem= $scope.classify[i];
                                    return;
                                }
                            }
                        }
                    });

                }else{
                    $.mcDialog.alert({title: '提示信息', message: '食材信息不存在',isAutoHide:true});
                    $state.go('food');
                }
            });

                    //取消
                    $scope.goBack = function(){
                        $window.history.back();
                    };

                    //保存
                    $scope.saveFood = function(){
                        var frmData = new FormData();
                        for(var key in $scope.food){
                            frmData.append(key,$scope.food[key]);
                        }

                        frmData.append('categoryId',$scope.categoryItem.id);
                        if($scope.fileImage){
                            frmData.append('isCover',1);
                            frmData.append('cover',$scope.fileImage);
                        }else{
                            frmData.append('isCover',0);
                        }


                        foodService.editFood(frmData).then(function(response){
                            if(response.data.code == 100){
                                $state.go('food');
                            }
                        });
                    };
        })
        .controller('menuAreaController',function($scope,$stateParams,dataService,$window,$state){
            var sectionId=$stateParams.sectionId;
            $scope.sectionPriority=100;
            $scope.pageMessage={
                pageIndex:1,
                pageSize:5,
                totalPage:0
            };

            //返回
            $scope.goBack = function(){
                $window.history.back();
            };

            //获取栏目信息
            function getSection(){
                $scope.pageMessage.total=[];
                dataService.getSection(sectionId).then(function(response){
                    if(response.data.Code ==100&&response.status == 200){
                        $scope.list=response.data.Data;
                        $scope.pageList=$scope.list.Books.slice(($scope.pageMessage.pageIndex-1)*$scope.pageMessage.pageSize,$scope.pageMessage.pageIndex*$scope.pageMessage.pageSize);
                        $scope.count=$scope.list.Books.length;
                        $scope.pageMessage.totalPage=parseInt(Math.ceil( $scope.list.Books.length/$scope.pageMessage.pageSize));
                    }
                });
            }
            getSection();

            //点击页码
            $scope.btnPage = function(){
                $scope.pageList=$scope.list.Books.slice(($scope.pageMessage.pageIndex-1)*$scope.pageMessage.pageSize,$scope.pageMessage.pageIndex*$scope.pageMessage.pageSize);
            };

            //全选
            $('#checkboxAll').bind('change',function(){
                var $checkbox=$('tbody input[type=checkbox]');
                for(var i=0;i<$checkbox.length;i++)
                {
                    $checkbox[i].checked=this.checked;
                }
            });

            //添加新图书
            $scope.addBook = function(sectionId){
                $state.go('addSectionDetails',{sectionId:sectionId});
            };

            //删除栏目中图书
            $scope.cancelBook = function(sectionId,bookId,name){
                $.mcDialog.confirm({
                    title:'删除提示',
                    message:'你确认删除此《'+name+'》吗?',
                    afterConfirm:function(){
                        dataService.cancelSectionBook(sectionId,bookId).then(function(response){
                            if(response.data.Code ==100&&response.status == 200){
                                getSection();
                            }
                        });
                    },
                    afterCancel:function(){
                    }
                });
            };
        })
        .controller('menuTypeController',function($scope,$stateParams,dataService,$window){
            //添加栏目分类页
            var sectionId=$stateParams.sectionId;
            $scope.priority=100;
            $scope.pageMessage={
                pageIndex:1,
                pageSize:9,
                totalPage:0
            };

            //返回
            $scope.goBack = function(){
                $window.history.back();
            };

            function getBooks(){
                $scope.pageMessage.total=[];
                $scope.list=[];
                dataService.searchSeciton(sectionId).then(function(response){
                    if(response.data.Code ==100&&response.status == 200){
                        $scope.section=response.data.Data;
                    }
                });

                dataService.getBooks().then(function(response){
                    if(response.data.Code ==100&&response.status == 200){
                        //非本栏目的图书
                        var data=response.data.Data;

                        for(var i=0;i<data.length;i++){
                            var isExist=false;
                            for(var j=0;j<$scope.section.length;j++){
                                if(data[i].Book.Id == $scope.section[j].Book.Id){
                                    isExist=true;
                                }
                            }
                            if(!isExist){
                                $scope.list.push(data[i]);
                            }
                        }

                        $scope.pageList=$scope.list.slice(($scope.pageMessage.pageIndex-1)*$scope.pageMessage.pageSize,$scope.pageMessage.pageIndex*$scope.pageMessage.pageSize);
                        $scope.pageMessage.totalPage=parseInt(Math.ceil( $scope.list.length/$scope.pageMessage.pageSize));
                    }
                });
            }
            getBooks();

            //点击页码
            $scope.btnPage = function(){
                $scope.pageList=$scope.list.slice(($scope.pageMessage.pageIndex-1)*$scope.pageMessage.pageSize,$scope.pageMessage.pageIndex*$scope.pageMessage.pageSize);
            };

            //添加到栏目
            $scope.addSection = function(bookId){
                dataService.addSectionBook(sectionId,bookId,$scope.priority).then(function(response){
                    if(response.data.Code ==100&&response.status == 200){
                        $.mcDialog.alert({title: '提示信息', message: '已成功添加到栏目中.',isAutoHide:true});
                        getBooks();
                    }
                });
            };

        })
        .controller('sectionController',function($scope,sectionService){

            $scope.modal={
                isVacancy:false,
                categoryName:''
            };

            function getCategory(){

                //获取栏目分类
                sectionService.getSection().then(function(response){
                    if(response.data.code == 100){
                        $scope.section=response.data.data;
                        console.log($scope.section);

                    }
                });
            }
            getCategory();


            $scope.addSection = function(){
                $scope.isAdd=true;
                $scope.modal.isVacancy=false;
            };
            $scope.editSection = function(id,name){
                $scope.isAdd=false;
                $scope.modal.categoryName=name;
                $scope.sectionId=id;
            };

            //清除模式框数据
            $scope.cancelMesage = function(){
                $scope.modal.categoryName='';
                $scope.modal.isVacancy=false;
            };
            //保存栏目
            $scope.saveSection = function(){
                if($scope.isAdd){
                    //添加
                    if($scope.modal.categoryName){
                        sectionService.addSection($scope.modal.categoryName).then(function(response){
                            if(response.data.code == 100){
                                $scope.modal.categoryName='';
                                $scope.modal.isVacancy=false;
                                getCategory();
                                $('#myModal').modal('hide');
                            }
                        });
                    }
                    else{
                        $scope.modal.isVacancy=true;
                    }
                }
                else{
                    //编辑
                    if($scope.modal.categoryName){
                        var frmData = new FormData();
                        frmData.append('id',$scope.sectionId);
                        frmData.append('name',$scope.modal.categoryName);

                        sectionService.editSection(frmData).then(function(response){
                            if(response.data.code == 100){
                                $scope.modal.categoryName='';
                                $scope.modal.isVacancy=false;
                                getCategory();
                                $('#myModal').modal('hide');
                            }
                        });
                    }
                    else{
                        $scope.modal.isVacancy=true;
                    }
                }

            };
        })
        .controller('menuController',function($scope,$stateParams,menuService,$state,$filter){
            $scope.pageMessage={
                pageIndex:1,
                pageSize:10,
                totalPage:0
            };
            $scope.searchText = null;

            //获取菜品类型
            menuService.getType().then(function(response){
                if(response.data.code == 100){
                    $scope.menuType=response.data.data;
                    $scope.menuType.unshift({'id':0,'name':'全部类别'});
                    $scope.typeId= $scope.menuType[0];
                }
            });


            //获取菜品地区
            menuService.getArea().then(function(response){
                if(response.data.code == 100){
                    $scope.menuArea=response.data.data;
                    $scope.menuArea.unshift({'id':0,'name':'全部类别'});
                    $scope.areaId= $scope.menuArea[0];
                }
                getMenus();
            });

            //筛选分类
            function menufilter(){
                $scope.data=$filter("menuFilter")($scope.menus,$scope.typeId.id,$scope.areaId.id,$scope.searchText);
                $scope.pageList=$scope.data.slice(($scope.pageMessage.pageIndex-1)*$scope.pageMessage.pageSize,$scope.pageMessage.pageIndex*$scope.pageMessage.pageSize);
                $scope.pageMessage.totalPage=parseInt(Math.ceil($scope.data.length/$scope.pageMessage.pageSize));
            }

            //获取菜谱信息
            function getMenus(){
                $scope.pageMessage.total=[];
                $scope.pageMessage.pageIndex=1;

                menuService.getMenus().then(function(response){
                    if(response.data.code == 100){
                        $scope.menus=response.data.data;
                        console.log($scope.menus);
                        menufilter();
                    }else{
                        $scope.pageList = null;
                        $scope.pageMessage.totalPage = 0;
                    }
                });
            }

            //点击页码
            $scope.btnPage = function(){
                $scope.pageList=$scope.data.slice(($scope.pageMessage.pageIndex-1)*$scope.pageMessage.pageSize,$scope.pageMessage.pageIndex*$scope.pageMessage.pageSize);
            };

            //下拉框改变 搜索图书
            $scope.serarchFood = function(){
                menufilter();
            };
            //添加新图书
            $scope.addMenu = function(){
                $state.go('addMenu');
            };
            //编辑
            $scope.editMenu = function(id){
                $state.go('editMenu',{menuId:id});
            };

            //搜索
            $scope.search = function(){
                menufilter();
            };

        })
        .controller('addMenuController',function($scope,$stateParams,menuService,$state,$window){
            $scope.menu={
                name:'',
                main:'',
                assist:'',
                describe:''
            };
            $scope.typeId = '';
            $scope.areaId = '';
            $scope.regulation={
                rule:{
                    size:800*1024,
                    type:['image/jpeg','image/png']
                },
                message:{
                    size:'图片必须小于8KB',
                    type:'图片的格式必须是jpeg/png'
                }
            };

            //获取菜品类型
            menuService.getType().then(function(response){
                if(response.data.code == 100){
                    $scope.menuType=response.data.data;
                    $scope.typeId= $scope.menuType[0];
                }
            });


            //获取菜品地区
            menuService.getArea().then(function(response){
                if(response.data.code == 100){
                    $scope.menuArea=response.data.data;
                    $scope.areaId= $scope.menuArea[0];
                }
            });


            //取消
            $scope.goBack = function(){
                $window.history.back();
            };

            //保存
            $scope.saveMenu = function(){
                var frmData = new FormData();
                for(var key in $scope.menu){
                    frmData.append(key,$scope.menu[key]);
                }

                frmData.append('typeId',$scope.typeId.id);
                frmData.append('areaId',$scope.areaId.id);
                frmData.append('cover',$scope.fileImage);

                menuService.addMenu(frmData).then(function(response){
                    if(response.data.code == 100){
                        $state.go('menu');
                    }
                });
            };
        })
        .controller('editMenuController',function($scope,$stateParams,menuService,$window,$state) {
            var menuId=$stateParams.menuId;
            $scope.regulation={
                rule:{
                    size:800*1024,
                    type:['image/jpeg','image/png']
                },
                message:{
                    size:'图片必须小于8KB',
                    type:'图片的格式必须是jpeg/png'
                }
            };

            //获取编辑图书信息
            menuService.singleMenu(menuId).then(function(response){
                if(response.data.code == 100) {
                    $scope.data=response.data.data;
                    $scope.menu = {
                        id: $scope.data.id,
                        name: $scope.data.name,
                        describe: $scope.data.describe,
                        main: $scope.data.main,
                        assist:$scope.data.assist,
                        image:$scope.data.covers[0]
                    };

                    $scope.typeId = '';
                    $scope.areaId = '';
                    $scope.imageSrc=$scope.menu.image;

                    //获取菜品类型
                    menuService.getType().then(function(response){
                        if(response.data.code == 100){
                            $scope.menuType=response.data.data;
                            for(var i = 0;i<$scope.menuType.length;i++){
                                if($scope.menuType[i].id == $scope.data.typeId){
                                    $scope.typeId= $scope.menuType[i];
                                    return;
                                }
                            }
                        }
                    });

                    //获取菜品地区
                    menuService.getArea().then(function(response){
                        if(response.data.code == 100){
                            $scope.menuArea=response.data.data;
                            for(var i = 0;i<$scope.menuArea.length;i++){
                                if($scope.menuArea[i].id == $scope.data.areaId){
                                    $scope.areaId= $scope.menuArea[i];
                                    return;
                                }
                            }
                        }
                    });

                }else{
                    $.mcDialog.alert({title: '提示信息', message: '菜谱信息不存在',isAutoHide:true});
                    $state.go('menu');
                }
            });

            //取消
            $scope.goBack = function(){
                $window.history.back();
            };
            //上传菜谱
            $('#affirmStep').bind('click',function(){
                var stepContent=$('#stepContent');
                var content = stepContent.val();

                $div = $("<div></div>");
                $div.addClass("menu-step-list");
                $span = $("<span></span>");
                $span.text(content);
                $span.appendTo($div);
                $cancel = $("<div></div>");
                $cancel.text("删除");
                $cancel.appendTo($div);
                $input = $("<input type='hidden' name='step' />");
                $input.val(content);
                $input.appendTo($div);
                $div.appendTo(".menu-step-content");

                $cancel.bind('click',function(){
                    $(this).parent().remove();
                });
                stepContent.val('');
            });

            //保存
            $scope.saveMenu = function(){
                var frmData = new FormData();
                for(var key in $scope.menu){
                    frmData.append(key,$scope.menu[key]);
                }
                frmData.append('typeId',$scope.typeId.id);
                frmData.append('areaId',$scope.areaId.id);

                if($scope.fileImage){
                    frmData.append('isCover',1);
                    frmData.append('cover',$scope.fileImage);
                }else{
                    frmData.append('isCover',0);
                }

                //获取所有步骤
                var step='';
                var $stepList=$('input[type=hidden]');
                for(var i= 0;i<$stepList.length;i++){
                    if(i == 0){
                        step+=$stepList[i].value;
                    }
                    else{
                        step+="|"+$stepList[i].value;
                    }
                }
                console.log(step);
                frmData.append('step',step);
                menuService.editMenu(frmData).then(function(response){
                    if(response.data.code == 100){
                        $state.go('menu');
                    }
                });
            };
        })
        .controller('healthyController',function($scope,$stateParams,healthyService,$state,$window,$filter){
            $scope.pageMessage={
                pageIndex:1,
                pageSize:10,
                totalPage:0
            };
            $scope.searchText = null;

            //筛选分类
            function healthyfilter(){
                $scope.data=$filter("healthyFilter")($scope.healthy,$scope.searchText);
                console.log($scope.data);
                $scope.pageList=$scope.data.slice(($scope.pageMessage.pageIndex-1)*$scope.pageMessage.pageSize,$scope.pageMessage.pageIndex*$scope.pageMessage.pageSize);
                $scope.pageMessage.totalPage=parseInt(Math.ceil($scope.data.length/$scope.pageMessage.pageSize));
            }

            //获取菜谱信息
            function getHelathy(){
                $scope.pageMessage.total=[];
                $scope.pageMessage.pageIndex=1;

                healthyService.getHelathy().then(function(response){
                    if(response.data.code == 100){
                        $scope.healthy=response.data.data;
                        healthyfilter();
                    }else{
                        $scope.pageList = null;
                        $scope.pageMessage.totalPage = 0;
                    }
                });
            }
            getHelathy();

            //点击页码
            $scope.btnPage = function(){
                $scope.pageList=$scope.data.slice(($scope.pageMessage.pageIndex-1)*$scope.pageMessage.pageSize,$scope.pageMessage.pageIndex*$scope.pageMessage.pageSize);
            };

            //添加新图书
            $scope.addHealthy = function(){
                $state.go('addHealthy');
            };
            //编辑
            $scope.editHealthy = function(id){
                $state.go('editHealthy',{healthyId:id});
            };

            //搜索
            $scope.search = function(){
                healthyfilter();
            };
        })
        .controller('addHealthyController',function($scope,$stateParams,healthyService,$state,$window,$filter){
            $scope.healthy={
                title:'',
                firstDescribe:'',
                secondDescribe:''
            };
            $scope.regulation={
                rule:{
                    size:800*1024,
                    type:['image/jpeg','image/png']
                },
                message:{
                    size:'图片必须小于8KB',
                    type:'图片的格式必须是jpeg/png'
                }
            };

            $scope.goBack = function(){
                $window.history.back();
            };

            //保存资讯
            $scope.saveHealthy = function(){
                var frmData = new FormData();
                for(var key in $scope.healthy){
                    frmData.append(key,$scope.healthy[key]);
                }

                frmData.append('firstCover',$scope.firstCover);
                frmData.append('secondCover',$scope.secondCover);

                healthyService.addHealthy(frmData).then(function(response){
                    if(response.data.code == 100){
                        $state.go('healthy');
                    }
                });
            };
        })
        .controller('editHealthyController',function($scope,$stateParams,healthyService,$state,$window,$filter){
            $scope.healthyId = $stateParams.healthyId;
                $scope.regulation={
                rule:{
                    size:800*1024,
                    type:['image/jpeg','image/png']
                },
                message:{
                    size:'图片必须小于8KB',
                    type:'图片的格式必须是jpeg/png'
                }
            };

            $scope.goBack = function(){
                $window.history.back();
            };

            healthyService.singleHealthy($scope.healthyId).then(function(response){
                if(response.data.code == 100){
                    $scope.data = response.data.data;
                    $scope.healthy = {
                        id:$scope.data.id,
                        title:$scope.data.title,
                        firstDescribe:$scope.data.firstDescribe,
                        secondDescribe:$scope.data.secondDescribe,
                    };
                    $scope.firstImage =$scope.data.firstCover;
                    $scope.secondImage =$scope.data.secondCover;
                }
            });

            //保存资讯
            $scope.saveHealthy = function(){
                var frmData = new FormData();
                for(var key in $scope.healthy){
                    frmData.append(key,$scope.healthy[key]);
                }

                if($scope.firstCover){
                    frmData.append('isFirstCover',1);
                    frmData.append('firstCover',$scope.firstCover);
                }else{
                    frmData.append('isFirstCover',0);
                }
                if($scope.secondCover){
                    frmData.append('isSecondCover',1);
                    frmData.append('secondCover',$scope.secondCover);
                }else{
                    frmData.append('isSecondCover',0);
                }

                healthyService.editHealthy(frmData).then(function(response){
                    if(response.data.code == 100){
                        $state.go('healthy');
                    }
                });
            };

        })
        .controller('invitationController',function($scope,$stateParams,invitationService,$state,$window,$filter){

            $scope.pageMessage={
                pageIndex:1,
                pageSize:10,
                totalPage:0
            };
            $scope.searchText = null;
            $scope.state = 1;
            $scope.stateContent = '待审核';


            //筛选分类
            function invitationfilter(){
                $scope.data=$filter("invitationFilter")($scope.invitation,$scope.searchText,$scope.state);
                $scope.pageList=$scope.data.slice(($scope.pageMessage.pageIndex-1)*$scope.pageMessage.pageSize,$scope.pageMessage.pageIndex*$scope.pageMessage.pageSize);
                $scope.pageMessage.totalPage=parseInt(Math.ceil($scope.data.length/$scope.pageMessage.pageSize));
            }

            //获取菜谱信息
            function getInvitation(){
                $scope.pageMessage.total=[];
                $scope.pageMessage.pageIndex=1;

                invitationService.getInvitation().then(function(response){
                    if(response.data.code == 100){
                        $scope.invitation=response.data.data;
                        console.log($scope.invitation);
                        invitationfilter();
                    }else{
                        $scope.pageList = null;
                        $scope.pageMessage.totalPage = 0;
                    }
                });
            }

            getInvitation();
            //点击页码
            $scope.btnPage = function(){
                $scope.pageList=$scope.data.slice(($scope.pageMessage.pageIndex-1)*$scope.pageMessage.pageSize,$scope.pageMessage.pageIndex*$scope.pageMessage.pageSize);
            };

            //搜索
            $scope.search = function(){
                invitationfilter();
            };

            //待审核
            $scope.check = function(){
                $scope.state = 1;
                $scope.stateContent = '待审核';
                invitationfilter();
            };

            //s审核
            $scope.checkInvitation = function(id){
              $state.go('checkInvitation',{invitationId:id});
            };

            //通过
            $scope.pass = function(){
                $scope.stateContent = '已通过';
                $scope.state = 2;
                invitationfilter();
            };

            //未通过
            $scope.noPass = function(){
                $scope.stateContent = '未通过';
                $scope.state = 0;
                invitationfilter();
            };

            //添加管理帖子
            $scope.addInvitation = function(){
                $state.go("addInvitation");
            }
        })
        .controller('addInvitationController',function($scope,$stateParams,CacheService,invitationService,$state,$window,$filter){
            $scope.goBack = function(){
                $window.history.back();
            };
            //上传管理员图片

            $('#upImage').bind('click',function(){
                $('input[type=file]').click();
            });
            $('input[type=file]').bind('change',function(){

                var formData=new FormData();
                formData.append("cover",this.files[0]);

                //上传图片
                invitationService.uploadFile(formData).then(function(response){
                    if(response.data.code == 100){

                        var coverList=document.querySelector('.issue-left-list');

                        var list=document.createElement('div');

                        var canel=document.createElement('div');
                        canel.innerHTML='删除';
                        list.appendChild(canel);

                        canel.onclick = function(){
                            this.parentNode.parentNode.removeChild(this.parentNode);
                        };

                        var img=document.createElement('img');
                        img.src=response.data.data.path;
                        list.appendChild(img);

                        var input=document.createElement('input');
                        input.type="hidden";
                        input.name="imgageList";
                        input.value=response.data.data.name;
                        list.appendChild(input);

                        coverList.appendChild(list);
                    }
                });
            });

            //发布帖子
            $('#invitation').bind('click',function(){
                var content=$('#issueContent').val();
                var title=$('#issueTitle').val();

                var image=[];
                var $imageList=$('input[type=hidden]');
                for(var i= 0;i<$imageList.length;i++){
                    image.push($imageList[i].value);
                }

                var formData = new FormData();
                formData.append('image',image);
                formData.append('title',title);
                formData.append('content',content);

                invitationService.uploadIssue(formData).then(function(response){
                    if(response.data.code == 100){
                        $state.go('forum');
                    }
                });
            });
        })
        .controller('checkInvitationController',function($scope,$stateParams,CacheService,invitationService,$state,$window,$filter){

            $scope.invitationId = $stateParams.invitationId;

            //获取帖子详情
            invitationService.singleInvitation($scope.invitationId).then(function(response){
                if(response.data.code == 100){
                    $scope.forum = response.data.data;
                }
            });

            $scope.goBack = function(){
                $window.history.back();
            };

            //审核通过
            $scope.checkPass = function(){
                invitationService.checkPass($scope.invitationId).then(function(response){
                    if(response.data.code == 100){
                        $state.go('invitation');
                    }
                });
            };

            //审核失败
            $scope.checkNothing = function(){
                invitationService.notPass($scope.invitationId).then(function(response){
                    if(response.data.code == 100){
                        $state.go('invitation');
                    }
                });
            };
        })
}());