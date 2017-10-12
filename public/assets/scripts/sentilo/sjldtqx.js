
var myCharts123;
var app = {};

(function yunxingjiankong(){

    yunxingjiankongLine();

})();

function yunxingjiankongLine(){
    // 基于准备好的dom，初始化echarts实例
    myCharts123 = echarts.init(document.getElementById('sjldtqx'));
// 指定图表的配置项和数据
    function randomData(i) {
        var now1 = 0;
        now1 = new Date(now + (oneDay*i));
        //value = Math.round(Math.random() * 500);
        value = value + Math.random() * 21 - 10;
        return {
            name: now.toString(),
            value: [
                [now1.getFullYear(), now1.getMonth() + 1, now1.getDate()].join('/') +' '+ ([now1.getHours(),now1.getMinutes(),now1.getSeconds()].join(':')),
                arrayData[i]
            ]
        }
    }

    var data = [];
    var data1 = [];
    var now = (new Date()).getTime()-2*60*1000;
    var oneDay = 1000;
    //var time = (new Date()).getTime();
    //var hours = now.getHours();
    //var minutes = now.getMinutes();
    var value = Math.random() * 200;
    for (var i = 0; i < 60*2; i++) {
        data.push(randomData(i));

        if((i+1)%12 == 0){
            time -= 60*1000;
        }
        data1.push([(new Date(time)).getHours(), ((new Date(time)).getMinutes()>9?(new Date(time)).getMinutes():('0'+(new Date(time)).getMinutes()))].join(':'));
    }


    var option = {
        tooltip: {
            trigger: 'axis',
            borderColor:'white',
            borderWidth:1,
            axisPointer:{
                lineStyle:{
                    color:'white'
                }
            }
        },
        textStyle:{
            color:['#ffffff']
        },
        grid: {
            left: '0%',
            right: '7%',
            bottom: '0%',
            top:'9%',
            containLabel: true
        },
        //legend: {
        //    top: 'bottom',
        //    data:['意向']
        //},

        xAxis: {
            type: 'time',
            boundaryGap: false,
            min:now,
            max:(now+2*60*1000),
            splitLine: {
                show: false
            },
            axisLine:{
                lineStyle:{
                    color:'white'
                }
            }
        },
        yAxis: {
            name:'KB/S',
            type: 'value',
            //boundaryGap: [0, '100%'],
            splitLine: {
                show: false
            },
            axisLine:{
                lineStyle:{
                    color:'white'
                }
            }
        },
        series: [
            {
                name:'峰值',
                type:'line',
                smooth:true,
                symbol: 'none',
                sampling: 'average',
                itemStyle: {
                    normal: {
                        color: 'rgba(250,250,250,0.3)'
                    }
                },
                areaStyle: {
                    normal: {
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 0.8, [{
                            offset: 0,
                            //color: 'rgb(255, 70, 131)'
                            color: '#ff4a4e'
                        }, {
                            offset: 1,
                            //color: 'lightblue'
                            color: 'rgb(171, 231, 246)'
                        }])
                    }
                },
                data: data
            }
        ]
    };
    // 使用刚指定的配置项和数据显示图表。
    myCharts123.setOption(option);

    app.timeTicket = setInterval(function () {

        data = [];
        now = (new Date()).getTime()-2*60*1000;
        for(var i = 0;i<300;i++){
            data.push(randomData(i));
            //data1.shift();
            //data1.push([now.getHours(), now.getMinutes()].join(':'));
        }

        myCharts123.setOption({
            xAxis: {
                min:((new Date()).getTime()-2*60*1000),
                max:((new Date()).getTime())
            },
            series: [{
                data: data
            }]
        });
    }, 1000);
}