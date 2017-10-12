//获取智慧院设备详细信息脚本文件
var compontsData = {};
    compontsData.result = true;
    compontsData.componentDetails = []; 
for (var i = 1; i <= 228; i++) {
    //post参数
    var options = {
        method: 'POST',
        uri: 'http://202.105.141.101:8088/rest/sentiloCatalog/queryComponentDetails',
        body: {
            id: i
        },
        json: true // Automatically stringifies the body to JSON
    };
    //post请求
    rp(options)
        .then(function (parsedBody) {
            // POST succeeded...
            console.log(parsedBody.componentDetails);
            compontsData.componentDetails.push(parsedBody.componentDetails);
            console.log("compontsData="+compontsData.toString());          
           
            fs.writeFile('../result.json',JSON.stringify(compontsData),function(err){
                if(err) throw err;
                console.log('has finished');
            });
        })
        .catch(function (err) {
            // POST failed...
            console.log("postError!");           
        });          
  }