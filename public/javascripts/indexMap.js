$(document).ready(function(){
    var app = {};
    var effectScatterChart = echarts.init(document.getElementById('chart'));
    var option = {
        geo: {
            map: 'china',
            roam: false,
            silent: true,
            label: {
                emphasis: {
                    show: false,
                }
            },
            itemStyle: {
                normal: {
                    areaColor: 'rgba(0, 0, 255, 0)',
                    borderColor: 'rgba(0255, 255, 255, 0)'
                },
                emphasis: {
                    areaColor: 'rgba(128, 128, 128, 0)'
                }
            }
        },
        tooltip: {
            trigger: 'item',
            // triggerOn: 'mousemove',
            backgroundColor: 'rgba(0,0,0,0.7)',
            borderColor: '#00c4e2',
            borderWidth: 1,
            padding: [10,40],
            textStyle: {
                color: '#fff',
                fontSize: 16,
            },
            extraCssText: 'background-color: rgba(0,0,0,0.3); text-align: center; line-height: 30px;'
        },
        series: [
            {
                type: 'effectScatter',
                effectType: 'ripple',
                showEffectOn: 'render',
                rippleEffect: {
                    period: 4,
                    scale: 8,
                    brushType: 'stroke',

                },
                coordinateSystem: 'geo',
                symbol: 'circle',
                symbolSize: 16,
                itemStyle: {
                    normal: {
                        color: '#00c4e2',     
                    }
                },
                data: [
                    {
                        name: '北京',
                        value: [116.46,39.92],
                        tooltip: {
                            position: 'left',
                            formatter: '跨境电商物联港<br/>位置：北京',
                        },
                    },

                    {
                        name: '乌鲁木齐',
                        value: [87.68,43.77],
                        tooltip: {
                            position: 'left',
                            formatter: '化学品物流物联港<br/>位置：乌鲁木齐',
                        },
                    },

                    {
                        name: '嘉兴',
                        value: [120.76,30.77],
                        tooltip: {
                            position: 'left',
                            formatter: '智慧园区物联港<br/>位置：嘉兴',
                        },
                    },

                    {
                        name: '南京',
                        value: [118.78,32.04],
                        tooltip: {
                            position: 'left',
                            formatter: '智慧农业物联港<br/>位置：南京',
                        },
                    },

                    {
                        name: '杭州',
                        value: [120.19,30.26],
                        tooltip: {
                            position: 'left',
                            formatter: '视频物联港<br/>位置：杭州',
                        },
                    },
                    
                ],
                hoverAnimation: true,
                
            }
        ]

    };
    
    app.currentIndex = -1;

    setInterval(function () {
        var dataLen = option.series[0].data.length;
        // 取消之前高亮的图形
        effectScatterChart.dispatchAction({
            type: 'downplay',
            seriesIndex: 0,
            dataIndex: app.currentIndex
        });
        app.currentIndex = (app.currentIndex + 1) % dataLen;
        // 高亮当前图形
        effectScatterChart.dispatchAction({
            type: 'highlight',
            seriesIndex: 0,
            dataIndex: app.currentIndex
        });
        // 显示 tooltip
        effectScatterChart.dispatchAction({
            type: 'showTip',
            seriesIndex: 0,
            dataIndex: app.currentIndex
        });
    }, 3000);

    if (option && typeof option === "object") {
        effectScatterChart.setOption(option, true);
    }

});


