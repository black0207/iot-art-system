var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('search', { title: 'search123123123',name:'态势分布' });
});



module.exports = router;
