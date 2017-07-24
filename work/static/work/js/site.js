/*******************************
 * Register functions
 */
function register_popovers()
{
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
}
function register_iCheck()
{
    $('input[type=checkbox]').iCheck({
        checkboxClass: 'icheckbox_square-blue',
        radioClass: 'iradio_square-blue'
      });
}
function register_tooltip() {$("[data-toggle='tooltip']").tooltip();}
function register_datetimepicker(id)
{
    //alert(id)
    //alert($(id).parent().html());
    $(id).datetimepicker({
        format: 'yyyy-mm-dd hh:ii',
        bootcssVer: 3
    });
    $(id).datetimepicker().on('changeDate', function(ev){
        $(this).attr("value",$(this).val());
    });
}
function register_priority_choice()
{
    //CLICK CHOICE
    $('.priority-choice td').click(function () {
        //alert("in");
        $(this).siblings().removeAttr("selected");
        $(this).attr("selected", "");
        $(this).parents('.dropdown').attr("value", $(this).attr("value"));
    });
    //CLICK DROPDOWN
    $('.dropdown[value]>a span').click(function() {
        //alert($(this).parents('.dropdown[value]').attr("value"));
        va = $(this).parents('.dropdown[value]').attr("value");
        $(this).parents('.dropdown[value]').find('.priority-choice td[value='+va+']').siblings().removeAttr("selected");
        $(this).parents('.dropdown[value]').find('.priority-choice td[value='+va+']').attr("selected", "");
    });
}

function register_edit_click()
{
    $('.worklist-item-content').click(function() {
        //alert('in');
        f_li = $(this).parents('.worklist-item');
        f_li.hide();
        editli = $('#format_new').clone();
        //TEXT
        editli.find('.text_box_holder input.todotext-holder').attr("value", f_li.find('.worklist-item-content span.text').html());
        //DUE-TIME
        //editli.find('.text_box_holder .due-time-holder>input').removeAttr("readonly");
        editli.find('.text_box_holder .due-time-holder>input').attr("id", "edit_date");
        editli.find('.text_box_holder .due-time-holder>input').attr("value", f_li.find('.worklist-item-content .expire-time>span').html());
        //alert(f_li.find('.worklist-item-content .expire-time>span').html());
        //PRIORITY
        editli.find('.priority-choice').parents('.dropdown').attr("value", f_li.find('.dropdown').attr("value"));
        //PROPERTIES
        editli.find('.td_submit').addClass("td_editing");
        editli.find('.td_editing').removeClass("td_submit");
        //BUTTON-ADD
        editli.find('button.add').html("Modify");
        f_li.after(editli.html());
        //BUTTON-CANCEL
        $('.td_editing button.cancel').click(function () {
            $(this).parents('li.manager').remove();
            f_li.show();
        });
        //REGISTERS
        register_priority_choice();
        register_tooltip();
        register_datetimepicker('#edit_date');
        $('#edit_date').datetimepicker('update');
    });
    $('.dropdown-edit').click(function (){
        $(this).parents('td.dropdown').siblings('.worklist-item-content').click();
    });
}

/*********************************************
 * PAGE READY
 */
$(document).ready(function () {
    // Registers
    register_popovers();
    register_tooltip();
    register_iCheck();
    register_priority_choice();
    register_edit_click();
    register_extra_operates();
});

/***********************************************
 * Callbacks
 */
function LinkAddTODO()
{
    $('#addnewwork').prev().find('ul.worklist').append($('#format_new').clone().html());
    //alert($('#addnewwork').prev().find('ul').html());
    $('#addnewwork').hide();
    $('.td_submit button.cancel').click(function () {
            $(this).parents('li.manager').remove();
            $('#addnewwork').show();
        });
    register_priority_choice();
    register_tooltip();
    register_datetimepicker('#add_new_date');
}

function ModalAddTODO()
{
    mymodal = $('#AddnewModal');
    //HEADER
    mymodal.find('.modal-header .close').remove();
    mymodal.find('.modal-header .modal-title').html('Add new TODO');
    //BODY
    mymodal.find('.modal-body').html('<div class="manager"></div>');
    mybody = $('#format_new li.manager').clone();
    mybody.find('#add_new_date').attr("id","modal_add_new_date");
    mymodal.find('.manager').html(mybody.html());
    //FOOTER
    mymodal.find('.modal-footer').children().hide();
    mymodal.modal();
    //REGISTERS
    $('.td_submit button.cancel').click(function () {
            $(this).parents('li.manager').remove();
            $('#addnewwork').show();
            $('#AddnewModal').modal('hide');
        });
    register_priority_choice();
    register_tooltip();
    register_datetimepicker('#modal_add_new_date');
}


