/**
 * Created by Administrator on 2018/1/6.
 */
(function(){
    angular.module('app.filter',[])
        .filter('myFilter',function(){
            return function(input,type,area){
                if(!input){
                    return input;
                }
                return input.filter(function(item){
                    if(type == 0&&area == 0){
                        return true;
                    }
                    if(type == 0){
                        return item.areaId==area;
                    }else if(area == 0){
                        return item.typeId==type;
                    }else{
                        return item.typeId==type&&item.areaId==area;
                    }
                })
            }
        })
        .filter('materialFilter',function(){
            return function(input,mater){
                if(!input){
                    return input;
                }
                return input.filter(function(item){
                        return item.categoryId==mater;
                })
            }
        })
        .filter('checkFilter',function(){
            return function(input,state){
                if(!input){
                    return input;
                }
                return input.filter(function(item){
                    return item.state==state;
                })
            }
        })
}());
