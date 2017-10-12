

function shebeileixingshuliangfenbuPie(data){

    var name = [];
    for(var i = 0;i<data.length;i++){
        name.push(data[i].name);
    }

    var groupColors = [];
    var hStep = Math.round(300 / (name.length - 1));
    for (var i = 0; i < name.length; i++) {
        groupColors.push(echarts.color.modifyHSL('#fff049', hStep * i));
    }

    // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(document.getElementById('sblxslfb'));
    // 指定图表的配置项和数据
    var option = {
        //color:['#ff4949','#ff8e49','#fff049','#96ff49','#49ffce','#49d7ff','#49acff','#4970ff','#6349ff'],
        color:groupColors,
        tooltip : {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)",
            borderColor:'#49acff',
            borderWidth:1
        },
        legend: {
            orient: 'vertical',
            x: 'right',
            top:'middle',
            //bottom:0,
            //itemGap:8,
            height:'100%',
            align:'left',
            textStyle:{
                color:'white'
            },
            data:name
            //data:['图像采集','温度检测','湿度检测','位移/移动检测','声波检测','光检测','放射检测','力检测','磁电检测']
        },
        //visualMap: {
        //    show: true,
        //    type: 'piecewise',
        //    categories: name,
        //    dimension: 0,
        //    inRange: {
        //        color: groupColors //['#d94e5d','#eac736','#50a3ba']
        //    },
        //    outOfRange: {
        //        color: ['#ccc'] //['#d94e5d','#eac736','#50a3ba']
        //    },
        //    top: 20,
        //    textStyle: {
        //        color: '#fff'
        //    },
        //    realtime: false
        //},
        textStyle:{
            fontSize:8,
            //color:'rgb(41,52,68)'
            color:'white'
        },
        calculable : true,
        series : [
            {
                name:'设备类型数量分布',
                type:'pie',
                radius : ['55%', '75%'],
                center : ['40%', '50%'],
                symbol:'rect',
                labelLine:{
                    normal:{
                        length:20,
                        length2:15
                    }
                },
                label:{
                    normal:{
                        show:true,
                        position:'outside',
                        formatter:function(params){
                            return params.percent+'%';
                        }
                    }
                },

                data:data
            }
        ]
    };
    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);

}