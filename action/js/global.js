/**
 * Created by Administrator on 2018/2/16.
 */

(function(){
    $('.nav-main a').bind('click',function(){
        $('.nav-main .active').removeClass();
        $(this).addClass('active');
    });
}());

