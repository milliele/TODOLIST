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
        radioClass: 'iradio_square-blue',
      });
    $('#unfinish input[type=checkbox]').iCheck('uncheck');
    $('#finished input[type=checkbox]').iCheck('check');
}
function register_tooltip() {$("[data-toggle='tooltip']").tooltip();}
function register_datetimepicker(id)
{
    //alert(id)
    //alert($(id).parent().html());
    $(id).datetimepicker({
        format: 'yyyy-mm-dd hh:ii',
        bootcssVer: 3,
        autoclose: true
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

function register_worklist_item_operations(item)
{
    register_iCheck();
    register_priority_choice();
    item.find('.worklist-item-content').click(function() {
        //alert('in');
        f_li = $(this).parents('.worklist-item');
        f_li.hide();
        editli = $('#format_new').clone();
        //ID
        id = f_li.attr("id")
        editli.find('.manager').attr("agent-id",id);
        //TEXT
        editli.find('.text_box_holder input.todotext-holder').attr("value", f_li.find('.worklist-item-content .text').html());
        //DUE-TIME
        //editli.find('.text_box_holder .due-time-holder>input').removeAttr("readonly");
        mydatetimepickerid = "edit_date_"+parseInt(id);
        editli.find('.text_box_holder .due-time-holder>input').attr("id", mydatetimepickerid);
        editli.find('.text_box_holder .due-time-holder>input').attr("value", f_li.find('.worklist-item-content .expire-time>span').html());
        //alert(f_li.find('.worklist-item-content .expire-time>span').html());
        //PRIORITY
        editli.find('.priority-choice').parents('.dropdown').attr("value", f_li.find('.worklist-item-priority').attr("value"));
        //PROPERTIES
        editli.find('.td_submit').addClass("td_editing");
        editli.find('.td_editing').removeClass("td_submit");
        //BUTTON-ADD
        editli.find('button.add').html("Modify");
        //APPEND
        f_li.after(editli.html());
        //CLICK_REGISTER
        //BUTTON-CANCEL
        $('[agent-id='+id+'] button.cancel').click(function () {
            $(this).parents('li.manager').remove();
            f_li.show();
        });
        //BUTTON-ADD
        $('[agent-id='+id+'] button.add').click(function () {
            //alert('in');
            sumit = $(this).parents('.td_submit_area');
            id = parseInt(sumit.parents('.manager').attr("agent-id"));
            //alert(id);
            text = sumit.prev().find('input.todotext-holder').val();
            expiretime = $('#'+mydatetimepickerid).val();
            priority = sumit.find('.dropdown').attr("value");
            //alert(priority);
            $(this).parents('li.manager').remove();
            EditWork(id, text, expiretime, priority);
        });
        //REGISTERS
        register_priority_choice();
        register_tooltip();
        register_datetimepicker('#'+mydatetimepickerid);
        $('#'+mydatetimepickerid).datetimepicker('update');
    });
    item.find('.dropdown-edit').click(function (){
        $(this).parents('div.dropdown').parent().siblings('.worklist-item-content').click();
    });
    item.find('.dropdown-delete').click(function (){
        id = parseInt($(this).parents('.worklist-item').attr("id"));
        DeleteWork(id);
    });
    item.find('.checker input[type=checkbox]').on('ifChecked', function(event){
          alert("mark");
          id = parseInt($(this).parents('.worklist-item').attr("id"));
          MarkWork(id);
        });
}

function register_add_block_operations(datetimepickerid)
{
    register_priority_choice();
    register_tooltip();
    register_datetimepicker(datetimepickerid);
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
    $('#unfinish .worklist-item-content').click(function() {
        //alert('in');
        f_li = $(this).parents('.worklist-item');
        f_li.hide();
        editli = $('#format_new').clone();
        //ID
        id = f_li.attr("id")
        editli.find('.manager').attr("agent-id",id);
        //TEXT
        editli.find('.text_box_holder input.todotext-holder').attr("value", f_li.find('.worklist-item-content .text').html());
        //DUE-TIME
        //editli.find('.text_box_holder .due-time-holder>input').removeAttr("readonly");
        mydatetimepickerid = "edit_date_"+parseInt(id);
        editli.find('.text_box_holder .due-time-holder>input').attr("id", mydatetimepickerid);
        editli.find('.text_box_holder .due-time-holder>input').attr("value", f_li.find('.worklist-item-content .expire-time>span').html());
        //alert(f_li.find('.worklist-item-content .expire-time>span').html());
        //PRIORITY
        editli.find('.priority-choice').parents('.dropdown').attr("value", f_li.find('.worklist-item-priority').attr("value"));
        //PROPERTIES
        editli.find('.td_submit').addClass("td_editing");
        editli.find('.td_editing').removeClass("td_submit");
        //BUTTON-ADD
        editli.find('button.add').html("Modify");
        //APPEND
        f_li.after(editli.html());
        //CLICK_REGISTER
        //BUTTON-CANCEL
        $('[agent-id='+id+'] button.cancel').click(function () {
            $(this).parents('li.manager').remove();
            f_li.show();
        });
        //BUTTON-ADD
        $('[agent-id='+id+'] button.add').click(function () {
            //alert('in');
            sumit = $(this).parents('.td_submit_area');
            id = parseInt(sumit.parents('.manager').attr("agent-id"));
            //alert(id);
            text = sumit.prev().find('input.todotext-holder').val();
            expiretime = $('#'+mydatetimepickerid).val();
            priority = sumit.find('.dropdown').attr("value");
            //alert(priority);
            EditWork(id, text, expiretime, priority);
            $(this).parents('li.manager').remove();
        });
        //REGISTERS
        register_priority_choice();
        register_tooltip();
        register_datetimepicker('#'+mydatetimepickerid);
        $('#'+mydatetimepickerid).datetimepicker('update');
    });
    $('.dropdown-edit').click(function (){
        $(this).parents('div.dropdown').parent().siblings('.worklist-item-content').click();
    });
    $('.dropdown-delete').click(function (){
        //alert("in");
        id = parseInt($(this).parents('.worklist-item').attr("id"));
        DeleteWork(id);
    });
    $('.checker input[type=checkbox]').on('ifChecked', function(event){
          id = parseInt($(this).parents('.worklist-item').attr("id"));
          MarkWork(id);
        });
});

/**********************************************
 * NOT EMPTY VALIDATION
 */
function Empty_validation(name, value, is_alert)
{
    if(value.length<=0)
    {
        if (is_alert) alert(name+" can not be empty!");
        return false;
    }
    return true;

}

/***********************************************
 * Callbacks
 */
function LinkAddTODO()
{
    ne = $('#format_new').clone();
    ne.find('.td_extra .dropdown').attr("value", $('#default_priority').html());
    $('#addnewwork').prev().find('ul.worklist').append(ne.html());
    //alert($('#addnewwork').prev().find('ul').html());
    $('#addnewwork').hide();
    $('.td_submit button.cancel').click(function () {
            $(this).parents('li.manager').remove();
            $('#addnewwork').show();
        });
    //BUTTON-ADD
    $('.td_submit button.add').click(function () {
        //alert('in');
        sumit = $(this).parents('.td_submit_area');
        text = sumit.prev().find('input.todotext-holder').val();
        is_able = Empty_validation('Content of TODO', text, false);
        expiretime = $('#add_new_date').val();
        //alert(expiretime.length);
        priority = sumit.find('.dropdown').attr("value");
        //alert(priority);
        if(is_able)
        {
            //alert('in');
            AddWork(text, expiretime, priority);
            $(this).parents('li.manager').remove();
            $('#addnewwork').show();
        }
    });
    register_add_block_operations('#add_new_date');
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
    //BUTTON-ADD
    $('.td_submit button.add').click(function () {
        //alert('in');
        sumit = $(this).parents('.td_submit_area');
        //alert(id);
        text = sumit.prev().find('input.todotext-holder').val();
        is_able = Empty_validation('Content of TODO', text, false);
        expiretime = $('#add_new_date').val();
        //alert(expiretime.length);
        priority = sumit.find('.dropdown').attr("value");
        //alert(priority);
        if(is_able)
        {
            AddWork(text, expiretime, priority);
            $(this).parents('li.manager').remove();
            $('#addnewwork').show();
            $('#AddnewModal').modal('hide');
        }
    });
    register_add_block_operations('#add_new_date');
}

/***********************************************
 * other functions
 */


/**************************************************
 * ajax support
 */
$(document).ajaxSend(function(event, xhr, settings) {
    function getCookie(name) {
        var cookieValue = null;
        if (document.cookie && document.cookie != '') {
            var cookies = document.cookie.split(';');
            for (var i = 0; i < cookies.length; i++) {
                var cookie = jQuery.trim(cookies[i]);
                // Does this cookie string begin with the name we want?
                if (cookie.substring(0, name.length + 1) == (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }
    function sameOrigin(url) {
        // url could be relative or scheme relative or absolute
        var host = document.location.host; // host + port
        var protocol = document.location.protocol;
        var sr_origin = '//' + host;
        var origin = protocol + sr_origin;
        // Allow absolute or scheme relative URLs to same origin
        return (url == origin || url.slice(0, origin.length + 1) == origin + '/') ||
            (url == sr_origin || url.slice(0, sr_origin.length + 1) == sr_origin + '/') ||
            // or any other URL that isn't scheme relative or absolute i.e relative.
            !(/^(\/\/|http:|https:).*/.test(url));
    }
    function safeMethod(method) {
        return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
    }

    if (!safeMethod(settings.type) && sameOrigin(settings.url)) {
        xhr.setRequestHeader("X-CSRFToken", getCookie('csrftoken'));
    }
});

//*****************************************************/
