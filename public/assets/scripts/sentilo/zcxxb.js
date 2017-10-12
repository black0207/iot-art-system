
var jierushebeishuliangtongjiCharts;
function jierushebeishuliangtongjiEchartsLine(){

    // 基于准备好的dom，初始化echarts实例
    jierushebeishuliangtongjiCharts = echarts.init(document.getElementById('zcxxb'));
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
            data:['设备总数','在线设备数'],
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
            name:'台',
            type: 'value',
            max:30,
            min:5,
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
            boundaryGap: false,
            data: ['10','20','30','40','50','60','70']
        },
        series: [
            {
                name:'设备总数',
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
                //stack: '总量',
                data:[9, 18, 16, 19, 23, 32, 30]
            },
            {
                name:'在线设备数',
                type:'line',
                lineStyle:{
                    normal:{
                        color:'#fea93a'
                    }
                },
                symbol:'rect',
                symbolSize:6,
                itemStyle:{
                    normal:{
                        color:'#fea93a'
                    }
                },
                //stack: '总量',
                data:[7, 15, 14, 12, 16, 22, 28]
            }
        ]
    };
    // 使用刚指定的配置项和数据显示图表。
    jierushebeishuliangtongjiCharts.setOption(option);

}