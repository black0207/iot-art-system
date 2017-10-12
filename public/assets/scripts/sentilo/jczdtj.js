// 基于准备好的dom，初始化echarts实例
var myChart = echarts.init(document.getElementById('jczdtj'));
// 指定图表的配置项和数据
var option = {
    title:{
        show:true,
        text:"监测站点统计",
        textStyle: {
            fontSize: 28,
            color: '#ffffff'
        },
        left:190,
        top:0

    },
    color: ['#ebc11d', '#99e000'],
    tooltip: {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)",
        borderColor:'#3385ff',
        borderWidth:1
    },
    legend: {
        show: true,
        orient:'vertical',
        left:440,
        top:350,
        formatter: function (name) {
            if(name=="国控点")
                return "国控监测点";
            if(name=="市控点")
                return "市控监测点";
        },
        textStyle:{
            color:"white"
        },
        data: ["国控点", "市控点"]
    },
    textStyle: {
        fontSize: 24,
        color: '#ffffff'
    },
    calculable: true,
    series: [
        {
            name: '监测站点统计',
            type: 'pie',
            radius: [107, 152],
            center: [250, 250],
            labelLine: {
                show:false,
                normal: {
                    lineStyle:{color:"rgb(41,52,68)"},
                    length: 10,
                    length2: 10
                }
            },
            label:{
                show:true,
                normal:{
                    textStyle:{
                        color: "white",
                        fonSize: 24,
                        fontFamily:"微软雅黑"
                    }
                }
            },
            itemStyle: {
                emphasis: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            },
            data: [
                {value: 6, name: '国控点'},
                {value: 27, name: '市控点'}
            ]
        }
    ]
};
// 使用刚指定的配置项和数据显示图表。
myChart.setOption(option);