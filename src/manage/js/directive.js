/**
 * Created by Administrator on 2018/1/15.
 */
(function(){
    angular.module('app.directive',[])
        .directive('pageNav',function(){
            //分页标签
            return {
                restrict:'EA',
                replace:true,
                templateUrl:'template/pageNav.html',
                scope:{
                    conf:'=',
                    page:'&'
                },
                controller:function($scope){
                    //监听自动隐藏事件
                    $scope.$watch('conf.totalPage',function(){
                        $scope.total=[];
                        for(var i=0;i<$scope.conf.totalPage;i++){
                            $scope.total.push(i);
                        }
                    });

                    $scope.btnPage = function(index){
                        if(index==$scope.conf.pageIndex){
                            return;
                        }
                        $scope.conf.pageIndex=index;
                        if($scope.page){
                            $scope.page();
                        }
                    }
                }
            }
        })
        .directive('uploadImage',function(){
            return{
                restrict:'EA',
                replace:true,
                templateUrl:'template/uploadImage.html',
                scope:{
                    image:'=',
                    uploadFile:'=',
                    uploadOption:'='
                },
                link:function(scope,element,attrs){

                    var img=element[0].querySelector('img');
                    var upFile=element[0].querySelector('input[type=file]');
                    var span=element[0].querySelector('span');

                    var option=scope.uploadOption;

                    upFile.onchange = function(){
                        var self=this;
                        if(self.files.length == 0){
                            return;
                        }

                        span.innerText='';

                        //检查图片大小
                        var file=self.files[0];

                        if(file.size>option.rule.size){
                            span.innerText=option.message.size;
                            self.value=null;
                            return;
                        }

                        //检查图片类型
                        var index=option.rule.type.indexOf(file.type);
                        if(index == -1){
                            span.innerText=option.message.type;
                            self.value=null;
                            return;
                        }

                        //上传预览
                        var fileReader = new FileReader();
                        fileReader.onload=function(){
                            var shamImage=new Image();
                            shamImage.onload = function(){
                                img.onload = function(){
                                    scope.uploadFile=file;
                                    scope.$apply();
                                };
                                img.src = shamImage.src;
                            };
                            shamImage.src = this.result;
                        };
                        fileReader.readAsDataURL(file);
                    }
                }
            }
        });
}());
