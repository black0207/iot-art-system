/**
 * Created by dongxin on 2016-11-03.
 */

function initZichanxinxi(){

    $(document).ready(function(){


        zichanmingxizichanxinxiAction();
        //gaojintongjiEchartsLine();

        ////数据资产统计
        //tongjitiaoshuEchartsLine();
        ////设备资产统计
        //jierushebeishuliangtongjiEchartsLine();
        ////已接入设备故障率
        //yijierushebeiguzhanglvtongjiEchartsLine();

    });

}


function initGaojinxinxi(){

    $(document).ready(function(){


        zichanmingxiGaojinxinxiAction();

    });

}


















function shihuanjingbaohujuYear(echarts,seriesData,year,Data){

    var series = [];
    for(var i = 0;i<seriesData.length;i++){

        var datayue = [];
        for(var j = 0; j<12;j++){
            if(Data){
                datayue.push(Data[j][i]);
            }else{
                datayue.push((Math.round(Math.random()*80)));
            }
            if(j<8){
                datayue.splice(j-1,1,'');
            }

        }

        series.push(
            {
                //name:'按用户查看',
                type:'line',
                data:datayue
            }
        );
    }

    echarts.setOption({
        tooltip:{
            formatter:function(params){
                if(params.length == 1){
                    return year.split('年')[0]+'-'+(params[0].dataIndex+1>9?params[0].dataIndex+1:'0'+(params[0].dataIndex+1))+'<br>'+params[0].seriesName+'：'+params[0].value+'%';
                }else{
                    return year.split('年')[0]+'-'+(params[0].dataIndex+1>9?params[0].dataIndex+1:'0'+(params[0].dataIndex+1))+'<br>'+params[0].seriesName+'：'+params[0].value+'<br>'+params[1].seriesName+'：'+params[1].value;
                }
            }
        },
        xAxis: {
            name:'日期\n\n',
            type: 'category',
            data: ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月']
        },
        series: series
    });

}

function shihuanjingbaohujuYearAndMonth(echarts, seriesData,yearIndex,monthIndex,Data){

    var titleNian2 = [(new Date()).getFullYear(),(new Date()).getFullYear()-1,(new Date()).getFullYear()-2];
    //var titleYue2 = [0,12,11,10,9,8,7,6,5,4,3,2,1];
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

    var series = [];
    for(var i = 0;i<seriesData.length;i++){

        var data = [];

        for(var j = 0; j<dayArray.length;j++){
            if((new Date()).getDate()<=day && yearIndex == 0 && monthIndex == (new Date()).getMonth()+1){
                if(j<(new Date()).getDate()){
                    data.push(Math.round(Math.random()*50));
                }else{
                    data.push('');
                }
            }else{
                data.push(Math.round(Math.random()*50));
            }
        }

        if(Data){
            data = Data[i];
        }

        series.push(
            {
                //name:'按用户查看',
                type:'line',
                data:data
            }
        );
    }


    echarts.setOption({
        tooltip:{
            formatter:function(params){

                if(params.length == 1){
                    return titleNian2[yearIndex]+'-'+monthIndex+'-'+(params[0].dataIndex+1>9?params[0].dataIndex+1:'0'+(params[0].dataIndex+1))+'<br>'+params[0].seriesName+'：'+params[0].value+'%';
                }else{
                    return titleNian2[yearIndex]+'-'+monthIndex+'-'+(params[0].dataIndex+1>9?params[0].dataIndex+1:'0'+(params[0].dataIndex+1))+'<br>'+params[0].seriesName+'：'+params[0].value+'<br>'+params[1].seriesName+'：'+params[1].value;
                }
            }
        },
        xAxis: {
            //name:'日期',
            type: 'category',
            data: dayArray,
            axisLabel:{
                interval:0
            }
        },
        series: series
    });

}



function zichanmingxizichanxinxiAction(){

    //构造资产明细数据
    //数据资产统计
    var shujuzichantongjidata = creatzichanmingxiAllData([[2892*0.98,2892*1.02],[1051*0.98,1051*1.02]]);
    //console.log(shujuzichantongjidata);
    var shebeizichantongjidata = creatzichanmingxiAllData([[39,42],[37,40]]);
    //console.log(shebeizichantongjidata);
    var yijierushebeiguzhanglvdata = creatzichanmingxiAllData([[0,3],[0,3]],1);
    //console.log(yijierushebeiguzhanglvdata);

    changeshujuzichantongjiData(shujuzichantongjidata[2]);

    //设备总数
    //$('.zcxx_a_left').children().eq(1).children().eq(0).children().children().eq(1).html(shebeizichantongjidata[0][0][(new Date()).getMonth()][0][(new Date()).getDate()-1]+'台');
    ////在线
    //$('.zcxx_a_left').children().eq(1).children().eq(1).children().eq(0).children().eq(0).html(shebeizichantongjidata[0][0][(new Date()).getMonth()][1][(new Date()).getDate()-1]+'台');
    ////离线
    //$('.zcxx_a_left').children().eq(1).children().eq(1).children().eq(0).children().eq(1).html(shebeizichantongjidata[0][0][(new Date()).getMonth()][0][(new Date()).getDate()-1]-shebeizichantongjidata[0][0][(new Date()).getMonth()][1][(new Date()).getDate()-1]+'台');

    //设备总数
    var dataTodyMonth1 = [];
    var dataTodyMonth2 = [];
    dataTodyMonth1 = [18,18,18,18,18,18,18,18,18,18,18,18,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20];
    dataTodyMonth2 = [16,17,17,17,18,17,18,17,18,16,16,17,18,19,15,19,18,20,19,19,18,20,18,19,20,18,19,18,20,20];

    var array = [24,23,22,24,24,24,23,23,22,22,22,24,23,23,23,23,24,22,24,23,23,22,22,22,24,24,24,23,24,23,22];
    for(var i = 0;i<dataTodyMonth1.length;i++){
        if(i<(new Date()).getDate()){
            dataTodyMonth1.splice(i,1,24);
            dataTodyMonth2.splice(i,1,array[i]);
        }else{
            dataTodyMonth1.splice(i,1,'');
            dataTodyMonth2.splice(i,1,'');
        }
    }
    $('.zcxx_b_left_a').html(dataTodyMonth1[(new Date()).getDate()-1]+'台');
    //在线
    $('.zcxx_b_left_b').eq(0).html(dataTodyMonth2[(new Date()).getDate()-1]+'台');
    //离线
    $('.zcxx_b_left_b').eq(1).html(dataTodyMonth1[(new Date()).getDate()-1]-dataTodyMonth2[(new Date()).getDate()-1]+'台');


    //数据资产统计
    tongjitiaoshuEchartsLine();
    //设备资产统计
    jierushebeishuliangtongjiEchartsLine();
    //已接入设备故障率
    yijierushebeiguzhanglvtongjiEchartsLine();



    var yearIndex1 = ((new Date()).getMonth() == 0?1:0);
    var monthIndex1 = ((new Date()).getMonth() == 0?12:(new Date()).getMonth());
    var yearIndex2 = ((new Date()).getMonth() == 0?1:0);
    var monthIndex2 = ((new Date()).getMonth() == 0?12:(new Date()).getMonth());
    var yearIndex3 = ((new Date()).getMonth() == 0?1:0);
    var monthIndex3 = ((new Date()).getMonth() == 0?12:(new Date()).getMonth());
    var yearIndex4 = 0;
    var monthIndex4 = 13;
    var titleNian = [(new Date()).getFullYear()+'年',(new Date()).getFullYear()-1+'年',(new Date()).getFullYear()-2+'年'];
    var titleYue = ['全年','12月','11月','10月','9月','8月','7月','6月','5月','4月','3月','2月','1月'];



    //设备资产数据
    var data2 = [];
    var data22 = [];
    data2 = [20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,24,24,24,24,24,24,24,24,24,24,24];
    data22 = [18,19,19,18,19,20,19,19,18,20,20,19,18,19,18,20,20,19,18,18,24,23,23,23,24,23,22,22,24,22,23];

    //默认事件

    var yearName = ((new Date()).getMonth() == 0?(new Date()).getFullYear()-1:(new Date()).getFullYear())+'年';
    var monthName = ((new Date()).getMonth() == 0?12:(new Date()).getMonth())+'月';

    $(".zcxx_a .nian_a").children().first().html(yearName);
    $(".zcxx_a .yue_a").children().first().html(monthName);
    monthIndex1 = changeMonth(yearIndex1,monthIndex1,13,$(".zcxx_a .yue_a"),$(".zcxx_a .yue_b"));
    shihuanjingbaohujuYearAndMonth(tongjitiaoshuCharts, ['',''],yearIndex1,monthIndex1,shujuzichantongjidata[yearIndex1][0][monthIndex1-1]);

    $(".zcxx_b .nian_a").children().first().html(yearName);
    $(".zcxx_b .yue_a").children().first().html(monthName);
    monthIndex2 = changeMonth(yearIndex2,monthIndex2,12,$(".zcxx_b .yue_a"),$(".zcxx_b .yue_b"));
    shihuanjingbaohujuYearAndMonth(jierushebeishuliangtongjiCharts, ['',''],yearIndex2,monthIndex2,[data2,data22]);

    $(".zcxx_c .nian_a").children().first().html(yearName);
    $(".zcxx_c .yue_a").children().first().html(monthName);
    monthIndex3 = changeMonth(yearIndex3,monthIndex3,12,$(".zcxx_c .yue_a"),$(".zcxx_c .yue_b"));
    shihuanjingbaohujuYearAndMonth(yijierushebeiguzhanglvtongjiCharts, [''],yearIndex3,monthIndex3,yijierushebeiguzhanglvdata[yearIndex3][0][monthIndex3-1]);



    //数据资产统计
    /*
    $(".zcxx_a .nian_a").mouseover(function(){
        $(".zcxx_a .nian_b").show();
        $(".zcxx_a .nian_a_right>a>img").toggle();
    });
    $(".zcxx_a .nian_a").mouseout(function(){
        $(".zcxx_a .nian_b").hide();
        $(".zcxx_a .nian_a_right>a>img").toggle();
    });
    $(".zcxx_a .nian_b").mouseover(function(){
        $(this).show();
    });
    $(".zcxx_a .nian_b").mouseout(function(){
        $(this).hide();
    });

    */

    $(".zcxx_a .yue_a").mouseover(function(){
        $(".zcxx_a .yue_b").show();
        $(".zcxx_a .yue_a_right>a>img").toggle();
    });
    $(".zcxx_a .yue_a").mouseout(function(){
        $(".zcxx_a .yue_b").hide();
        $(".zcxx_a .yue_a_right>a>img").toggle();
    });
    $(".zcxx_a .yue_b").mouseover(function(){
        $(this).show();
    });
    $(".zcxx_a .yue_b").mouseout(function(){
        $(this).hide();
    });

    /*
    $(".zcxx_a .nian_b").children().children().click(function(){

        yearIndex1 = $(this).prevAll().length;
        console.log(yearIndex1);

        monthIndex1 = changeMonth(yearIndex1,monthIndex1,13,$(".zcxx_a .yue_a"),$(".zcxx_a .yue_b"));

        $(this).css({
            backgroundColor:'rgb(41,52,68)'
        });

        $(this).siblings().css({
            backgroundColor:'rgba(0,0,0,0)'
        });

        $(".zcxx_a .nian_a").children().first().html(titleNian[yearIndex1]);
        $(".zcxx_a .nian_b").hide();

        if(monthIndex1 == 13){
            shihuanjingbaohujuYear(tongjitiaoshuCharts,['',''],titleNian[yearIndex1],shujuzichantongjidata[yearIndex1][1]);
        }else{
            shihuanjingbaohujuYearAndMonth(tongjitiaoshuCharts, ['',''],yearIndex1,monthIndex1,shujuzichantongjidata[yearIndex1][0][monthIndex1-1]);
        }

    });

    */
    $(".zcxx_a .yue_b").children().children().click(function(){
        monthIndex1 = 13-$(this).prevAll().length;
        console.log(monthIndex1);

        $(this).css({
            backgroundColor:'rgb(41,52,68)'
        });

        $(this).siblings().css({
            backgroundColor:'rgba(0,0,0,0)'
        });

        $(".zcxx_a .yue_a").children().first().html([titleYue[$(this).prevAll().length]]);
        $(".zcxx_a .yue_b").hide();

        if(monthIndex1 == 13){
            shihuanjingbaohujuYear(tongjitiaoshuCharts,['',''],titleNian[yearIndex1],shujuzichantongjidata[yearIndex1][1]);
        }else{
            shihuanjingbaohujuYearAndMonth(tongjitiaoshuCharts, ['',''],yearIndex1,monthIndex1,shujuzichantongjidata[yearIndex1][0][monthIndex1-1]);
        }
    });



    //设备资产统计
    /*
    $(".zcxx_b .nian_a").mouseover(function(){
        $(".zcxx_b .nian_b").show();
        $(".zcxx_b .nian_a_right>a>img").toggle();
    });
    $(".zcxx_b .nian_a").mouseout(function(){
        $(".zcxx_b .nian_b").hide();
        $(".zcxx_b .nian_a_right>a>img").toggle();
    });
    $(".zcxx_b .nian_b").mouseover(function(){
        $(this).show();
    });
    $(".zcxx_b .nian_b").mouseout(function(){
        $(this).hide();
    });
    */
    $(".zcxx_b .yue_a").mouseover(function(){
        $(".zcxx_b .yue_b").show();
        $(".zcxx_b .yue_a_right>a>img").toggle();
    });
    $(".zcxx_b .yue_a").mouseout(function(){
        $(".zcxx_b .yue_b").hide();
        $(".zcxx_b .yue_a_right>a>img").toggle();
    });
    $(".zcxx_b .yue_b").mouseover(function(){
        $(this).show();
    });
    $(".zcxx_b .yue_b").mouseout(function(){
        $(this).hide();
    });

    /*
    $(".zcxx_b .nian_b").children().children().click(function(){

        yearIndex2 = $(this).prevAll().length;
        console.log(yearIndex2);

        monthIndex2 = changeMonth(yearIndex2,monthIndex2,12,$(".zcxx_b .yue_a"),$(".zcxx_b .yue_b"));

        $(this).css({
            backgroundColor:'rgb(41,52,68)'
        });

        $(this).siblings().css({
            backgroundColor:'rgba(0,0,0,0)'
        });

        $(".zcxx_b .nian_a").children().first().html(titleNian[yearIndex2]);
        $(".zcxx_b .nian_b").hide();

        if(monthIndex2 == 13){
            shihuanjingbaohujuYear(jierushebeishuliangtongjiCharts,['',''],titleNian[yearIndex2],shebeizichantongjidata[yearIndex2][1]);
        }else{
            shihuanjingbaohujuYearAndMonth(jierushebeishuliangtongjiCharts, ['',''],yearIndex2,monthIndex2,shebeizichantongjidata[yearIndex2][0][monthIndex2-1]);
        }

    });
    */
    $(".zcxx_b .yue_b").children().children().click(function(){
        monthIndex2 = 12-$(this).prevAll().length;
        console.log(monthIndex2);

        $(this).css({
            backgroundColor:'rgb(41,52,68)'
        });

        $(this).siblings().css({
            backgroundColor:'rgba(0,0,0,0)'
        });

        $(".zcxx_b .yue_a").children().first().html([titleYue[$(this).prevAll().length+1]]);
        $(".zcxx_b .yue_b").hide();

        //var data2 = [];
        //var data22 = [];
        if(monthIndex2 == 8){
            data2 = [12,12,12,12,13,13,13,13,13,14,14,14,14,15,15,15,15,16,16,16,17,17,17,17,17,17,18,18,18,18,18];
            data22 = [10,11,10,12,13,12,12,13,13,14,12,13,13,13,15,15,14,15,15,16,16,16,17,17,15,17,16,17,18,18,17];
        }else if(monthIndex2 == 9){
            data2 = [18,18,18,18,18,18,18,18,18,18,18,18,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20];
            data22 = [16,17,17,17,18,17,18,17,18,16,16,17,18,19,15,19,18,20,19,19,18,20,18,19,20,18,19,18,20,20];
        }else if(monthIndex2 == 10){
            data2 = [20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,24,24,24,24,24,24,24,24,24,24,24];
            data22 = [18,19,19,18,19,20,19,19,18,20,20,19,18,19,18,20,20,19,18,18,24,23,23,23,24,23,22,22,24,22,23];
        }else if(monthIndex2 == 11){
            data2 = [18,18,18,18,18,18,18,18,18,18,18,18,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20];
            data22 = [16,17,17,17,18,17,18,17,18,16,16,17,18,19,15,19,18,20,19,19,18,20,18,19,20,18,19,18,20,20];

            var array = [24,23,22,24,24,24,23,23,22,22,22,24,23,23,23,23,24,22,24,23,23,22,22,22,24,24,24,23,24,23,22];
            for(var i = 0;i<data2.length;i++){
                if(i<(new Date()).getDate()){
                    data2.splice(i,1,24);
                    data22.splice(i,1,array[i]);
                }else{
                    data2.splice(i,1,'');
                    data22.splice(i,1,'');
                }
            }
        }

        shebeizichantongjidata[yearIndex2][0][monthIndex2-1] = [data2,data22];

        if(monthIndex2 == 13){
            shihuanjingbaohujuYear(jierushebeishuliangtongjiCharts,['',''],titleNian[yearIndex2],shebeizichantongjidata[yearIndex2][1]);
        }else{
            shihuanjingbaohujuYearAndMonth(jierushebeishuliangtongjiCharts, ['',''],yearIndex2,monthIndex2,shebeizichantongjidata[yearIndex2][0][monthIndex2-1]);
        }
    });


    //已接入设备故障率
    /*
    $(".zcxx_c .nian_a").mouseover(function(){
        $(".zcxx_c .nian_b").show();
        $(".zcxx_c .nian_a_right>a>img").toggle();
    });
    $(".zcxx_c .nian_a").mouseout(function(){
        $(".zcxx_c .nian_b").hide();
        $(".zcxx_c .nian_a_right>a>img").toggle();
    });
    $(".zcxx_c .nian_b").mouseover(function(){
        $(this).show();
    });
    $(".zcxx_c .nian_b").mouseout(function(){
        $(this).hide();
    });
    */
    $(".zcxx_c .yue_a").mouseover(function(){
        $(".zcxx_c .yue_b").show();
        $(".zcxx_c .yue_a_right>a>img").toggle();
    });
    $(".zcxx_c .yue_a").mouseout(function(){
        $(".zcxx_c .yue_b").hide();
        $(".zcxx_c .yue_a_right>a>img").toggle();
    });
    $(".zcxx_c .yue_b").mouseover(function(){
        $(this).show();
    });
    $(".zcxx_c .yue_b").mouseout(function(){
        $(this).hide();
    });
    /*
    $(".zcxx_c .nian_b").children().children().click(function(){

        yearIndex3 = $(this).prevAll().length;
        console.log(yearIndex3);

        //if(yearIndex3 == 0){
        //    for(var i = 0;i<12-(new Date()).getMonth()-1;i++){
        //        $(".zcxx_c .yue_b").children().children().eq(i).hide();
        //    }
        //
        //    if(monthIndex3>(new Date()).getMonth()+1){
        //        $(".zcxx_c .yue_a").children().first().html(titleYue[12-(new Date()).getMonth()]);
        //        monthIndex3 = (new Date()).getMonth()+1;
        //        $(".zcxx_c .yue_b").children().children().eq(12-monthIndex3).css({
        //            backgroundColor:'rgb(41,52,68)'
        //        });
        //
        //        $(".zcxx_c .yue_b").children().children().eq(12-monthIndex3).siblings().css({
        //            backgroundColor:'rgba(0,0,0,0)'
        //        });
        //    }
        //
        //}else{
        //    for(var i = 0;i<12-(new Date()).getMonth()-1;i++){
        //        $(".zcxx_c .yue_b").children().children().eq(i).show();
        //    }
        //}

        monthIndex3 = changeMonth(yearIndex3,monthIndex3,12,$(".zcxx_c .yue_a"),$(".zcxx_c .yue_b"));

        $(this).css({
            backgroundColor:'rgb(41,52,68)'
        });

        $(this).siblings().css({
            backgroundColor:'rgba(0,0,0,0)'
        });

        $(".zcxx_c .nian_a").children().first().html(titleNian[yearIndex3]);
        $(".zcxx_c .nian_b").hide();

        if(monthIndex3 == 13){
            shihuanjingbaohujuYear(yijierushebeiguzhanglvtongjiCharts,[''],titleNian[yearIndex3],titleNian[yearIndex3]);
        }else{
            shihuanjingbaohujuYearAndMonth(yijierushebeiguzhanglvtongjiCharts, [''],yearIndex3,monthIndex3,yijierushebeiguzhanglvdata[yearIndex3][0][monthIndex3-1]);
        }

    });
    */
    $(".zcxx_c .yue_b").children().children().click(function(){
        monthIndex3 = 12-$(this).prevAll().length;
        console.log(monthIndex3);

        $(this).css({
            backgroundColor:'rgb(41,52,68)'
        });

        $(this).siblings().css({
            backgroundColor:'rgba(0,0,0,0)'
        });

        $(".zcxx_c .yue_a").children().first().html([titleYue[$(this).prevAll().length+1]]);
        $(".zcxx_c .yue_b").hide();

        if(monthIndex3 == 13){
            shihuanjingbaohujuYear(yijierushebeiguzhanglvtongjiCharts,[''],titleNian[yearIndex3]);
        }else{
            shihuanjingbaohujuYearAndMonth(yijierushebeiguzhanglvtongjiCharts, [''],yearIndex3,monthIndex3,yijierushebeiguzhanglvdata[yearIndex3][0][monthIndex3-1]);
        }
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

    if(totle == 12){
        delectMonth(totle,8,monthB);
    }else{
        delectMonth(totle,8,monthB);
    }

    //console.log('monthIndex = '+monthIndex);
    return monthIndex;

}

function delectMonth(index1,index2,monthB){
    for(var i = 0; i< index1;i++){
        if(i>index1-index2){
            monthB.children().children().eq(i).hide();
        }
    }
}


function zichanmingxiGaojinxinxiAction(){

    //资产明细---告警信息
    gaojintongjiEchartsLine();

    var geleigaojingcishudata = creatzichanmingxiAllData([[0,5],[0,3]],2);



    var yearIndex4 = ((new Date()).getMonth() == 0?1:0);
    var monthIndex4 = ((new Date()).getMonth() == 0?12:(new Date()).getMonth());

    var titleNian = [(new Date()).getFullYear()+'年',(new Date()).getFullYear()-1+'年',(new Date()).getFullYear()-2+'年'];
    var titleYue = ['全年','12月','11月','10月','9月','8月','7月','6月','5月','4月','3月','2月','1月'];



    //默认事件
    var data4 = [];
    var data44 = [];
    data4 = [0,1,0,0,0,1,0,1,0,0,1,0,0,0,0,0,1,0,1,0,0,0,2,0,0,0,0,0,1,0,0];
    data44 = [0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];

    var yearName = ((new Date()).getMonth() == 0?(new Date()).getFullYear()-1:(new Date()).getFullYear())+'年';
    var monthName = ((new Date()).getMonth() == 0?12:(new Date()).getMonth())+'月';

    $(".gjxx .nian_a").children().first().html(yearName);
    $(".gjxx .yue_a").children().first().html(monthName);
    monthIndex4 = changeMonth(yearIndex4,monthIndex4,13,$(".gjxx .yue_a"),$(".gjxx .yue_b"));
    shihuanjingbaohujuYearAndMonth1(gaojintongjiChart, ['',''],yearIndex4,monthIndex4,[data4,data44]);


    /*
    $(".gjxx .nian_a").mouseover(function(){
        $(".gjxx .nian_b").show();
        $(".gjxx .nian_a_right>a>img").toggle();
    });
    $(".gjxx .nian_a").mouseout(function(){
        $(".gjxx .nian_b").hide();
        $(".gjxx .nian_a_right>a>img").toggle();
    });
    $(".gjxx .nian_b").mouseover(function(){
        $(this).show();
    });
    $(".gjxx .nian_b").mouseout(function(){
        $(this).hide();
    });
    */
    $(".gjxx .yue_a").mouseover(function(){
        $(".gjxx .yue_b").show();
        $(".gjxx .yue_a_right>a>img").toggle();
    });
    $(".gjxx .yue_a").mouseout(function(){
        $(".gjxx .yue_b").hide();
        $(".gjxx .yue_a_right>a>img").toggle();
    });
    $(".gjxx .yue_b").mouseover(function(){
        $(this).show();
    });
    $(".gjxx .yue_b").mouseout(function(){
        $(this).hide();
    });

    /*
    $(".gjxx .nian_b").children().children().click(function(){

        yearIndex4 = $(this).prevAll().length;
        console.log(yearIndex4);

        monthIndex4 = changeMonth(yearIndex4,monthIndex4,13,$(".gjxx .yue_a"),$(".gjxx .yue_b"));

        $(this).css({
            backgroundColor:'rgb(41,52,68)'
        });

        $(this).siblings().css({
            backgroundColor:'rgba(0,0,0,0)'
        });

        $(".gjxx .nian_a").children().first().html(titleNian[yearIndex4]);
        $(".gjxx .nian_b").hide();

        if(monthIndex4 == 13){
            shihuanjingbaohujuYear(gaojintongjiChart,['',''],titleNian[yearIndex4],geleigaojingcishudata[yearIndex4][1]);
        }else{
            shihuanjingbaohujuYearAndMonth(gaojintongjiChart, ['',''],yearIndex4,monthIndex4,geleigaojingcishudata[yearIndex4][0][monthIndex4-1]);
        }

    });
    */
    $(".gjxx .yue_b").children().children().click(function(){
        monthIndex4 = 13-$(this).prevAll().length;
        console.log(monthIndex4);

        $(this).css({
            backgroundColor:'rgb(41,52,68)'
        });

        $(this).siblings().css({
            backgroundColor:'rgba(0,0,0,0)'
        });

        $(".gjxx .yue_a").children().first().html([titleYue[$(this).prevAll().length]]);
        $(".gjxx .yue_b").hide();

        if(monthIndex4 == 13){
            data4 = ['','','','','','','',7,11,9,'',''];
            data44 = ['','','','','','','',1,2,1,'',''];
            geleigaojingcishudata[yearIndex4][1] = [['',''],['',''],['',''],['',''],['',''],['',''],['',''],[7,1],[11,2],[9,1],['',''],['','']];
            shihuanjingbaohujuYear1(gaojintongjiChart,['',''],titleNian[yearIndex4],geleigaojingcishudata[yearIndex4][1]);
        }else{
            if(monthIndex4 == 8){
                data4 = [0,0,0,1,0,0,0,1,0,1,0,0,0,0,2,0,1,0,0,0,0,0,0,0,0,0,1,0,0,0,0];
                data44 = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0];
            }else if(monthIndex4 == 9){
                data4 = [0,0,1,0,0,1,0,1,0,0,1,0,0,1,0,0,1,0,1,0,2,0,0,0,1,0,0,0,0,1];
                data44 = [0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0];
            }else if(monthIndex4 == 10){
                data4 = [0,1,0,0,0,1,0,1,0,0,1,0,0,0,0,0,1,0,1,0,0,0,2,0,0,0,0,0,1,0,0];
                data44 = [0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
            }else if(monthIndex4 == 11){
                data4 = [0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
                data44 = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];

                for(var i = 0;i<data4.length;i++){
                    if(i<(new Date()).getDate()){
                        //data4.splice(i,1,24);
                        //data44.splice(i,1,24-Math.round(Math.random*3));
                    }else{
                        data4.splice(i,1,'');
                        data44.splice(i,1,'');
                    }
                }
            }

            geleigaojingcishudata[yearIndex4][0][monthIndex4-1] = [data4,data44];
            shihuanjingbaohujuYearAndMonth1(gaojintongjiChart, ['',''],yearIndex4,monthIndex4,geleigaojingcishudata[yearIndex4][0][monthIndex4-1]);
        }
    });

}


function creatzichanmingxiAllData(data,type){
    //数据资产统计
    var month1 = [];
    var month2 = [];
    var counts1 = 0;
    var counts2 = 0;
    for(var i = 0;i < 12;i++){
        var day = (new Date(2015,i+1,0)).getDate();
        var data1 = [];
        var data2 = [];
        var monthCounts1 = 0;
        var monthCounts2 = 0;
        for(var j = 0;j<day;j++){
            var temp = selectNumAction(data[0],data[1],type);
            data1.push(temp[0]);
            data2.push(temp[1]);
            monthCounts1 += temp[0];
            monthCounts2 += temp[1];
            counts1 += temp[0];
            counts2 += temp[1];
        }
        month1.push([data1,data2]);
        month2.push([monthCounts1,monthCounts2]);
    }

    var month11 = [];
    var month12 = [];
    for(var i = 0;i < 12;i++){
        if(i<(new Date()).getMonth()){
            var day = (new Date(2016,i+1,0)).getDate();
            var data1 = [];
            var data2 = [];
            var monthCounts1 = 0;
            var monthCounts2 = 0;
            for(var j = 0;j<day;j++){
                var temp = selectNumAction(data[0],data[1],type);
                data1.push(temp[0]);
                data2.push(temp[1]);
                monthCounts1 += temp[0];
                monthCounts2 += temp[1];
                counts1 += temp[0];
                counts2 += temp[1];
            }
            month11.push([data1,data2]);
            month12.push([monthCounts1,monthCounts2]);
        }else if(i == (new Date()).getMonth()){
            var day = (new Date(2016,i+1,0)).getDate();
            var data1 = [];
            var data2 = [];
            var monthCounts1 = 0;
            var monthCounts2 = 0;
            for(var j = 0;j<day;j++){
                if(j<(new Date()).getDate()){
                    var temp = selectNumAction(data[0],data[1],type);

                    if(j == (new Date()).getDate()-1 && type == 2){
                        temp = [4,1];
                    }
                    data1.push(temp[0]);
                    data2.push(temp[1]);
                    monthCounts1 += temp[0];
                    monthCounts2 += temp[1];
                    counts1 += temp[0];
                    counts2 += temp[1];
                }else{
                    data1.push('');
                    data2.push('');
                }
            }
            month11.push([data1,data2]);
            //month12.push([monthCounts1,monthCounts2]);

            //month11.push(['','']);
            month12.push(['','']);
        }else{
            month11.push(['','']);
            month12.push(['','']);
        }
    }

    return [[month11,month12],[month1,month2],[counts1,counts2]];

}

function selectNumAction(data1,data2,type){
    var num1 = -1;
    var num2 = -1;
    if(type == 1){
        while(num1<data1[0]||num1>data1[1]){
            num1 = (Math.random()*data1[1]).toFixed(2);
        }
        while(num2<data2[0]||num2>data2[1]){
            num2 = (Math.random()*data2[1]).toFixed(2);
        }
    }else{
        while(num1<data1[0]||num1>data1[1]){
            num1 = Math.round(Math.random()*data1[1]);
        }
        while(num2<data2[0]||num2>data2[1]){
            num2 = Math.round(Math.random()*data2[1]);
        }
    }
    //console.log('num1='+num1+' num2='+num2);



    return [num1,num2].sort(sortNumber).reverse();
}

function sortNumber(a,b)
{
    return a - b
}

//加载数据资产文本数据
function changeshujuzichantongjiData(data){

    //数据总节数
    $('.zcxx_a_left').eq(0).children().children().eq(0).children().eq(0).children().eq(1).html('67.7MB');
    //数据总条数
    $('.zcxx_a_left').eq(0).children().children().eq(0).children().eq(1).children().eq(1).html('354995');
    //空气质量
    $('.zcxx_a_left').eq(0).children().children().eq(1).children().eq(0).children().eq(0).html('260361');
    //水质状态
    $('.zcxx_a_left').eq(0).children().children().eq(1).children().eq(0).children().eq(1).html('94634');
    ////数据总条数
    //$('.zcxx_a_left').eq(0).children().children().eq(0).children().eq(1).children().eq(1).html(data[0]+data[1]);
    ////空气质量
    //$('.zcxx_a_left').eq(0).children().children().eq(1).children().eq(0).children().eq(0).html(data[0]);
    ////水质状态
    //$('.zcxx_a_left').eq(0).children().children().eq(1).children().eq(0).children().eq(1).html(data[1]);

}


function shihuanjingbaohujuYear1(echarts,seriesData,year,Data){

    var series = [];
    for(var i = 0;i<seriesData.length;i++){

        var datayue = [];
        for(var j = 0; j<12;j++){
            if(Data){
                datayue.push(Data[j][i]);
            }else{
                datayue.push((Math.round(Math.random()*80)));
            }
            if(j<8){
                datayue.splice(j-1,1,'');
            }

        }

        series.push(
            {
                //name:'按用户查看',
                type:'bar',
                data:datayue
            }
        );
    }

    echarts.setOption({
        tooltip:{
            formatter:function(params){
                if(params.length == 1){
                    return year.split('年')[0]+'-'+(params[0].dataIndex+1>9?params[0].dataIndex+1:'0'+(params[0].dataIndex+1))+'<br>'+params[0].seriesName+'：'+params[0].value+'%';
                }else{
                    return year.split('年')[0]+'-'+(params[0].dataIndex+1>9?params[0].dataIndex+1:'0'+(params[0].dataIndex+1))+'<br>'+params[0].seriesName+'：'+params[0].value+'<br>'+params[1].seriesName+'：'+params[1].value;
                }
            }
        },
        xAxis: {
            name:'日期\n\n',
            type: 'category',
            data: ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月']
        },
        series: series
    });

}

function shihuanjingbaohujuYearAndMonth1(echarts, seriesData,yearIndex,monthIndex,Data){

    var titleNian2 = [(new Date()).getFullYear(),(new Date()).getFullYear()-1,(new Date()).getFullYear()-2];
    //var titleYue2 = [0,12,11,10,9,8,7,6,5,4,3,2,1];
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

    var series = [];
    for(var i = 0;i<seriesData.length;i++){

        var data = [];

        for(var j = 0; j<dayArray.length;j++){
            if((new Date()).getDate()<=day && yearIndex == 0 && monthIndex == (new Date()).getMonth()+1){
                if(j<(new Date()).getDate()){
                    data.push(Math.round(Math.random()*50));
                }else{
                    data.push('');
                }
            }else{
                data.push(Math.round(Math.random()*50));
            }
        }

        if(Data){
            data = Data[i];
        }

        series.push(
            {
                //name:'按用户查看',
                type:'bar',
                data:data
            }
        );
    }


    echarts.setOption({
        tooltip:{
            formatter:function(params){

                if(params.length == 1){
                    return titleNian2[yearIndex]+'-'+monthIndex+'-'+(params[0].dataIndex+1>9?params[0].dataIndex+1:'0'+(params[0].dataIndex+1))+'<br>'+params[0].seriesName+'：'+params[0].value+'%';
                }else{
                    return titleNian2[yearIndex]+'-'+monthIndex+'-'+(params[0].dataIndex+1>9?params[0].dataIndex+1:'0'+(params[0].dataIndex+1))+'<br>'+params[0].seriesName+'：'+params[0].value+'<br>'+params[1].seriesName+'：'+params[1].value;
                }
            }
        },
        xAxis: {
            //name:'日期',
            type: 'category',
            data: dayArray,
            axisLabel:{
                interval:0
            }
        },
        series: series
    });

}