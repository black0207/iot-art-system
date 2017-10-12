

function jierushebeitongjiAnzhizaoshang(data){

    var name = [];
    for(var i = 0;i<data.length;i++){
        name.push(data[i].name);
    }

    // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(document.getElementById('azzs'));
    // 指定图表的配置项和数据
    var option = {
        tooltip : {
            trigger: 'item',
            formatter: "{b}: {c}"
        },
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
        //    padding:[0,120,0,5],
        //    align:'left',
        //    textStyle:{
        //        color:'white'
        //    },
        //    selectedMode:false,
        //    data:name
        //    //data:['信立科技','博世','意法半导体','德州仪器','飞思卡尔','海康威视','ADI','霍尼韦尔','楼氏电子','Invensense']
        //},
        //calculable : false,
        textStyle:{
            fontSize:24,
            color:'rgb(41,52,68)',
        },
        series : [
            //{
            //    name:'按制造商1',
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
            //        normal:{
            //            show:false
            //        }
            //    },
            //    color:['#009399','#00af85','#00ac9d','#00b675','#00b675','#12b24d','#2bc127','#c6c36e','#dcc500','#d69c00'],
            //    data:data
            //    //data:[
            //    //    {value:335, name:'信立科技'},
            //    //    {value:310, name:'博世'},
            //    //    {value:234, name:'意法半导体'},
            //    //    {value:135, name:'德州仪器'},
            //    //    {value:1548, name:'飞思卡尔'},
            //    //    {value:335, name:'海康威视'},
            //    //    {value:310, name:'ADI'},
            //    //    {value:234, name:'霍尼韦尔'},
            //    //    {value:135, name:'楼氏电子'},
            //    //    {value:1548, name:'Invensense'}
            //    //]
            //
            //},
            {
                name:'按制造商',
                type:'treemap',
                levels:[{
                    color:['#009399','#00af85','#00ac9d','#00b675','#00b675','#12b24d','#2bc127','#c6c36e','#dcc500','#d69c00']
                }],
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
                        position:'insideBottomLeft'
                    }
                },
                itemStyle: {
                    normal: {
                        label: {
                            show: true,
                            formatter: "{b}"
                        },
                        borderWidth: 2
                    },
                    emphasis: {
                        label: {
                            show: true
                        }
                    }
                },
                data:data
                //data:[
                //    {
                //        name: '信立科技\n',
                //        value: 6
                //    },
                //    {
                //        name: '博世\n',
                //        value: 4
                //    },
                //    {
                //        name: '意法半导体\n',
                //        value: 4
                //    },
                //    {
                //        name: '德州仪器\n',
                //        value: 2
                //    },
                //    {
                //        name: '飞思卡尔\n',
                //        value: 2
                //    },
                //    {
                //        name: '海康威视\n',
                //        value: 1
                //    },
                //    {
                //        name: 'ADI\n',
                //        value: 1
                //    },
                //    {
                //        name: '霍尼韦尔\n',
                //        value: 2
                //    },
                //    {
                //        name: '楼氏电子\n',
                //        value: 1
                //    },
                //    {
                //        name: 'Invensense\n',
                //        value: 1
                //    }
                //]
            }
        ]
    };
    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);

}