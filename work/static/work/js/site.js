$(document).ready(function(){
                  $('input').iCheck({
                    checkboxClass: 'icheckbox_square-blue',
                    radioClass: 'iradio_square-blue'
                  });
                  $('#datetimepicker').datetimepicker({
                        format: 'yyyy-mm-dd hh:ii',
                        bootcssVer: 3
                    });
                  $("[data-toggle='tooltip']").tooltip();
                });

$(function (){
    $("[data-toggle='popover']").popover()
        .on('show.bs.popover', function () { //展示时,关闭非当前所有弹窗
            $(this).parent().siblings().find('[data-toggle="popover"]').popover('hide');
        });
    //给Body加一个Click监听事件
    $('body').on('click', function(event) {
        var target = $(event.target);
        if (!target.hasClass('popover') //弹窗内部点击不关闭
                && target.parent('.popover-content').length === 0
                && target.parent('.popover-title').length === 0
                && target.parent('.popover').length === 0
                && target.data("toggle") !== "popover") {
                //弹窗触发列不关闭，否则显示后隐藏
            $('[data-toggle="popover"]').popover('hide');
        }
    });
});

function LinkAddTODO()
{
    $('#addnewwork').prev().find('ul').append($('#format_new').clone().html());
    //alert($('#addnewwork').prev().find('ul').html());
    $('#addnewwork').hide();
    $('.td_submit button.cancel').click(function () {
            $(this).parents('li.manager').remove();
            $('#addnewwork').show();
        });
    $('.priority-choice td').click(function () {
        alert("in");
        $(this).siblings().removeAttr("selected");
        $(this).attr("selected", "");
        $(this).parents('.dropdown').attr("value", $(this).attr("value"));
    });
}

