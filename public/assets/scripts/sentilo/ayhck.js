
var yijierushebeiguzhanglvLineChart;

function yijierushebeiguzhanglvLine(){

    var titleNian2 = [2016,2015,2014];
    var titleYue2 = [12,11,10,9,8,7,6,5,4,3,2,1];
    var dayArray = [];
    var day;

    var yearIndex = 0;
    var monthIndex = (new Date).getMonth();
    day = new Date(titleNian2[yearIndex],monthIndex,0).getDate();
    if(day == 28){
        dayArray = ['','','','','05','','','','','10','','','','','15','','','','','20','','','','','25','','','28'];
    }else if(day == 29){
        dayArray = ['','','','','05','','','','','10','','','','','15','','','','','20','','','','','25','','','','29'];
    }else if(day == 30){
        dayArray = ['','','','','05','','','','','10','','','','','15','','','','','20','','','','','25','','','','','30'];
    }else if(day == 31){
        dayArray = ['','','','','05','','','','','10','','','','','15','','','','','20','','','','','25','','','','','','31'];
    }

    for(var i = 0; i< dayArray.length;i++){
        if(dayArray[i]){
            dayArray[i] = monthIndex+'-'+dayArray[i];
        }
    }

    var data = [];
    for(var i = 0; i<dayArray.length;i++){
        data.push('');
    }

    // 基于准备好的dom，初始化echarts实例
    yijierushebeiguzhanglvLineChart = echarts.init(document.getElementById('ayhck'));
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
                interval:0,
                textStyle:{
                    fontSize:14
                }
            },
            axisTick:{
                show:false
            },
            boundaryGap: false,
            //data: ['2016-01','2016-01','2016-03','2016-04','2016-05','2016-06','2016-07','2016-08','2016-09','2016-10','2016-11','2016-12']
            data:dayArray
        },
        yAxis: {
            //name:'次',
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
                },
                formatter: '{value} %'
            },
            axisTick:{
                show:false
            },
            splitLine:{
                show:true,
                lineStyle:{
                    type:'dashed',
                    color:'#3d4045'
                }
            },
            boundaryGap: false,
            data: ['10','20','30','40','50']
        },
        series: [
            {
                name:'按用户查看',
                type:'line',
                connectNulls:true,
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
                //data:[50, 70, 80, 110, 100, 60, 50, 130, 40, 60, 150, 20]
                data:data
            }
        ]
    };
    // 使用刚指定的配置项和数据显示图表。
    yijierushebeiguzhanglvLineChart.setOption(option);

}