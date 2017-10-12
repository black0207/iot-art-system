var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('apps', { title: 'apps',name:'专题应用' });
});



module.exports = router;
