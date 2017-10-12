
var mySentiloChart;
function initSentiloHistoryDataLine(data,unit){

    //var time = new Date(timeString);
    //data = parseFloat(data);
    //var dataArray = [(data*0.97).toFixed(1),(data*1.1).toFixed(1),(data*0.95).toFixed(1),(data).toFixed(1)];
    //var timeArray = [];
    //for(var i = 0;i<5;i++){
    //    var temp = time-3600*1000*(4-i);
    //    var str = new Date(temp);
    //    timeArray.push(str.getFullYear()+'-'+((str.getMonth()+1)>9?(str.getMonth()+1):'0'+(str.getMonth()+1))+'-'+((str.getDate())>9?(str.getDate()):'0'+(str.getDate()))+' '+((str.getHours())>9?(str.getHours()):'0'+(str.getHours()))+':'+((str.getMinutes())>9?(str.getMinutes()):'0'+(str.getMinutes())));
    //}

    var data1 = [];
    var name = [];
    if(data.length>0){
        data.reverse();
        for(var i = 0;i<data.length;i++){
            data1.push(data[i].monitorValue);
            var str = new Date(data[i].recordTime);
            name.push(str.getFullYear()+'-'+((str.getMonth()+1)>9?(str.getMonth()+1):'0'+(str.getMonth()+1))+'-'+((str.getDate())>9?(str.getDate()):'0'+(str.getDate()))+' '+((str.getHours())>9?(str.getHours()):'0'+(str.getHours()))+':'+((str.getMinutes())>9?(str.getMinutes()):'0'+(str.getMinutes())));

        }
    }else{
        data1 = ['','','','',''];
        name = ['','','','',''];
    }

    // 基于准备好的dom，初始化echarts实例
    mySentiloChart = echarts.init(document.getElementById('lssj'));
    // 指定图表的配置项和数据
    var option = {
        tooltip: {
            trigger: 'axis',
            borderColor:'#96ff49',
            borderWidth:1,
            axisPointer:{
                lineStyle:{
                    color:'#c6df3c'
                }
            }
        },
        textStyle:{
            fontSize:18,
            color:'#ffffff'
        },
        grid: {
            left: '2%',
            right: '4%',
            bottom: '0%',
            top:'12%',
            containLabel: true
        },

        xAxis: {
            name:'日期\n',
            type: 'category',
            axisLine:{
                lineStyle:{
                    color:'#3d4045'
                }
            },

            boundaryGap: false,
            //data: ['2016-10-28  05:19','2016-10-28  06:19','2016-10-28  07:19','2016-10-28  08:19','2016-10-28  09:19']
            data:name
        },
        yAxis: {
            name:unit[0],
            type: 'value',
            axisLine:{
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
            boundaryGap: false,
            data: ['1300','1400','1500','1600','1700']
        },
        series: [
            {
                name:unit[1],
                type:'line',
                areaStyle: {
                    normal:
                    {color:'#c6df3c'}
                },
                symbol:'rect',
                symbolSize:6,
                itemStyle:{
                    normal:{
                        color:'#c6df3c'
                    }
                },
                lineStyle:{
                    normal:{
                        color:'#526c0a'
                    }
                },
                //stack: '总量',
                //data:[600, 800, 900, 1200, 1650]
                data:data1
            }
        ]
    };
    // 使用刚指定的配置项和数据显示图表。
    mySentiloChart.setOption(option);

}


