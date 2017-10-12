
var shujucunchuxingshifenleiCharts;

function shujucunchuxingshifenleitongjiLine(){

    // 基于准备好的dom，初始化echarts实例
    shujucunchuxingshifenleiCharts = echarts.init(document.getElementById('jgh'));
    // 指定图表的配置项和数据
    var option = {
        tooltip: {
            trigger: 'axis',
            borderColor:'#cfe195',
            borderWidth:1,
            backgroundColor:'rgb(41,52,68)',
            formatter: function (params, ticket, callback) {

                return '结构化'+'<br>'+params[0].name+'数据量：'+params[0].value+'条';
            },
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
            data: ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月']
        },
        yAxis: {
            name:'条',
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
            axisTick:{
                show:false
            },
            min:30000,
            boundaryGap: false,
            data: ['1000','2000','3000','4000']
        },
        series: [
            {
                name:'2015',
                type:'line',
                symbol:'none',
                areaStyle: {
                    normal:
                    {color:'#cfe195'}
                },
                lineStyle:{
                    normal:{
                        color:'#526c0a'
                    }
                },
                stack: '总量',
                data:[28, 31, 32, 22, 13, 42, 26, 33, 29, 30, 18, 28]
            }
        ]
    };
    // 使用刚指定的配置项和数据显示图表。
    shujucunchuxingshifenleiCharts.setOption(option);

}