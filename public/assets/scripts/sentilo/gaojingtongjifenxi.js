/**
 * Created by dongxin on 2016-10-20.
 */

(function initGaojin(){

    $(document).ready(function(){

        initGaojingtongjifenxi();
        //gaojingtongjifenxiAction();

        //returnGaojingtaojifenxi();


        //告警统计分析告警次数
        GaojingtongjifenxiCounts('/rest/sentiloAssets/queryAlarmTimes');

        //告警统计分析告警来源数量统计
        GaojingtongjifenxiSourceNumber('/rest/sentiloAssets/queryAlarmResource');

        //告警统计分析top5
        GaojingtongjifenxiTop5('/rest/sentiloAssets/queryAlarmTopFive');

        //告警统计分析热力图---roy研究学习用-------------------------------------------------------------------------------------
        GaojingtongjifenxiHeatMapData('/rest/sentiloAssets/queryAlarmStatics',{"alarmType":"1"});

        //告警统计分析折线图
        GaojingtongjifenxiLineData('/rest/sentiloAssets/queryAlarmYears',{"alarmType":"1"});

        gaojingtongjifenxiAction();

    });

})();

function initGaojingtongjifenxi(){
    //GaojingtongjifenxiData('',{});
}

function returnGaojingtaojifenxi(data){

    //告警次数
    //$('.zctj_left_bottom_a_right').html();
    //告警类型TOP5
    for(var i = 0;i<$('.zctj_left_bottom_c_bottom').children().first().children().length;i++){
        //$('.zctj_left_bottom_c_bottom').children().first().children().eq(i).children().first().html();
        //$('.zctj_left_bottom_c_bottom').children().first().children().eq(i).children().last().html();
    }

    //环形图
    var waringSourceArray = [];
    //for(var a in data.waringSource){
    //    console.log(a);
    //    waringSourceArray.push({name:a,value:data.waringSource[a]})
    //}
    initGaojingBar(waringSourceArray);
    //热力图
    var heatMapArray = [];
    //for(var i = 0;i<data.heatMapWarning;i++){
    //    heatMapArray.push(data.heatMapWarning[i]['lat&lon'].push(data.heatMapWarning[i]['value']))
    //}
    initHeatMap(heatMapArray);
    //折线图
    //var lineArray = [];
    var lineTimeArray = [];
    var lineDataArray = [];
    //for(var i = 0;i<data.waringPeriodTime;i++){
    //    lineTimeArray.push([data.waringPeriodTime[i]['name']]);
    //    lineDataArray.push([data.waringPeriodTime[i]['data']]);
    //}
    initLine([lineTimeArray,lineDataArray]);

}

//告警统计分析告警次数
function returnGaojingtaojifenxiCounts(data){
    //告警次数
    $('.zctj_left_bottom_a_right').html(data.alarmTimes);
}

//告警统计分析告警来源数量统计
function returnGaojingtaojifenxiSourceNumber(data){

    //环形图
    var waringSourceArray = [];
    for(var a in data.resource){
        //console.log(a);
        waringSourceArray.push({name:a,value:data.resource[a]})
    }
    initGaojingBar(waringSourceArray);
}

//告警统计分析top5
function returnGaojingtaojifenxiTop5(data){

    //var nameArray = [];
    //for(var name in data.alarmTopFive){
    //    nameArray.push(parseInt(name));
    //}
    //
    //nameArray.sort().reverse();

    //告警类型TOP5
    for(var i = 0;i<$('.zctj_left_bottom_c_bottom').children().first().children().length;i++){
        $('.zctj_left_bottom_c_bottom').children().first().children().eq(i).children().first().html(data.alarmTopFive[i].alarmName);
        $('.zctj_left_bottom_c_bottom').children().first().children().eq(i).children().last().html(data.alarmTopFive[i].alarmTimes+'次');
    }
}

//热力图
function returnGaojingtaojifenxiHeatMap(data){

    //热力图
    var heatMapArray = [];
    var heatMapGeoArray = {};
    for(var i = 0;i<data.alarmList.length;i++){
        heatMapArray.push([data.alarmList[i]['lon'],data.alarmList[i]['lat'],data.alarmList[i]['alarmNum']]);
        heatMapGeoArray[(i).toString()] = [data.alarmList[i]['lon'],data.alarmList[i]['lat']];
    }
    if(thirdChart){
        thirdChart.setOption({
            series:{
                name: 'AQI',
                type: 'heatmap',
                coordinateSystem: 'geo',
                data:heatMapArray
            }
        });
    }else{
        initHeatMap([heatMapGeoArray,heatMapArray]);
    }
}
//折线图
function returnGaojingtaojifenxiLine(data){

    var nameArray = [];
    for(var name in data.alarmByYear){
        nameArray.push(name);
    }

    //折线图
    //var lineArray = [];
    var lineTimeArray = [];
    var lineDataArray = [];
    for(var i = 0;i<nameArray.length;i++){
        lineTimeArray.push(nameArray[i]);
        lineDataArray.push(data.alarmByYear[nameArray[i]]);
    }

    var series = [];
    for(var i = 0;i<lineDataArray.length;i++){
        series.push({
            name:lineTimeArray[i],
            type:'line',
            data:lineDataArray[i]
        });
    }

    if(secondChart){
        secondChart.setOption({

            legend: {
                data:lineTimeArray,
                textStyle:{
                    fontSize:18,
                    color:'#ffffff'
                }
            },
            series:series
        });
    }else{
        initLine([lineTimeArray,lineDataArray]);
    }
}


























function gaojingtongjifenxiAction(){

    $(".zctj_left_top_a").mouseover(function(){
        $(".zctj_left_top_b").show();
        $(".zctj_left_top_a_right>a>img").toggle();
    });
    $(".zctj_left_top_a").mouseout(function(){
        $(".zctj_left_top_b").hide();
        $(".zctj_left_top_a_right>a>img").toggle();
    });
    $(".zctj_left_top_b").mouseover(function(){
        $(this).show();
    });
    $(".zctj_left_top_b").mouseout(function(){
        $(this).hide();
    });

    //热力图

    //$(".jgkj_a").mouseover(function(){
    //    $(".jgkj_b").show();
    //    $(".jgkj_a_right>a>img").toggle();
    //});
    //$(".jgkj_a").mouseout(function(){
    //    $(".jgkj_b").hide();
    //    $(".jgkj_a_right>a>img").toggle();
    //});
    //$(".jgkj_b").mouseover(function(){
    //    $(this).show();
    //});
    //$(".jgkj_b").mouseout(function(){
    //    $(this).hide();
    //});

    //告警时段统计折线图
    //$(".gjsd_a").mouseover(function(){
    //    $(".gjsd_b").show();
    //    $(".gjsd_a_right>a>img").toggle();
    //});
    //$(".gjsd_a").mouseout(function(){
    //    $(".gjsd_b").hide();
    //    $(".gjsd_a_right>a>img").toggle();
    //});
    //$(".gjsd_b").mouseover(function(){
    //    $(this).show();
    //});
    //$(".gjsd_b").mouseout(function(){
    //    $(this).hide();
    //});

    //默认点击
    $('.zctj_left_top_b').children().first().children().last().css({
        backgroundColor:'rgb(41,52,68)'
    });
    //温度警告
    //$('.jgkj_b').children().first().children().first().css({
    //    backgroundColor:'rgb(41,52,68)'
    //});
    //
    //$('.gjsd_b').children().first().children().first().css({
    //    backgroundColor:'rgb(41,52,68)'
    //});

    //告警统计分析按钮事件
    $('.zctj_left_top_b').children().first().children().click(function(){

        //var rgb = $(this).css('backgroundColor');
        $(this).css({
            backgroundColor:'rgb(41,52,68)'
        });

        $(this).siblings().css('backgroundColor','rgb(0,0,0)');

        //console.log($(this).prevAll().length);

        //GaojingtongjifenxiData();

    });

    ////热力图按钮事件
    //$('.jgkj_b').children().first().children().click(function(){
    //
    //    //var rgb = $(this).css('backgroundColor');
    //    $(this).css({
    //        backgroundColor:'rgb(41,52,68)'
    //    });
    //
    //    $(this).siblings().css('backgroundColor','rgb(0,0,0)');
    //
    //    console.log($(this).prevAll().length);
    //
    //    //GaojingtongjifenxiHeatMapData();
    //
    //});

    ////折线按钮事件
    //$('.gjsd_b').children().first().children().click(function(){
    //
    //    //var rgb = $(this).css('backgroundColor');
    //    $(this).css({
    //        backgroundColor:'rgb(41,52,68)'
    //    });
    //
    //    $(this).siblings().css('backgroundColor','rgb(0,0,0)');
    //
    //    console.log($(this).prevAll().length);
    //
    //    //GaojingtongjifenxiLineData();
    //
    //});
}
