

(function inittranslate(){
    $(document).ready(function(){

        var app = {};
        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('zcxxa'));
        // 指定图表的配置项和数据
        var option = {
            color:['#49ffce','#96ff49','#fff049','#ff8e49','#ff4949'],
            tooltip : {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c} ({d}%)",
                borderColor:'#3385ff',
                borderWidth:1,
                axisPointer:{
                    lineStyle:{
                        color:'#ff8e49'
                    }
                }

            },
            textStyle:{
                fontSize:16,
                color:'#ffffff'
            },
            calculable : true,
            series : [
                {
                    name:'设备状态',
                    type:'pie',
                    radius : [30, 110],
                    center : ['50%', '50%'],
                    roseType : 'area',
                    labelLine:{
                        normal:{
                            length:5,
                            length2:5
                        }
                    },
                    data:[
                        {value:5, name:'NB-IOT'},
                        {value:12, name:'ZigBee'},
                        {value:9, name:'4G'},
                        {value:5, name:'LORA'},
                        {value:10, name:'GPRS'},
                        //{value:24, name:'Wifi'},
                        {value:8, name:'3G'}
                    ]
                }
            ]
        };
        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);

        app.currentIndex = -1;

        app.timeTicket = setInterval(function () {
            var dataLen = option.series[0].data.length;
            // 取消之前高亮的图形
            myChart.dispatchAction({
                type: 'downplay',
                seriesIndex: 0,
                dataIndex: app.currentIndex
            });
            app.currentIndex = (app.currentIndex + 1) % dataLen;
            // 高亮当前图形
            myChart.dispatchAction({
                type: 'highlight',
                seriesIndex: 0,
                dataIndex: app.currentIndex
            });
            // 显示 tooltip
            myChart.dispatchAction({
                type: 'showTip',
                seriesIndex: 0,
                dataIndex: app.currentIndex
            });
        }, 1000);

    });
})();
