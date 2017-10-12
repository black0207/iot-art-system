       	// 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('jcss'));
        // 指定图表的配置项和数据
        var option = {  
    color:['#ff8847','#00e1d0'],
    title: { 
    	text:'基础设施\n',
    //	link:'####',
    	textStyle:{
    		color:'#999999',
    		fontSize:24
    	},
        subtext: '349752',
    //    sublink: '####',
    	subtextStyle:{
    		color:'#ffffff',
    		fontSize:40
    	},        
        x: 'center',
        y: '40%'
    },    
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
    textStyle:{
    	fontSize:16,
    	color:'#ffffff'
    },
    calculable : true,
    series : [
        {
            itemStyle:{
                normal:{
                    color:'rgba(1,1,1,0)'
                }
            },
            name:'基础设施1',
            type:'pie',
            silent:true,
            radius : ['50%', '68%'],
            center : ['50%', '50%'],
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
                {value:223841, name:'地下管线'},
                {value:125911, name:'城市部件'}
            ]
        },
        {
            name:'基础设施',
            type:'pie',
            radius : ['50%', '68%'],
            center : ['50%', '50%'],
            labelLine:{
            	normal:{
                    show:false,
            		length:10,
            		length2:10
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
                {value:223841, name:'地下管线'},
                {value:125911, name:'城市部件'}
            ]
        }
    ]            
        };
        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
        myChart.on('click',function (parmas) {
            if(parmas.componentType == "markPoint" && parmas.name == "某个屏幕坐标"){
                $(".jcsssjzts").show();
                $(".sthjsjzts").hide();
                $(".zhjtsjzts").hide();
                $(".zhcgsjzts").hide();

                //图片拖拽
                dragable('jcsssjzts');
                for(var i in document.images){
                    document.images[i].ondragstart = imgdragstart;
                }
            }
        });