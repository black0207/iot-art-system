
var thirdIndex = 0;
var thirdChart;

function initHeatMap(data){

    // 基于准备好的dom，初始化echarts实例
    thirdChart = echarts.init(document.getElementById('gjkjfb'));
    // 指定图表的配置项和数据

    thirdChart.showLoading();
    var option = {};

    $.get('/assets/scripts/sentilo/fuzhou.json', function (geoJson) {

        thirdChart.hideLoading();

        echarts.registerMap('fuzhou', geoJson);
        //var geoCoordMap = {
        //    "仓山区":[119.320988,26.038912],
        //    "马尾区":[119.458725,25.991975],
        //    "闽侯县":[119.145117,26.148567],
        //    "晋安区":[119.328597,26.078837],
        //    "连江县":[119.538365,26.202109],
        //    "罗源县":[119.552645,26.487234],
        //    "永泰县":[118.939089,25.864825],
        //    "闽清县":[118.868416,26.223793],
        //    "平潭县":[119.791197,25.503672],
        //    "福清市":[119.376992,25.720402],
        //    "长乐市":[119.510849,25.960583],
        //    "台江区":[119.310156,26.058616],
        //    "鼓楼区":[119.29929,26.082284]
        //};
        var geoCoordMap = data[0];
        var convertData = function (data) {
            var res = [];
            for (var i = 0; i < data.length; i++) {
                var geoCoord = geoCoordMap[data[i].name];
                if (geoCoord) {
                    res.push(geoCoord.concat(data[i].value));
                }
            }
            return res;
        };

        option = {
            tooltip: {
                trigger: 'item',
                formatter: '{b}<br/>{c} (p / km2)'
            },
            visualMap: {
                min: 0,
                max: 50,
                splitNumber: 5,
                left:'center',
                top:'bottom',
                orient:'horizontal',
                textGap:20,
                itemGap:40,
                itemWidth:30,
                itemHeight:20,
                inverse:true,
                inRange: {
                    color: ['#d94e5d','#eac736','#50a3ba'].reverse()
                },
                textStyle: {
                    color: '#fff'
                },
                formatter: function (value, value2) {
                    if(value2 == 50){
                        return value+' 以上';
                    }
                return value + ' ~ ' + value2+' 次'; // 范围标签显示内容。
            }
            },
            geo: {
                map: 'fuzhou',
                label:{
                    normal:{
                        show: true,
                        textStyle:{color:'#ffffff',fontSize:18,fontWeight: 'bold'}},
                    emphasis:{
                        textStyle:{color:'#ffffff',fontSize:18,fontWeight: 'bold'}}
                },
                roam: true,
                itemStyle: {
                    normal: {
                        //areaColor: '#01202f',
                        //borderColor: 'rgb(65,170,249)',
                        //borderWidth:2,
                        //shadowColor: 'rgba(0, 0, 0, 0.8)',
                        //shadowBlur: 2000

                        areaColor: 'rgba(27,66,84,0.8)',
                        borderColor: 'rgb(65,170,249)',
                        borderWidth:2
                        //shadowColor: 'rgba(1, 32, 47, 0.8)',
                        //shadowBlur: 10000
                    }
                    ,
                    emphasis: {
                        areaColor: '#1b4254',
                        borderColor: '#338da8'
                    }
                },
                scaleLimit:{
                    min:0.6
                    //max:0.8
                }
            },
            series: [{
                name: 'AQI',
                type: 'heatmap',
                coordinateSystem: 'geo',
                //data: convertData([
                //    {name: "仓山区", value: 350104},
                //    {name: "马尾区", value: 350105},
                //    {name: "闽侯县", value: 350121},
                //    {name: "晋安区", value: 350111},
                //    {name: "连江县", value: 350122},
                //    {name: "罗源县", value: 350123},
                //    {name: "永泰县", value: 350125},
                //    {name: "闽清县", value: 350124},
                //    {name: "平潭县", value: 350128},
                //    {name: "福清市", value: 350181},
                //    {name: "长乐市", value: 350182},
                //    {name: "台江区", value: 350103},
                //    {name: "鼓楼区", value: 350102}
                //])
                data:data[1]
            }]
        };

        // 使用刚指定的配置项和数据显示图表。
        thirdChart.setOption(option);
    });

    $('#gjkjfb').append('<div class="jgkj">\
    <div class="jgkj_a">\
    <div class="jgkj_a_left">\
    温度警告\
    </div>\
    <div class="jgkj_a_right">\
    <a href="####" title=""><img src="/assets/img/sentilo/yxjk_b.png"/><img src="/assets/img/sentilo/yxjk_a.png" style=" display:none;"/></a>\
    </div>\
    </div>\
    <div class="jgkj_b" style="display:none;">\
    <ul>\
    <li><a href="####" title="">温度警告</a></li>\
    <li><a href="####" title="">水质警告</a></li>\
    <li><a href="####" title="">空气质量警告</a></li>\
    <li><a href="####" title="">噪音警告</a></li>\
    <li><a href="####" title="">边坡含水量警告</a></li>\
    </ul>\
    </div>\
    </div>');

    var titleArray = ['温度警告','水质警告','空气质量警告','噪音警告','边坡含水量警告'];

    $('.jgkj_b').children().first().children().eq(thirdIndex).css({
        backgroundColor:'rgb(41,52,68)'
    });

    $(".jgkj_a").mouseover(function(){
        $(".jgkj_b").show();
        $(".jgkj_a_right>a>img").toggle();
    });
    $(".jgkj_a").mouseout(function(){
        $(".jgkj_b").hide();
        $(".jgkj_a_right>a>img").toggle();
    });
    $(".jgkj_b").mouseover(function(){
        $(this).show();
    });
    $(".jgkj_b").mouseout(function(){
        $(this).hide();
    });

    //热力图按钮事件
    $('.jgkj_b').children().first().children().click(function(){

        //var rgb = $(this).css('backgroundColor');
        $(this).css({
            backgroundColor:'rgb(41,52,68)'
        });

        $(this).siblings().css('backgroundColor','rgb(0,0,0)');

        console.log($(this).prevAll().length);
        thirdIndex = $(this).prevAll().length;

        $('.jgkj_a_left').html(titleArray[thirdIndex]);

        //告警统计分析热力图
        GaojingtongjifenxiHeatMapData('/rest/sentiloAssets/queryAlarmStatics',{"alarmType":($(this).prevAll().length+1).toString()});

    });

}