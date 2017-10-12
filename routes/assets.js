var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('assets', { title: 'assets',name:'资产中心' });
});



module.exports = router;
