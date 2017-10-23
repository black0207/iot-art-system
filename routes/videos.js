var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('videos', { title: 'videos',name:'视频' });
});



module.exports = router;