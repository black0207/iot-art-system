

function yijierushebeiguzhanglvAnzhizaoshang(data){

    var name = [];
    for(var i = 0;i<data.length;i++){
        name.push(data[i].name);
    }

    // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(document.getElementById('azzsck'));
    // 指定图表的配置项和数据
    var option = {
        tooltip: {
            trigger: 'axis',
            borderColor:'#c4ccd3',
            borderWidth:1,
            backgroundColor:'rgb(41,52,68)',
            axisPointer:{
                lineStyle:{
                    color:'#3385ff'
                }
            },
            formatter: function (params, ticket, callback) {

                var title1 = params[0].name;
                var title2 = '已接入设备故障率：'+params[0].value+'%';
                if(title1.length>title2.length){
                    for(var i = 0;i<(title1.length-title2.length);i++){
                        title2.concat('&nbsp;');
                    }
                }else{
                    for(var i = 0;i<(title2.length-title1.length);i++){
                        title1.concat('&nbsp;');
                    }
                }

                return title1+'<br>'+title2;
            }
        },
        textStyle:{
            fontSize:18,
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
            name:'制造商\n\n',
            type: 'category',
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
            boundaryGap: true,
            data:name
            //data: ['飞思卡尔','博世','意法半导体','ADI','楼氏电子','德州仪器','信立科技','霍尼韦尔','海康威视','Invensense']
        },
        yAxis: {
            //name:'%',
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
            boundaryGap: false,
            data: ['10','20','30','40','50']
        },
        series: [
            {
                name:'按制造商查看',
                type:'bar',
                barWidth:50,
                lineStyle:{
                    normal:{
                        color:'#3385ff'
                    }
                },
                symbol:'rect',
                symbolSize:6,
                itemStyle:{
                    normal:{
                        color:'#3385ff'
                    }
                },
                data:data
                //data:[40, 45, 60, 80, 90, 30, 20, 10, 30, 50]
            }
        ]
    };
    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);

}