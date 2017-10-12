/**
 * Created by dongxin on 2016-10-27.
 */

(function initShebeizichantongji(){

    $(document).ready(function(){

        $(".sbzctj_d_a_a_ayhck").children().css({
            color:'#00a2ff'
        });
        $(".sbzctj_c_a_right_ayh").children().css({
            color:'#00a2ff'
        });
        $('.zctj_left_top_b').children().children().eq(1).css({
            backgroundColor:'rgb(41,52,68)'
        });

        var month = (new Date()).getMonth()==0?12:(new Date()).getMonth();
        var year = month == (new Date()).getMonth()==0?(new Date()).getFullYear()-1:(new Date()).getFullYear();
        zichanzhongxinshebeizichanData('/rest/SentiloEquipment/queryEquipmentStatic',{componentTypes:"",TransportTypes:""});
        zichanzhongxinshebeizichanYijierushebeiguzhanglvData('/rest/SentiloEquipment/queryComponentRate',{failureRateYear:year+"",failureRateMonth:month+""});
        ////接入设备数量
        //$('.sbzctj_a_left_b_b').html();
        ////设备类型数量分布
        //shebeileixingshuliangfenbuPie();
        ////协议类型数量分布
        //xieyileixingshujuliangfenbuRadar();
        //近一个月接入设备状况
        jinyigeyuejierushebeiLine();
        ////设备接入统计（按用户）
        //jierushebeitongjiAnyonghutreeMap();
        ////设备接入统计（按制造商）
        //jierushebeitongjiAnzhizaoshang();
        ////已接入设备故障率（按已接入设备）
        //yijierushebeiguzhanglvLine();
        ////已接入设备故障率（按制造商）
        //yijierushebeiguzhanglvAnzhizaoshang();

        shebeizichantongjiAction();

        //页面点击交互
        shebeizichantongjiAction();

    });

})();



function returnZichanzhongxinshebeizichan(data){

    //接入设备数量
    $('.sbzctj_a_left_b_b').html(data.accessDevicesNum);

    //设备类型数量分布
    var typeDistribution = [];
    for(var i in data.typeDistribution){
        typeDistribution.push({name:i,value:data.typeDistribution[i]});
    }
    shebeileixingshuliangfenbuPie(typeDistribution);

    //协议类型数量分布
    var protocolTypeDistribution = [];
    var name = [];
    for(var i in data.protocolTypeDistribution){
        protocolTypeDistribution.push(data.protocolTypeDistribution[i]);
        name.push(i);
    }
    xieyileixingshujuliangfenbuRadar([name,{name:'协议类型数量分布',value:protocolTypeDistribution}]);

    //设备接入统计（按用户）
    var user = [];
    for(var i in data.counts.user){
        user.push({name:'   '+i+'\n',value:data.counts.user[i]});
    }
    jierushebeitongjiAnyonghutreeMap(user);

    //设备接入统计（按制造商）
    var manufacturers = [];
    for(var i in data.counts.manufacturers){
        manufacturers.push({name:'   '+i+'\n',value:data.counts.manufacturers[i]});
    }
    jierushebeitongjiAnzhizaoshang(manufacturers);

    console.log(data);
}


function returnZichanzhongxinshebeizichanguzhanglv(data){

    var month = (new Date()).getMonth()==0?12:(new Date()).getMonth();
    var year = month == (new Date()).getMonth()==0?(new Date()).getFullYear()-1:(new Date()).getFullYear();

    //已接入设备故障率（按已接入设备）
    var component = [];
    //var name = [];
    var day = new Date(year,month,0).getDate();

    for(var i = 0;i<day;i++){
        var name = i+1>9?(i+1)+'':'0'+(i+1);
        if(data.failureRate.component.dataList[name]){
            component.push((data.failureRate.component.dataList[name]*100).toFixed(3));
        }else{
            component.push('');
        }
    }

    var month = (new Date()).getMonth()==0?12:(new Date()).getMonth();
    var year = month == (new Date()).getMonth()==0?1:0;

    if(yijierushebeiguzhanglvLineChart){
        reloadYijierushebeiData(component,yearIndex,monthIndex);
    }else{
        yijierushebeiguzhanglvLine();
        reloadYijierushebeiData(component,year,month);
    }


    //for(var i in data.failureRate.component.dataList){
    //    component.push({name:i,value:data.counts.manufacturers[i]});
    //}
    //yijierushebeiguzhanglvLine();
    //已接入设备故障率（按制造商）
    var user = [];
    for(var i in data.failureRate.user){
        user.push({name:i,value:(data.failureRate.user[i]*100).toFixed(3)});
    }
    yijierushebeiguzhanglvAnzhizaoshang(user);

    console.log(data);
}
















var monthIndex = (new Date()).getMonth();
var yearIndex = (new Date()).getMonth()==0?1:0;

function shebeizichantongjiAction(){

    monthIndex = changeMonth(yearIndex,monthIndex,12,$('.nian_a'),$('.yue_b'));

    /*
    var titleNian = ['2016年','2015年','2014年'];
    $(".nian_a").mouseover(function(){
        $(".nian_b").show();
        $(".nian_a_right>a>img").toggle();
    });
    $(".nian_a").mouseout(function(){
        $(".nian_b").hide();
        $(".nian_a_right>a>img").toggle();
    });
    $(".nian_b").mouseover(function(){
        $(this).show();
    });
    $(".nian_b").mouseout(function(){
        $(this).hide();
    });

    $('.nian_b').children().children().unbind().click(function(){

        if (this && this.stopPropagation) {//非IE浏览器
            this.stopPropagation();
        }
        else {//IE浏览器
            window.event.cancelBubble = true;
        }

        yearIndex = $(this).prevAll().length;
        console.log(yearIndex);

        monthIndex = changeMonth(yearIndex,monthIndex,12,$('.nian_a'),$('.yue_b'));

        if(yearIndex == 0){
            var month = 12-(new Date()).getMonth()-1;
            monthIndex = (new Date()).getMonth()+1;
            for(var i = 0;i<month;i++){
                $('.yue_b').children().children().eq(i).hide();
            }
            $('.yue_a').children().first().html(monthIndex+'月');
        }else{
            $('.yue_b').children().children().show();
        }

        $(this).css({
            backgroundColor:'rgb(41,52,68)'
        });

        $(this).siblings().css({
            backgroundColor:'rgba(0,0,0,0)'
        });

        $('.nian_a').children().first().html(titleNian[$(this).prevAll().length]);
        $(".nian_b").hide();

        if(monthIndex == 13){

            var datayue = [];
            for(var i = 0; i<12;i++){
                datayue.push((Math.round(Math.random()*80)));
            }

            yijierushebeiguzhanglvLineChart.setOption({
                xAxis: {
                    name:'日期',
                    type: 'category',
                    data: ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月']
                },
                series: [
                    {
                        name:'按用户查看',
                        type:'line',
                        data:datayue
                    }
                ]
            });
        }else{

            //reloadYijierushebeiData(Data,yearIndex,monthIndex);
            zichanzhongxinshebeizichanYijierushebeiguzhanglvData('/rest/SentiloEquipment/queryComponentRate',{failureRateYear:((new Date()).getFullYear()-yearIndex)+"",failureRateMonth:(monthIndex>9?monthIndex:'0'+monthIndex)+""});
        }

    });

    */



    $(".yue_a").mouseover(function(){
        $(".yue_b").show();
        $(".yue_a_right>a>img").toggle();
    });
    $(".yue_a").mouseout(function(){
        $(".yue_b").hide();
        $(".yue_a_right>a>img").toggle();
    });
    $(".yue_b").mouseover(function(){
        $(this).show();
    });
    $(".yue_b").mouseout(function(){
        $(this).hide();
    });
    var titleYue = ['12月','11月','10月','9月','8月','7月','6月','5月','4月','3月','2月','1月'];
    $('.yue_b').children().children().unbind().click(function(){

        monthIndex = 12-$(this).prevAll().length;
        console.log(12-monthIndex);

        $(this).css({
            backgroundColor:'rgb(41,52,68)'
        });

        $(this).siblings().css({
            backgroundColor:'rgba(0,0,0,0)'
        });

        $('.yue_a').children().first().html([titleYue[$(this).prevAll().length]]);
        $(".yue_b").hide();

        if(monthIndex == 13){

            var datayue = [];
            for(var i = 0; i<12;i++){
                datayue.push((Math.round(Math.random()*80)));
            }

            yijierushebeiguzhanglvLineChart.setOption({
                xAxis: {
                    name:'日期\n\n',
                    type: 'category',
                    data: ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月']
                },
                series: [
                    {
                        name:'按用户查看',
                        type:'line',
                        data:datayue
                    }
                ]
            });
        }
        else{

            //var titleNian2 = [2016,2015,2014];
            //var titleYue2 = [12,11,10,9,8,7,6,5,4,3,2,1];
            //var dayArray = [];
            //var day;
            //
            //day = new Date(titleNian2[yearIndex],monthIndex,0).getDate();
            //if(day == 28){
            //    dayArray = ['','','','','05','','','','','10','','','','','15','','','','','20','','','','','25','','','28'];
            //}else if(day == 29){
            //    dayArray = ['','','','','05','','','','','10','','','','','15','','','','','20','','','','','25','','','','29'];
            //}else if(day == 30){
            //    dayArray = ['','','','','05','','','','','10','','','','','15','','','','','20','','','','','25','','','','','30'];
            //}else if(day == 31){
            //    dayArray = ['','','','','05','','','','','10','','','','','15','','','','','20','','','','','25','','','','','','31'];
            //}
            //
            //for(var i = 0; i< dayArray.length;i++){
            //    if(dayArray[i]){
            //        dayArray[i] = monthIndex+'-'+dayArray[i];
            //    }
            //}
            //
            //var data = [];
            //for(var i = 0; i<dayArray.length;i++){
            //    data.push(Math.round(Math.random()*50));
            //}
            //
            //
            //yijierushebeiguzhanglvLineChart.setOption({
            //    xAxis: {
            //        name:'日期\n\n',
            //        type: 'category',
            //        data: dayArray
            //    },
            //    series: [
            //        {
            //            name:'按用户查看',
            //            type:'line',
            //            data:data
            //        }
            //    ]
            //});

            zichanzhongxinshebeizichanYijierushebeiguzhanglvData('/rest/SentiloEquipment/queryComponentRate',{failureRateYear:((new Date()).getFullYear()-yearIndex)+"",failureRateMonth:(monthIndex>9?monthIndex:'0'+monthIndex)+""});
        }

    });








    $(".sbzctj_c_a_right_ayh").mouseover(function(){
        $(this).children().css({
            color:'#00a2ff'
        });
        $(".sbzctj_c_ayh").show();
        $(".sbzctj_c_azzs").hide();
        $(this).siblings().children().css({
            color:'white'
        });
    });
    $(".sbzctj_c_a_right_azzs").mouseover(function(){
        $(this).children().css({
            color:'#00a2ff'
        });
        $(".sbzctj_c_azzs").show();
        $(".sbzctj_c_ayh").hide();
        $(this).siblings().children().css({
            color:'white'
        });
    });

    $(".sbzctj_d_a_a_ayhck").mouseover(function(){
        $(".sbzctj_d_ayhck").show();
        $(".sbzctj_d_azzsck").hide();
        $('.nian').show();
        $('.yue').show();
        $(this).children().css({
            color:'#00a2ff'
        });
        $(this).siblings().children().css({
            color:'white'
        });
    });
    $(".sbzctj_d_a_a_azzsck").mouseover(function(){
        $(".sbzctj_d_azzsck").show();
        $(".sbzctj_d_ayhck").hide();
        $('.nian').hide();
        $('.yue').hide();
        $(this).children().css({
            color:'#00a2ff'
        });
        $(this).siblings().children().css({
            color:'white'
        });
    });

}

function reloadYijierushebeiData(Data,yearIndex,monthIndex){

    var titleNian2 = [2016,2015,2014];
    var dayArray = [];
    var day;

    day = new Date(titleNian2[yearIndex],monthIndex,0).getDate();
    if(day == 28){
        dayArray = ['','','','','05','','','','','10','','','','','15','','','','','20','','','','','25','','','28'];
    }else if(day == 29){
        dayArray = ['','','','','05','','','','','10','','','','','15','','','','','20','','','','','25','','','','29'];
    }else if(day == 30){
        dayArray = ['','','','','05','','','','','10','','','','','15','','','','','20','','','','','25','','','','','30'];
    }else if(day == 31){
        dayArray = ['','','','','05','','','','','10','','','','','15','','','','','20','','','','','25','','','','','','31'];
    }

    if((new Date()).getDate()<=day && yearIndex == 0 && monthIndex == (new Date()).getMonth()+1){
        var num = (new Date()).getDate()/5;
        if((new Date()).getDate()%5!=0 || (new Date()).getDate()%5!=28 || (new Date()).getDate()%5!=29 || (new Date()).getDate()%5!=30 || (new Date()).getDate()%5!=31){
            dayArray.splice((new Date()).getDate()-1,1,(new Date()).getDate()>9?(new Date()).getDate().toString():'0'+(new Date()).getDate());
        }
    }

    for(var i = 0; i< dayArray.length;i++){
        if(dayArray[i]){
            dayArray[i] = monthIndex+'-'+dayArray[i];
        }
    }

    var data = [];
    for(var i = 0; i<dayArray.length;i++){
        if(i<(new Date()).getDate()){
            data.push('');
            //data.push(Math.round(Math.random()*50));
        }else{
            data.push('');
        }
    }

    if(Data){
        for(var i = 0;i<Data.length;i++){
            if(yearIndex == 0 && monthIndex == (new Date()).getMonth()+1){
                if(i<(new Date()).getDate()){

                }else{
                    Data.splice(i,1,'');
                }
            }
        }
        data = Data;
    }

    yijierushebeiguzhanglvLineChart.setOption({

        tooltip:{
            formatter: function (params) {

                var title1 = ((new Date()).getFullYear()-yearIndex)+'-'+(monthIndex>9?monthIndex:'0'+monthIndex)+'-'+((params[0].dataIndex+1)>9?(params[0].dataIndex+1):'0'+(params[0].dataIndex+1));
                var title2 = '已接入设备故障率：'+params[0].value+'%';
                return title1+'<br>'+title2;
            }
        },
        xAxis: {
            name:'日期\n\n',
            type: 'category',
            data: dayArray
        },
        series: [
            {
                name:'按用户查看',
                type:'line',
                data:data
            }
        ]
    });

}

function changeMonth(yearIndex,monthIndex,totle,monthA,monthB){

    var titleYue = ['全年','12月','11月','10月','9月','8月','7月','6月','5月','4月','3月','2月','1月'];
    if(yearIndex == 0){
        for(var i = 0;i<12-(new Date()).getMonth()-1;i++){
            if(totle == 12){
                monthB.children().children().eq(i).hide();
            }else{
                monthB.children().children().eq(i+1).hide();
            }
        }

        if(monthIndex!=13){
            if(totle == 12){
                if(monthIndex>(new Date()).getMonth()+1){
                    monthA.children().first().html(titleYue[totle-(new Date()).getMonth()]);
                    monthIndex = (new Date()).getMonth()+1;
                    monthB.children().children().eq(totle-monthIndex).css({
                        backgroundColor:'rgb(41,52,68)'
                    });

                    monthB.children().children().eq(totle-monthIndex).siblings().css({
                        backgroundColor:'rgba(0,0,0,0)'
                    });
                }
            }else{
                if(monthIndex>(new Date()).getMonth()+1){
                    monthA.children().first().html(titleYue[totle-(new Date()).getMonth()-1]);
                    monthIndex = (new Date()).getMonth()+1;
                    monthB.children().children().eq(totle-monthIndex).css({
                        backgroundColor:'rgb(41,52,68)'
                    });

                    monthB.children().children().eq(totle-monthIndex).siblings().css({
                        backgroundColor:'rgba(0,0,0,0)'
                    });
                }
            }
        }

    }else{
        for(var i = 0;i<totle-(new Date()).getMonth()-1;i++){
            if(totle == 12){
                monthB.children().children().eq(i).show();
            }else{
                monthB.children().children().eq(i+1).show();
            }
        }
    }

    delectMonth(totle,monthB);
    console.log('monthIndex = '+monthIndex);
    return monthIndex;

}

function delectMonth(index,monthB){
    for(var i = 0; i< index;i++){
        if(i>index-8){
            monthB.children().children().eq(i).hide();
        }
    }
}