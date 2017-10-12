//获取设备图表数据脚本文件

    var file = "../componts.json";
    var result = JSON.parse(fs.readFileSync(file));
    
    //遍历数据获取sensor数组中的name并存储在sensorData中，在下方数据请求中作为参数提取    
    var sensorsData = [];
     for (var i = 0; i <= 227; i++) {
       console.log(result.components[i].sensors.length);
       var sensorsItem = [];
       for (var j = 0; j<=result.components[i].sensors.length-1 ; j++) {
                  console.log(result.components[i].sensors[j].name);
                  sensorsItem.push(result.components[i].sensors[j].name);                                  
           }
           sensorsData.push(sensorsItem);
     }
    console.log(sensorsData);
    
  var compontsData = [];
  for (var i = 1; i <= 228; i++) {
      //post参数
      for(var k=0;k<sensorsData[i-1].length;k++){
      var options = {
          method: 'POST',
          uri: 'http://202.105.141.101:8088/rest/sentiloCatalog/queryComponentMonitorDetails',
          body: {            
              componentId:'FZ-'+i,
              monitorIndicator:sensorsData[i-1][k]          
          },
          json: true // Automatically stringifies the body to JSON
      };
      //遍历请求智慧院数据接口，并将返回结果写到json文件中
      //post请求
      rp(options)
          .then(function (parsedBody) {
              console.log(parsedBody.resultList); 
              for (var g = parsedBody.resultList.length - 1; g >= 0; g--) {
                          compontsData.push(parsedBody.resultList[g]);
              };          
              console.log(compontsData);                                        
              fs.writeFile('../result.json',JSON.stringify(compontsData),function(err){
                  if(err) throw err;
                  console.log('has finished');
              });
          })
          .catch(function (err) {
              console.log("postError!");
              // POST failed...
          });
      }          
    } 