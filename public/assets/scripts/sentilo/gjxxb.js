
var gaojintongjiChart;
function gaojintongjiEchartsLine(){

    // 基于准备好的dom，初始化echarts实例
    gaojintongjiChart = echarts.init(document.getElementById('gjxxb'));
    // 指定图表的配置项和数据
    var option = {
        tooltip: {
            trigger: 'axis',
            borderColor:'#3385ff',
            borderWidth:1,
            axisPointer:{
                type:'shadow',
                lineStyle:{
                    color:'#3385ff'
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
            bottom: '8%',
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
            name:'次数',
            type: 'value',
            axisLine:{
                show:false,
                lineStyle:{
                    color:'#3d4045'
                }
            },
            splitLine:{
                show:true,
                lineStyle:{
                    type:'dashed',
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
            //boundaryGap: false,
            data: ['1','2','3','4','5','6','7']
        },
        series: [
            {
                name:'空气质量',
                type:'bar',
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
                label:{
                  normal:{
                      show:false,
                      position:'top'
                  }
                },
                barWidth:20,
                //stack: '总量',
                data:[1, 2, 3, 2, 2, 3, 4]
            },
            {
                name:'水环境',
                type:'bar',
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
                label:{
                    normal:{
                        show:false,
                        position:'top'
                    }
                },
                barWidth:20,
                //stack: '总量',
                data:[1, 2, 2, 3, 1, 2, 4]
            }
        ]
    };
    // 使用刚指定的配置项和数据显示图表。
    gaojintongjiChart.setOption(option);

}