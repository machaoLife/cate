/**
 * Created by Administrator on 2018/1/8.
 */
(function(){
    angular.module('app.controller',[])
        .controller('homeController',function($scope,$rootScope,$interval,CacheService,sectionService,healthyService,foodService){
            $scope.user = CacheService.get('user');

            function leftCarousel(){
                var index=$scope.index;
                $scope.index++;

                if( $scope.index>5){
                    $scope.index=0;
                }
                //开始轮播
                $('.carousel>img').eq(index)[0].className='left-out';
                $('.carousel>img').eq($scope.index)[0].className='right-in';
                changeIndex();
            }
            function startCarousel(){
                //自动轮播
                $scope.time=$interval(function(){
                    if($rootScope.flag == 1){
                        leftCarousel();
                    }
                    else{
                        $interval.cancel($scope.time);
                    }
                },4000);
            }
            function  cancelCarousel(){
                $interval.cancel($scope.time);
            }
            function changeIndex(){
                $('.carousel-indicators .carousel-active').removeClass();
                $('.carousel-indicators>li').eq($scope.index).addClass('carousel-active');
            }

            function rightCarousel(){
                var index=$scope.index;
                $scope.index--;

                if( $scope.index<0){
                    $scope.index=5;
                }
                //开始轮播
                $('.carousel>img').eq(index)[0].className='right-out';
                $('.carousel>img').eq($scope.index)[0].className='left-in';
                changeIndex();
            }
            $('.carousel-indicators li').bind('click',function(){
                cancelCarousel();
                var index=$scope.index;
                $scope.index=$(this).index();
                showCarousel(index);
                startCarousel();
            });

            $scope.index=0;

            startCarousel();


            $('.carousel-left').bind('click',function(){
                cancelCarousel();
                leftCarousel();
                startCarousel();
            });

            $('.carousel-right').bind('click',function(){
                cancelCarousel();
                rightCarousel();
                startCarousel();
            });

            function showCarousel(index){
                if(index<$scope.index){
                    $('.carousel>img').eq(index)[0].className='left-out';
                    $('.carousel>img').eq($scope.index)[0].className='right-in';
                }
                else{
                    $('.carousel>img').eq(index)[0].className='right-out';
                    $('.carousel>img').eq($scope.index)[0].className='left-in';
                }
                changeIndex();
            }

            $scope.menus={
                recommend:[],
                hot:[],
                now:[]
            };

            //获取所有栏目
            sectionService.getAllSections().then(function(response){

                if(response.data.code == 100){
                    $scope.section=response.data.data;

                    //每日推荐
                    sectionService.getSectionMenus($scope.section[0]["id"]).then(function(response){
                        if(response.data.code == 100){
                            $scope.menus.recommend=response.data.data;
                            $scope.menus.recommend=$scope.menus.recommend.slice(0,3);
                        }
                    });
                    //热门菜单
                    sectionService.getSectionMenus($scope.section[1]["id"]).then(function(response){
                        if(response.data.code == 100){
                            $scope.menus.hot=response.data.data;
                        }
                    });
                    //新秀菜单
                    sectionService.getSectionMenus($scope.section[2]["id"]).then(function(response){
                        if(response.data.code == 100){
                            $scope.menus.now=response.data.data;
                        }
                    });
                }
            });

            //获取首页食材
            foodService.getCategoryFood().then(function(response){
                if(response.data.code == 100){
                    $scope.food=response.data.data;
                    $scope.food=$scope.food.slice(0,8);
                }
            });

            //获取首页健康资讯
            healthyService.gethomeHealthy().then(function(response){
                if(response.data.code == 100){
                    $scope.healthy=response.data.data;
                    $scope.healthy=$scope.healthy.slice(0,4);
                }
            });

        })
        .controller('menuController',function($scope,$rootScope,$interval,$location,menuService,$filter){
            $scope.pageMessage={
                pageIndex:1,
                pageSize:16,
                totalPage:0
            };
            $scope.typeFilter=0;
            $scope.areaFilter=0;

            getMenu();
            //获取菜品分类
            menuService.getTypeMenus().then(function(response){

                if(response.data.code == 100){
                    $scope.type=response.data.data;
                    $scope.type.unshift({'id':0,'name':'全部'});
                }
            });

            //获取地区分类
            menuService.getAreaMenus().then(function(response){
                if(response.data.code == 100){
                    $scope.area=response.data.data;
                    $scope.area.unshift({'id':0,'name':'全部'});
                }
            });
            $scope.getType = function(){
                $scope.typeFilter=this.item.id;
                $scope.pageMessage.pageIndex=1;
                menufilter();
            };
            $scope.getArea = function(){
                $scope.areaFilter=this.item.id;
                $scope.pageMessage.pageIndex=1;
                menufilter();
            };
            //筛选分类
            function menufilter(){
                $scope.data=$filter("myFilter")($scope.menus,$scope.typeFilter,$scope.areaFilter);
                $scope.pageList=$scope.data.slice(($scope.pageMessage.pageIndex-1)*$scope.pageMessage.pageSize,$scope.pageMessage.pageIndex*$scope.pageMessage.pageSize);
                $scope.pageMessage.totalPage=parseInt(Math.ceil( $scope.data.length/$scope.pageMessage.pageSize));
            }

            function getMenu(){
                //获取所有菜谱
                menuService.getAllMenus().then(function(response){
                    if(response.data.code == 100){
                        $scope.menus=response.data.data;
                        menufilter();
                    }
                });
            }
            //点击页码
            $scope.btnPage = function(){
                $scope.pageList=$scope.data.slice(($scope.pageMessage.pageIndex-1)*$scope.pageMessage.pageSize,$scope.pageMessage.pageIndex*$scope.pageMessage.pageSize);
            };


            //获取菜单页推荐菜谱
            menuService.getRecommendMenus().then(function(response){
                if(response.data.code == 100){
                    $scope.recommend=response.data.data;
                    $scope.recommend=$scope.recommend.slice(0,4);
                }
            });
        })
        .controller('materialController',function($scope,$rootScope,foodService,$filter){
            $scope.pageMessage={
                pageIndex:1,
                pageSize:5,
                totalPage:0
            };
            $scope.materialFilter='9d06c41b-1f7c-11e8-93de-14dda97c53a3';

            //获取菜单分类
            foodService.getFoodCategory().then(function(response){
                if(response.data.code == 100){
                    $scope.category=response.data.data;
                }
            });

            $scope.getMaterCate = function(){
                $scope.materialFilter=this.item.id;
                $scope.pageMessage.pageIndex=1;
                materialfilter();
            };
            //筛选分类
            function materialfilter(){
                $scope.data=$filter("materialFilter")($scope.foods,$scope.materialFilter);
                $scope.pageList=$scope.data.slice(($scope.pageMessage.pageIndex-1)*$scope.pageMessage.pageSize,$scope.pageMessage.pageIndex*$scope.pageMessage.pageSize);
                $scope.pageMessage.totalPage=parseInt(Math.ceil( $scope.data.length/$scope.pageMessage.pageSize));
            }

            //获取食材
            foodService.getCategoryFood().then(function(response){
                if(response.data.code == 100){
                    $scope.foods=response.data.data;
                    materialfilter();
                }
            });

            //点击页码
            $scope.btnPage = function(){
                $scope.pageList=$scope.data.slice(($scope.pageMessage.pageIndex-1)*$scope.pageMessage.pageSize,$scope.pageMessage.pageIndex*$scope.pageMessage.pageSize);
            };

        })
        .controller('healthyController',function($scope,$rootScope,healthyService,menuService){
            $scope.pageMessage={
                pageIndex:1,
                pageSize:12,
                totalPage:0
            };
            //获取健康资讯
            healthyService.gethomeHealthy().then(function(response){
                if(response.data.code == 100){
                    $scope.healthy=response.data.data;
                    $scope.pageList=$scope.healthy.slice(($scope.pageMessage.pageIndex-1)*$scope.pageMessage.pageSize,$scope.pageMessage.pageIndex*$scope.pageMessage.pageSize);
                    $scope.pageMessage.totalPage=parseInt(Math.ceil( $scope.healthy.length/$scope.pageMessage.pageSize));
                }
            });

            //点击页码
            $scope.btnPage = function(){
                $scope.pageList=$scope.healthy.slice(($scope.pageMessage.pageIndex-1)*$scope.pageMessage.pageSize,$scope.pageMessage.pageIndex*$scope.pageMessage.pageSize);
            };

            //获取推荐热门菜谱
            menuService.getAllMenus().then(function(response){
                if(response.data.code == 100) {
                    $scope.menus=response.data.data;
                    $scope.hot=$scope.menus.slice(0,4);
                    $scope.recommend=$scope.menus.slice(4,8);
                }
            });


        })
        .controller('forumController',function($scope,$rootScope,forumService,$state,CacheService){
            $scope.user = CacheService.get('user');
            $scope.collect = null;
            $scope.pageMessage={
                pageIndex:1,
                pageSize:5,
                totalPage:0
            };

            $('#issueForum').bind('click',function(){
                if(!$scope.user){
                    $state.go('login');
                }else{
                    $state.go('issue');
                }
            });

            //显示帖子详情
            forumService.getInvitations().then(function(response){
                if(response.data.code == 100){
                    $scope.forum=response.data.data;
                    $scope.pageList=$scope.forum.slice(($scope.pageMessage.pageIndex-1)*$scope.pageMessage.pageSize,$scope.pageMessage.pageIndex*$scope.pageMessage.pageSize);
                    $scope.pageMessage.totalPage=parseInt(Math.ceil( $scope.forum.length/$scope.pageMessage.pageSize));
                }
            });

            //点击页码
            $scope.btnPage = function(){
                $scope.pageList=$scope.forum.slice(($scope.pageMessage.pageIndex-1)*$scope.pageMessage.pageSize,$scope.pageMessage.pageIndex*$scope.pageMessage.pageSize);
            };
        })
        .controller('menuDetailsController',function($state,$scope,$rootScope,CacheService,$stateParams,menuDetailsService){
            //菜单详情页控制器
            $scope.menuId=$stateParams.menuId;
            $scope.maxNumber=1;
            $scope.user=CacheService.get('user');

            //获取菜谱信息
            function getMenuDetails(){
                menuDetailsService.getMenuDetails($scope.menuId).then(function(response){
                    if(response.data.code == 100){
                        $scope.menu=response.data.data;
                    }
                });
            }

            getMenuDetails();

            //获取菜谱步骤
            menuDetailsService.getMenuStep($scope.menuId).then(function(response){
                if(response.data.code == 100){
                    $scope.steps=response.data.data[0];
                }
            });

            //获取菜谱是否被收藏
            if($scope.user){
                var frmData = new FormData();
                frmData.append('menuId',$scope.menuId);
                frmData.append('userId',$scope.user.id);

                menuDetailsService.isMenuCollect(frmData).then(function(response){
                    if(response.data.code == 100){
                        $scope.collect=response.data.data;
                        $scope.isCollect = $scope.collect?true:false;
                    }
                });
            }

            //收藏该菜谱
            $('#collect').bind('click',function(){
                if(!$scope.user){
                    $state.go('login');
                }
                if(!$scope.isCollect){
                    menuDetailsService.collect(frmData).then(function(response){
                        if(response.data.code == 100){
                            $scope.isCollect = true;
                        }
                    });
                }else{
                    menuDetailsService.deleteCollect(frmData).then(function(response){
                        if(response.data.code == 100){
                            $scope.isCollect = false;
                        }
                    });
                }

            });

            //为菜谱点赞
            $scope.likeMenu = function(){
                $scope.maxNumber++;
                if($scope.maxNumber<=2){
                    menuDetailsService.likeMenu($scope.menuId).then(function(response){
                        if(response.data.code == 100){
                            getMenuDetails();
                        }
                    });
                }else{
                    $.mcDialog.alert({title: '点赞失败', message: '你已经点过赞了！',isAutoHide:true});
                }
            };

            //获取菜谱评论
            getMenuComment();
            function getMenuComment(){
                menuDetailsService.getMenuComment($scope.menuId).then(function(response){
                    if(response.data.code == 100){
                        $scope.comment=response.data.data;
                    }
                });
            }

            //提交评论
            $('#menuStep').bind('click',function(){
                var content=$('#menuContent').val();
                var formData = new FormData();
                formData.append('userId',$scope.user.id);
                formData.append('menuId',$scope.menuId);
                formData.append('content',content);

                menuDetailsService.setMenuComment(formData).then(function(response){
                    if(response.data.code == 100){
                        getMenuComment();
                    }
                });
            });
        })
        .controller('materialDetailsController',function($scope,$rootScope,$stateParams,materialDetailsService){
            //食材详情控制
            $scope.materialId=$stateParams.materialId;

            //获取食材的信息
            materialDetailsService.getmaterialDetails($scope.materialId).then(function(response){
                if(response.data.code == 100){
                    $scope.material=response.data.data;
                }
            });

            //获取食材相关菜谱
            materialDetailsService.getmaterialMenu($scope.materialId).then(function(response){
                if(response.data.code == 100){
                    $scope.menus=response.data.data;
                }
            });

        })
        .controller('healthyDetailsController',function($scope,$rootScope,$stateParams,healthyService){
            //健康资讯控制
            $scope.healthyId=$stateParams.healthyId;

            //获取健康资讯内容
            healthyService.getSingleHealthy($scope.healthyId).then(function(response){
                if(response.data.code == 100){
                    $scope.healthy=response.data.data;
                }
            });

        })
        .controller('forumDetailsController',function($scope,$rootScope,CacheService,$stateParams,forumService,$state){
            //帖子详情控制
            $scope.forumId=$stateParams.forumId;
            $scope.user=CacheService.get('user');

            $('#issueForum').bind('click',function(){
                if(!$scope.user){
                    $state.go('login');
                }else{
                    $state.go('issue');
                }
            });

            //获取帖子详情
            forumService.getInvitationId($scope.forumId).then(function(response){
                if(response.data.code == 100){
                    $scope.forum=response.data.data;
                }
            });

            //获取帖子下评论
            getInvitationComments();
            function getInvitationComments(){
                forumService.getInvitationComments($scope.forumId).then(function(response){
                    if(response.data.code == 100){
                        $scope.comment=response.data.data;
                    }
                });
            }

            //提交评论
            $('#step').bind('click',function(){
                var content=$('#content').val();

                var formData = new FormData();
                formData.append('userId',$scope.user.id);
                formData.append('forumId',$scope.forumId);
                formData.append('content',content);

                forumService.setInvitationComment(formData).then(function(response){
                    if(response.data.code == 100){
                        getInvitationComments();
                    }
                });
            });
        })
        .controller('issueController',function($scope,$state,$rootScope,forumService,CacheService){
            //上传帖子图片
            $scope.issue = {
                title:'',
                content:''
            };
            $scope.user=CacheService.get('user');

            $('#upImage').bind('click',function(){
                $('input[type=file]').click();
            });
            $('input[type=file]').bind('change',function(){

                var formData=new FormData();
                formData.append("cover",this.files[0]);

                //上传图片
                forumService.uploadFile(formData).then(function(response){
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
                var content=$scope.issue.title;
                var title=$scope.issue.content;

                var image=[];
                var $imageList=$('input[type=hidden]');
                for(var i= 0;i<$imageList.length;i++){
                    image.push($imageList[i].value);
                }

                var formData = new FormData();
                formData.append('userId',$scope.user.id);
                formData.append('image',image);
                formData.append('title',title);
                formData.append('content',content);

                forumService.uploadIssue(formData).then(function(response){
                    if(response.data.code == 100){
                        $state.go('forum');
                    }
                });
            });
        })
        .controller('loginController',function($state,$scope,$rootScope,userService,CacheService){
            $scope.user={
                phone:'',
                password:'',
                code:''
            };
            $scope.loginError = false;
            //登录提交
            $scope.sumbit = function(){
                var frmData = new FormData();
                for(var key in $scope.user){
                    frmData.append(key,$scope.user[key]);
                }

                userService.loginSerive(frmData).then(function(response){
                    if(response.data.code == 100){
                        var result=response.data.data;
                        $rootScope.user={
                            id:result.id,
                            nickName:result.nickName,
                            phone:result.phone,
                            header:result.header,
                            sex:result.sex
                        };
                        CacheService.set('user',$rootScope.user);
                        $state.go('home');
                    }else{
                        $scope.loginError = true;
                    }
                });
            }
        })
        .controller('registerController',function($state,$scope,$rootScope,userService,$interval,CacheService){
            $scope.user={
                phone:'',
                password:'',
                code:''
            };
            $scope.loginError = false;

            $scope.wait = function(){
                $scope.cardTime=true;

                var time=$interval(function(){
                    CacheService.set('codeTime',$scope.i);
                    $scope.cardContent='等待'+$scope.i+'s';
                    $scope.i--;
                    if($scope.i<=0){
                        $scope.cardContent='获取验证码';
                        $scope.cardTime=false;
                        $interval.cancel(time);
                        CacheService.cancel('codeTime');
                        return;
                    }
                },1000);
            };

            $scope.i=90;
            $scope.cardTime=true;
            var codeTime=CacheService.get('codeTime');
            if(codeTime){
                $scope.cardContent='短信已发送';
                $scope.i=codeTime;

                $scope.wait();
            }
            else{
                $scope.cardContent='获取验证码';
            }

            //获取验证码
            $scope.getCard = function(){
                if($scope.user.phone){
                    userService.getCard($scope.user.phone).then(function(response){
                        if(response.data.code == 100){
                            $scope.wait();
                        }
                    });
                }
            };

            //注册
            $scope.sumbit = function(){
                var frmData = new FormData();
                for(var key in $scope.user){
                    frmData.append(key,$scope.user[key]);
                }

                userService.registerSerive(frmData).then(function(response){
                    if(response.data.code == 100){
                        $state.go('login');
                    }else{
                        $scope.loginError = true;
                    }
                });
            }
        })
        .controller('headerController',function($state,$scope,$rootScope,CacheService){
            //页面头部
            $rootScope.$watch("user",function(){
                $scope.user=CacheService.get('user');
            });
            $scope.loginout = function(){
                CacheService.cancel('user');
                $rootScope.user=null;
            };

            $('#search').bind('click',function(){
                $state.go('search',{keyword:$scope.search});
            });

        })
        .controller('personalController',function($state,$scope,$rootScope,CacheService){
            $scope.user=CacheService.get('user');
            if(!$scope.user){
                $state.go('login');
            }
            $state.go('personal.centre');

            $('.personal-left-nav>a').bind('click',function(){
                $('.personal-left-nav>a').removeClass();
                $(this).addClass('menu-active');
            });
        })
        .controller('centreController',function($scope,$state,$rootScope,userService,CacheService){
            //用户收藏页面
            $scope.user=CacheService.get('user');

            if(!$scope.user){
                $state.go('login');
            }

            userService.getCollects($scope.user.id).then(function(response){
                if(response.data.code == 100){
                    $scope.collect = response.data.data;
                }
            });

        })
        .controller('dataController',function($scope,$state,$rootScope,CacheService,userService){
            $scope.user=CacheService.get('user');

            if(!$scope.user){
                $state.go('login');
            }

            //修改资料
            $scope.regulation={
                rule:{
                    size:2*1024*1024,
                    type:['image/jpeg','image/png']
                },
                message:{
                    size:'图片必须小于2MB',
                    type:'图片的格式必须是jpeg/png'
                }
            };
            //获取用户资料
            $scope.data = $scope.user;

            function getUser(){
                $scope.getUser = function(){
                    userService.getUser().then(function(response){
                        if(response.data.code == 100){
                            $rootScope.user = response.data.data;
                            CacheService.set('user',response.data.data);
                        }
                    })
                };
            }

            //保存资料
            $scope.dataSave = function(){
                var fromData = new FormData();
                fromData.append('userId',$scope.user.id);
                fromData.append('nickName',$scope.data.nickName);
                fromData.append('sex',$scope.data.sex);
                if($scope.icon){
                    fromData.append('header',$scope.icon);
                    fromData.append('isChange',1);
                }
                else{
                    fromData.append('header',$scope.user.header);
                    fromData.append('isChange',0);
                }

                userService.setUserMesage(fromData).then(function(response){
                    if(response.data.code == 100){
                        $.mcDialog.alert({title: '提示信息', message: '修改成功',isAutoHide:true});
                        getUser();
                    }
                });
            }

        })
        .controller('passwordController',function($scope,$state,$rootScope,CacheService,userService){
            //修改密码
            $scope.passwordError = false;
            $scope.user=CacheService.get('user');

            if(!$scope.user){
                $state.go('login');
            }

            $scope.password = {
                old:'',
                new:'',
                confirm:''
            };
            $scope.searchContent = false;

            //密码保存
            $scope.pwdSave = function(){

                var fromData = new FormData();
                fromData.append('userId',$scope.user.id);
                fromData.append('oldPassword',$scope.password.old);
                fromData.append('newPassword',$scope.password.new);

                userService.setUserPassword(fromData).then(function(response){
                    if(response.data.code == 100){
                        CacheService.cancel('user');
                        $rootScope.user=null;
                        $state.go('login');
                    }else{
                        $scope.passwordError = true;
                    }
                });
            }

        })
        .controller('stepController',function($scope,$state,$rootScope,CacheService,userService,$filter){
            $scope.user=CacheService.get('user');

            if(!$scope.user){
                $state.go('login');
            }

            //用户帖子
            $scope.user=CacheService.get('user');

            userService.getUserInvitations($scope.user.id).then(function(response){
                if(response.data.code == 100){
                    $scope.data = response.data.data;
                    $scope.invitations=$filter("checkFilter")($scope.data,2);
                    $scope.audit=$filter("checkFilter")($scope.data,1);
                }
            });

        })
        .controller('searchController',function($stateParams,$scope,menuService,healthyService,$state,$rootScope){
            //搜索界面
            $scope.search = $stateParams.keyword;

            //获取健康资讯
            healthyService.gethomeHealthy().then(function(response){
                if(response.data.code == 100){
                    $scope.healthy = response.data.data;
                    $scope.healthy=$scope.healthy.slice(4,9);
                }
            });

            //搜索菜谱
            searchMenus();
            function searchMenus(){
                menuService.searchMenus($scope.search).then(function(response){
                    if(response.data.code == 100){
                        $scope.menus = response.data.data;
                        $scope.searchContent = false;
                    }else{
                        $scope.menus = response.data.data;
                        $scope.searchContent = true;
                    }
                });
            }

            //点击搜索
            $scope.searchMenu = function(){
                searchMenus();
            }

        });
}());