

function jinyigeyuejierushebeiLine(){


    var titleNian2 = [2016,2015,2014];
    var titleYue2 = [0,12,11,10,9,8,7,6,5,4,3,2,1];
    var dayArray = [];
    var day;

    day = new Date((new Date()).getFullYear(),(new Date()).getMonth(),0).getDate();
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
            dayArray[i] = ((new Date()).getMonth())+'-'+dayArray[i];
        }
    }

    var data1 = [];
    var data2 = [];
    var data = [];
    for(var i = 0; i<((dayArray.length)*2);i++){
        data.push(Math.round(Math.random()*70));
    }

    data.sort(sortNumber);
    for(var i = 0; i<data.length;i++){
        if(i<dayArray.length){
            data1.push(data[i]);
        }else{
            data2.push(data[i]);
        }
    }

    var shebeizichantongjidata = creatzichanmingxiAllData([[39,42],[37,40]]);

    // 基于准备好的dom，初始化echarts实例
    var secondChart = echarts.init(document.getElementById('jygyjrsbzk'));
    // 指定图表的配置项和数据
    var option = {
        tooltip: {
            trigger: 'axis',
            borderColor:'#3385ff',
            borderWidth:1,
            formatter: function (params, ticket, callback) {

                var title1 = params[0].seriesName+'：'+params[0].value+'台';
                var title2 = params[1].seriesName+'：'+params[1].value+'台';
                if(title1.length>title2.length){
                    for(var i = 0;i<(title1.length-title2.length);i++){
                        title2.concat(' ');
                    }
                }else{
                    for(var i = 0;i<(title2.length-title1.length);i++){
                        title1.concat(' ');
                    }
                }

                return title1+'<br>'+title2;
            }
            ,
            axisPointer:{
                lineStyle:{
                    color:'#3385ff'
                }
            }
        },
        textStyle:{
            fontSize:16,
            color:'#ffffff'
        },
        legend: {
            data:['设备总数','在线设备数'],
            textStyle:{
                fontSize:16,
                color:'#ffffff'
            },
            bottom:'0%'
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
            	lineStyle:{
                   color:'#3d4045'
            	}
            },
            axisLine:{
                show:true,
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
            data: dayArray
        },
        yAxis: {
            name:'台',
            type: 'value',
            min:20,
            max:55,
            //axisLine:{
            //	lineStyle:{
            //        color:'#3d4045'
            //	}
            //},
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
                name:'设备总数',
                type:'line',
                lineStyle:{
                    normal:{
                        color:'#96ff49'
                    }
                },
                //stack: '总量',
                symbol:'rect',
                symbolSize:6,
                data:shebeizichantongjidata[0],
                itemStyle:{
                    normal:{
                        color:'#96ff49'
                    }
                }
            },
            {
                name:'在线设备数',
                type:'line',
                lineStyle:{
                    normal:{
                        color:'#3385ff'
                    }
                },
                //stack: '总量',
                symbol:'rect',
                symbolSize:6,
                data:shebeizichantongjidata[1],
                itemStyle:{
                    normal:{
                        color:'#3385ff'
                    }
                }
            }
        ]
    };
    // 使用刚指定的配置项和数据显示图表。
    secondChart.setOption(option);

}

function creatzichanmingxiAllData(data,type){
    //数据资产统计
    var month = (new Date()).getMonth()==0?12:(new Date()).getMonth();
    var year = (new Date()).getMonth()==0?(new Date()).getFullYear()-1:(new Date()).getFullYear();
    var day = (new Date(year,month,0)).getDate();
    var data1 = [];
    var data2 = [];
    for(var j = 0;j<day;j++){
        var temp = selectNumAction(data[0],data[1],type);
        data1.push(temp[0]);
        data2.push(temp[1]);
    }
    return [data1,data2];

}

function selectNumAction(data1,data2,type){
    var num1 = -1;
    var num2 = -1;
    if(type == 1){
        while(num1<data1[0]||num1>data1[1]){
            num1 = (Math.random()*data1[1]).toFixed(2);
        }
        while(num2<data2[0]||num2>data2[1]){
            num2 = (Math.random()*data2[1]).toFixed(2);
        }
    }else{
        while(num1<data1[0]||num1>data1[1]){
            num1 = Math.round(Math.random()*data1[1]);
        }
        while(num2<data2[0]||num2>data2[1]){
            num2 = Math.round(Math.random()*data2[1]);
        }
    }
    console.log('num1='+num1+' num2='+num2);



    return [num1,num2].sort(sortNumber).reverse();
}

function sortNumber(a,b)
{
    return a - b
}