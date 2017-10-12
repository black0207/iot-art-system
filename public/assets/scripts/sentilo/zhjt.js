       	// 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('zhjt'));
        // 指定图表的配置项和数据
        var option = {  
    color:['#ffc947','#99ff47','#47f5ff','#47c0ff','#ff8847'],
    tooltip : {
        show:true,
        trigger: 'item',
        formatter: function (params) {
            if(params.componentSubType == 'pie'){
                return params.value+'条';
            }
        },
        borderColor:'#49acff',
        borderWidth:1
    },
    title: { 
    	text:'智慧交通\n',
    //	link:'####',
    	textStyle:{
    		color:'#999999',
    		fontSize:24
    	},
        subtext: '983282',
     //   sublink: '####',
    	subtextStyle:{
    		color:'#ffffff',
    		fontSize:40
    	},        
        x: 'center',
        y: '40%'
    },     
    textStyle:{
    	fontSize:16,
    	color:'#ffffff'
    },
    calculable : true,
    series : [
        {
            name:'智慧交通1',
            type:'pie',
            silent:true,
            radius : ['50%', '68%'],
            center : ['50%', '50%'],
            itemStyle:{
                normal:{
                    color:'rgba(1,1,1,0)'
                }
            },
            label:{
                normal:{
                    show:true,
                    position:'inner',
                    formatter:function(params){
                        return params.percent+'%';
                    },
                    textStyle:{
                        color:'#01202f',
                        fontSize:12,
                        fontWeight:'bolder'
                    }
                }
            },
            data:[
                {value:235988, name:'交通信号'},
                {value:216322, name:'违章监控'},
                {value:196656, name:'停车分布'},
                {value:78663, name:'公共交通'},
                {value:255653, name:'超速抓拍'}
            ]
        },
        {
            name:'智慧交通',
            type:'pie',
            radius : ['50%', '68%'],
            center : ['50%', '50%'],
            labelLine:{
            	normal:{
                    show:false,
            		length:15,
            		length2:0
            	}
            },
            label:{
                normal:{
                    show:true,
                    position:'outside',
                    formatter:function(params){
                        return params.name;
                        //return params.name+'\n'+params.value+'条，占'+params.percent+'%';
                    }
                }
            },
            markPoint:{
                symbol:'circle',
                symbolSize:225,
                data:[
                    {
                        name: '某个屏幕坐标',
                        x: '50%',
                        y: '50%'
                    }],
                itemStyle:{
                    normal:{
                        color:'#293444'

                    },
                    emphasis:{
                        color:'#0b2534'
                    }
                }
            },
            data:[
                {value:235988, name:'交通信号'},
                {value:216322, name:'违章监控'},
                {value:196656, name:'停车分布'},
                {value:78663, name:'公共交通'},
                {value:255653, name:'超速抓拍'}
            ]
        }
    ]            
        };
        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
        myChart.on('click',function (parmas) {
            if(parmas.componentType == "markPoint" && parmas.name == "某个屏幕坐标"){
                $(".zhjtsjzts").hide();
                $(".sthjsjzts").hide();
                $(".jcsssjzts").hide();
                $(".zhcgsjzts").hide();

                //图片拖拽
                dragable('zhjtsjzts');
                for(var i in document.images){
                    document.images[i].ondragstart = imgdragstart;
                }
            }
        });