// 百度地图加载
var map = new BMap.Map("map", {enableMapClick: false});    // 创建Map实例
map.centerAndZoom(new BMap.Point(119.327023, 26.066687), 14);  // 初始化地图,设置中心点坐标和地图级别

map.addControl(new BMap.MapTypeControl({mapTypes: [BMAP_NORMAL_MAP, BMAP_HYBRID_MAP]}));   //添加地图类型控件
map.setCurrentCity("福州");          // 设置三维地图显示
map.enableScrollWheelZoom(true);     //开启鼠标滚轮缩放
map.setMinZoom(14);
map.setMaxZoom(16);


///地图样式
map.setMapStyle({styleJson: styleJson});
//map.setMapStyle({style: 'midnight'});

var overView = new BMap.OverviewMapControl();
var overViewOpen = new BMap.OverviewMapControl({isOpen: true, anchor: BMAP_ANCHOR_BOTTOM_RIGHT});

///添加默认缩略地图控件
//map.addControl(overView);
//map.addControl(overViewOpen); //右下角，打开

//添加缩放控件
var opts = {type: BMAP_NAVIGATION_CONTROL_ZOOM, anchor: BMAP_ANCHOR_BOTTOM_RIGHT}
map.addControl(new BMap.NavigationControl(opts));

//地图事件
map.addEventListener("zoomend", changeHeatImgSize);


//全局变量
var markerYl, markerZD;

//影响点信息框
var yxdInfoBox = new BMapLib.InfoBox(map, "", {
    boxStyle: {background: "url('') no-repeat center top", width: "220px", height: "auto"}
    , closeIconMargin: "5px 5px 0 0", enableAutoPan: true, align: INFOBOX_AT_TOP, offset: new BMap.Size(0, 40)
    , closeIconUrl: "/assets/img/sentilo/map-icons/water-lsts/infobox_icon.png"
});

//异常水表
var ycsbInfoBox = new BMapLib.InfoBox(map, "", {
    boxStyle: {background: "url('') no-repeat center top", width: "700px", height: "auto"}
    , closeIconMargin: "20px 15px 0 0", enableAutoPan: true, align: INFOBOX_AT_TOP, offset: new BMap.Size(0, 20)
    , closeIconUrl: "/assets/img/sentilo/map-icons/infobox_icon32.ico"
});

//热力水表
var rlInfoBox = new BMapLib.InfoBox(map, "", {
    boxStyle: {background: "url('') no-repeat center top", width: "587px", height: "auto"}
    , closeIconMargin: "20px 15px 0 0", enableAutoPan: true, align: INFOBOX_AT_TOP, offset: new BMap.Size(0, 20)
    , closeIconUrl: "/assets/img/sentilo/map-icons/infobox_icon32.ico"
});

//热力水表
var reportInfoBox = new BMapLib.InfoBox(map, "", {
    boxStyle: {background: "url('') no-repeat center top", width: "946px", height: "auto"}
    , closeIconMargin: "20px 15px 0 0", enableAutoPan: true, align: INFOBOX_AT_TOP, offset: new BMap.Size(0, 20)
    , closeIconUrl: "/assets/img/sentilo/map-icons/infobox_icon32.ico"
});

//添加数据
addHeatAreaPoint();
addPoint();
addPolyline();
addInfluencePoint();

//openReportInfoBox('yl');
/**
 *创建点
 */
function addPoint() {
    for (var i = 0; i < shuibiao.features.length; i++) {
        var coord = shuibiao.features[i].geometry.coordinates;
        ///坐标转换
        //wgs84转国测局坐标
        var wgs84togcj02 = coordtransform.wgs84togcj02(coord[0], coord[1]);
        //国测局坐标转百度经纬度坐标
        var gcj02tobd09 = coordtransform.gcj02tobd09(wgs84togcj02[0], wgs84togcj02[1]);

        //添加点标记
        var point = new BMap.Point(gcj02tobd09[0], gcj02tobd09[1]);

        //处理异常点
        var fid = shuibiao.features[i].properties.FID;
        var icon = getPointIcon(fid);

        //设置图标
        var icon = new BMap.Icon(icon, new BMap.Size(45, 45), {  // 设置图片大小
            anchor: new BMap.Size(22, 22),// 指定定位位置偏移。
            imageOffset: new BMap.Size(0, 0)   // 设置雪碧图偏移
        });
        var enableClick = false;
        if (fid == 51 || fid == 37) {
            enableClick = true;
        }

        var marker = new BMap.Marker(point, {icon: icon, enableClicking: enableClick});
        map.addOverlay(marker);

        //添加监听
        if (fid == 51) {
            marker.pointType = "yl";
            marker.addEventListener("click", ycsbPointClickEvent);
        }
        if (fid == 37) {
            marker.pointType = "zd";
            marker.addEventListener("click", ycsbPointClickEvent);
        }
    }
}

function getPointIcon(fid) {
    var icon = "/assets/img/sentilo/map-icons/water-lsts/lsts_wm.png";
    //余氯异常
    var a = [48, 53, 52];
    if (a.indexOf(fid) >= 0) {
        icon = "/assets/img/sentilo/map-icons/water-szts/szts_yl_a.png";
    }
    else if (fid == 51) {
        icon = "/assets/img/sentilo/map-icons/water-szts/szts_yl_b.png";
    }

    //浊度异常
    var b = [36, 38, 39, 45];
    if (b.indexOf(fid) >= 0) {
        icon = "/assets/img/sentilo/map-icons/water-szts/szts_zd_a.png";
    }
    else if (fid == 37) {
        icon = "/assets/img/sentilo/map-icons/water-szts/szts_zd_b.png";
    }

    return icon;
}


/**
 *创建线
 */
function addPolyline() {
    for (var i = 0; i < guanxian.features.length; i++) {
        var coords = guanxian.features[i].geometry.coordinates;
        var points = [];
        //坐标转换
        for (var j = 0; j < coords.length; j++) {
            var coord = coords[j];

            var wgs84togcj02 = coordtransform.wgs84togcj02(coord[0], coord[1]);
            var gcj02tobd09 = coordtransform.gcj02tobd09(wgs84togcj02[0], wgs84togcj02[1]);

            points[j] = new BMap.Point(gcj02tobd09[0], gcj02tobd09[1]);
        }

        //添加线标记
        var polyline = new BMap.Polyline(points, {strokeColor: "#018883", strokeWeight: 2, strokeOpacity: 1});

        //添加监听
        // polyline.addEventListener("mouseover",overlay_style);
        // polyline.addEventListener("mouseout",overlay_style);

        map.addOverlay(polyline);
    }
}

/**
 *创建受影响地区点
 */
function addInfluencePoint() {
    var points = [
        {"name": "福州市华侨中学", "coord": [119.311149, 26.065709]},
        {"name": "福州市第四中学", "coord": [119.315748, 26.061236]},
        {"name": "福州市台江第六中心小学", "coord": [119.311328, 26.061924]},
        {"name": "福州市亚峰中心小学", "coord": [119.349853, 26.062971]},
        {"name": "福州市红星苑小区", "coord": [119.345007, 26.0635]},
        {"name": "福州市光明港新村", "coord": [119.346846, 26.060981]}
    ];

    for (var i = 0; i < points.length; i++) {
        var coord = points[i].coord;
        //添加点标记
        var point = new BMap.Point(coord[0], coord[1]);
        //设置图标
        var icon = new BMap.Icon("/assets/img/sentilo/map-icons/water-szts/szts_influence.png", new BMap.Size(21, 31), {  // 设置图片大小
            anchor: new BMap.Size(10, 31),// 指定定位位置偏移。
            imageOffset: new BMap.Size(0, 0)   // 设置雪碧图偏移
        });

        var marker = new BMap.Marker(point, {icon: icon});
        map.addOverlay(marker);
        marker.pointName = points[i].name;

        //添加监听
        marker.addEventListener("click", yxdPointClickEvent);
        marker.addEventListener("mouseover", yxdPointMouseOverEvent);
        marker.addEventListener("mouseout", yxdPointMouseOutEvent);
    }
}

/**
 *创建热力地区点
 */
function addHeatAreaPoint() {
    var points = [
        {"name": "余氯异常", "coord": [119.301285841, 26.0614658320001]},
        {"name": "浊度异常", "coord": [119.330949808, 26.066118917]}
    ];

    for (var i = 0; i < points.length; i++) {
        var coord = points[i].coord;

        var wgs84togcj02 = coordtransform.wgs84togcj02(coord[0], coord[1]);
        var gcj02tobd09 = coordtransform.gcj02tobd09(wgs84togcj02[0], wgs84togcj02[1]);

        //添加点标记
        var point = new BMap.Point(gcj02tobd09[0], gcj02tobd09[1]);

        //设置图标
        var icon = new BMap.Icon("/assets/img/sentilo/map-icons/water-szts/" + (i == 0 ? "szts_heat_yl_1.png" : "szts_heat_zd_1.png"), new BMap.Size(247, 385), {  // 设置图片大小
            anchor: new BMap.Size(123, 195),// 指定定位位置偏移。
            imageOffset: new BMap.Size(0, 0)   // 设置雪碧图偏移
        });

        var marker = new BMap.Marker(point, {icon: icon});
        map.addOverlay(marker);
        marker.setZIndex(-99999999);
        if (i == 0) {
            markerYl = marker;
            markerYl.pointType = "yl";
        }
        else {
            markerZD = marker;
            marker.pointType = "zd";
        }

        //添加监听
        marker.addEventListener("click", rlPointClickEvent);
        //markerZD.addEventListener("click", rlPointClickEvent);

    }
}

/////////////////////监听事件/////////////////////

/*************影响点************/
function yxdPointMouseOverEvent(e) {
    var marker = e.target;
    var html = "" +
        "<div id='infoBoxContent'class='infoBoxContent' style='text-align: center; font-size:18px;padding:5px;width:auto;background-color: rgba(0,0,0,0.8);color:white;-moz-border-radius: 8px;-webkit-border-radius: 8px;border-radius:8px;border: 1px solid #018883;' onclick='yxdInfoBoxClose()'>" +
        " <div style='margin:0px;'>" +
        marker.pointName;
    +"</div>" +
    "</div>";

    closeAllInfoBox();
    yxdInfoBox.open(marker);
    yxdInfoBox.setContent(html);
}

function yxdPointMouseOutEvent() {
    yxdInfoBox.close();
}

function yxdPointClickEvent() {

}

function yxdInfoBoxClose() {
    yxdInfoBox.close();
}

/*************异常水表************/
function ycsbPointClickEvent(e) {
    var marker = e.target;
    var html = "" +
        "<div id='infoBoxContent'class='infoBoxContent' style='font-size:16px;padding:0px;width:auto;'>" +
        "</div><div style='margin:0px;'>" +
        "<img src='/assets/img/sentilo/map-icons/water-szts/szts_ycsb_" + marker.pointType + ".png'>" +
        "</div>" +
        "</div>";

    closeAllInfoBox();
    ycsbInfoBox.open(marker);
    ycsbInfoBox.setContent(html);
}

function ycsbInfoBoxClose() {
    ycsbInfoBox.close();
}

/*************热力区************/

function rlPointClickEvent(e) {
    var marker = e.target;
    var html = "" +
        "<div id='infoBoxContent'class='infoBoxContent' style='font-size:16px;padding:0px;width:auto;'>" +
        "</div><div style='margin:0px;'>" +
        "<img src='/assets/img/sentilo/map-icons/water-szts/szts_heat_data_" + marker.pointType + ".png'>" +
        "<a href='javascript:void(0);' onclick=openReportInfoBox('" + marker.pointType + "');return false;' style='width:105px;height:40px;position:absolute;bottom:18px;left:243px;'></a>"
    "</div>" +
    "</div>";

    closeAllInfoBox();
    rlInfoBox.open(marker);
    rlInfoBox.setContent(html);
}

function openReportInfoBox(type) {
    var points = [
        {"name": "余氯异常", "coord": [119.301285841, 26.0614658320001]},
        {"name": "浊度异常", "coord": [119.330949808, 26.066118917]}
    ];
    var point;
    if (type == 'yl')
        point = new BMap.Point(points[0].coord[0], points[0].coord[1]);
    else
        point = new BMap.Point(points[1].coord[0], points[1].coord[1]);
    // type = "\'" + type + "\'";
    var html = "" +
        "<div id='reportInfoBoxContent'class='reportInfoBox' style='font-size:16px;padding:0px;width:auto;'>" +
        "<div >" +
        "<img class='reportImg' src='/assets/img/sentilo/map-icons/water-szts/szts_report_" + type + ".png'>" +
        "<a href='javascript:void(0)' onclick='reportInfoBoxDownload(" + (type == 'yl' ? 0 : 1) + ");return false;' style='width:80px;height:30px;line-height:30px;text-align:center;color:#000000;font-weight: bold ;text-decoration:none;background-color:white;border-radius: 3px;border:solid 1px #000000;;position:absolute;bottom:18px;left:322px;'>另存为</a>" +
        "<a href='javascript:void(0)' onclick='reportInfoBoxPrint()' style='width:80px;height:30px;line-height:30px;text-align: center;color:#000000;font-weight: bold ;text-decoration:none;background-color:white;border-radius: 3px;border:solid 1px #000000;;position:absolute;bottom:18px;left:432px;'>打印</a>" +
        "<a href='javascript:void(0)' onclick='hideDiv()' style='width:80px;height:30px;line-height:30px;text-align: center;color:#000000;font-weight: bold ;text-decoration:none;background-color:white;border-radius: 3px;border:solid 1px #000000;;position:absolute;bottom:18px;left:542px;'>取消</a>" +

        "</div>" +
        "</div>";

    closeAllInfoBox();
    //  reportInfoBox.open(point);
    //reportInfoBox.setContent(html);

    popupDiv(html);
}

function popupDiv(html) {
    var mapWidth = $("#map").width();
    var mapHeight = $("#map").height();

    // // 添加并显示遮罩层
    $("<div id='bg'></div>").width(mapWidth)
        .height(mapHeight).click(function () {
            //hideDiv();
        }).appendTo("#mapDiv").fadeIn(200);
    $("#mapDiv").append(html).fadeIn(200);

}
/*隐藏弹出DIV*/
function hideDiv() {
    $("#bg").remove();
    $("#reportInfoBoxContent").remove();
}

//下载
function reportInfoBoxDownload(index) {
    var type = (index == 0 ? "yl" : "zd");
    var a = $("<a>").attr("href", "/assets/img/sentilo/map-icons/water-szts/szts_report_" + type + ".png").attr("download", "水质预警报告书.png").appendTo("body");
    a[0].click();
    a.remove();
}
//打印
function reportInfoBoxPrint() {
    $("#reportImg").jqprint();
}
//取消
function closeReportInfoBox() {
    reportInfoBox.close();
}

function rlInfoBoxClose() {
    rlInfoBox.close();
}


/*************地图事件************/

function changeHeatImgSize() {
    var currentZoom = map.getZoom();

    if (currentZoom == 14) {
        var icon1 = new BMap.Icon("/assets/img/sentilo/map-icons/water-szts/" + "szts_heat_yl_2.png", new BMap.Size(247, 385), {  // 设置图片大小
            anchor: new BMap.Size(123, 192),// 指定定位位置偏移。
            imageOffset: new BMap.Size(0, 0)   // 设置雪碧图偏移
        });
        var icon2 = new BMap.Icon("/assets/img/sentilo/map-icons/water-szts/" + "szts_heat_zd_2.png", new BMap.Size(247, 385), {  // 设置图片大小
            anchor: new BMap.Size(123, 192),// 指定定位位置偏移。
            imageOffset: new BMap.Size(0, 0)   // 设置雪碧图偏移
        });
        markerYl.setIcon(icon1);
        markerZD.setIcon(icon2);
    }
    else if (currentZoom == 15) {
        var icon1 = new BMap.Icon("/assets/img/sentilo/map-icons/water-szts/" + "szts_heat_yl_2.png", new BMap.Size(371, 578), {  // 设置图片大小
            anchor: new BMap.Size(185, 289),// 指定定位位置偏移。
            imageOffset: new BMap.Size(0, 0)   // 设置雪碧图偏移
        });
        var icon2 = new BMap.Icon("/assets/img/sentilo/map-icons/water-szts/" + "szts_heat_zd_2.png", new BMap.Size(371, 578), {  // 设置图片大小
            anchor: new BMap.Size(185, 289),// 指定定位位置偏移。
            imageOffset: new BMap.Size(0, 0)   // 设置雪碧图偏移
        });
        markerYl.setIcon(icon1);
        markerZD.setIcon(icon2);
    }
    else if (currentZoom == 16) {
        var icon1 = new BMap.Icon("/assets/img/sentilo/map-icons/water-szts/" + "szts_heat_yl_3.png", new BMap.Size(557, 867), {  // 设置图片大小
            anchor: new BMap.Size(273, 433),// 指定定位位置偏移。
            imageOffset: new BMap.Size(0, 0)   // 设置雪碧图偏移
        });
        var icon2 = new BMap.Icon("/assets/img/sentilo/map-icons/water-szts/" + "szts_heat_zd_3.png", new BMap.Size(557, 867), {  // 设置图片大小
            anchor: new BMap.Size(273, 433),// 指定定位位置偏移。
            imageOffset: new BMap.Size(0, 0)   // 设置雪碧图偏移
        });
        markerYl.setIcon(icon1);
        markerZD.setIcon(icon2);
    }
}

/*************消息框处理************/
function closeAllInfoBox() {
    reportInfoBox.close();
    rlInfoBox.close();
    ycsbInfoBox.close();
    yxdInfoBox.close();
}