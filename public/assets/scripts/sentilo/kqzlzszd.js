// 基于准备好的dom，初始化echarts实例
var twoChart = echarts.init(document.getElementById('kqzlzszd'));
// 指定图表的配置项和数据

//twoChart.showLoading();

$.get('/assets/scripts/sentilo/fuzhou.json', function (geoJson) {

    //twoChart.hideLoading();
    //数据来源：http://www.fzhjbh.gov.cn/aqi/amore.aspx
    echarts.registerMap('fuzhou', geoJson);
    var geoCoordMap = {
        "仓山区": [119.320988, 26.038912],
        "马尾区": [119.458725, 25.991975],
        "闽侯县": [119.145117, 26.148567],
        "晋安区": [119.328597, 26.078837],
        "连江县": [119.538365, 26.202109],
        "罗源县": [119.552645, 26.487234],
        "永泰县": [118.939089, 25.864825],
        "闽清县": [118.868416, 26.223793],
        "平潭县": [119.791197, 25.503672],
        "福清市": [119.376992, 25.720402],
        "长乐市": [119.510849, 25.960583],
        "台江区": [119.310156, 26.058616],
        "鼓楼区": [119.29929, 26.082284]
    };
    var data_new=[
        //市控点
        {name:"鼓楼_软件园",value:[119.276805,26.118825,42]},//0   --
        {name:"金山",value:[119.361735,26.012204,33]},//1
        {name:"台江_宁化",value:[119.297136,26.064646,35]}, //2
        {name:"台江_新港",value:[119.323042,26.064045,36]},//3  --
        {name:"台江_区环保局",value:[119.301563,26.069585,35]},//4
        {name:"仓山_市二十九中",value:[119.249263,26.075615,39]},//5
        {name:"晋安_市三十二中",value:[119.326951,26.101553,32]},//6
        {name:"晋安_神康医院",value:[119.302877,26.150821,15]},//7
        {name:"马尾_开发区医院",value:[119.46421,26.00038,40]}, //8
        {name:"马尾_亭江镇政府",value:[119.523332,26.079928,42]},    //9
        {name:"福清_市环境监测站",value:[119.396557,25.730464,30]}, //10
        {name:"福清_石竹派出所",value:[119.33057,25.713762,39]},//11  --
        {name:"福清_石竹山庄",value:[119.297954,25.708259,25]},//12   --
        {name:"长乐_郑和花园",value:[119.517728,25.964786,36]},    //13
        {name:"长乐_市政府",value:[119.529679,25.969187,32]},     //14
        {name:"长乐_实验小学",value:[119.522649,25.968605,259]}, //15
        {name:"闽侯_县环保局",value:[119.150419,26.158918,35]},//16
        {name:"闽侯_县教育局",value:[119.140108,26.158436,29]},//17
        {name:"闽侯_上街镇政府",value:[119.210436,26.080432,45]},//18  --
        {name:"连江_小湾村",value:[119.538415,26.207452,39]},//19
        {name:"闽清_高级中学",value:[118.875591,26.235059,23]}, //20
        {name:"闽清_榕院村",value:[118.858402,26.236569,70]}, //21
        {name:"罗源_县环保局",value:[119.566149,26.491202,63]},//22
        {name:"罗源_县医院",value:[119.555158,26.492159,18]}, //23
        {name:"永泰_上马路",value:[118.946377,25.870407,40]}, //24
        {name:"永泰_城南小学",value:[118.952363,25.866186,39]},//25   --
        {name:"高新区_创新园站",value:[119.214985,26.045528,38]},//26   --

        //国控点
        {name:"五四北路",value:[119.31742,26.132478,39]}, //27
        {name:"紫阳",value:[119.331195,26.082518,30]},    //28

        {name:"师大",value:[119.314722,26.041088,42]},//29
        {name:"杨桥西路",value:[119.28036,26.085115,30]},//30
        {name:"快安",value:[119.424433,26.035007,43]},//31
        {name:"鼓山",value:[119.390538,26.056664,36]}, //32
        //{name:"test",value:[119.385117, 26.100567,7]}, //33
        //{name:"test",value:[119.385117, 26.200567,7]} //33
    ];
    //function convertData (data) {
    //    var res = [];
    //    for (var i = 0; i < data.length; i++) {
    //        var a = {};
    //        a["name"]=data[i].name;
    //        //a["value"]=[];
    //
    //        var geoCoord = geoCoordMap[data[i].name];
    //        if (geoCoord) {
    //            //a.value=geoCoord.concat(data[i].value);
    //        }
    //        res.push(a);
    //    }
    //    console.log(res);
    //    return res;
    //};
    twoChart.setOption(
        {
        //tooltip: {
        //    show:true,
        //    trigger: 'item',
        //    //formatter: '{b}<br/>{c} (p / km2)'
        //    //formatter: '123'
        //    position:'top',
        //    formatter: function (params, ticket, callback) {
        //        console.log(params);
        //        var div = $("#kqzltck_father");
        //        div.children().eq(0).css("display","block");
        //        //div.children().eq(0).text(params.dataIndex);
        //        return div.html();
        //    }
        //},
        //legend:{
        //    show:true,
        //    data:["AQI","标记"]
        //},
        visualMap: {
            show:false,
            type: "piecewise",
            min: 0,
            max: 500,
            splitNumber: 5,
            pieces: [
                {lte:50},
                {gt:50,lte:100},
                {gt:100,lte:150},
                {gt:150,lte:200},
                {gt:200,lte:300},
                {gt:300,lte:500}
            ],
            inRange: {
                color: ["rgb(0,255,144)", 'rgb(255,203,0)', 'rgb(255,144,0)','rgb(219,103,0)','rgb(255,42,0)','rgb(171,0,0)']
            },
            categories: ['严重污染', '重度污染', '中度污染', '轻度污染', '良', '优'].reverse(),
            textStyle: {
                color: '#fff'
            }
        },
        geo: {
            map: 'fuzhou',
            zoom:1.3,
            center:[119.320988, 25.988912,90],
            label:{
                normal:{
                    show: true,
                    textStyle:{color:'#ffffff',fontSize:18,fontWeight: 'bold'}},
                emphasis:{
                    textStyle:{color:'#ffffff',fontSize:18,fontWeight: 'bold'}}
            },
            roam: true,
            scaleLimit:{
                min:1,
                max:10
            },
            itemStyle: {
                normal: {
                    //areaColor: '#01202f',
                    //borderColor: '#1111111'
                    areaColor: 'rgba(27,66,84,0.8)',
                    borderColor: 'rgb(65,170,249)',
                    borderWidth:2
                },
                //emphasis: {
                //    areaColor: '#023953',
                //    borderColor: '#3f3e3e'
                //}
                emphasis: {
                    //areaColor: '#01202f',
                    //borderColor: '#1111111'
                    areaColor: '#1b4254',
                    borderColor: '#338da8'
                }
            }
        },
        series: [
            {
            name: 'AQI',
            type: 'heatmap',
            coordinateSystem: 'geo',
            data:data_new
            //
            ////    convertData([
            ////    {name: "仓山区", value: 350104},
            ////    {name: "马尾区", value: 350105},
            ////    {name: "闽侯县", value: 350121},
            ////    {name: "晋安区", value: 350111},
            ////    {name: "连江县", value: 350122},
            ////    {name: "罗源县", value: 350123},
            ////    {name: "永泰县", value: 350125},
            ////    {name: "闽清县", value: 350124},
            ////    {name: "平潭县", value: 350128},
            ////    {name: "福清市", value: 350181},
            ////    {name: "长乐市", value: 350182},
            ////    {name: "台江区", value: 350103},
            ////    {name: "鼓楼区", value: 350102}
            ////])
            //
            },
            {
                type:"scatter",
                name:"标记",  //用于显示tooltip
                coordinateSystem:"geo",
                symbol:"pin",    //标记的图形
                symbolSize:40,
                //itemStyle:{
                //    normal:{
                //        color:"red"
                //    }
                //},
                data:data_new,
                z:1000

            }


        ]

    });
    twoChart.on("mouseover",function(params){
        if(params.componentType == "series"){
            console.log(params);
            //console.log(window.event.clientX,window.event.clientY);
            var x,y;
            //x=window.event.clientX-220;
            //y=window.event.clientY-200;
            x=window.event.clientX-220+document.body.scrollLeft;
            y=window.event.clientY-300+document.body.scrollTop;
            $(".kqzltck").css({
                "left":x,
                "top":y,
                "display":"block",
                "z-index":100
            });

            $(".kqzltck_a").text(params.data.name);
            //$(".kqzltck .kqzltck_d li:eq(2)").text(params.dataIndex);
            $(".kqzltck_b").text("数据更新时间："+  getNowFormatDate() );
            $(".kqzltck .kqzltck_d li:eq(0)").text(params.data.value[2]);
            $(".kqzltck .kqzltck_d li:eq(1)").text(air(params.data.value[2]));


            function air(num){
                if(num<=50){
                    $(".kqzltck .kqzltck_d li").css("border","#00ff90 solid 5px");
                    return '优';
                }else if(num<=100){
                    $(".kqzltck .kqzltck_d li").css("border","rgb(255,203,0) solid 5px");
                    return '良';
                }else if(num<=150){
                    //$(".kqzltck .kqzltck_d li:eq(1)").css("font-size",12);
                    $(".kqzltck .kqzltck_d li").css("border","rgb(255,144,0) solid 5px");
                    return '轻度污染';
                }else if(num<=200){
                    $(".kqzltck .kqzltck_d li").css("border","rgb(219,103,0) solid 5px");
                    return '中度污染';
                }else if(num<=300){
                    $(".kqzltck .kqzltck_d li").css("border","rgb(171,0,0) solid 5px");
                    return '重度污染';
                }else if(num<=500){
                    return '严重污染';
                }
            }
            function getNowFormatDate(){
                var date = new Date();
                var seperator1 = "-";
                var seperator2 = ":";
                var month = date.getMonth() + 1;
                var strDate = date.getDate();
                if (month >= 1 && month <= 9) {
                    month = "0" + month;
                }
                if (strDate >= 0 && strDate <= 9) {
                    strDate = "0" + strDate;
                }
                var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
                    + " " + date.getHours()+":00"+":00";
                //+ seperator2 + date.getMinutes()
                //    + seperator2 + date.getSeconds();
                return currentdate;
            }
        }
    });
    twoChart.on("mouseout",function(params){
        if(params.componentType == "series"){
            //console.log("out");
            //console.log(window.event.clientX,window.event.clientY);
            $(".kqzltck").css("display","none");
        }
    });

});
