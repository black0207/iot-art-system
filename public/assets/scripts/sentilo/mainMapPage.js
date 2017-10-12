/**
 * Created by dongxin on 2016-10-13.
 */

function initMap() {

    $(document).ready(function () {
        //首次进入首页数据请求
        //mainMapData('/rest/sentiloCatalog/queryComponentInfo');

    })
}

//首次进入首页数据请求返回结果
function returnMainMsgData(data) {
    //console.log(data + '123456');
    var dataArray = data.components;

    //for (var i = 0; i < $("#jqxTree").children().children().length; i++) {
    //    $("#jqxTree").children().children().eq(i).children().hide();
    //
    //    clickAction($("#jqxTree").children().children().eq(i));
    //}

}

//数据筛选数据请求返回结果
function returnScreeningData(data) {
    //console.log(data);
    var dataArray = data.components;
    addComponetMarkerClusterer(data);
}

//搜索栏数据请求返回结果
function returnSearchData(data) {
    //console.log(data);
    var dataArray = data.components;
    addComponetMarkerClusterer(data);
}
