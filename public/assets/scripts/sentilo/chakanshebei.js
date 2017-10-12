/**
 * Created by dongxin on 2016-11-07.
 */

/*(function initChakanshebei(){

    $(document).ready(function(){

        //$('.sll_a').mouseenter(function(){
        //    $('.sll_b').show();
        //});
        //$('.sll_a').mouseleave(function(){
        //    $('.sll_b').hide();
        //});

        var id = getRequest('id');
        shebeixiangqingData('/rest/sentiloCatalog/queryComponentDetails',{id:id});

    });

})();*/

function returnshebeixiangqingHistory(data){
    console.log('历史数据'+data);

    var unit = {'PH':'','PH值':'','浊度':'NTU','余氯':'mg/L','SO2':'ppm','噪音':'DB','PM2.5':'ppm','累计水流量':'m³','气压':'hPa','水压':'MPa','风压':'Pa','风压值':'10N/m³','温度':'℃','湿度':'%','温度值':'℃','湿度值':'%','CO':'ppm','风速':'m/s','车辆速度':'m/s','车辆重量':'Kg','光强':'lux','瞬时水流量':'m³/s','噪音值':'DB','粉尘浓度':'mg/m³'};

    if(data.resultList.length>0){
        if(mySentiloChart){
            mySentiloChart.clear();
            mySentiloChart.isDisposed();
        }

        $('.cksb_c_left_bottom').children().children().eq(0).children().eq(0).children().html(stringChange(data.resultList[0].monitorValue.toFixed(1))+' '+unit[data.resultList[0].monitorIndicator]);
        $('.cksb_c_left_bottom').children().children().eq(0).children().eq(1).children().html(stringChange(data.resultList[0].monitorIndicator));
        //更新时间
        var date = new Date(data.resultList[0].recordTime);
        var timeString = date.getFullYear()+'/'+numberChange(date.getMonth()+1)+'/'+numberChange(date.getDate())+' '+numberChange(date.getHours())+':'+numberChange(date.getMinutes());
        //$('.cksb_c_left_bottom').children().children().eq(1).children().children().eq(1).html(componentDetails.sensors[0].recordTime);
        $('.cksb_c_left_bottom').children().children().eq(1).children().children().eq(1).html(timeString);
        //历史数据折线图
        //initSentiloHistoryDataLine(componentDetails.sensors[0].value.toFixed(1),componentDetails.sensors[$(this).prevAll().length].recordTime,[unit[componentDetails.sensors[$(this).prevAll().length].name],componentDetails.sensors[$(this).prevAll().length].name]);
        initSentiloHistoryDataLine(data.resultList,[unit[data.resultList[0].monitorIndicator],data.resultList[0].monitorIndicator]);
    }else{
        alert('没有更多历史数据');
        $('.cksb_c_left_bottom').children().children().eq(0).children().eq(0).children().html('---'+' '+unit[titleName]);
        $('.cksb_c_left_bottom').children().children().eq(0).children().eq(1).children().html(titleName);
        //更新时间
        $('.cksb_c_left_bottom').children().children().eq(1).children().children().eq(1).html('---');
        //历史数据折线图
        //initSentiloHistoryDataLine(componentDetails.sensors[0].value.toFixed(1),componentDetails.sensors[$(this).prevAll().length].recordTime,[unit[componentDetails.sensors[$(this).prevAll().length].name],componentDetails.sensors[$(this).prevAll().length].name]);
        initSentiloHistoryDataLine([],[unit[titleName],titleName]);
    }

}

var componentDetails = {};
var titleName = '';

function returnshebeixiangqing(data){

    componentDetails = data.componentDetails;

    for(var i in componentDetails){
        if(!componentDetails[i] && i!='sensors'){
            componentDetails[i] = '---';
        }
    }

    //图片
    $('.cksb_b_left').children().attr('src','/assets/img/sentilo/map-icons/component_detail/'+getRequest('index')+'.png');

    //设备名
    $('.cksb_b').children().eq(1).children().children().eq(0).children().eq(1).html(componentDetails.componentDescription);
    //所属用户
    $('.cksb_b').children().eq(1).children().children().eq(0).children().eq(3).html(componentDetails.belongto);
    //设备类型
    $('.cksb_b').children().eq(1).children().children().eq(0).children().eq(5).html(componentDetails.componentType);
    //传输协议
    $('.cksb_b').children().eq(1).children().children().eq(0).children().eq(7).html(componentDetails.transportType);
    //设备状态
    $('.cksb_b').children().eq(1).children().children().eq(1).children().eq(1).html(getRequest('status'));
    //地址
    $('.cksb_b').children().eq(1).children().children().eq(1).children().eq(3).html(componentDetails.addressName);


    //实时数据
    //var unit = {'水质监测仪':[{'PH值':'','浊度':'NTU','余氯':'mg/L'}],'环境探测器':[{'二氧化硫浓度':'','噪音':'DB','PM2.5':''}],'自动气象站':[{'气压':'hPa','风压':'','温度':'℃','湿度':'%'}],'智能水表':{'水流量':'m³'},'气压计':{'气压':'hPa'},'水压计':{'水压':'MPa'},'风压计':{'风压':'10N/m³'},'温度计':{'温度':'℃'},'湿度计':{'湿度':'%'},'一氧化碳气体探测器':{'一氧化碳浓度':'ppm'},'风速测量计':{'风速':'m/s'},'测速仪':{'车辆速度':'m/s'},'称重仪':{'车辆重量':'Kg'},'光照度检测仪':{'光强':'lux'},'超声波流量计':{'瞬时水流量':'m³/s'},'噪音计':{'噪音值':'DB'},'粉尘浓度探测器':{'粉尘浓度':'mg/m³'},'酸碱度PH计':{'PH值':''}};
    var unit = {'PH':'','PH值':'','浊度':'NTU','余氯':'mg/L','SO2':'ppm','噪音':'DB','PM2.5':'ppm','累计水流量':'m³','气压':'hPa','水压':'MPa','风压':'Pa','风压值':'10N/m³','温度':'℃','湿度':'%','温度值':'℃','湿度值':'%','CO':'ppm','风速':'m/s','车辆速度':'m/s','车辆重量':'Kg','光强':'lux','瞬时水流量':'m³/s','噪音值':'DB','粉尘浓度':'mg/m³'};
    var titleaaa = {'水质监测仪':['---',''],'环境探测仪':['---',''],'自动气象站':['---',''],'智能水表':['累计水流量','m³'],'气压计':['气压','hPa'],'水压计':['水压','MPa'],'风压计':['风压','Pa'],'温度计':['温度','℃'],'湿度计':['湿度','%'],'一氧化碳气体探测器':['一氧化氮浓度','ppm'],'风速测量计':['风速','m/s'],'测速仪':['车辆速度','m/s'],'称重仪':['车辆重量','Kg'],'光照度检测仪':['光强','lux'],'超声波流量计':['瞬时水流量','m³/s'],'噪音计':['噪音值','DB'],'粉尘浓度探测器':['粉尘浓度','mg/m³'],'酸碱度PH计':''};

    if(componentDetails.sensors){
        if(componentDetails.sensors.length>0){
            $('.cksb_c_left_bottom').children().children().eq(0).children().eq(0).children().html(stringChange(componentDetails.sensors[0].value.toFixed(1))+' '+unit[componentDetails.sensors[0].name]);
            $('.cksb_c_left_bottom').children().children().eq(0).children().eq(1).children().html(stringChange(componentDetails.sensors[0].name));
            //更新时间
            var date = new Date(componentDetails.sensors[0].recordTime);
            //var timeString = date.getFullYear()+'/'+numberChange(date.getMonth()+1)+'/'+numberChange(date.getDate())+' '+numberChange(date.getHours())+':'+numberChange(date.getMinutes());
            $('.cksb_c_left_bottom').children().children().eq(1).children().children().eq(1).html(componentDetails.sensors[0].recordTime);

            //历史数据折线图
            //initSentiloHistoryDataLine(componentDetails.sensors[0].value.toFixed(1),componentDetails.sensors[0].recordTime,[unit[componentDetails.sensors[$(this).prevAll().length].name],componentDetails.sensors[$(this).prevAll().length].name]);
        }else{
            //$('.cksb_c_left_bottom').children().children().eq(0).children().eq(0).children().html('---');
            //$('.cksb_c_left_bottom').children().children().eq(0).children().eq(1).children().html('---');
            ////更新时间
            //$('.cksb_c_left_bottom').children().children().eq(1).children().children().eq(1).html('---');
            ////历史数据折线图
            //initSentiloHistoryDataLine([],['','']);

            if(componentDetails.componentType){
                $('.cksb_c_left_bottom').children().children().eq(0).children().eq(0).children().html('---'+titleaaa[componentDetails.componentType][1]);
                $('.cksb_c_left_bottom').children().children().eq(0).children().eq(1).children().html(titleaaa[componentDetails.componentType][0]);
                $('.sll_a').children().eq(0).html(titleaaa[componentDetails.componentType][0]);
                initSentiloHistoryDataLine([],[titleaaa[componentDetails.componentType][1],titleaaa[componentDetails.componentType][0]]);

                $('.sll_a_right').hide();
                $('.sll_a').css({
                    cursor: 'normal'
                });
            }else{
                $('.cksb_c_left_bottom').children().children().eq(0).children().eq(0).children().html('---');
                $('.cksb_c_left_bottom').children().children().eq(0).children().eq(1).children().html('---');
                $('.sll_a').children().eq(0).html('---');

                $('.sll_a_right').hide();
                $('.sll_a').css({
                    cursor: 'normal'
                });

                //历史数据折线图
                initSentiloHistoryDataLine([],['','']);
            }
            //更新时间
            $('.cksb_c_left_bottom').children().children().eq(1).children().children().eq(1).html('---');
        }
    }else{

        //componentType

        if(componentDetails.componentType){
            $('.cksb_c_left_bottom').children().children().eq(0).children().eq(0).children().html('---'+titleaaa[componentDetails.componentType][1]);
            $('.cksb_c_left_bottom').children().children().eq(0).children().eq(1).children().html('---'+titleaaa[componentDetails.componentType][0]);
            initSentiloHistoryDataLine([],[titleaaa[componentDetails.componentType][1],titleaaa[componentDetails.componentType][0]]);
            $('.sll_a').children().eq(0).html(titleaaa[componentDetails.componentType][0]);
        }else{
            $('.cksb_c_left_bottom').children().children().eq(0).children().eq(0).children().html('---');
            $('.cksb_c_left_bottom').children().children().eq(0).children().eq(1).children().html('---');
            $('.sll_a').children().eq(0).html('---');
            //历史数据折线图
            initSentiloHistoryDataLine([],['','']);
        }
        $('.sll_a_right').hide();
        $('.sll_a').css({
            cursor: 'normal'
        });
        //更新时间
        $('.cksb_c_left_bottom').children().children().eq(1).children().children().eq(1).html('---');

    }

    //console.log('componentDetails.sensors='+componentDetails.sensors);
    if(componentDetails.sensors){

        if(componentDetails.sensors.length>0){
            shebeixiangqingHistoryData('/rest/sentiloCatalog/queryComponentMonitorDetails',{componentId:data.componentDetails.componentId,monitorIndicator:componentDetails.sensors[0].name});
            $('.sll_a').children().eq(0).html(componentDetails.sensors[0].name);
            if(componentDetails.sensors.length>1){

                $('.sll').append('<div class="sll_b" style="display: none;"><ul></ul></div>');

                for(var i = 0;i<componentDetails.sensors.length;i++){
                    $('.sll_b ul').append('<li><a href="####" title="">'+componentDetails.sensors[i].name+'</a></li>');
                }

                $('.sll_a_right').show();
                $('.sll_a').css({
                    cursor: 'pointer'
                });

                $(".sll_b").children().children().eq(0).css({
                    backgroundColor:'rgb(41,52,68)'
                });


                $(".sll_a").mouseover(function(){
                    $(".sll_b").show();
                    $(".sll_a_right>a>img").toggle();
                });
                $(".sll_a").mouseout(function(){
                    $(".sll_b").hide();
                    $(".sll_a_right>a>img").toggle();
                });
                $(".sll_b").mouseover(function(){
                    $(this).show();
                });
                $(".sll_b").mouseout(function(){
                    $(this).hide();
                });
            }else{
                $('.sll_a_right').hide();
                $('.sll_a').css({
                    cursor: 'normal'
                });
            }
        }

    }else{
        $('.ssl_a').hide();
        $('.sll_a_right').hide();
    }

    $(".sll_b").children().children().click(function(){
        $(this).css({
            backgroundColor:'rgb(41,52,68)'
        });

        $(this).siblings().css({
            backgroundColor:'rgba(0,0,0,0)'
        });

        $('.cksb_c_left_bottom').children().children().eq(0).children().eq(0).children().html(stringChange(componentDetails.sensors[$(this).prevAll().length].value.toFixed(1))+' '+unit[componentDetails.sensors[$(this).prevAll().length].name]);
        $('.cksb_c_left_bottom').children().children().eq(0).children().eq(1).children().html(stringChange(componentDetails.sensors[$(this).prevAll().length].name));
        //更新时间
        var date = new Date(componentDetails.sensors[0].recordTime);
        //var timeString = date.getFullYear()+'/'+numberChange(date.getMonth()+1)+'/'+numberChange(date.getDate())+' '+numberChange(date.getHours())+':'+numberChange(date.getMinutes());
        $('.cksb_c_left_bottom').children().children().eq(1).children().children().eq(1).html(componentDetails.sensors[$(this).prevAll().length].recordTime);

        titleName = $(this).children().html();
        $(".sll_a").children().first().html(titleName);
        $(".sll_b").hide();
        shebeixiangqingHistoryData('/rest/sentiloCatalog/queryComponentMonitorDetails',{componentId:data.componentDetails.componentId,monitorIndicator:$(this).children().html()});

    });


    //标识码
    $('.cksb_d_left_bottom').children().children().children().eq(0).children().eq(1).html(componentDetails.componentCode);
    //生产商
    $('.cksb_d_left_bottom').children().children().children().eq(0).children().eq(3).html(componentDetails.provider);
    //描述
    $('.cksb_d_left_bottom').children().children().children().eq(1).children().eq(1).html(componentDetails.componentDescription);
    //供电方式
    $('.cksb_d_left_bottom').children().children().children().eq(1).children().eq(3).html(componentDetails.powerMode);
    //位置状态
    $('.cksb_d_left_bottom').children().children().children().eq(2).children().eq(1).html();
    //Mac
    $('.cksb_d_left_bottom').children().children().children().eq(2).children().eq(3).html(componentDetails.mac);
    //创建日期
    var date = new Date(componentDetails.createDate);
    var timeString = date.getFullYear()+'/'+numberChange(date.getMonth()+1)+'/'+numberChange(date.getDate())+' '+numberChange(date.getHours())+':'+numberChange(date.getMinutes());
    $('.cksb_d_left_bottom').children().children().children().eq(3).children().eq(1).html(componentDetails.createDate?timeString:'----/--/-- --:--');
    //经纬度
    $('.cksb_d_left_bottom').children().children().children().eq(3).children().eq(3).children().eq(0).html(componentDetails.lon == '---'?componentDetails.lon+'°E':componentDetails.lon.toFixed(4)+'°E');
    $('.cksb_d_left_bottom').children().children().children().eq(3).children().eq(3).children().eq(1).html(componentDetails.lat == '---'?componentDetails.lat+'°N':componentDetails.lat.toFixed(4)+'°N');
    //console.log(componentDetails);

    loadComponentMap(getRequest('index'),componentDetails.lon,componentDetails.lat);
}

function numberChange(number){
    return number>9?number:'0'+number;
}

function stringChange(string){
    return string?string:'---';
}

// js 读取
function getRequest(key) {
    var regex = new RegExp("[?&]" + encodeURIComponent(key) + "\\=([^&#]+)");
    var value = (location.search.match(regex)||["",""])[1];
    return decodeURIComponent(value);
}


//加载定位地图
function loadComponentMap(index,lon,lat) {
// 百度地图加载
    var map = new BMap.Map("map", {enableMapClick: false});    // 创建Map实例
    map.centerAndZoom(new BMap.Point(lon, lat), 14);  // 初始化地图,设置中心点坐标和地图级别
    map.addControl(new BMap.MapTypeControl({mapTypes: [BMAP_NORMAL_MAP, BMAP_HYBRID_MAP]}));   //添加地图类型控件

   // map.enableScrollWheelZoom(false);     //开启鼠标滚轮缩放
    map.disableDoubleClickZoom();

///地图样式
    map.setMapStyle({styleJson: styleJson});

    var overView = new BMap.OverviewMapControl();
    var overViewOpen = new BMap.OverviewMapControl({isOpen: true, anchor: BMAP_ANCHOR_BOTTOM_RIGHT});


//添加定位设备
    var point=new BMap.Point(lon,lat);

    var icon = new BMap.Icon("/assets/img/sentilo/map-icons/normal/"+index+".png", new BMap.Size(32, 43), {  // 设置图片大小
        anchor: new BMap.Size(16, 43),// 指定定位位置偏移。
        imageOffset: new BMap.Size(0, 0)   // 设置雪碧图偏移
    });

    var marker = new BMap.Marker(point, {icon: icon});
    map.addOverlay(marker);
}