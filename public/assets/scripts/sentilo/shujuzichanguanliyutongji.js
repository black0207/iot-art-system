/**
 * Created by dongxin on 2016-10-24.
 */

var monthIndex = (new Date()).getMonth();
var yearIndex = (new Date()).getMonth()==0?1:0;

var jiegouhuaIndex = 0;

(function initShujuzichanguanliyutongji(){

    $(document).ready(function(){

        //结构化与非结构化默认颜色展示
        $(".sjzctj_a_right_a_left_jgh").children().css('color','#00a2ff');

        shujucunchuxingshifenleitongjiLine();
        shujucunchuxingshifenleitongjiLine02();
        shujuzichanguanliyutongjiAction();

    });

})();























function shujuzichanguanliyutongjiAction(){
    var titleNian = ['2016年','2015年','2014年'];
    var titleYue = ['全年','12月','11月','10月','9月','8月','7月','6月','5月','4月','3月','2月','1月'];

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

    //默认点击
    $('.zctj_left_top_b').children().first().children().first().css({
        backgroundColor:'rgb(41,52,68)'
    });

    $(".yue_a").children().eq(0).html((monthIndex>9?monthIndex:'0'+monthIndex)+'月');
    $(".nain_a").children().eq(0).html(titleNian[yearIndex]);
    monthIndex = changeMonth(yearIndex,monthIndex,13,$(".yue_a"),$(".yue_b"));

    var shujucunchuxingshiData = creatzichanmingxiAllData([[34200*0.99,34200*1.01],[1051*0.98,1051*1.02]]);

    if(monthIndex == 13){
        changeLineYear('结构化','条',shujucunchuxingshifenleiCharts,titleYue[monthIndex],shujucunchuxingshiData[yearIndex][1][0]);
    }else{
        changeLineYearAndmonth('结构化','条',shujucunchuxingshifenleiCharts,titleYue[monthIndex],shujucunchuxingshiData[yearIndex][0][monthIndex-1][0]);
    }

    //告警统计分析按钮事件
    $('.zctj_left_top_b').children().first().children().click(function(){

        //var rgb = $(this).css('backgroundColor');
        $(this).css({
            backgroundColor:'rgb(41,52,68)'
        });

        $(this).siblings().css('backgroundColor','rgb(0,0,0)');

        console.log($(this).prevAll().length);

        //GaojingtongjifenxiData();

    });


    /*

    //年份筛选
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

    //var titleNian = ['2016年','2015年','2014年'];
    var titleNian2 = [2016,2015,2014];

    $('.nian_b').children().children().click(function(){
        $(this).css({
            backgroundColor:'rgb(41,52,68)'
        });

        $(this).siblings().css({
            backgroundColor:'rgba(0,0,0,0)'
        });


        yearIndex = $(this).prevAll().length;

        monthIndex = changeMonth(yearIndex,monthIndex,13,$(".yue_a"),$(".yue_b"));

        //if(yearIndex == 0){
        //    var month = 12-(new Date()).getMonth()-1;
        //    monthIndex = (new Date()).getMonth()+1;
        //    for(var i = 0;i<month;i++){
        //        $('.yue_b').children().children().eq(i).hide();
        //    }
        //    $('.yue_a').children().first().html(monthIndex+'月');
        //}else{
        //    $('.yue_b').children().children().show();
        //}

        //if(monthIndex == 0){
        //    changeLineYear(shujucunchuxingshifenleiCharts,titleNian[$(this).prevAll().length]);
        //}else{
        //    changeLineYearAndmonth(shujucunchuxingshifenleiCharts,titleNian[$(this).prevAll().length]);
        //}

        $('.nian_a').children().first().html(titleNian[$(this).prevAll().length]);
        $(".nian_b").hide();

        if(jiegouhuaIndex == 0){
            if(monthIndex == 13){
                changeLineYear('结构化','条',shujucunchuxingshifenleiCharts,titleYue[$(this).prevAll().length]);
            }else{
                changeLineYearAndmonth('结构化','条',shujucunchuxingshifenleiCharts,titleYue[$(this).prevAll().length]);
            }
        }else{
            if(monthIndex == 13){
                changeLineYear('非结构化','GB',shujucunchuxingshifenleiCharts02,titleYue[$(this).prevAll().length]);
            }else{
                changeLineYearAndmonth('非结构化','GB',shujucunchuxingshifenleiCharts02,titleYue[$(this).prevAll().length]);
            }
        }


    });

    */

    //月份筛选
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

    //var titleYue = ['全年','12月','11月','10月','9月','8月','7月','6月','5月','4月','3月','2月','1月'];
    $('.yue_b').children().children().click(function(){
        $(this).css({
            backgroundColor:'rgb(41,52,68)'
        });

        $(this).siblings().css({
            backgroundColor:'rgba(0,0,0,0)'
        });

        $('.yue_a').children().first().html([titleYue[$(this).prevAll().length]]);
        $(".yue_b").hide();
        monthIndex = 13-$(this).prevAll().length;

        //if(monthIndex == 0){
        //    changeLineYear(shujucunchuxingshifenleiCharts,titleNian[$(this).prevAll().length])
        //}else{
        //    changeLineYearAndmonth(shujucunchuxingshifenleiCharts,titleNian[yearIndex]);
        //}

        if(jiegouhuaIndex == 0){
            //if(monthIndex == 13){
            //    changeLineYear('结构化','条',shujucunchuxingshifenleiCharts,titleYue[$(this).prevAll().length]);
            //}else{
            //    changeLineYearAndmonth('结构化','条',shujucunchuxingshifenleiCharts,titleYue[$(this).prevAll().length]);
            //}
            if(monthIndex == 13){
                changeLineYear('结构化','条',shujucunchuxingshifenleiCharts,titleYue[monthIndex],shujucunchuxingshiData[yearIndex][1]);
            }else{
                changeLineYearAndmonth('结构化','条',shujucunchuxingshifenleiCharts,titleYue[monthIndex],shujucunchuxingshiData[yearIndex][0][monthIndex-1][0]);
            }
        }else{
            if(monthIndex == 13){
                changeLineYear('非结构化','GB',shujucunchuxingshifenleiCharts02,titleYue[$(this).prevAll().length]);
            }else{
                changeLineYearAndmonth('非结构化','GB',shujucunchuxingshifenleiCharts02,titleYue[$(this).prevAll().length]);
            }
        }
    });


    //结构化
    $(".sjzctj_a_right_a_left_jgh").mouseover(function(){
        $(".sjzctj_a_right_jgh").show();
        $(".sjzctj_a_right_fjgh").hide();
        $(this).children().css('color','#00a2ff');
        $(this).siblings().children().css('color','white');
        jiegouhuaIndex = 0;
        if(monthIndex == 13){
            changeLineYear('结构化','条',shujucunchuxingshifenleiCharts,titleYue[monthIndex]);
        }else{
            changeLineYearAndmonth('结构化','条',shujucunchuxingshifenleiCharts,titleYue[monthIndex]);
        }
    });


    //非结构化
    $(".sjzctj_a_right_a_left_fjgh").mouseover(function(){
        $(".sjzctj_a_right_fjgh").show();
        $(".sjzctj_a_right_jgh").hide();
        $(this).children().css('color','#00a2ff');
        $(this).siblings().children().css('color','white');
        jiegouhuaIndex = 1;
        if(monthIndex == 13){
            changeLineYear('非结构化','GB',shujucunchuxingshifenleiCharts02,titleYue[monthIndex]);
        }else{
            changeLineYearAndmonth('非结构化','GB',shujucunchuxingshifenleiCharts02,titleYue[monthIndex]);
        }

    });
}

function changeLineYear(title01,title02,echarts,name,Data){

    var data = ['', '', '', '', '', '', '', Math.round(Math.random()*50), 29, 30, Math.round(Math.random()*50), 28];
    //var data = [28, 31, 32, 22, 13, Math.round(Math.random()*50), 26, 33, 29, 30, Math.round(Math.random()*50), 28];

    if(yearIndex == 0){
        for(var i = 0;i<data.length;i++){
            if(i<7){
                data.splice(i,1,'');
            }else if(i<(new Date()).getMonth()&&i>=7){
                data.splice(i,1,Data[i][0]);
            }else{
                data.splice(i,1,'');
            }
        }
    }

    echarts.setOption({
        tooltip: {
            formatter: function (params, ticket, callback) {

                return title01+'<br>'+params[0].name+'数据量：'+params[0].value+title02;
                //return title01+'<br>'+params[0].name+'数据量：'+params[0].value+title02;
            }
        },
        xAxis: {
            name:'日期\n\n',
            type: 'category',
            data: ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月']
        },
        yAxis:{
            min:600000
        },
        series: [
            {
                name:name,
                type:'line',
                data:data
            }
        ]
    });
}

function changeLineYearAndmonth(title01,title02,echarts,name,Data){

    var titleNian2 = [2016,2015,2014];
    var titleYue2 = [0,12,11,10,9,8,7,6,5,4,3,2,1];
    var dayArray = [];
    var day;

    day = new Date(titleNian2[yearIndex],titleYue2[monthIndex],0).getDate();
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
        data = Data;
    }

    echarts.setOption({
        tooltip: {
            formatter: function (params, ticket, callback) {

                return title01+'<br>'+name.split('月')[0]+'-'+((params[0].dataIndex+1)>9?(params[0].dataIndex+1):('0'+(params[0].dataIndex+1)))+'数据量：'+params[0].value+title02;
            }
        },
        xAxis: {
            name:'日期\n\n',
            type: 'category',
            data: dayArray
        },
        yAxis:{
          min:30000
        },
        series: [
            {
                name:name,
                type:'line',
                data:data
            }
        ]
    });
}


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