// 百度地图加载
var map = new BMap.Map("map", {enableMapClick: false});    // 创建Map实例
//map.centerAndZoom(new BMap.Point(119.317023, 26.066687), 12);  // 初始化地图,设置中心点坐标和地图级别
map.centerAndZoom(new BMap.Point(115.253333,39.288888), 10);  // 初始化地图,设置中心点坐标和地图级别 中心点为石河子市
map.addControl(new BMap.MapTypeControl({mapTypes: [BMAP_NORMAL_MAP, BMAP_HYBRID_MAP]}));   //添加地图类型控件

map.enableScrollWheelZoom(true);     //开启鼠标滚轮缩放

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


//// 创建全局自定义信息窗口对象
var infoBox = new BMapLib.InfoBox(map, "", {
    boxStyle: {
        background: "url('') no-repeat center top"
        , width: "400px"
        , height: "auto"
    }
    , closeIconMargin: "5px 5px 0 0"
    , enableAutoPan: true
    , align: INFOBOX_AT_TOP
    , offset: new BMap.Size(22, 50)
    , closeIconUrl: "/assets/img/sentilo/map-icons/water-lsts/infobox_icon.png"
});

var markerClusterer = new BMapLib.MarkerClusterer(map, {
    maxZoom: 15, isAverangeCenter: true, styles: [
        {
            url: '/assets/img/sentilo/map-icons/cluster/' + 'cluster_10.png',
            size: new BMap.Size(32, 46),
            opt_anchor: [16, 46],
            textColor: '#1dc0e8',
            textSize: 14
        },
        {
            url: '/assets/img/sentilo/map-icons/cluster/' + 'cluster_10.png',
            size: new BMap.Size(32, 46),
            opt_anchor: [16, 46],
            textColor: '#1dc0e8',
            textSize: 14
        }
        ,
        {
            url: '/assets/img/sentilo/map-icons/cluster/' + 'cluster_100.png',
            size: new BMap.Size(38, 53),
            opt_anchor: [19, 53],
            textColor: '#1dc0e8',
            textSize: 14
        }
    ]
});

//var url = "/rest/sentiloCatalog/queryComponentInfo";
var url = "componts.json";
initData(url, addComponetMarkerClusterer);
//getComponetData(url, addComponetMarkerClusterer);
//addMarkerClusterer(data, map, infoBox);

///添加地图缩放监听， 缩放时关闭自定义信息框
map.addEventListener("zoomstart", function () {
    infoBox.close();
});


/**
 *获取组件数据
 */
function getComponetData(url, action, obj) {
    $.ajax({
        "type": "POST",
        "url": url,
        "dataType": 'json',
        "contentType": "application/json; charset=utf-8",
        "data": JSON.stringify(obj),
        "success": function (response) {
            //loadingHiden();
            if (response.result == true) {
                if (action) {
                    action(response);
                }
            } else {
                alert(response.error);
            }
        },
        "error": function (res) {
            //loadingHiden();
            alert('数据加载失败，请检查网络是否通畅');
        }
    });
}

/**
 *添加组件至聚合图层
 */
function addComponetMarkerClusterer(data) {
    markerClusterer.clearMarkers();
    var markers = [];
    console.log(data);
    for (var item in data.components) {
        var component = data.components[item];
        var pt = new BMap.Point(component.lon, component.lat);
        var types = ["粉尘浓度探测器", "电磁辐射", "水质监测仪"];
        var isWarningType = false;
        switch (component.componentType) {
            case "粉尘浓度探测器":
                isWarningType = true;
            case "电磁辐射":
                isWarningType = true;
            case "水质监测仪":
                isWarningType = true;

        }
        //返回告警图标
        if (isWarningType && component.operationStatus == "预警") {
            size1 = new BMap.Size(60, 68);
            size2 = new BMap.Size(30, 68);
        }
        else {
            size1 = new BMap.Size(32, 43);
            size2 = new BMap.Size(16, 43);
        }

        var myIcon = new BMap.Icon(getNormalIconLocalUrlByType(component.componentType, component.operationStatus), size1, {  // 设置图片大小
            anchor: size2,// 指定定位位置偏移。
            imageOffset: new BMap.Size(0, 0)   // 设置雪碧图偏移
        });

        var marker = new BMap.Marker(pt, {icon: myIcon});

        //if (component.componentType == "智能水表") {
        //if (component.sensors.lenth > 1) {
        markers.push(marker);
        //}
        //marker属性赋值
        marker.Type = component.componentType;
        marker.Status = component.operationStatus;

        //鼠标移入、移出事件
        marker.addEventListener("mouseover", changeIconSizeMouseoverEvernt);
        marker.addEventListener("mouseout", changeIconSizeMouseoutEvernt);

        //addInfoWindow(marker, component);//添加信息框


        addCustomInfoWindow(marker, map, infoBox, component);//添加自定义信息框
    }
//调用markerClusterer
//var markerClusterer = new BMapLib.MarkerClusterer(map, {markers: markers});
    markerClusterer.addMarkers(markers);

///添加地图缩放监听， 缩放时关闭自定义信息框
    map.addEventListener("zoomstart", function () {
        infoBox.close();
    });
}

/**
 *组件点击事件
 */
function componetClickEvent(componet) {

}

/**
 *添加信息框
 */
function addInfoWindow(marker, component) {
    var sContent =
        "<h4 style='margin:0 0 5px 0;padding:0.2em 0'>" + component.id + "</h4>" +
        "<img style='float:right;margin:4px' id='imgDemo' src='content/images/icons/" + component.icon + ".png'  title=''/>" +
        "<p style='margin:0;line-height:1.5;font-size:13px;text-indent:2em'>" + component.type + "</p>" +
        "</div>";

    var infoWindow = new BMap.InfoWindow(html);  // 创建信息窗口对象
    marker.addEventListener("click", function () {
        this.openInfoWindow(infoWindow);
        //图片加载完毕重绘infowindow
        document.getElementById('imgDemo').onload = function () {
            infoWindow.redraw();   //防止在网速较慢，图片未加载时，生成的信息框高度比图片的总高度小，导致图片部分被隐藏
        }
    });
}

/**
 *自定义信息框
 */
function addCustomInfoWindow(marker, map, infoBox, component) {
    var html = "" +
        "<div id='infoBoxContent'class='infoBoxContent' style='font-size:16px;padding:10px;width:auto;background-color: rgba(0,0,0,1);color:white;-moz-border-radius: 8px;-webkit-border-radius: 8px;border-radius:8px;border: 1px solid #000000;'>" +
        " <div style='margin:0px;'>" +
        "<p>" +
        "设备：" + component.id + "&nbsp; &nbsp; &nbsp; &nbsp; 类型：" + component.componentType +
        "</p>" +
        "<p>" +
        "归属：" + component.belongto +
        "</p>" +
        "<p>" +
        "传输方式：" + component.transportType +
        "</p>" +
        "<p>" +
        "运行状态：" + component.operationStatus +
        "</p>" +
        "</div>" +
        "</div>";

    //处理状态
    var colorType = "";
    if (component.operationStatus == "预警") {
        colorType = "red";
    }
    else if (component.operationStatus == "离线") {
        colorType = "#888c81";
    }
    else if (component.operationStatus == "正常") {
        colorType = "white";
    }
    else if (component.operationStatus == "") {
        colorType = "#888c81";
        component.operationStatus = "离线";
    }

    //处理时间
    var updateTime = new Date();
    if (component.sensors.length > 0) {
        updateTime = component.sensors[0].recordTime;
    }
    else
        updateTime = updateTime.toLocaleDateString() + " " + updateTime.getHours() + ":" + (updateTime.getMinutes() > 9 ? updateTime.getMinutes() : '0') + ":" + (updateTime.getSeconds() > 9 ? updateTime.getSeconds() : '0' + updateTime.getSeconds());

    //处理参数,构建dom
    var allParamsHtml = bulidValueDom(component);

    var icon = getIconIndexByType(component.componentType);
    var params = "id=" + component.id + "&status=" + component.operationStatus + "&index=" + icon.substring(0, icon.indexOf('.'));

    var html2 = "" +
        "<div style='font-size:16px;padding:10px;width:auto;background-color: rgba(0,0,0,0.8);color:white;-moz-border-radius: 10px;-webkit-border-radius: 10px;border-radius:10px;border: 2px solid rgba(0,158,249, 0.84);' onclick='componentInfoBoxClose()'>" +
        "<div style='height:100px;'>" +
        "<div style='width:20%;height:100px;float:left;vertical-align: middle;text-align: center;padding-top: 10px;'>" +
        "<img src='" + "/assets/img/sentilo/map-icons/infobox/" + getIconIndexByType(component.componentType) + "' />" +
        "</div>" +
        "<div style='margin:0px;width:60%;height:auto;float:left;'>" +
        "<p style='font-size:16px;font-weight:bold;'>" +
        "设备：" + component.componentName +
        "</p>" +
        "<p style='margin-top: 5px;'>" +
        " 类型：" + component.componentType +
        "</p>" +
        "<p style='margin-top: 5px;'>" +
        " 所属用户：" + component.belongto +
        "</p>" +
        "</div>" +
        "<div style='width:20%;height:100px;float:left;'>" +
        "<div style='border:solid 1px " + colorType + ";height:30px;width:50px;color:" + colorType + "; text-align:center; line-height:30px;margin-right:0px;float:right;font-weight:bold;'>" +
        component.operationStatus +
        "</div>" +
        "</div>" +
        "</div>" +
        "<div style='width:100%;min-height:20px;border:solid 0px;vertical-align:middle;display:table;margin-top:10px; table-layout:fixed'>" +
        allParamsHtml +
        "</div>" +
        "<div style='margin-top:20px;vertical-align:bottom;'>" +
        "<span >" + "更新时间：" + updateTime + "</span>" +  //2016/11/1 18:00
        "<span style='float:right;font-size:18px;font-weight:bold;'>" + "<a href='/rest/page/sentilo/chakanshebei?" + params + "'target='_blank' style='color:rgb(0,158,249) !important;text-decoration:none'>查看详细 >></a></span>" +
        "</div>" +
        "</div>" +
        "<div style='text-align:center;margin-top: 5px;'><img src='/assets/img/sentilo/map-icons/infobox/bottom.png' /></div>"

    marker.addEventListener("click", function () {
        infoBox.open(marker);
        infoBox.setContent(html2);
    });
}

/**
 *遍历传感器参数，构建dom
 */
function bulidValueDom(component) {
    var allParamsHtml = "";

    if (component.sensors.length > 0) {
        for (var i = 0; i < Math.ceil(component.sensors.length / 4); i++) {
            var rowHtmlStart = "<div style='display:table-row;'>";
            var rowHtmlEnd = "</div>";
            var cellHtml = "";
            var totalCellHtml = "";

            for (var j = 0; j < 4; j++) {
                if ((i * 4 + j) < component.sensors.length) {
                    var name = component.sensors[i * 4 + j].name;
                    var value = component.sensors[i * 4 + j].value;
                    //value = toDecimal(value);
                    value = value.toFixed3();
                    // console.log(value.toFixed3());

                    cellHtml = "" +
                    "<div style='display:table-cell;text-align:center;'>" +
                    "<span style='display:block;font-size:20px;font-weight:bold;color:rgb(246,209,50);'>" +
                    value +
                    "</span>" +
                    "<span >" + name + "</span>" +
                    "</div>" +
                    cellHtml;
                }
                else {
                    cellHtml = "" +
                    "<div style='display:table-cell;text-align:center;'>" +
                    "<span style='display:block;font-size:20px;font-weight:bold;color:rgb(246,209,50);'>" +
                    "&nbsp;&nbsp;" +
                    "</span>" +
                    "<span>" + "&nbsp;&nbsp;" + "</span>" +
                    "</div>" +
                    cellHtml;
                }
            }
            totalCellHtml = "<div style='display:table-cell;text-align:center;'>" + cellHtml + "</div>";

            allParamsHtml += rowHtmlStart + cellHtml + rowHtmlEnd;
        }
    }

    return allParamsHtml;
}


//获取小数点后三位
Number.prototype.toFixed3 = function () {
    return parseFloat(this.toString().replace(/(\.\d{3})\d+$/, "$1"));
}

//去小数点后4位，bug：存在四舍五入问题。
function toDecimal(x) {
    var f = parseFloat(x);
    if (isNaN(f)) {
        return;
    }
    f = Math.round(x * 10000) / 10000;
    return f;
}

function componentInfoBoxClose() {
    infoBox.close();
}

/**
 *鼠标移入，设备标注，放大图标
 */
function changeIconSizeMouseoverEvernt(e) {
    var marker = e.target;
    var oldIcon = marker.getIcon();

    var size1, size2;
    if ((oldIcon.imageUrl).indexOf("warning") > 0) {
        size1 = new BMap.Size(60, 68);
        size2 = new BMap.Size(30, 68);
    }
    else {
        size1 = new BMap.Size(37, 50);
        size2 = new BMap.Size(18, 50);
    }

    var newIcon = new BMap.Icon(getBigIconLocalUrlByType(marker.Type, marker.Status), size1, {  // 设置图片大小
        anchor: size2,// 指定定位位置偏移。
        imageOffset: new BMap.Size(0, 0)   // 设置雪碧图偏移。
    });
    marker.setIcon(newIcon);
    //console.log("over:" + newIcon.imageUrl);
}

/**
 *鼠标移出，设备标注，还原图标
 */
function changeIconSizeMouseoutEvernt(e) {
    var marker = e.target;
    var oldIcon = marker.getIcon();
    var size1, size2;
    if ((oldIcon.imageUrl).indexOf("warning") > 0) {
        size1 = new BMap.Size(60, 68);
        size2 = new BMap.Size(30, 68);
    }
    else {
        size1 = new BMap.Size(32, 43);
        size2 = new BMap.Size(16, 43);
    }

    var newIcon = new BMap.Icon(getNormalIconLocalUrlByType(marker.Type, marker.Status), size1, {  // 设置图片大小
        anchor: size2,// 指定定位位置偏移
        imageOffset: new BMap.Size(0, 0)   // 设置雪碧图偏移
    });
    marker.setIcon(newIcon);
    //console.log("out:" + newIcon.imageUrl);
}


/**
 *重写聚合图层自定义图层级别
 */
BMapLib.TextIconOverlay.prototype.getStyleByText = function (text, styles) {
    var count = parseInt(text);
    var index = 0;
    //var index = parseInt(count / 200);
    //index = Math.max(0, index);
    //index = Math.min(index, styles.length - 1);
    if (count <= 10) {
        index = 0;
    }
    else if (index > 10 && index < 100) {
        index = 1;
    }
    else {
        index = 2;
    }
    return styles[index];
};

/**
 *设备坐标转换，wgs转bdj
 */
function coorderWGS2BDJ(data) {

    return data;
}

function coorderWGS2BDJCallBack() {

}

/**
 *设备数据请求
 */
function getDevicesData() {
    var dataResult = {};
    $.ajax({
        async: false,
        type: "get",
        url: "content/data/components_new.txt",
        dataType: 'json',
        //jsonp: "jsoncallback",
        contentType: "application/json; charset=gb2312",
        success: function (data) {
            if (data) {
                dataResult = data.components;
            }
            else
                console.log("请求数据为null");
        },
        error: function (e) {
            console.log("数据请求异常");
            console.log(e);
        }
    });
    return dataResult;
}

//获取放大图标
function getBigIconLocalUrlByType(type, status) {
    var url = "";
    var isWarningType = false;
    switch (type) {
        case "粉尘浓度探测器":
            isWarningType = true;
        case "电磁辐射":
            isWarningType = true;
        case "水质监测仪":
            isWarningType = true;
    }

    //返回告警图标
    if (isWarningType && status == "预警") {
        url = "/assets/img/sentilo/map-icons/normal-warning/" + getIconIndexByType(type).replace(".png", ".gif");
    }
    else if (status == "离线") {
        url = "/assets/img/sentilo/map-icons/normal-offline/" + getIconIndexByType(type);
    }
    else {
        url = "/assets/img/sentilo/map-icons/normal/" + getIconIndexByType(type);
    }

    return url;
}
//获取正常图标
function getNormalIconLocalUrlByType(type, status) {
    var url = "";
    var isWarningType = false;
    switch (type) {
        case "粉尘浓度探测器":
            isWarningType = true;
        case "电磁辐射":
            isWarningType = true;
        case "水质监测仪":
            isWarningType = true;
    }

    //返回告警图标
    if (isWarningType && status == "预警") {
        url = "/assets/img/sentilo/map-icons/normal-warning/" + getIconIndexByType(type).replace(".png", ".gif");
        //console.log("预警："+status);
    }
    else if (status == "离线") {
        url = "/assets/img/sentilo/map-icons/normal-offline/" + getIconIndexByType(type);
        //console.log("离线："+status);
    }
    else {
        url = "/assets/img/sentilo/map-icons/normal/" + getIconIndexByType(type);
        //console.log("正常："+status);
    }

    return url;
}

function getBigIconLocalUrlByType(type, status) {
    var url = "";
    var types = ["粉尘浓度探测器", "电磁辐射", "水质监测仪"];
    var isWarningType = false;
    switch (type) {
        case "粉尘浓度探测器":
            isWarningType = true;
        case "电磁辐射":
            isWarningType = true;
        case "水质监测仪":
            isWarningType = true;
    }
    //返回告警图标
    if (isWarningType && status == "预警") {
        url = "/assets/img/sentilo/map-icons/normal-warning-big/" + getIconIndexByType(type).replace(".png", ".gif");
    }
    else if (status == "离线") {
        url = "/assets/img/sentilo/map-icons/normal-offline-big/" + getIconIndexByType(type);
    }
    else {
        url = "/assets/img/sentilo/map-icons/normal-big/" + getIconIndexByType(type);
    }
    return url;
}
/**
 *获取icon图片路径
 */
function getIconIndexByType(type) {
    switch (type) {
        case "光照度检测仪":
            return "0000.png";
        case "测速仪":
            return "0001.png";
        case "称重仪":
            return "0002.png";
        case "酸碱度PH计":
            return "0003.png";
        case "粉尘浓度探测器":
            return "0004.png";
        case "风速测量计":
            return "0005.png";
        case "超声波流量计":
            return "0006.png";
        case "气体分析仪":
            return "0007.png";
        case "电磁辐射":
            return "0008.png";
        case "湿度计":
            return "0009.png";
        case "气压计":
            return "0010.png";
        case "噪音计":
            return "0011.png";
        case "温度计":
            return "0012.png";
        case "电表":
            return "0013.png";
        case "水质监测仪":
            return "0014.png";
        case "智能水表":
            return "0015.png";
        case "自动气象站":
            return "0016.png";
        case "环境探测器":
            return "0017.png";
        default :
            return "0000.png"
    }
}