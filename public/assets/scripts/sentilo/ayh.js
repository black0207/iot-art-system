

function jierushebeitongjiAnyonghutreeMap(data){

    var name = [];
    for(var i = 0;i<data.length;i++){
        name.push(data[i].name);
    }

    // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(document.getElementById('ayh'));
    // 指定图表的配置项和数据
    var option = {
        tooltip : {
            trigger: 'item',
            formatter: "{b}: {c}"
        },
        //visualMap:
        //    {
        //        type: 'piecewise',
        //        min:0,
        //        max:30,
        //        inRange: {
        //            color: ['#121122', 'rgba(3,4,5,0.4)', 'red'],
        //            symbolSize: [0, 30]
        //        }
        //    },
        calculable : false,
        //legend: {
        //    show:true,
        //    orient: 'vertical',
        //    x: 'right',
        //    top:0,
        //    //right:40,
        //    itemGap:47,
        //    bottom:0,
        //    height:610,
        //    itemWidth:35,
        //    itemHeight:18,
        //    padding:[0,100,0,5],
        //    align:'left',
        //    textStyle:{
        //        color:'white'
        //    },
        //    selectedMode:false,
        //    data:name
        //    //data:['公安局','Somatic','规土委','Energy公司','气象局','交委','城管局','人居委','安监局','USE公司']
        //},
        textStyle:{
            fontSize:24,
            color:'rgb(41,52,68)'
        },
        series : [
            //{
            //    name:'访问来源',
            //    type:'pie',
            //    radius: ['50%', '100%'],
            //    avoidLabelOverlap: false,
            //    itemStyle:{
            //        normal:{
            //            //color:'rgba(1,1,1,0)'
            //            opacity:0
            //        }
            //    },
            //    label:{
            //      normal:{
            //          show:false
            //      }
            //    },
            //    color:['#009499','#00af85','#00b2a3','#00b775','#12b24d','#2bc128','#c6c36e','#d69c00','#d88b00','#00b2a3'],
            //    data:data
            //    //data:[
            //    //    {value:335, name:'公安局'},
            //    //    {value:310, name:'Somatic'},
            //    //    {value:234, name:'规土委'},
            //    //    {value:135, name:'Energy公司'},
            //    //    {value:1548, name:'气象局'},
            //    //    {value:335, name:'交委'},
            //    //    {value:310, name:'城管局'},
            //    //    {value:234, name:'人居委'},
            //    //    {value:135, name:'安监局'},
            //    //    {value:1548, name:'USE公司'}
            //    //]
            //
            //},
            {
                name:'按用户',
                type:'treemap',
                roam:false,
                nodeClick:false,
                width:1400,
                height:610,
                //left:150,
                breadcrumb:{
                    show:false
                },
                label: {
                    normal:{
                        show: true,
                        position:'insideBottomLeft',
                    }
                },
                itemStyle: {
                    normal: {
                        borderWidth: 2
                        //color:'rgb(0,148,153)'
                    }
                },
                levels:[{
                    color:['#009499','#00af85','#00b2a3','#00b775','#12b24d','#2bc128','#c6c36e','#d69c00','#d88b00','#00b2a3']
                }],
                data:data
                //data:[
                //    {
                //        name: '公安局\n',
                //        value: 6
                //    },
                //    {
                //        name: 'Somatic\n',
                //        value: 6
                //    },
                //    {
                //        name: '规土委\n',
                //        value: 5
                //    },
                //    {
                //        name: 'Energy公司\n',
                //        value: 5
                //    },
                //    {
                //        name: '气象局\n',
                //        value: 4
                //    },
                //    {
                //        name: '交委\n',
                //        value: 4
                //    },
                //    {
                //        name: '城管局\n',
                //        value: 4
                //    },
                //    {
                //        name: '人居委\n',
                //        value: 3
                //    },
                //    {
                //        name: '安监局\n',
                //        value: 3
                //    },
                //    {
                //        name: 'USE公司\n',
                //        value: 2
                //    }
                //]
            }
        ]
    };
    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);

}