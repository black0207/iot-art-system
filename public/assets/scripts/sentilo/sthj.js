       	// 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('sthj'));
        // 指定图表的配置项和数据
        var option = {  
    color:['#ff8847','#ffc947','#afff47','#2ed9ca','#2ebce4','#47a6ff','#6147ff'],
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
        //show:false,
    	text:'生态环境\n',
    //	link:'####',
    	textStyle:{
    		color:'#999999',
    		fontSize:24
    	},
        subtext: '1156735',
    //    sublink: '####',
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
            name:'生态环境1',
            type:'pie',
            radius : ['50%', '68%'],
            center : ['50%', '50%'],
            silent:true,
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
                },
                emphasis:{
                    show:true,
                    position:'inner',
                    formatter:function(params){
                        return params.percent+'%';
                    },
                    textStyle:{
                        color:'#01202f',
                        fontSize:14,
                        fontWeight:'bolder'
                    }
                }
            },
            itemStyle:{
                normal:{
                    color:'rgba(1,1,1,0)'
                }
            },
            data:[
                {value:260361, name:'空气质量'},
                {value:236702, name:'噪声污染'},
                {value:162726, name:'电磁环境'},
                {value:70976, name:'气象状况'},
                {value:213043, name:'土壤状况'},
                {value:118293, name:'海洋生态'},
                {value:94634, name:'水质状况'}
            ]
        },
        {
            name:'生态环境',
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
                        //return params.name+'\n'+params.value+'条，占'+params.percent+'%';
                        return params.name;
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
                //label:{
                //    normal:{
                //        show:true,
                //        position:'inside',
                //        formatter:function(parmas){
                //
                //        },
                //        text:'生态环境\n\n',
                //        //	link:'####',
                //        textStyle:{
                //            color:'#999999',
                //            fontSize:24
                //        },
                //        subtext: '2536',
                //        //    sublink: '####',
                //        subtextStyle:{
                //            color:'#ffffff',
                //            fontSize:40
                //        },
                //    }
                //}
            },
            data:[
                {value:260361, name:'空气质量'},
                {value:236702, name:'噪声污染'},
                {value:162726, name:'电磁环境'},
                {value:70976, name:'气象状况'},
                {value:213043, name:'土壤状况'},
                {value:118293, name:'海洋生态'},
                {value:94634, name:'水质状况'}
            ]
        }
    ]            
        };
        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
        myChart.on('click',function (parmas) {
            if(parmas.componentType == "markPoint" && parmas.name == "某个屏幕坐标"){
                $(".sthjsjzts").hide();
                //$(".sthjsjzts").css();
                $(".jcsssjzts").hide();
                $(".zhjtsjzts").hide();
                $(".zhcgsjzts").hide();

                //图片拖拽
                dragable('sthjsjzts');
                for(var i in document.images){
                    document.images[i].ondragstart = imgdragstart;
                }
            }
        });