

(function initShebeileixing(){

    $(document).ready(function(){
        var app1 = {};
        // 基于准备好的dom，初始化echarts实例
        var myChart1 = echarts.init(document.getElementById('zcxxasblx'));
        // 指定图表的配置项和数据
        var option1 = {
            color:['#49ffce','#96ff49','#fff049','#ff8e49','#ff4949'],
            tooltip : {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c} ({d}%)",
                borderColor:'#3385ff',
                borderWidth:1,
                axisPointer:{
                    lineStyle:{
                        color:'#ff4949'
                    }
                }
            },
            textStyle:{
                fontSize:14,
                color:'#ffffff'
            },
            calculable : true,
            series : [
                {
                    name:'设备数量分布-设备类型',
                    type:'pie',
                    radius : [30, 120],
                    center : ['50%', '50%'],
                    roseType : 'area',
                    labelLine:{
                        normal:{
                            length:15,
                            length2:15
                        }
                    },
                    data:[
                        {value:16, name:'水质监测仪'},
                        {value:8, name:'环境探测器'},
                        //{value:40, name:'自动气象站'},
                        //{value:30, name:'智能水表'},
                        //{value:20, name:'气压计'},
                        //{value:10, name:'温度计'},
                        //{value:50, name:'湿度计'},
                        //{value:40, name:'风速测量计'},
                        //{value:30, name:'测速仪'},
                        //{value:20, name:'称重仪'},
                        //{value:10, name:'光照度\n检测仪'},
                        //{value:50, name:'超声波\n流量计'},
                        //{value:40, name:'噪音计'},
                        {value:12, name:'粉尘浓度\n探测器'},
                        {value:9, name:'酸碱度PH计'}
                    ]
                }
            ]
        };
        // 使用刚指定的配置项和数据显示图表。
        myChart1.setOption(option1);

        app1.currentIndex = -1;

        app1.timeTicket = setInterval(function () {
            var dataLen = option1.series[0].data.length;
            // 取消之前高亮的图形
            myChart1.dispatchAction({
                type: 'downplay',
                seriesIndex: 0,
                dataIndex: app1.currentIndex
            });
            app1.currentIndex = (app1.currentIndex + 1) % dataLen;
            // 高亮当前图形
            myChart1.dispatchAction({
                type: 'highlight',
                seriesIndex: 0,
                dataIndex: app1.currentIndex
            });
            // 显示 tooltip
            myChart1.dispatchAction({
                type: 'showTip',
                seriesIndex: 0,
                dataIndex: app1.currentIndex
            });
        }, 1000);

    });

})();