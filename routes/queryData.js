var express = require('express');
var http = require('http');
var router = express.Router();
var request = require('request');
var rp = require('request-promise');
const qs = require('querystring');
var fs =require('fs');

var serverUrl = 'http://192.168.12.40:8080';
//按照ID查询返回设备详细信息
router.post('/queryComponentDetails', function(req, res, next) {
    var id = req.body.id;
    var compontsData = {};
        compontsData.result = true;
    //根据ID请求数据服务器，并返回结果    
    request(serverUrl+'/HNUST/queryById?id='+id, function (error, response, body) {
            if (!error && response.statusCode == 200) {                         
              if(JSON.parse(body)== "error"){
                  //sendData.components = null;
                  //sendData.error = "未找到符合条件的数据";
                  res.send('搜索结果为空');
                  console.log("ID搜索结果为空！");
              }else{
                  console.log('queryComponentDetails请求：服务器设备详细信息数据获取成功!');
                  //console.log(body);
                  //服务器传输为字符串，需转为JSON格式
                  compontsData.componentDetails = JSON.parse(JSON.parse(body))[0];                                                          
                  compontsData.componentDetails.sensors = JSON.parse(compontsData.componentDetails.sensors);      
                  res.send(compontsData);
              }              
            }else{
              console.log("失败:数据服务器数据请求失败！"); 
              res.send('数据服务器数据请求失败');           
            }
        });


    //
    /*for (var i = 1; i <= 1; i++) {
      //post参数
      var options = {
          method: 'POST',
          uri: 'http://202.105.141.101:8088/rest/sentiloCatalog/queryComponentDetails',
          body: {
              id: id
          },
          json: true // Automatically stringifies the body to JSON
      };
      //post请求请求智慧院数据接口
      rp(options)
          .then(function (parsedBody) {
              console.log(parsedBody);
              compontsData.componentDetails = parsedBody.componentDetails;
              console.log("compontsData="+compontsData);
              res.send(compontsData);
              // POST succeeded...
              fs.writeFile('./result.json',compontsData,function(err){
                  if(err) throw err;
                  console.log('has finished');
              });
          })
          .catch(function (err) {
              console.log("postError!");
              // POST failed...
          });          
    } */           
  }); 
//根据设备ID与传感器名称搜索对应传感器设备图表数据
router.post('/queryComponentMonitorDetails', function(req, res, next) {
    var componentId = req.body.componentId;
    var monitorIndicator = req.body.monitorIndicator;       
    var sendData = {};
        sendData.result = true;     
    //console.log(serverUrl+'/HNUST/queryData?componentId='+componentId+'&monitorIndicator='+qs.escape(monitorIndicator))
    request(serverUrl+'/HNUST/queryData?componentId='+componentId+'&monitorIndicator='+qs.escape(monitorIndicator), function (error, response, body) {
            if (!error && response.statusCode == 200) {                         
              if(JSON.parse(body)== "error"){
                  //sendData.components = null;
                  //sendData.error = "未找到符合条件的数据";
                  res.send('搜索结果为空');
                  console.log("条件搜索结果为空！");
              }else{
                  console.log('queryComponentMonitorDetails请求:服务器设备图表数据获取成功!');
                  //console.log(body);
                  //服务器传输为字符串，需转为JSON格式
                  sendData.resultList = JSON.parse(JSON.parse(body));                                                          
                  res.send(sendData);
              }              
            }else{
              console.log("失败:数据服务器数据请求失败！"); 
              res.send('数据服务器数据请求失败');           
            }
        });

    //post参数 请求智慧院数据接口
     /* var options = {
          method: 'POST',
          uri: 'http://202.105.141.101:8088/rest/sentiloCatalog/queryComponentMonitorDetails',
          body: {
              componentId: componentId,
              monitorIndicator: monitorIndicator
          },
          json: true // Automatically stringifies the body to JSON
      };
      //post请求
      rp(options)
          .then(function (parsedBody) {             
              console.log("compontsData="+parsedBody);
              res.send(parsedBody);
          })
          .catch(function (err) {
              console.log("postError!");
              // POST failed...
          });*/          
    
  }); 

var thingList = [
          ['全部'],
          ['水质监测仪','环境探测器','自动气象站','智能水表','气压计','温度计','湿度计','风速测量计','测速仪','称重仪','光照度检测仪','超声波流量计','噪音计','粉尘浓度探测器','酸碱度PH计'],
          ['LORA','ZigBee','Wifi','GPRS','3G','4G','NB-IoT'],
          ['水利局','气象局','环保局','国土资源局','交通运输委员会','安监局','MATIX公司','海洋与渔业局','HYLONTION公司','ENERGY公司']
        ]; 
router.post('/queryComponentInfo', function(req, res, next) {
  
  var type = req.body.type;
  var value = req.body.value;
  var keyword = req.body.keyWord;
  var sendData = {};
      sendData.result = true;   
  //判断关键字是否为空
  console.log("检索条件参数：type="+type+";value="+value+";keyword="+keyword);
  if(keyword === "" || keyword === undefined){
    if(value === "" || value === undefined ){
        //加载所有数据      
        request(serverUrl+'/HNUST/queryAll', function (error, response, body) {
            if (!error && response.statusCode == 200) {

              if(JSON.parse(body)== "error"){
                  sendData.components = null;
                  sendData.error = "未找到符合条件的数据";
                  res.send(sendData);               
              }else{
                  console.log('成功:数据服务器所有数据获取成功!');
                  //服务器传输为字符串，需转为JSON格式
                  sendData.components = JSON.parse(JSON.parse(body));
                  console.log("返回数据数量："+sendData.components.length); 
                  //由于内部嵌套问题，需要把sensors单独提出来进行转换
                  for (var i =0 ;i<sendData.components.length;i++) {
                    //console.log(sendData.components[i].sensors);
                    sendData.components[i].sensors = JSON.parse(sendData.components[i].sensors);               
                  }                        
                  res.send(sendData);

                };                         
                            
            }else{
              console.log("失败:数据服务器数据请求失败！"); 
              res.send('数据服务器数据请求失败');           
            }
        });
        
    }else{
        console.log("筛选条件="+thingList[type][value]);
        //根据分类查询数据
        request(serverUrl+'/HNUST/queryCombination?param='+qs.escape(thingList[type][value]), function (error, response, body) {
            if (!error && response.statusCode == 200) {                         
              if(JSON.parse(body)== "error"){
                  sendData.components = null;
                  sendData.error = "未找到符合条件的数据";
                  res.send(sendData);
                  console.log("条件搜索结果为空！");
              }else{
                  console.log('成功:数据服务器条件数据获取成功!');                  
                  //服务器传输为字符串，需转为JSON格式
                  sendData.components = JSON.parse(JSON.parse(body));
                  console.log("返回数据数量："+sendData.components.length); 
                  //由于内部嵌套问题，需要把sensors单独提出来进行转换
                  for (var i = sendData.components.length - 1; i >= 0; i--) {
                    sendData.components[i].sensors = JSON.parse(sendData.components[i].sensors);               
                  }                        
                  res.send(sendData);
              }              
            }else{
              console.log("失败:数据服务器数据请求失败！"); 
              res.send('数据服务器数据请求失败');           
            }
        });
    }
  }else{
      //关键字不为空时，查询
      console.log("关键字条件="+keyword);
      request(serverUrl+'/HNUST/queryCombination?param='+qs.escape(keyword), function (error, response, body) {
            if (!error && response.statusCode == 200) {                     
             
              if(JSON.parse(body)== "error"){
                  sendData.components = null;
                  sendData.error = "未找到符合条件的数据";
                  res.send(sendData);
                  console.log("关键字搜索结果为空！");
              }else{
                console.log('成功:数据服务器关键字数据获取成功!');
                //服务器传输为字符串，需转为JSON格式
                sendData.components = JSON.parse(JSON.parse(body)); 
                console.log("返回数据数量："+sendData.components.length);
                //由于内部嵌套问题，需要把sensors单独提出来进行转换
                for (var i = sendData.components.length - 1; i >= 0; i--) {
                  sendData.components[i].sensors = JSON.parse(sendData.components[i].sensors);               
                }                        
                res.send(sendData);
              }              
            }else{
              console.log("失败:数据服务器数据请求失败！"); 
              res.send('数据服务器数据请求失败');           
            }

        });

  }

});

module.exports = router;
