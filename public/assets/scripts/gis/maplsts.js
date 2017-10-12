// 百度地图加载
var map = new BMap.Map("map", {enableMapClick: false});    // 创建Map实例
map.centerAndZoom(new BMap.Point(86.080254,44.310329), 13);
//map.centerAndZoom(new BMap.Point(119.327023, 26.066687), 14);  // 初始化地图,设置中心点坐标和地图级别

map.addControl(new BMap.MapTypeControl({mapTypes: [BMAP_NORMAL_MAP, BMAP_HYBRID_MAP]}));   //添加地图类型控件
//map.setCurrentCity("福州");          // 设置三维地图显示
map.enableScrollWheelZoom(true);     //开启鼠标滚轮缩放
map.setMinZoom(12);

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

//添加组件数据

// 全局变量

//// 创建全局自定义信息窗口对象
var infoBox = new BMapLib.InfoBox(map, "", {
    boxStyle: {background: "url('') no-repeat center top", width: "320px", height: "auto"}
    , closeIconMargin: "5px 5px 0 0", enableAutoPan: true, align: INFOBOX_AT_TOP, offset: new BMap.Size(10, 48),
    closeIconUrl: "/assets/img/sentilo/map-icons/close.png"
});
//工业园区信息框
var gyyInfoBox = new BMapLib.InfoBox(map, "", {
    boxStyle: {background: "url('') no-repeat center top", width: "320px", height: "auto"}
    , closeIconMargin: "5px 5px 0 0", enableAutoPan: true, align: INFOBOX_AT_TOP, offset: new BMap.Size(10, 60)
    , closeIconUrl: "/assets/img/sentilo/map-icons/water-lsts/infobox_icon.png"
});
//水表信息框
var wmInfoBox = new BMapLib.InfoBox(map, "", {
    boxStyle: {background: "url('') no-repeat center top", width: "472px", height: "auto"}
    , closeIconMargin: "5px 5px 0 0", enableAutoPan: true, align: INFOBOX_AT_TOP, offset: new BMap.Size(22, 22)
    , closeIconUrl: "/assets/img/sentilo/map-icons/water-lsts/infobox_icon.png"
});
//区域信息框
var gsqyInfoBox = new BMapLib.InfoBox(map, "", {
    boxStyle: {background: "url('') no-repeat center top", width: "470px", height: "auto"}
    , closeIconMargin: "5px 5px 0 0", enableAutoPan: true, align: INFOBOX_AT_TOP, offset: new BMap.Size(10, 5)
    , closeIconUrl: "/assets/img/sentilo/map-icons/water-lsts/infobox_icon.png"
});

//添加数据
addPolygon();
addPoint();
//addSimpleMaker();
addPolyline();
//水表数据
//var url = "/rest/sentiloSpecialApp/selectTotalFlow";
//getWaterData(url, deal);


/**
 *获取水表数据
 */
function getWaterData(url, action, param1, obj) {
    $.ajax({
        "type": "POST",
        "url": url,
        "dataType": 'json',
        "contentType": "application/json; charset=utf-8",
        "data": JSON.stringify(obj),
        "success": function (response) {
            if (action) {
                action(response, param1);
            }
            else {
                console.log("error:" + response.error);
            }
        },
        "error": function (res) {
            console.log('数据加载失败，请检查网络是否通畅');
        }
    });
}

/**
 *创建点--工业园
 */
function addSimpleMaker() {
    var point = new BMap.Point(119.432937, 26.026387);

    var icon = new BMap.Icon("/assets/img/sentilo/map-icons/water-lsts/lsts_gyy.png", new BMap.Size(44, 59), {  // 设置图片大小
        anchor: new BMap.Size(22, 59),// 指定定位位置偏移。
        imageOffset: new BMap.Size(0, 0)   // 设置雪碧图偏移
    });

    var marker = new BMap.Marker(point, {icon: icon});

    map.addOverlay(marker);

    //添加标注
    var label = new BMap.Label("上润工业园", {offset: new BMap.Size(-20, 60)});
    label.setStyle({
        color: "white",
        fontSize: "16px",
        height: "20px",
        lineHeight: "20px",
        fontFamily: "微软雅黑",
        border: "0px",
        backgroundColor: "rgb(255, 255, 255,1)"
    });
    marker.setLabel(label);

    //添加监听
    marker.addEventListener("click", gyyPointClickEvent);
    marker.addEventListener("mouseover", gyyPointMouseOverEvent);
    marker.addEventListener("mouseout", gyyPointMouseOutEvent);

}

/**
 *创建点
 */
function addPoint() {
    for (var i = 0; i < shuibiao.features.length; i++) {
        var coord = shuibiao.features[i].geometry.coordinates;
        ///坐标转换
        //wgs84转国测局坐标
        //var wgs84togcj02 = coordtransform.wgs84togcj02(coord[0], coord[1]);
        //国测局坐标转百度经纬度坐标
        //var gcj02tobd09 = coordtransform.gcj02tobd09(wgs84togcj02[0], wgs84togcj02[1]);

        //添加点标记
        var point = new BMap.Point(coord[0], coord[1]);
        //设置图标
        var icon = new BMap.Icon("/assets/img/sentilo/map-icons/water-lsts/lsts_wm.png", new BMap.Size(45, 45), {  // 设置图片大小
            anchor: new BMap.Size(22, 22),// 指定定位位置偏移。
            imageOffset: new BMap.Size(0, 0)   // 设置雪碧图偏移
        });

        var marker = new BMap.Marker(point, {icon: icon});
        map.addOverlay(marker);

        marker.wmCode = shuibiao.features[i].properties.FID + 120000;
        marker.timestemp = new Date();

        marker.total = GetRandomNum(1000000, 5000000, 6);
        marker.ph = GetRandomNum(6.5, 6.8, 2).toFixed(1);
        marker.pressure = GetRandomNum(0.2, 0.6, 2).toFixed(1);
        marker.yl = GetRandomNum(0.05, 0.3, 2).toFixed(2);
        marker.zd = GetRandomNum(0.1, 0.5, 2).toFixed(2);

        //添加监听
        //marker.addEventListener("click", wmPointClickEvent);
        marker.addEventListener("mouseover", wmPointMouseOverEvent);
        marker.addEventListener("mouseout", wmPointMouseOutEvent);

    }
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

            //var wgs84togcj02 = coordtransform.wgs84togcj02(coord[0], coord[1]);
            //ar gcj02tobd09 = coordtransform.gcj02tobd09(wgs84togcj02[0], wgs84togcj02[1]);

            points[j] = new BMap.Point(coord[0], coord[1]);
        }

        //添加线标记
        var polyline = new BMap.Polyline(points, {strokeColor: "black", strokeWeight: 2, strokeOpacity: 1});

        //添加监听
        // polyline.addEventListener("mouseover",overlay_style);
        // polyline.addEventListener("mouseout",overlay_style);

        map.addOverlay(polyline);
    }
}

/**
 *创建面
 */
function addPolygon() {
    var colors = ['#96ff49', '#00a2ff', '#fea93a', '#f04848'];

    for (var i = 0; i < gsqy.features.length; i++) {
        var coords = gsqy.features[i].geometry.coordinates[0];
        var points = [];
        //坐标转换
        for (var j = 0; j < coords.length; j++) {
            var coord = coords[j];

            /*var wgs84togcj02 = coordtransform.wgs84togcj02(coord[0], coord[1]);
            var gcj02tobd09 = coordtransform.gcj02tobd09(wgs84togcj02[0], wgs84togcj02[1]);*/

            points[j] = new BMap.Point(coord[0], coord[1]);
        }
        var colorCode = colors[gsqy.features[i].properties.Type];
        //添加线标记
        var polygon = new BMap.Polygon(points, {
            strokeColor: "#2f1919",
            strokeWeight: 2,
            strokeOpacity: 0,
            fillColor: colorCode,
            fillOpacity: 0.5
        });
        map.addOverlay(polygon);
        addPolygonLabel(map, i);//添加标注

        //添加类型值
        var type = gsqy.features[i].properties.Type;
        var areaCode = gsqy.features[i].properties.AreaCode
        polygon.lsType = type;
        polygon.AreaCode = areaCode;

        //添加监听
        polygon.addEventListener("click", gsqyPointClickEvent);

        polygon.addEventListener("mouseover", gsqyPointMouseOverEvent);
        polygon.addEventListener("mouseout", gsqyPointMouseOutEvent);
    }


}
/**
 *创建面标注
 */
function addPolygonLabel(map, index) {
    var labelText = gongshuilabel.features[index].properties.AreaCode;
    var labelPosition = gongshuilabel.features[index].geometry.coordinates;

    //var wgs84togcj02 = coordtransform.wgs84togcj02(labelPosition[0], labelPosition[1]);
    //var gcj02tobd09 = coordtransform.gcj02tobd09(wgs84togcj02[0], wgs84togcj02[1]);

    //添加标注
    var point = new BMap.Point(labelPosition[0], labelPosition[1]);

    var size = new BMap.Size(0, 0);
    if (labelText == "DMA1") {
        size = new BMap.Size(-30, 10);
    }
    else if (labelText == "DMA2") {
        size = new BMap.Size(15, -15);
    }
    else if (labelText == "DMA3") {
        size = new BMap.Size(0, -10);
    }
    else if (labelText == "DMA4") {
        size = new BMap.Size(0, -20);
    }
    else if (labelText == "DMA6") {
        size = new BMap.Size(-30, -20);
    }
    else if (labelText == "DMA8") {
        size = new BMap.Size(0, 10);
    }
    else if (labelText == "DMA9") {
        size = new BMap.Size(-20, 0);
    }


    var label = new BMap.Label(labelText, {position: point, offset: size});
    label.setStyle({
        color: "white",
        fontSize: "16px",
        height: "20px",
        lineHeight: "20px",
        fontFamily: "微软雅黑",
        border: "0px",
        backgroundColor: "rgb(255, 255, 255,1)"
    });
    label.setZIndex(-5300000);
    map.addOverlay(label);
}
/////////////////////监听事件/////////////////////

/*************工业园************/
function gyyPointMouseOverEvent(e) {


    var marker = e.target;

    var url = "/rest/sentiloSpecialApp/selectTotalFlow";

    getWaterData(url, opengyyInfoBox, marker);


}

function opengyyInfoBox(data, marker) {
    //console.log(data);
    //console.log(marker);

    var html = "" +
        "<div id='infoBoxContent'class='infoBoxContent' style='font-size:16px;padding:0px;width:auto;' onclick='gyyInfoBoxClose()'>" +
        " <div style='margin:0px;'>" +
        "<img src='/assets/img/sentilo/map-icons/water-lsts/lsts_gyy_info.png'>" +
        "<span  style='height:20px;position:absolute;top:85px;left:100px;;color: white;font-size: 17px;'>" + data.totalFlow[0] + " m<sup>3</sup></span>" +
        "<span  style='height:20px;position:absolute;top:122px;left:100px;;color: white;font-size: 17px;'>" + data.totalFlow[1]  + " m<sup>3</sup></span>" +

        "</div>" +
        "</div>";

    closeAllInfoBox();
    gyyInfoBox.open(marker);
    gyyInfoBox.setContent(html);
}

function gyyPointMouseOutEvent() {
    gyyInfoBox.close();
}

function gyyPointClickEvent() {
    window.open("/rest/page/sentilo/zhuantiyingyong", "_top");
}

function gyyInfoBoxClose() {
    gyyInfoBox.close();
}

/*************水表************/
function wmPointMouseOverEvent(e) {
    var marker = e.target;
    var oldIcon = marker.getIcon();

    var newIcon = new BMap.Icon("/assets/img/sentilo/map-icons/water-lsts/lsts_wm_light.png", new BMap.Size(45, 45), {  // 设置图片大小
        anchor: new BMap.Size(22, 22),// 指定定位位置偏移。
        imageOffset: new BMap.Size(0, 0)   // 设置雪碧图偏移
    });
    marker.setIcon(newIcon);

    wmPointClickEvent(e);
}

function wmPointMouseOutEvent(e) {
    var marker = e.target;
    var oldIcon = marker.getIcon();

    var newIcon = new BMap.Icon("/assets/img/sentilo/map-icons/water-lsts/lsts_wm.png", new BMap.Size(45, 45), {  // 设置图片大小
        anchor: new BMap.Size(22, 22),// 指定定位位置偏移。
        imageOffset: new BMap.Size(0, 0)   // 设置雪碧图偏移
    });
    marker.setIcon(newIcon);

    wmInfoBox.close();
}

function wmPointClickEvent(e) {
    var marker = e.target;
    //参数值
    var timeNow = new Date();
    var timeSpan = parseInt(Math.abs(timeNow - marker.timestemp) / 1000 / 60);

    if (timeSpan > 1) {
        marker.total = GetRandomNum(1000000, 5000000, 6);
        marker.ph = GetRandomNum(6.5, 6.8, 2).toFixed(1);
        marker.pressure = GetRandomNum(0.2, 0.6, 2).toFixed(1);
        marker.yl = GetRandomNum(0.05, 0.3, 2).toFixed(2);
        marker.zd = GetRandomNum(0.1, 0.5, 2).toFixed(2);

        marker.timestemp = new Date();
    }
    var code = marker.wmCode;
    var updateTime = new Date();
    updateTime = updateTime.toLocaleDateString() + " " + updateTime.getHours() + ":" + (updateTime.getMinutes() > 9 ? updateTime.getMinutes() : '0' + updateTime.getMinutes());

    var html = "" +
        "<div id='infoBoxContent'class='infoBoxContent' style='font-size:16px;padding:0px;width:auto;' onclick='wmInfoBoxClose()'>" +
        " <div style='margin:0px;'>" +
        "<img src='/assets/img/sentilo/map-icons/water-lsts/lsts_wm_data.png'>" +
        "<div  style='width:520px;height:60px;position:absolute;top:24px;left:190px;;color: white;font-size: 24px;'>" +
        code +
        "</div>" +
        "<div  style='width:520px;height:60px;position:absolute;top:55px;left:310px;;color: white;font-size: 17px;'>" +
        updateTime +
        "</div>" +
        "<div  style='width:520px;height:60px;position:absolute;bottom:18px;left:0px;;color: white;font-size: 22px;'>" +
        "<span style='width: 100px;display:inline-block;margin-left: 10px;'>" + marker.total + "</span>" +
        "<span style='width: 100px;display:inline-block;margin-left: 22px;'>" + marker.ph + "</span>" +
        "<span style='width: 50px;display:inline-block;margin-left: -5px;'>" + marker.pressure + "</span>" +
        "<span style='width: 30px;display:inline-block;margin-left: 50px; '>" + marker.yl + "</span>" +
        "<span style='width: 30px;display:inline-block;margin-left: 55px;'>" + marker.zd + "</span>" +
        "</div>" +
        "</div>" +
        "</div>";

    closeAllInfoBox();
    wmInfoBox.open(marker);
    wmInfoBox.setContent(html);
}

function GetRandomNum(Min, Max, length) {
    var Range = Max - Min;
    var Rand = Math.random().toFixed(length);
    return (Min + Rand * Range);
}

function wmInfoBoxClose() {
    wmInfoBox.close();
}

/*************供水区域************/
function gsqyPointMouseOverEvent(e) {
    var polygon = e.target;
    polygon.setFillOpacity(0.8);
}

function gsqyPointMouseOutEvent(e) {
    var polygon = e.target;
    polygon.setFillOpacity(0.5);
}

function gsqyPointClickEvent(e) {
    var polygon = e.target;
    var html = "" +
        "<div id='infoBoxContent'class='infoBoxContent' style='font-size:16px;padding:0px;width:auto;' onclick='gsqyInfoBoxClose()'>" +
        " <div style='margin:0px;'>" +
        "<img src='/assets/img/sentilo/map-icons/water-lsts/" + polygon.AreaCode + ".png'>" +
        "</div>" +
        "</div>";

    closeAllInfoBox();
    gsqyInfoBox.open(e.point);
    gsqyInfoBox.setContent(html);
}

function gsqyInfoBoxClose() {
    gsqyInfoBox.close();
}

/*************消息框处理************/
function closeAllInfoBox() {
    wmInfoBox.close();
    gyyInfoBox.close();
    gsqyInfoBox.close();
}