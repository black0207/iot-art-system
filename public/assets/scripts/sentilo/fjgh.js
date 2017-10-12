

var shujucunchuxingshifenleiCharts02;

function shujucunchuxingshifenleitongjiLine02(){
    // 基于准备好的dom，初始化echarts实例
    shujucunchuxingshifenleiCharts02 = echarts.init(document.getElementById('fjgh'));
    // 指定图表的配置项和数据
    var option = {
        tooltip: {
            borderColor:'rgb(253,221,134)',
            borderWidth:1,
            backgroundColor:'rgb(41,52,68)',
            trigger: 'axis',
            axisPointer:{
                lineStyle:{
                    color:'#cfe195'
                }
            }
        },
        textStyle:{
            fontSize:16,
            color:'#ffffff'
        },
        grid: {
            left: '0%',
            right: '4%',
            bottom: '0%',
            top:'12%',
            containLabel: true
        },

        xAxis: {
            name:'日期\n\n',
            type: 'category',
            axisLine:{
                show:false,
                lineStyle:{
                    color:'white'
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
            data: ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月']
        },
        yAxis: {
            name:'GB',
            type: 'value',
            axisLine:{
                show:false,
                lineStyle:{
                    color:'white'
                }
            },
            axisTick:{
                show:false
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
            data: ['1000','2000','3000','4000']
        },
        series: [
            {
                name:'2016',
                type:'line',
                areaStyle: {
                    normal:
                    {color:'rgb(253,221,134)'}
                },
                symbol:'none',
                lineStyle:{
                    normal:{
                        color:'rgb(253,221,134)'
                    }
                },
                stack: '总量',
                data:[25, 35, 29, 18, 20, 38, 34, 39, 24, 29,50,35]
            }
        ]
    };
    // 使用刚指定的配置项和数据显示图表。
    shujucunchuxingshifenleiCharts02.setOption(option);
}