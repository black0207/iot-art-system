


function xieyileixingshujuliangfenbuRadar(data){

    var indicator = [];
    var array = new Array();
    array = array.concat(data[1].value);

    array.sort(sortNumber);
    var max = array[array.length-1];

    //for(var i = 0;i<data[1].value.length;i++){
    //    indicator.push({name:data[0][i],max:data[1].value[i]*1.5})
    //}
    for(var i = 0;i<data[1].value.length;i++){
        indicator.push({name:data[0][i],max:max*1.2})
    }

    // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(document.getElementById('xylxslfb'));
    // 指定图表的配置项和数据
    var option = {
        color:['#ff4949','#ff8e49','#fff049','#96ff49','#49ffce','#49d7ff','#49acff','#4970ff','#6349ff'],
        textStyle:{
            fontSize:16,
            color:'#ffffff'
        },
        tooltip:{
            borderColor:'#f7de05',
            borderWidth:1
        },
        radar: {
             //shape: 'circle',
            indicator:indicator,
            //indicator: [
            //    { name: 'LORA'},
            //    { name: 'ZigBee'},
            //    { name: 'Wifi'},
            //    { name: 'GPRS'},
            //    { name: '3G'},
            //    { name: '4G'},
            //    { name: 'NB-LoT'}
            //],
            axisLine: {
                lineStyle: {
                    color: '#49ff5a'
                }
            },
            splitLine: {
                lineStyle: {
                    color: '#49ff5a'
                }
            },
            splitArea: {
                areaStyle: {
                    color: ['#293444','#4b5a71'],
                    shadowColor: 'rgba(0, 0, 0, 0.3)',
                    shadowBlur: 10
                }
            }
        },
        series: [{
            name: '协议类型数量分布',
            type: 'radar',
            lineStyle:{
                normal:{
                    color:'#f7de05'
                }
            },
            data:[data[1]]
            //data : [
            //    {
            //        value : [4300, 6000, 28000, 27000, 26000, 8750,10000],
            //        name : '协议类型数量分布'
            //    }
            //]
        }]
    };
    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);

}