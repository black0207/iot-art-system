
var secondChart;
var secondIndex = 0;

function initLine(data){

    // 基于准备好的dom，初始化echarts实例
    secondChart = echarts.init(document.getElementById('gjsdtj'));
    // 指定图表的配置项和数据
    var option = {
        tooltip: {
            trigger: 'axis',
            borderColor:'#96ff49',
            borderWidth:1,
            axisPointer:{
                lineStyle:{
                    color:'#96ff49'
                }
            }
        },
        textStyle:{
            fontSize:16,
            color:'#ffffff'
        },
        legend: {
            data:data[0],
            bottom:-0,
            textStyle:{
                fontSize:16,
                color:'#ffffff'
            }
        },
        grid: {
            left: '0%',
            right: '4%',
            bottom: '11%',
            top:'12%',
            containLabel: true
        },

        xAxis: {
            name:'时间\n\n',
            type: 'category',
            axisLine:{
                lineStyle:{
                    color:'#3d4045'
                }
            },
            axisLabel:{
                textStyle:{
                    fontSize:14
                }
            },
            boundaryGap: false,
            data: ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月']
        },
        yAxis: {
            name:'次',
            type: 'value',
            axisLine:{
                show:false,
                lineStyle:{
                    color:'#3d4045'
                }
            },
            axisLabel:{
                textStyle:{
                    fontSize:14
                }
            },
            splitLine:{
                show:true,
                lineStyle:{
                    type:'dashed',
                    color:'#3d4045'
                }
            },
            boundaryGap: false,
            data: ['10','20','30','40','50']
        },
        series: [
            {
                name:data[0][0],
                type:'line',
                lineStyle:{
                    normal:{
                        color:'#96ff49'
                    }
                },
                symbol:'rect',
                symbolSize:6,
                itemStyle:{
                    normal:{
                        color:'#96ff49'
                    }
                },
                stack: '总量',
                //data:[28, 31, 32, 22, 13, 42, 26, 33, 29, 30, 18, 28]
                data:data[1][0]
            },
            {
                name:data[0][1],
                type:'line',
                lineStyle:{
                    normal:{
                        color:'#3385ff'
                    }
                },
                symbol:'rect',
                symbolSize:6,
                itemStyle:{
                    normal:{
                        color:'#3385ff'
                    }
                },
                stack: '总量',
                //data:[25, 35, 29, 18, 20, 38, 34, 39, 24, 29]
                data:data[1][1]
            }
        ]
    };
    // 使用刚指定的配置项和数据显示图表。
    secondChart.setOption(option);

    if($('.zctj_right_bottom_a_right')){
        $('.zctj_right_bottom_a_right').remove();
        creatGjsdtjDiv();
    }else{
        creatGjsdtjDiv();
    }

}

function creatGjsdtjDiv(){

    $('.zctj_right_bottom_a').append('<div class="zctj_right_bottom_a_right">\
\
    <div class="gjsd">\
    <div class="gjsd_a">\
    <div class="gjsd_a_left">\
    温度警告\
    </div>\
    <div class="gjsd_a_right">\
    <a href="####" title=""><img src="/assets/img/sentilo/yxjk_b.png"/><img src="/assets/img/sentilo/yxjk_a.png" style=" display:none;"/></a>\
    </div>\
    </div>\
    <div class="gjsd_b" style="display:none;">\
    <ul>\
    <li><a href="####" title="">温度告警</a></li>\
    <li><a href="####" title="">湿度告警</a></li>\
    <li><a href="####" title="">空气质量告警</a></li>\
    <li><a href="####" title="">噪音告警</a></li>\
    </ul>\
    </div>\
    </div>\
\
    </div>');

    var titleArray = ['温度告警','湿度告警','空气质量告警','噪音告警'];

    $('.gjsd_b').children().first().children().eq(secondIndex).css({
        backgroundColor:'rgb(41,52,68)'
    });

    $(".gjsd_a").mouseover(function(){
        $(".gjsd_b").show();
        $(".gjsd_a_right>a>img").toggle();
    });
    $(".gjsd_a").mouseout(function(){
        $(".gjsd_b").hide();
        $(".gjsd_a_right>a>img").toggle();
    });
    $(".gjsd_b").mouseover(function(){
        $(this).show();
    });
    $(".gjsd_b").mouseout(function(){
        $(this).hide();
    });

    //折线按钮事件
    $('.gjsd_b').children().first().children().click(function(){

        secondChart.dispose;
        //var rgb = $(this).css('backgroundColor');
        $(this).css({
            backgroundColor:'rgb(41,52,68)'
        });

        $(this).siblings().css('backgroundColor','rgb(0,0,0)');

        console.log($(this).prevAll().length);
        secondIndex = $(this).prevAll().length;

        $('.gjsd_a_left').html(titleArray[secondIndex]);
        $(".gjsd_b").hide();

        //告警统计分析折线图
        GaojingtongjifenxiLineData('/rest/sentiloAssets/queryAlarmYears',{"alarmType": ($(this).prevAll().length+1).toString()});

    });

}