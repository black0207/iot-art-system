

var yijierushebeiguzhanglvtongjiCharts;
function yijierushebeiguzhanglvtongjiEchartsLine(){

    // 基于准备好的dom，初始化echarts实例
    yijierushebeiguzhanglvtongjiCharts = echarts.init(document.getElementById('sbgzl'));
    // 指定图表的配置项和数据
    var option = {
        tooltip: {
            trigger: 'axis',
            borderColor:'#3385ff',
            borderWidth:1,
            axisPointer:{
                lineStyle:{
                    color:'#3385ff'
                }
            }
        },
        textStyle:{
            fontSize:16,
            color:'#ffffff'
        },
        grid: {
            left: '1.5%',
            right: '4%',
            bottom: '0%',
            top:'12%',
            containLabel: true
        },

        xAxis: {
            name:'日期\n\n',
            type: 'category',
            axisLine:{
                show:true,
                lineStyle:{
                    color:'#3d4045'
                }
            },
            axisLabel:{
                textStyle:{
                    fontSize:14
                }
            },
            axisTick:{
                show:false
            },
            boundaryGap: false,
            data: ['2016-01','2016-02','2016-03','2016-04','2016-05','2016-06','2016-07','2016-08','2016-09','2016-10','2016-11','2016-12']
        },
        yAxis: {
            name:'',
            //name:'%',
            type: 'value',
            max:5,
            axisLine:{
                show:false,
                lineStyle:{
                    color:'#3d4045'
                }
            },
            axisLabel:{
                formatter: '{value}%',
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
            axisTick:{
                show:false
            },
            boundaryGap: false,
            data: ['2','4','6','18']
        },
        series: [
            {
                name:'已接入设备故障率',
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
                //stack: '总量',
                data:[5, 3.5, 1.5, 4.5, 6.5, 2, 5, 5.8, 1.7, 2.8 , , ,]
            }
        ]
    };
    // 使用刚指定的配置项和数据显示图表。
    yijierushebeiguzhanglvtongjiCharts.setOption(option);

}