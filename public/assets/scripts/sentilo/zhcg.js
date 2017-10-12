       	// 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('zhcg'));
        // 指定图表的配置项和数据
        var option = {  
    color:['#ff8847','#6147ff','#42c1f5','#42f5b4','#d8ff00'],
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
    	text:'智慧城管\n',
    //	link:'####',
    	textStyle:{
    		color:'#999999',
    		fontSize:24
    	},
        subtext: '585232',
      //  sublink: '####',
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
            name:'智慧城管1',
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
                {value:187274, name:'环境卫生'},
                {value:46818, name:'重点车船'},
                {value:105342, name:'社会综治'},
                {value:117046, name:'防灾应急'},
                {value:128752, name:'林防绿化'}
            ]
        },
        {
            name:'智慧城管',
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
                symbolSize:250,
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
                {value:187274, name:'环境卫生'},
                {value:46818, name:'重点车船'},
                {value:105342, name:'社会综治'},
                {value:117046, name:'防灾应急'},
                {value:128752, name:'林防绿化'}
            ]
        }
    ]            
        };
        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
        myChart.on('click',function (parmas) {
            if(parmas.componentType == "markPoint" && parmas.name == "某个屏幕坐标"){
                $(".zhcgsjzts").hide();
                $(".sthjsjzts").hide();
                $(".jcsssjzts").hide();
                $(".zhjtsjzts").hide();

                //图片拖拽
                dragable('zhcgsjzts');
                for(var i in document.images){
                    document.images[i].ondragstart = imgdragstart;
                }
            }
        });