var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('develop', { title: 'develop',name:'开发者社区' });
});



module.exports = router;