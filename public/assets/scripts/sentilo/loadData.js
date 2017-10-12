/**
 * Created by dongxin on 2016-10-12.
 */

function initData(url,action,obj){


    $.ajax({
        "type": "GET",
        "url":url,
        "dataType": 'json',
        "contentType": "application/json; charset=utf-8",
        "data":JSON.stringify(obj),
        "success":function(response) {

            if (response.result == true) {
                if(response.error){
                    alert(response.error);
                    if(action){
                        action(response);
                    }
                }else{
                    if(action){
                        action(response);
                    }
                    if(response.error){
                        alert(response.error);
                    }
                }
            } else {
                alert(response.error);
            }
        },
        "error":function(res){

            //alert('数据加载失败，请检查网络是否通畅');
        }
    });
}


//根据关键字搜索设备
function searchDevice(obj) {
    var  keyWord = $(obj).prev().val();
    var data = {"result": true, "components": []};
    var array = [];
    if(infoBox){
        infoBox.close();
    }
    $.ajax({
        "type": "GET",
        "url":"componts.json",
        "dataType": 'json',
        "contentType": "application/json; charset=utf-8",
        "data":JSON.stringify(obj),
        "success":function(response) {
            console.log(response);
            if (response.result == true) {
                //console.log(typeof response.components);
                //查询匹配关键字的设备
                for(var i=0;i<response.components.length;i++){
                    var r = new RegExp(keyWord);
                    var componentType = response.components[i].componentType;
                    var belongto = response.components[i].belongto;
                    var transportType = response.components[i].transportType;

                    if(r.test(componentType) || r.test(belongto) || r.test(transportType)){

                        data.components.push(response.components[i]);
                        //console.log(i);
                    }
                }
                
               // console.log("筛选过后的结果："+data);

                    if(addComponetMarkerClusterer){
                        addComponetMarkerClusterer(data);
                    }
                    if(map && data.components){
                        var lat = data.components[0].lat;
                        var lon = data.components[0].lon;
                        map.centerAndZoom(new BMap.Point(lon,lat), 13)
                        var dt = data.components;
                        var deviceList = "";
                        for(var i=0;i<dt.length;i++){
                            if(dt[i].operationStatus == "预警"){
                                deviceList += " <li class='red' data-lat='"+dt[i].lat+"' data-lon='"+dt[i].lon+"'"+"'><span class='list-l'>设备名："+dt[i].componentName+"</span> <sapn class='list-r'>状态："+dt[i].operationStatus+"</sapn></li>";
                            }else if(dt[i].operationStatus == "离线"){
                                deviceList += " <li class='gray' data-lat='"+dt[i].lat+"' data-lon='"+dt[i].lon+"'"+"'><span class='list-l'>设备名："+dt[i].componentName+"</span> <sapn class='list-r'>状态："+dt[i].operationStatus+"</sapn></li>";
                            }else
                            {
                                deviceList += " <li data-lat='"+dt[i].lat+"' data-lon='"+dt[i].lon+"'"+"'><span class='list-l'>设备名："+dt[i].componentName+"</span> <sapn class='list-r'>状态："+dt[i].operationStatus+"</sapn></li>";
                            }

                        }

                        $("#deviceList").html(deviceList);

                        $("#deviceList li").click(function () {
                            $("#deviceList li").removeClass("clicked");
                            $(this).addClass("clicked");
                            if(map){
                                var lat = $(this).attr("data-lat");
                                var lon = $(this).attr("data-lon");
                                map.centerAndZoom(new BMap.Point(lon,lat), 20);
                            }
                        })
                    }

            } else {

                alert(response.error);
            }
        },
        "error":function(res){

            //alert('数据加载失败，请检查网络是否通畅');
        }
    });
}
//综合态势首次请求
function mainMapData(url,obj){
    initData(url,returnMainMsgData,obj);
}
//筛选栏
function screeningData(url,obj){
    initData(url,returnScreeningData,obj);
}
//搜索
function searchData(url,obj){
    initData(url,returnSearchData,obj);
}

//告警统计分析告警次数
function GaojingtongjifenxiCounts(url,obj){
    initData(url,returnGaojingtaojifenxiCounts,obj);
}

//告警统计分析告警来源数量统计
function GaojingtongjifenxiSourceNumber(url,obj){
    initData(url,returnGaojingtaojifenxiSourceNumber,obj);
}

//告警统计分析top5
function GaojingtongjifenxiTop5(url,obj){
    initData(url,returnGaojingtaojifenxiTop5,obj);
}

//告警统计分析热力图
function GaojingtongjifenxiHeatMapData(url,obj){
    initData(url,returnGaojingtaojifenxiHeatMap,obj);
}

//告警统计分析折线图
function GaojingtongjifenxiLineData(url,obj){
    initData(url,returnGaojingtaojifenxiLine,obj);
}

//专题应用---智慧水务---漏损定位
function leakageLocationData(url,obj){
    initData(url,returnleakageLocation,obj);
}

//资产中心---设备资产
function zichanzhongxinshebeizichanData(url,obj){
    initData(url,returnZichanzhongxinshebeizichan,obj);
}

//资产中心---设备资产---已接入设备故障率
function zichanzhongxinshebeizichanYijierushebeiguzhanglvData(url,obj){
    initData(url,returnZichanzhongxinshebeizichanguzhanglv,obj);
}

//设备详情页
function shebeixiangqingData(url,obj){
    initData(url,returnshebeixiangqing,obj);
}

//设备详情页---历史数据
function shebeixiangqingHistoryData(url,obj){
    initData(url,returnshebeixiangqingHistory,obj);
}



















































































//页面时间加载
(function initTimeDate(){

    $(document).ready(function(){

        var date = new Date();
        var yearString = date.getFullYear()+'年'+number(date.getMonth()+1)+'月'+number(date.getDate())+'日';
        var weekString = day(date.getDay());
        var hoursString = number(date.getHours())+':'+number(date.getMinutes());

        var year = date.getFullYear();
        var month = date.getMonth()+1;
        var days = date.getDate();
        var hours = date.getHours();
        var minutes = date.getMinutes();
        var seconds = date.getSeconds();
        var week = date.getDay();

        $('.top_right_a').children().children().eq(0).html(hoursString);
        $('.top_right_a').children().children().eq(1).html(weekString);
        $('.top_right_a').children().children().eq(2).html(yearString);

        var time = setTimeout(function(){

            minutes ++;
            $('.top_right_a').children().children().eq(0).html(number(hours)+':'+number(minutes));
            if(minutes == 60){
                minutes = 0;
                hours ++;
                $('.top_right_a').children().children().eq(0).html(number(hours)+':'+number(minutes));
                if(hours == 24){
                    hours = 0;
                    days ++;
                    week ++;
                    if(week == 7){
                        week = 0;
                    }
                    $('.top_right_a').children().children().eq(2).html(year+'年'+ number(month)+'月'+number(days))+'日';
                    $('.top_right_a').children().children().eq(1).html(day(week));
                    if(days>((new Date(year,month,0)).getDate())){
                        days = 1;
                        month ++;
                        $('.top_right_a').children().children().eq(2).html(year+'年'+ number(month)+'月'+number(days))+'日';
                        if(month>12){
                            month = 1;
                            year ++;
                            $('.top_right_a').children().children().eq(2).html(year+'年'+ number(month)+'月'+number(days))+'日';
                        }
                    }
                }
            }

            clearInterval(time);

            setInterval(function(){

                minutes ++;
                $('.top_right_a').children().children().eq(0).html(number(hours)+':'+number(minutes));
                if(minutes == 60){
                    minutes = 0;
                    hours ++;
                    $('.top_right_a').children().children().eq(0).html(number(hours)+':'+number(minutes));
                    if(hours == 24){
                        hours = 0;
                        days ++;
                        week ++;
                        if(week == 7){
                            week = 0;
                        }
                        $('.top_right_a').children().children().eq(2).html(year+'年'+ number(month)+'月'+number(days))+'日';
                        $('.top_right_a').children().children().eq(1).html(day(week));
                        if(days>((new Date(year,month,0)).getDate())){
                            days = 1;
                            month ++;
                            $('.top_right_a').children().children().eq(2).html(year+'年'+ number(month)+'月'+number(days))+'日';
                            if(month>12){
                                month = 1;
                                year ++;
                                $('.top_right_a').children().children().eq(2).html(year+'年'+ number(month)+'月'+number(days))+'日';
                            }
                        }
                    }
                }


            },60*1000);

        },(60-seconds)*1000);

        function day(index){

            switch (index){
                case 0:
                    return "星期日";
                    break;
                case 1:
                    return "星期一";
                    break;
                case 2:
                    return "星期二";
                    break;
                case 3:
                    return "星期三";
                    break;
                case 4:
                    return "星期四";
                    break;
                case 5:
                    return "星期五";
                    break;
                case 6:
                    return "星期六";
                    break;
            }

        }

        function number(num){
            return num>9?num:'0'+num;
        }

    });

})();

//禁止右键点击
(function righthandleAction(){

    $(document).ready(function(){

        function Click(){
            window.event.returnValue=false;
        }
        document.oncontextmenu=Click;

    });

})();

//(function imageRightAction(){
//    $(document).ready(function(){
//        setTimeout('delayLoad()', 500);
//        $("div").bind("contextmenu", function(e){ return false; }) ;
//    });
//})();
