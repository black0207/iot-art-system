$(document).ready(function(){
    $('ul.submenu li a').each(function(){
        $(this).click(function(){
            var keyWord = $(this).text();
            alert(keyWord);
            var r = new RegExp(keyWord);
            var data = {"result": true, "components": []};
            alert($(this).parent().parent().prev().text());
            if ($(this).parent().parent().prev().text() == '位置') {
                $.ajax({
                    "type": "GET",
                    "url": "componts.json",
                    "dataType": 'json',
                    "contentType": "application/json; charset=utf-8",
                    "success": function(response) {
                        console.log(response);
                        if (response.result == true) {
                            //查询匹配关键字的设备
                            for(var i=0; i<response.components.length; i++){
                                var position = response.components[i].position;
                                if(r.test(position)){
                                    data.components.push(response.components[i]);
                                }
                            }

                            if(data.components){
                                var dt = data.components;

                                var assetsDeviceList = '';
                                for(var i=0; i<dt.length; i++){
                                    var type = dt[i].componentType;
                                    assetsDeviceList += '<div class="device">\n' +
                                        '          <img src="/assets/img/sentilo/map-icons/component_detail/'+getIconIndexByType(type)+'" alt="设备图片">\n' +
                                        '          <div class="profile">\n' +
                                        '            <table>\n' +
                                        '              <tr>\n' +
                                        '                <td class="name">名称：</td>\n' +
                                        '                <td class="value">'+dt[i].componentName+'</td>\n' +
                                        '              </tr>\n' +
                                        '              <tr>\n' +
                                        '                <td class="name">类型：</td>\n' +
                                        '                <td class="value">'+dt[i].componentType+'</td>\n' +
                                        '              </tr>\n' +
                                        '              <tr>\n' +
                                        '                <td class="name">协议：</td>\n' +
                                        '                <td class="value">'+dt[i].transportType+'</td>\n' +
                                        '              </tr>\n' +
                                        '              <tr>\n' +
                                        '                <td class="name">状态：</td>\n' +
                                        '                <td class="value">'+dt[i].operationStatus+'</td>\n' +
                                        '              </tr>\n' +
                                        '              <tr>\n' +
                                        '                <td class="name">位置：</td>\n' +
                                        '                <td class="value">'+dt[i].position+'</td>\n' +
                                        '              </tr>\n' +
                                        '            </table>\n' +
                                        '            <a href="#">查看详情</a>\n' +
                                        '          </div>\n' +
                                        '\n' +
                                        '        </div>';
                                }
                                $("#assetsDeviceList").html(assetsDeviceList);
                            }

                        } else {

                            alert('没有匹配的设备');
                        }
                    },
                    "error":function(res){

                        alert('数据加载失败');
                    }
                });
            } else if ($(this).parent().parent().prev().text() == '设备类型') {
                $.ajax({
                    "type": "GET",
                    "url": "componts.json",
                    "dataType": 'json',
                    "contentType": "application/json; charset=utf-8",
                    "success": function(response) {
                        console.log(response);
                        if (response.result == true) {
                            //查询匹配关键字的设备
                            for(var i=0; i<response.components.length; i++){

                                var deviceType = response.components[i].componentType;
                                // var belongto = response.components[i].belongto;
                                // var transportType = response.components[i].transportType;

                                if(r.test(deviceType)){
                                    data.components.push(response.components[i]);
                                    //console.log(i);
                                }
                            }

                            if(data.components){
                                var dt = data.components;
                                var assetsDeviceList = '';
                                for(var i=0; i<dt.length; i++){
                                    var type = dt[i].componentType;
                                    assetsDeviceList += '<div class="device">\n' +
                                        '<img class="top-left-corner" src="/images/top-left-corner.png" alt="">\n' +
                                        '        <img class="top-right-corner" src="/images/top-left-corner.png" alt="">\n' +
                                        '        <img class="bottom-left-corner" src="/images/top-left-corner.png" alt="">\n' +
                                        '        <img class="bottom-right-corner" src="/images/top-left-corner.png" alt="">\n'+
                                        '<div class="device-picture"><img src="/assets/img/sentilo/map-icons/component_detail/'+getIconIndexByType(type)+'" alt="设备图片"></div>\n'+
                                        '<div class="device-name">\n' +
                                        '            <h3>'+dt[i].componentName+'</h3>\n' +
                                        '            <img src="/images/hengxian.png" alt="">\n' +
                                        '          </div>\n'+
                                        '          <div class="profile">\n' +
                                        '            <table>\n' +
                                        '              <tr>\n' +
                                        '                <td class="name">类型：</td>\n' +
                                        '                <td class="value">'+dt[i].componentType+'</td>\n' +
                                        '              </tr>\n' +
                                        '              <tr>\n' +
                                        '                <td class="name">协议：</td>\n' +
                                        '                <td class="value">'+dt[i].transportType+'</td>\n' +
                                        '              </tr>\n' +
                                        '              <tr>\n' +
                                        '                <td class="name">状态：</td>\n' +
                                        '                <td class="value">'+dt[i].operationStatus+'</td>\n' +
                                        '              </tr>\n' +
                                        '              <tr>\n' +
                                        '                <td class="name">位置：</td>\n' +
                                        '                <td class="value">'+dt[i].position+'</td>\n' +
                                        '              </tr>\n' +
                                        '            </table>\n' +
                                        '          </div>\n' +
                                        '<div class="more">\n' +
                                        '            <a href="#">查看详情</a>\n' +
                                        '          </div>\n'+
                                        '        </div>';
                                }

                                $("#assetsDeviceList").html(assetsDeviceList);
                            }

                        } else {

                            alert('没有匹配的设备');
                        }
                    },
                    "error":function(res){

                        alert('数据加载失败');
                    }
                });

            } else { //'设备协议'
                $.ajax({
                    "type": "GET",
                    "url": "componts.json",
                    "dataType": 'json',
                    "contentType": "application/json; charset=utf-8",
                    "success": function(response) {
                        console.log(response);
                        if (response.result == true) {
                            //查询匹配关键字的设备
                            for(var i=0; i<response.components.length; i++){

                                var transportType = response.components[i].transportType;

                                if(r.test(transportType)){
                                    data.components.push(response.components[i]);

                                }
                            }

                            if(data.components){
                                var dt = data.components;
                                var assetsDeviceList = '';
                                for(var i=0; i<dt.length; i++){
                                    var type = dt[i].componentType;
                                    assetsDeviceList += '<div class="device">\n' +
                                        '          <img src="/assets/img/sentilo/map-icons/component_detail/'+getIconIndexByType(type)+'" alt="设备图片">\n' +
                                        '          <div class="profile">\n' +
                                        '            <table>\n' +
                                        '              <tr>\n' +
                                        '                <td class="name">名称：</td>\n' +
                                        '                <td class="value">'+dt[i].componentName+'</td>\n' +
                                        '              </tr>\n' +
                                        '              <tr>\n' +
                                        '                <td class="name">类型：</td>\n' +
                                        '                <td class="value">'+dt[i].componentType+'</td>\n' +
                                        '              </tr>\n' +
                                        '              <tr>\n' +
                                        '                <td class="name">协议：</td>\n' +
                                        '                <td class="value">'+dt[i].transportType+'</td>\n' +
                                        '              </tr>\n' +
                                        '              <tr>\n' +
                                        '                <td class="name">状态：</td>\n' +
                                        '                <td class="value">'+dt[i].operationStatus+'</td>\n' +
                                        '              </tr>\n' +
                                        '              <tr>\n' +
                                        '                <td class="name">位置：</td>\n' +
                                        '                <td class="value">'+dt[i].position+'</td>\n' +
                                        '              </tr>\n' +
                                        '            </table>\n' +
                                        '            <a href="#">查看详情</a>\n' +
                                        '          </div>\n' +
                                        '\n' +
                                        '        </div>';
                                }
                                $("#assetsDeviceList").html(assetsDeviceList);
                            }

                        } else {

                            alert('没有匹配的设备');
                        }
                    },
                    "error":function(res){

                        alert('数据加载失败');
                    }
                });

            }
        });

    });

});