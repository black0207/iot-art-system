
function initGaojingBar(data){

    var app = {};
    // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(document.getElementById('gjlysltj'));
    // 指定图表的配置项和数据
    var option = {
        color:['#6e83de','#6728dc','#6ec8de','#ddca90','#ea8d7b','#8bc29e','#bbd556','#ebcac0','#95d556','#f0a43f'],
        tooltip : {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)",
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
        calculable : true,
        series : [
            {
                name:'告警来源数量统计',
                type:'pie',
                radius : [40, 120],
                center : ['45%', '50%'],
                roseType : 'radius',
                //label:{
                //    normal:{
                //        show:true,
                //        position:'inner'
                //    }
                //},
                //markPoint:{
                //    label:{
                //        normal:{
                //            show:true
                //        }
                //    }
                //},
                labelLine:{
                    normal:{
                        length:0,
                        length2:0,
                        smooth:false
                    }
                },
                data:data
                //   [
                //    {value:20, name:'城管局'},
                //    {value:9, name:'人居委'},
                //    {value:35, name:'Energy公司'},
                //    {value:55, name:'UES公司'},
                //    {value:45, name:'交委'},
                //    {value:75, name:'规土委'},
                //    {value:65, name:'公安局'},
                //    {value:75, name:'气象局'},
                //    {value:65, name:'安监局'},
                //    {value:80, name:'Samatic'}
                //]
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

}