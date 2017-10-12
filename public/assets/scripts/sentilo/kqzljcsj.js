// 基于准备好的dom，初始化echarts实例
var myChart = echarts.init(document.getElementById('kqzljcsj'));
// 指定图表的配置项和数据
var china_24h=[];
var usa_24h=[];
var china_30d = [];
var usa_30d=[];

china_24h = [[ 83.43, 18.67, 46.24, 34.64, 89.34, 17.13, 48.86, 10.00, 23.13, 27.26, 8.20, 38.66, 16.96, 21.56, 20.43, 35.26, 28.66, 27.07, 5.44, 10.73, 9.20, 45.41, 1.31, 36.89],[ 38.61, 45.77, 54.45, 89.28, 4.70, 18.19, 27.21, 27.03, 44.06, 1.33, 3.43, 0.86, 45.01, 35.16, 42.86, 5.60, 44.01, 41.20, 30.67, 33.86, 13.80, 32.96, 44.00, 37.50],[ 53.72, 49.49, 26.00, 90.57, 49.86, 16.57, 36.20, 44.17, 27.70, 10.79, 15.51, 29.19, 18.56, 3.34, 15.96, 19.79, 47.59, 17.19, 49.20, 27.09, 38.19, 48.49, 49.47, 32.04],[ 64.41, 74.39, 11.04, 35.09, 46.34, 47.53, 34.10, 26.26, 1.81, 9.23, 41.83, 45.66, 34.29, 39.03, 37.93, 39.54, 14.76, 45.41, 36.01, 25.67, 9.94, 27.14, 31.04, 21.20],[ 48.17, 67.51, 85.26, 32.49, 32.71, 31.14, 2.84, 15.13, 39.91, 37.06, 23.20, 4.80, 46.60, 48.46, 8.03, 39.06, 27.50, 16.11, 10.30, 35.29, 38.39, 39.90, 48.51, 40.16],[ 12.09, 82.67, 74.83, 9.23, 42.56, 0.76, 4.87, 7.64, 13.94, 21.74, 39.26, 18.49, 8.31, 10.30, 27.59, 27.73, 40.86, 37.26, 3.83, 46.93, 16.69, 16.19, 28.20, 20.74],[ 76.17, 28.47, 73.56, 17.79, 8.36, 35.25, 44.63, 35.90, 21.00, 36.86, 9.70, 33.37, 17.26, 39.30, 19.01, 14.77, 3.51, 3.39, 27.86, 25.06, 6.46, 41.09, 13.90, 40.59]];
usa_24h = [[153.55, 52.33, 94.28, 76.63, 156.04, 49.96, 98.26, 29.17, 59.11, 65.39, 23.92, 82.74, 49.46, 56.72, 55.00, 77.57, 67.52, 65.11, 15.88, 31.29, 26.83, 93.02, 3.83, 80.04],[92.41, 93.57, 108.90, 156.01, 13.71, 51.59, 65.33, 65.04, 90.96, 3.88, 10.00, 2.50, 92.41, 77.41, 89.13, 16.33, 90.89, 86.61, 70.59, 75.43, 40.25, 74.07, 90.87, 80.98],[107.45, 99.22, 63.48, 156.56, 99.78, 48.33, 79.00, 91.13, 66.07, 31.46, 45.25, 68.33, 52.15, 9.75, 46.54, 54.02, 96.33, 50.07, 98.78, 65.13, 82.02, 97.70, 99.20, 72.67],[128.82, 148.77, 32.21, 77.30, 94.43, 96.24, 75.80, 63.87, 5.29, 26.92, 87.57, 93.39, 76.09, 83.30, 81.63, 84.09, 43.04, 93.02, 78.72, 62.98, 29.00, 65.22, 71.15, 56.17],[97.22, 135.02, 154.32, 73.35, 73.70, 71.30, 8.29, 44.13, 84.65, 80.30, 59.22, 14.00, 94.83, 97.65, 23.42, 83.35, 65.76, 47.00, 30.04, 77.61, 82.33, 84.63, 97.74, 85.02],[48.54, 157.33, 149.65, 26.92, 88.67, 2.21, 14.21, 22.29, 40.67, 57.00, 83.65, 52.04, 24.25, 30.04, 65.89, 66.11, 86.09, 80.61, 11.17, 95.33, 48.67, 47.21, 66.83, 55.48],[150.49, 67.24, 147.13, 50.98, 24.38, 97.78, 91.83, 78.54, 55.87, 80.00, 28.29, 74.70, 50.17, 83.72, 52.85, 43.08, 10.25, 9.88, 66.30, 62.04, 18.83, 86.43, 40.54, 85.67]];
china_30d = [[8.71, 15.99, 2.39, 5.49, 25.79, 0.50, 36.73, 1.30, 24.91, 22.29, 1.26, 5.64, 38.41, 21.64, 0.94, 9.41, 9.41, 48.13, 12.99, 15.06, 11.67, 9.69, 8.16, 19.21, 39.88, 30.93, 24.23, 27.01, 23.79, 33.10],[46.40, 7.93, 19.69, 15.91, 32.71, 43.07, 7.66, 37.84, 10.94, 24.43, 23.37, 32.40, 9.83, 26.27, 48.11, 25.19, 45.00, 40.14, 11.54, 46.39, 14.30, 13.17, 48.54, 13.97, 13.69, 1.83, 42.69, 23.70, 28.89, 25.66],[47.49, 26.87, 0.43, 13.69, 42.33, 28.13, 12.59, 29.11, 40.27, 39.04, 47.19, 37.24, 36.61, 20.69, 0.93, 28.54, 39.24, 7.01, 9.53, 22.20, 7.19, 15.51, 40.11, 39.34, 27.79, 16.94, 32.17, 45.25, 34.39, 44.76],[39.23, 8.63, 24.76, 19.13, 33.74, 10.03, 47.39, 37.13, 12.76, 38.39, 6.17, 49.94, 19.04, 3.71, 16.19, 39.40, 45.73, 39.50, 18.04, 22.71, 16.63, 29.04, 45.43, 9.11, 27.34, 18.60, 7.61, 39.91, 34.51, 3.01],[30.50, 30.10, 34.71, 0.01, 28.79, 31.17, 23.87, 40.81, 3.66, 3.30, 15.23, 13.09, 8.37, 27.26, 38.61, 42.50, 31.57, 47.94, 18.84, 21.23, 23.91, 10.24, 16.81, 6.04, 1.01, 2.23, 24.27, 29.88, 49.54, 35.09],[17.87, 34.09, 47.73, 48.06, 19.11, 29.79, 37.06, 9.20, 33.66, 23.73, 24.41, 14.43, 31.67, 2.56, 18.99, 9.29, 29.73, 35.44, 14.69, 46.74, 17.04, 10.46, 23.99, 24.89, 8.46, 40.06, 10.43, 7.39, 10.39, 42.69],[22.91, 39.99, 27.91, 20.11, 33.06, 6.69, 47.91, 28.36, 43.09, 0.87, 9.81, 9.84, 36.59, 10.14, 27.90, 12.29, 38.54, 22.56, 22.86, 41.64, 48.91, 1.94, 21.14, 0.36, 26.70, 47.59, 21.49, 5.67, 40.91, 1.04]];
usa_30d = [[25.42, 46.63, 6.96, 16.00, 63.15, 1.46, 79.80, 3.79, 61.83, 57.83, 3.67, 16.46, 82.37, 56.85, 2.75, 27.46, 27.46, 97.15, 37.88, 43.92, 34.04, 28.25, 23.79, 53.15,49.01, 43.92, 34.04, 28.25, 34.54, 53.15],[94.52, 23.13, 53.87, 46.42, 73.70, 89.46, 22.33, 81.50, 31.92, 61.09, 59.48, 73.22, 28.67, 63.89, 97.13, 62.24, 92.39, 85.00, 33.67, 94.50, 41.71, 38.42, 97.78, 40.75, 33.67, 94.50, 41.71, 38.42, 97.78, 40.75],[96.17, 64.80, 1.25, 39.92, 88.33, 66.72, 36.71, 68.22, 85.20, 83.33, 95.72, 80.59, 79.63, 55.39, 2.71, 67.35, 83.63, 20.46, 49.94, 57.70, 20.96, 45.25, 84.96, 83.78, 27.79, 57.70, 20.96, 48.77, 84.96, 83.78],[83.61, 25.17, 61.59, 53.02, 75.26, 29.25, 96.02, 80.41, 37.21, 82.33, 18.00, 99.91, 52.89, 10.83, 47.21, 83.87, 93.50, 84.02, 51.37, 58.48, 48.50, 68.11, 93.04, 26.58, 51.37, 58.48, 48.50, 68.11, 93.04, 26.58],[70.33, 69.72, 76.74, 0.04, 67.72, 71.35, 60.24, 86.02, 10.67, 9.63, 44.42, 38.17, 24.42, 65.39, 82.67, 88.59, 71.96, 96.87, 52.59, 56.22, 60.30, 29.88, 49.04, 17.63, 52.59, 56.22, 60.30, 49.11, 19.53, 17.63],[51.11, 75.78, 96.54, 97.04, 53.00, 69.24, 80.30, 26.83, 75.13, 60.02, 61.07, 42.08, 72.11, 7.46, 52.80, 27.08, 69.15, 77.85, 42.83, 95.04, 49.71, 30.50, 60.41, 61.78, 42.83, 95.04, 49.71, 30.50, 60.41, 61.78],[58.78, 84.76, 66.39, 54.52, 74.22, 19.50, 96.83, 67.07, 89.48, 2.54, 28.63, 28.71, 79.59, 29.58, 66.37, 35.83, 82.57, 58.24, 58.70, 87.28, 98.35, 7.41, 56.09, 1.04, 58.70, 87.28, 98.35, 5.67, 56.09, 34.1]];

china_24h = creatNewData(china_24h);
usa_24h = creatNewData(usa_24h);
china_30d = creatNewData(china_30d);
usa_30d = creatNewData(usa_30d);

function creatNewData(china_24h){
    for(var i = 0;i<china_24h.length;i++){
        for(var j = 0;j<china_24h[i].length;j++){
            china_24h[i][j] = Math.round(china_24h[i][j]);
        }
    }
    var arra = [];
    for(var j = 0;j<china_24h[0].length;j++){
        var temp = [];
        for(var i = 0;i<china_24h.length;i++){
            temp.push(china_24h[i][j]);
        }
        temp.sort(sortNumber);
        arra.push(temp);
    }

    for(var i = 0;i<arra[0].length;i++){
        for(var j = 0;j<china_24h[i].length;j++){
            china_24h[i].splice(0,1,arra[i][china_24h.length-1]);
        }
    }
    return china_24h;
}

function sortNumber(a,b)
{
    return a - b
}

function china_standard(num){
    var result;
    //num为PM2.5浓度
    //换算标准：http://www.pm25.com/news/96.html
    if(num<35){
        result = 0+(num-0)*((50-0)/(35-0));
    }else if(num <75){
        result = 50+(num-35)*((100-50)/(75-35));
    }else if(num <115){
        result = 100+(num-75)*((150-100)/(115-75));
    }else if(num <150){
        result = 150+(num-115)*((200-150)/(150-115));
    }else if(num <250){
        result = 200+(num-150)*((300-200)/(250-150));
    }else if(num <500){
        result = 300+(num-250)*((500-300)/(500-250));
    }
    return result.toFixed(0);
}
function usa_standard(num){
    var result;
    //num为PM2.5浓度
    //换算标准：http://www.pm25.com/news/96.html
    if(num<12){
        result = 0+(num-0)*((50-0)/(12-0));
    }else if(num <35){
        result = 50+(num-12)*((100-50)/(35-12));
    }else if(num <55){
        result = 100+(num-35)*((150-100)/(55-35));
    }else if(num <150){
        result = 150+(num-55)*((200-150)/(150-55));
    }else if(num <250){
        result = 200+(num-150)*((300-200)/(250-150));
    }else if(num <500){
        result = 300+(num-250)*((500-300)/(500-250));
    }
    return result.toFixed(0);
}

//要构造数据，就把该函数名以及结尾大括号注释起来
//构造了数据后，把该函数取消注释即可。用函数包含起来不用的函数端。
function createData() {

    //这里生成的是浓度
    var tooHigh = 3; //太大的数据  数量最多为3，其它的为小随机数。
    var tooHighNum = 35; //小数据的范围，最大值
    var maxRandom = 75; //最大随机数
    var littleRandom = 35; //生成 小随机数的 范围。

//构造一天的数据
    for (var j = 0; j < 7; ++j) {
        china_24h[j] = new Array();
        usa_24h[j] = new Array();
        tooHigh = 3;
        for (var i = 0; i < 24; ++i) {
            //var a = Math.random()*100;
            var linshi = (Math.random() * maxRandom).toFixed(2);
            if (linshi > tooHighNum) {
                tooHigh--;
            }
            if (tooHigh <= 0) {
                linshi = (Math.random() * littleRandom).toFixed(2);
            }
            china_24h[j][i] = china_standard(linshi);
            usa_24h[j][i] = usa_standard(linshi);
        }
    }
    //构造一月的数据
    for (j = 0; j < 7; ++j) {
        china_30d[j] = new Array();
        usa_30d[j] = new Array();
        for (i = 0; i < 30; ++i) {
            var linshi = (Math.random() * maxRandom).toFixed(2);
            if (linshi > tooHighNum) {
                tooHigh--;
            }
            if (tooHigh <= 0) {
                linshi = (Math.random() * littleRandom).toFixed(2);
            }
            china_30d[j][i] = china_standard(linshi);
            usa_30d[j][i] = usa_standard(linshi);
        }
    }
}
//构造数据函数结束


//打印到控制台，复制该数据到文件头
function printf(){
var str1 = "china_24h = [";
for(var i =0; i < 7 ;++i){
    str1 +="[ ";
    for(var j = 0; j < 24; ++j){
        str1 += china_24h[i][j]+", ";
    }
    str1 = str1.substring(0,str1.length-2);
    str1 +="],";
}
str1 = str1.substring(0,str1.length-1);
var str2 = "usa_24h = [";
for( i =0; i < 7 ;++i){
    str2 +="[";
    for(j = 0; j < 24; ++j){
        str2 += usa_24h[i][j]+", ";
    }
    str2 = str2.substring(0,str2.length-2);
    str2 +="],";
}
str2 = str2.substring(0,str2.length-1);
var str3 ="china_30d = [";
for( i =0; i < 7 ;++i){
    str3 +="[";
    for(j = 0; j < 30; ++j){
        str3 += china_30d[i][j]+", ";
    }
    str3 = str3.substring(0,str3.length-2);
    str3 +="],";
}
str3 = str3.substring(0,str3.length-1);
var str4 = "usa_30d = [";
for( i =0; i < 7 ;++i){
    str4 +="[";
    for(j = 0; j < 24; ++j){
        str4 += usa_30d[i][j]+", ";
    }
    str4 = str4.substring(0,str4.length-2);
    str4 +="],";
}
str4 = str4.substring(0,str4.length-1);
str1 += "];";str2 += "];";str3 += "];";str4 += "];";
console.log(str1+"\n"+str2+"\n"+str3+"\n"+str4);
}
//打印结束

var x_24time = (new Date()).getTime();
//var x_24h = [ '1时', '2时', '3时', '4时', '5时', '6时', '7时', '8时', '9时', '10时',
//    '11时','12时', '13时', '14时', '15时', '16时', '17时', '18时', '19时', '20时', '21时', '22时', '23时','24时'];
var x_24h = [];
for(var i = 0;i<24;i++){
    var temp = (new Date(x_24time-3600*1000*(23-i)));
    if(temp.getHours()!=0){
        x_24h.push(temp.getHours()+'时');
    }else{
        x_24h.push(temp.getDate()+'日'+temp.getHours()+'时');
    }
}
//var x_30d = ["1天","2天","3天","4天","5天","6天","7天","8天","9天","10天",
//    "11天","12天","13天","14天","15天","16天","17天","18天","19天","20天",
//    "21天","22天","23天","24天","25天","26天","27天","28天","29天","30天"];
var x_30d = [];
for(var i = 0;i<30;i++){
    var temp = (new Date(x_24time-24*3600*1000*(29-i)));
    if(temp.getDate()!=1){
        x_30d.push(temp.getDate()+'日');
    }else{
        x_30d.push((temp.getMonth()+1)+'月'+temp.getDate()+'日');
    }
}
var option1 = {
    tooltip: {
        trigger: 'axis',
        borderColor:'#96ff49',
        borderWidth:1,
        axisPointer:{
            lineStyle:{
                color:'#96ff49'
            }
        }
    },
    textStyle: {
        fontSize: 18,
        color: '#ffffff'
    },
    legend: {
        data: ['中国标准', '美国标准'],
        textStyle: {
            fontSize: 18,
            color: '#ffffff'
        },
        bottom: '0%'
    },
    grid: {
        left: '0%',
        right: '4%',
        bottom: '8%',
        top: '12%',
        containLabel: true
    },

    xAxis: {
        name: '时间\n\n',
        type: 'category',
        axisLine: {
            lineStyle: {
                color: '#3d4045'
            }
        },
        boundaryGap: false,
        data: x_24h
    },
    yAxis: {
        type: 'value',
        axisLine: {
            show:false,
            lineStyle: {
                color: '#3d4045'
            }
        },
        splitLine: {
            show: true,
            lineStyle: {
                type: 'dashed',
                color: '#3d4045'
            }
        },
        boundaryGap: false
        //data: ['10', '20', '30', '40', '50', '60', '70']
    },
    series:[
        {
            type: "line",
            name: "美国标准",
            data: usa_24h[0],
            symbol:'rect',
            symbolSize:6,
            lineStyle:{
                normal:{
                    color:'#3385ff'
                }
            },
            itemStyle:{
                normal:{
                    color:'#3385ff'
                }
            }
        },
        {
            type: "line",
            name: "中国标准",
            data: china_24h[0],
            symbol:'rect',
            symbolSize:6,
            lineStyle:{
                normal:{
                    color:'#96ff49'
                }
            },
            itemStyle:{
                normal:{
                    color:'#96ff49'
                }
            }
        }
    ]
};
// 使用刚指定的配置项和数据显示图表。
myChart.setOption(option1);

function showData(){
    if($(".akqzl_a_left").attr("title")=="最近24小时"){
        if($(".bkqzl_a_left").attr("title")=="AQI"){
            option1.series[0].data=china_24h[0];
            option1.series[1].data=usa_24h[0];
        }else if($(".bkqzl_a_left").attr("title")=="SO2"){
            option1.series[0].data=china_24h[1];
            option1.series[1].data=usa_24h[1];
        }else if($(".bkqzl_a_left").attr("title")=="CO"){
            option1.series[0].data=china_24h[2];
            option1.series[1].data=usa_24h[2];
        }else if($(".bkqzl_a_left").attr("title")=="NO"){
            option1.series[0].data=china_24h[3];
            option1.series[1].data=usa_24h[3];
        }else if($(".bkqzl_a_left").attr("title")=="O3"){
            option1.series[0].data=china_24h[4];
            option1.series[1].data=usa_24h[4];
        }else if($(".bkqzl_a_left").attr("title")=="PM2.5"){
            option1.series[0].data=china_24h[5];
            option1.series[1].data=usa_24h[5];
        }else if($(".bkqzl_a_left").attr("title")=="PM10"){
            option1.series[0].data=china_24h[6];
            option1.series[1].data=usa_24h[6];
        }
    }else if($(".akqzl_a_left").attr("title")=="最近30天"){
        if($(".bkqzl_a_left").attr("title")=="AQI"){
            option1.series[0].data=china_30d[0];
            option1.series[1].data=usa_30d[0];
        }else if($(".bkqzl_a_left").attr("title")=="SO2"){
            option1.series[0].data=china_30d[1];
            option1.series[1].data=usa_30d[1];
        }else if($(".bkqzl_a_left").attr("title")=="CO"){
            option1.series[0].data=china_30d[2];
            option1.series[1].data=usa_30d[2];
        }else if($(".bkqzl_a_left").attr("title")=="NO"){
            option1.series[0].data=china_30d[3];
            option1.series[1].data=usa_30d[3];
        }else if($(".bkqzl_a_left").attr("title")=="O3"){
            option1.series[0].data=china_30d[4];
            option1.series[1].data=usa_30d[4];
        }else if($(".bkqzl_a_left").attr("title")=="PM2.5"){
            option1.series[0].data=china_30d[5];
            option1.series[1].data=usa_30d[5];
        }else if($(".bkqzl_a_left").attr("title")=="PM10"){
            option1.series[0].data=china_30d[6];
            option1.series[1].data=usa_30d[6];
        }
    }
    myChart.setOption(option1);
}
function gasType(div,obj){
    $(".bkqzl_b").hide();
    if($(div).attr("title") == "AQI"){//AQI
        $(".bkqzl_a_left").text("AQI");
        $(".bkqzl_a_left").attr("title","AQI");
    } else if($(div).attr("title") == "SO2"){//SO2
        $(".bkqzl_a_left").text("SO");
        $(".bkqzl_a_left").append("<sub>2</sub>");
        $(".bkqzl_a_left").attr("title","SO2");
    }else if($(div).attr("title") == "CO"){//CO
        $(".bkqzl_a_left").text("CO");
        $(".bkqzl_a_left").attr("title","CO");
    }else if($(div).attr("title") == "NO"){//NO
        $(".bkqzl_a_left").text("NO");
        $(".bkqzl_a_left").attr("title","NO");
    }else if($(div).attr("title") == "O3"){//O3
        $(".bkqzl_a_left").text("O");
        $(".bkqzl_a_left").append("<sub>3</sub>");
        $(".bkqzl_a_left").attr("title","O3");
    }else if($(div).attr("title") == "PM2.5"){//PM2.5
        $(".bkqzl_a_left").text("PM2.5");
        $(".bkqzl_a_left").attr("title","PM2.5");
    }else if($(div).attr("title") == "PM10"){//PM10
        $(".bkqzl_a_left").text("PM10");
        $(".bkqzl_a_left").attr("title","PM10");
    }

    $(obj).css({
        backgroundColor:'rgb(41,52,68)'
    });

    $(obj).siblings().css({
        backgroundColor:'rgba(0,0,0,0)'
    });
}
    $(".bkqzl_b li").click(function(){gasType($(this).children(),this);showData();});

function timeType(num,obj){
    $(".akqzl_b").hide();
    if(num == 0){
        //option1.series[0].data=china_24h;
        $(".akqzl_a_left").text("最近24小时");
        $(".akqzl_a_left").attr("title","最近24小时");
        option1.xAxis.data = x_24h;
    }else if(num ==1){
        //option1.series[0].data=china_30d;
        $(".akqzl_a_left").text("最近30天");
        $(".akqzl_a_left").attr("title","最近30天");
        option1.xAxis.data = x_30d;
    }

    $(obj).css({
        backgroundColor:'rgb(41,52,68)'
    });

    $(obj).siblings().css({
        backgroundColor:'rgba(0,0,0,0)'
    });
}

$(".akqzl_b li:eq(0)").click(function(){timeType(0,this);showData();});
$(".akqzl_b li:eq(1)").click(function(){timeType(1,this);showData();});
