var express = require('express');
var router = express.Router();
var fs = require('fs');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'index',name:'首页' });
});

//查看设备详情页
router.get('/rest/page/sentilo/chakanshebe*', function(req, res, next) {

    //需要查询设备信息详情数据
    var id = req.query.id;
    console.log(id);
    var data = JSON.parse(fs.readFileSync('../iot-art-system/public/componts.json','utf-8'));

        for(var i = 0;i<data.components.length;i++ ){
            if(id == data.components[i].id){
                compoent = data.components[i];
            }
        }
    
        console.log(compoent);

   res.render('rest/page/sentilo/chakanshebei', { title: '中国电科物联网开放平台',name: '态势感知',compoent: compoent} );
});

module.exports = router;
