/**
 * Created by Administrator on 2017/12/27.
 */
$(function(){
    $('#frm').validate({
        rules:{
            txtPhone:{
                required:true,
                minlength:4
            },
            txtPassword:{
                required:true,
                rangelength:[4,12]
            }
        },
        messages:{
            txtPhone:{
                required:'请输入管理员账号',
                minlength:'账号必须大于4位',

            },
            txtPassword:{
                required:'请输入密码',
                rangelength:'密码长度必须为4到12位之间'
            }
        },
        submitHandler: function(){
            $.post('http://192.168.12.117:9088/cate/manage/user/login.php',{
                name:$('#txtPhone').val(),
                password:$('#txtPassword').val()
            },function(response){
                if(response.code==100){
                    var user=response.data;
                    sessionStorage.setItem('user',user);
                    location.href='index.html';
                }
                else
                {
                    $.mcDialog.alert({title: '提示信息', message: '账户或密码不正确',isAutoHide:true});
                }
            });
        }
    });

});