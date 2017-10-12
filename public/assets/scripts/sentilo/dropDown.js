/**
 * Created by dongxin on 2016-10-14.
 */

(function dropDownInit() {
    $(document).ready(function () {
        for(var i = 0; i< $("#jqxTree").children().children().length; i++){
            $("#jqxTree").children().children().eq(i).children().hide();

            if($("#jqxTree").children().children().eq(i).attr('id') != 'first'){
                $("#jqxTree").children().children().eq(i).hide();
            }

            clickAction($("#jqxTree").children().children().eq(i));
        }

    });

    initMap()

})();

var type = '';
var value = '';
var title1 = ['全部设备','全部设备','设备类别','传输方式','设备归属'];
//var title2 = ['全部设备','全部设备','全部类别','全部方式','全部归属'];
var title2 = ['','','','',''];

function clickAction(node) {

    node.unbind('click').click(function (obj) {

        if (event && event.stopPropagation) {//非IE浏览器
            event.stopPropagation();
        }
        else {//IE浏览器
            window.event.cancelBubble = true;
        }

        if($(this).children().length>0){

            reloatLi();

            $('#first').html(title1[$(this).prevAll().length]);

            title1.splice(0,1,title1[$(this).prevAll().length]);

            $(this).css('background','#9dceea');
            $(this).parent().css('background',' none');
            for(var i=0;i<this.childNodes.length;i++){
                //筛选文本节点
                if(this.childNodes[i].nodeType==3){
                    //修改文本节点的内容
                    this.childNodes[i].data = title2[$(this).prevAll().length];
                    break;
                }
            }
//                this.innerText = title2[$(this).prevAll().length];
            console.log(1+'+'+$(this).prevAll().length);
            type = $(this).prevAll().length;
            value = '';
            $(this).children().show();

            if($(this).children().children().length>6){
                $(this).children().css('height','300px');
            }else{
                $(this).children().css('height','auto');
            }

            $(this).children().children().unbind('click').click(function (event) {

                value = $(this).prevAll().length;
                $(this).css('background','#9dceea');

                $(this).siblings().css('background','white');

                console.log('type='+(type-1)+';'+'value='+value);

                if (event && event.stopPropagation) {//非IE浏览器
                    event.stopPropagation();
                }
                else {//IE浏览器
                    window.event.cancelBubble = true;
                }


                //数据筛选数据请求
                screeningData('/rest/sentiloCatalog/queryComponentInfo',{'type':(type-1),'value':value,'keyWord':''});
            });

            for(var i = 0;i< $(this).siblings().length;i++){
                if($(this).siblings().eq(i).attr('id') != 'first'){
                    $(this).siblings().eq(i).hide();
                    $(this).siblings().eq(i).children().hide();
                }else {
                    $(this).siblings().eq(i).attr('isClick','false');
                }
            }

        }else {

            if($(this).attr('id') == 'first'){

                for(var i = 0;i<$(this).siblings().length;i++){
                    for(var j=0;j<$(this).siblings().eq(i)[0].childNodes.length;j++){
                        //筛选文本节点
                        if($(this).siblings().eq(i)[0].childNodes[j].nodeType==3){
                            //修改文本节点的内容
                            $(this).siblings().eq(i)[0].childNodes[j].data = title1[i+1];
                            break;
                        }
                    }
                }

//                $(this).html(title1[$(this).prevAll().length]);
                if($(this).attr('isClick') == 'true'){
                    $(this).siblings().hide();
                    $(this).attr('isClick','false');
                }else {
                    $(this).siblings().show();
                    $(this).attr('isClick','true');
                }

                for(var i = 0;i<$(this).siblings().length;i++){
                    $(this).siblings().eq(i).children().hide();
                }
            }else{

                $('#first').html('全部设备');

                title1.splice(0,1,'全部设备');

                $(this).nextAll().hide();
                $(this).hide();
                $('#first').attr('isClick','false');

                reloatLi();
                type = $(this).prevAll().length;
                value = '';

            }
        }
        console.log('type='+(type-1)+';'+'value='+value);

        if($(this).attr('id') != 'first'){
            //数据筛选数据请求
            screeningData('/rest/sentiloCatalog/queryComponentInfo',{'type':(type-1),'value':value,'keyWord':''});
        }

    });
}

function reloatLi() {
    $('.level01').css('background',' white');
    for(var i=0 ; i<$('.level01').length;i++){
        var node = $('.level01').children().eq(i);
        //if($('.level01').eq(i).children().length == 1){
        //    $('.level01').eq(i).children()[0].checked = false;
        //}
    }
}

function searchBtn(event){
    var aaa = $(event).parent().siblings().children().eq(0)[0].value;

    if(aaa.length>0){
        reloatLi();
        type = '';
        value = '';
        for(var i = 0; i< $("#jqxTree").children().children().length; i++){
            $("#jqxTree").children().children().eq(i).children().hide();

            if($("#jqxTree").children().children().eq(i).attr('id') != 'first'){
                $("#jqxTree").children().children().eq(i).hide();
            }
        }
        //搜索栏数据请求
        searchData('/rest/sentiloCatalog/queryComponentInfo',{'type':'','value':'','keyWord':aaa});
    }
}


/*

//复选模式
function test(){
    var type = '';
    var value = [];
    var title1 = ['全部设备','全部设备','设备类别','传输方式','设备归属'];
//var title2 = ['全部设备','全部设备','全部类别','全部方式','全部归属'];
    var title2 = ['','','','',''];

    function clickAction(node) {

        node.unbind('click').click(function (obj) {

            $('#sousuo_left_a').children().eq(0)[0].value = '';

            if (event && event.stopPropagation) {//非IE浏览器
                event.stopPropagation();
            }
            else {//IE浏览器
                window.event.cancelBubble = true;
            }

            if($(obj.target).children().length>0){

                reloatLi();

                $('#first').html(title1[$(obj.target).prevAll().length]);

                title1.splice(0,1,title1[$(obj.target).prevAll().length]);

                $(obj.target).css('background','#9dceea');
                $(obj.target).parent().css('background',' none');
                for(var i=0;i<obj.target.childNodes.length;i++){
                    //筛选文本节点
                    if(obj.target.childNodes[i].nodeType==3){
                        //修改文本节点的内容
                        obj.target.childNodes[i].data = title2[$(obj.target).prevAll().length];
                        break;
                    }
                }
//                obj.target.innerText = title2[$(obj.target).prevAll().length];
                console.log(1+'+'+$(obj.target).prevAll().length);
                type = $(obj.target).prevAll().length;
                value = [];
                $(obj.target).children().show();

                $(obj.target).children().unbind('click').click(function (event) {

                    if(.localName == 'li'){
                        console.log(2+'+'+$(this).prevAll().length);

                        if(event.target.children[0].checked == true){
                            var temp = [];
                            for(var a in value){
                                if(value[a] != $(event.target).prevAll().length){
                                    temp.push(value[a]);
                                }
                            }
                            value = temp;
                            event.target.children[0].checked = false;
                            $(event.target).css('background',' white');
                        }else {
                            value.push($(event.target).prevAll().length);
                            event.target.children[0].checked = true;
                            $(event.target).css('background','#9dceea');
                        }
                    }else {
                        console.log(2+'+'+$(event.target).parent().prevAll().length);
                        if(event.target.checked == false){

                            var temp = [];
                            for(var a in value){
                                if(value[a] != $(event.target).parent().prevAll().length){
                                    temp.push(value[a]);
                                }
                            }
                            value = temp;
                            $(event.target).parent().css('background',' white');
                        }else {
                            value.push($(event.target).parent().prevAll().length);
                            $(event.target).parent().css('background','#9dceea');
                        }
                    }

                    console.log('type='+type+';'+'value='+value.join(','));

                    if (event && event.stopPropagation) {//非IE浏览器
                        event.stopPropagation();
                    }
                    else {//IE浏览器
                        window.event.cancelBubble = true;
                    }

                    //数据筛选数据请求
                    screeningData('/rest/sentiloCatalog/queryComponentInfo',{'type':type-1,'value':value.join(','),'keyWord':''});
                });

                for(var i = 0;i< $(obj.target).siblings().length;i++){
                    if($(obj.target).siblings().eq(i).attr('id') != 'first'){
                        $(obj.target).siblings().eq(i).hide();
                        $(obj.target).siblings().eq(i).children().hide();
                    }else {
                        $(obj.target).siblings().eq(i).attr('isClick','false');
                    }
                }

            }else {

                if($(obj.target).attr('id') == 'first'){

                    for(var i = 0;i<$(obj.target).siblings().length;i++){
                        for(var j=0;j<$(obj.target).siblings().eq(i)[0].childNodes.length;j++){
                            //筛选文本节点
                            if($(obj.target).siblings().eq(i)[0].childNodes[j].nodeType==3){
                                //修改文本节点的内容
                                $(obj.target).siblings().eq(i)[0].childNodes[j].data = title1[i+1];
                                break;
                            }
                        }
                    }

//                $(obj.target).html(title1[$(obj.target).prevAll().length]);
                    if($(obj.target).attr('isClick') == 'true'){
                        $(obj.target).siblings().hide();
                        $(obj.target).attr('isClick','false');
                    }else {
                        $(obj.target).siblings().show();
                        $(obj.target).attr('isClick','true');
                    }

                    for(var i = 0;i<$(obj.target).siblings().length;i++){
                        $(obj.target).siblings().eq(i).children().hide();
                    }
                }else{

                    $('#first').html('全部设备');

                    title1.splice(0,1,'全部设备');

                    $(obj.target).nextAll().hide();
                    $(obj.target).hide();
                    $('#first').attr('isClick','false');

                    reloatLi();
                    type = $(obj.target).prevAll().length;
                    value = [];

                }
            }
            console.log('type='+type+';'+'value='+value.join(','));

            if($(obj.target).attr('id') != 'first'){
                //数据筛选数据请求
                screeningData('/rest/sentiloCatalog/queryComponentInfo',{'type':type-1,'value':value.join(','),'keyWord':''});
            }

        });
    }

    function reloatLi() {
        $('.level01').css('background',' white');
        for(var i=0 ; i<$('.level01').length;i++){
            var node = $('.level01').children().eq(i);
            if($('.level01').eq(i).children().length == 1){
                $('.level01').eq(i).children()[0].checked = false;
            }
        }
    }

    function searchBtn(event){
        var aaa = $(event).parent().siblings().children().eq(0)[0].value;

        if(aaa.length>0){
            reloatLi();
            type = '';
            value = [];
            for(var i = 0; i< $("#jqxTree").children().children().length; i++){
                $("#jqxTree").children().children().eq(i).children().hide();

                if($("#jqxTree").children().children().eq(i).attr('id') != 'first'){
                    $("#jqxTree").children().children().eq(i).hide();
                }
            }
            //搜索栏数据请求
            searchData('/rest/sentiloCatalog/queryComponentInfo',{'type':'','value':'','keyWord':aaa});
        }
    }
}

*/


function dragable(id){
    var d=document;
    var o=d.getElementsByClassName(id)[0];
    var s=o.style;
    var x;
    var y;
//        var p='onmousemove';
    o.onmousedown = function(e){
        e = e || event;
        x = e.clientX - o.offsetLeft;
        y = e.clientY - o.offsetTop;
        d.onmousemove = function(e){
            e = e || event;
            s.left = e.clientX - x +'px';
            s.top= e.clientY - y +'px'
        };
        d.onmouseup = function(){
            d.onmousemove=null;
        }
    }
}

function imgdragstart(){
    return false;
}


