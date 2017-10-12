
var tongjitiaoshuCharts;
function tongjitiaoshuEchartsLine(data){

    // 基于准备好的dom，初始化echarts实例
    tongjitiaoshuCharts = echarts.init(document.getElementById('sjzkb'));
    // 指定图表的配置项和数据
    var option = {
        tooltip: {
            trigger: 'axis',
            borderColor:'#49ffce',
            borderWidth:1,
            axisPointer:{
                lineStyle:{
                    color:'#49ffce'
                }
            }
        },
        textStyle:{
            fontSize:16,
            color:'#ffffff'
        },
        legend: {
            data:['空气质量','水环境'],
            textStyle:{
                fontSize:16,
                color:'#ffffff'
            },
            bottom:'0%'
        },
        grid: {
            left: '0%',
            right: '4%',
            bottom: '10%',
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
            data: ['10-01','10-05','10-10','10-15','10-20','10-25','10-30']
        },
        yAxis: {
            name:'条',
            type: 'value',
            //min:0,
            //max:12,
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
            axisTick:{
                show:false
            },
            //boundaryGap: false,
            data: ['400','800','1200','1600']
        },
        series: [
            {
                name:'空气质量',
                type:'line',
                lineStyle:{
                    normal:{
                        color:'#49ffce'
                    }
                },
                symbol:'rect',
                symbolSize:6,
                itemStyle:{
                    normal:{
                        color:'#49ffce'
                    }
                },
                //stack: '总量',
                data:[350, 700, 600, 700, 950, 1300, 1100]
            },
            {
                name:'水环境',
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
                data:[300, 500, 600, 450, 550, 800, 1000]
            }
        ]
    };
    // 使用刚指定的配置项和数据显示图表。
    tongjitiaoshuCharts.setOption(option);

}