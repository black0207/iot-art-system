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
    //randomItem();
    function randomItem() {
        var array= ["江苏赛达","北京世讯","常州泰明电子","江苏普斯特","北京青鸟元芯","无锡纳微电子","亚博智能","江苏赛达","北京青鸟元芯","常州泰明电子"];
        var siteType = "静态";
        var powerMode = "交流电（220VAC）";
        var componentDescription = "北京智慧城市监测设备";
        var createDate = "2016-10-13";
        for(var i = 0;i<data.components.length;i++ ){


            var num = Math.round(Math.random()*10);
            if(!data.components[i].createDate){

                //data.components[i].provider = array[num];
                //data.components[i].siteType = siteType;
                //data.components[i].powerMode = powerMode;
                data.components[i].createDate = createDate;
                data.components[i].mac = randomMAC();
            }
        }

        fs.appendFile('../iot-art-system/public/componts.json',JSON.stringify(data.components));
    }
    function randomMAC() {
        var chars = ['0','1','2','3','4','5','6','7','8','9','A','B','C','D','E','F','G','H','I','J','K'];
        var mac = "";
        for(var i = 0;i<6;i++){
            var n1 = Math.round(Math.random()*20);
            var n2 = Math.round(Math.random()*20);
            mac = mac + chars[n1] + chars[n2] ;
            if(i != 5){
                mac = mac + "-";
            }
        }

        return mac;
    }

   res.render('rest/page/sentilo/chakanshebei', { title: '中国电科物联网开放平台',name: '态势感知',compoent: compoent} );
});

module.exports = router;
