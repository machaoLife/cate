/**
 * Created by Administrator on 2018/1/15.
 */
(function(){
    angular.module('app.filter',[])
        .filter('menuFilter',function(){
            return function(input,type,area,search){
                if(!input){
                    return input;
                }
                return input.filter(function(item){
                    if(type == 0 && area == 0 && !search){
                        return true;
                    }

                    if(!search){
                        if(area == 0){
                            return item.typeId == type;
                        }else if(type == 0){
                            return item.areaId == area;
                        }
                        else{
                            return item.typeId==type&&item.areaId==area;
                        }
                    }else{
                        if(area == 0&& type == 0){
                            return (item.name.indexOf(search)>-1||item.main.indexOf(search)>-1);
                        }else if(type == 0){
                            return item.areaId==area&&(item.name.indexOf(search)>-1||item.main.indexOf(search)>-1);
                        }
                        else if(area == 0){
                            return item.typeId==type&&(item.name.indexOf(search)>-1||item.main.indexOf(search)>-1);
                        }
                        else{
                            return item.typeId==type&&item.areaId==area&&(item.name.indexOf(search)>-1||item.main.indexOf(search)>-1);
                        }
                    }
                })
            }
        })
        .filter('healthyFilter',function(){
            return function(input,search){
                if(!input || !search){
                    return input;
                }
                return input.filter(function(item){
                    if(item.title.indexOf(search)>-1){
                        return true;
                    }
                })
            }
        })
        .filter('invitationFilter',function(){
            return function(input,search,state){
                if(!input){
                    return input;
                }
                return input.filter(function(item){
                    if(!search){
                        return item.state==state;
                    }else{
                        return item.title.indexOf(search)>-1&&item.state==state;
                    }
                })
            }
        });
}());
