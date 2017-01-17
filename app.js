var express = require('express');
var app = express();
var router = express.Router();

var api = require('./controller/api.js');
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.set('port', process.env.PORT || 3306);

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type,token');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

app.use(express.static(__dirname + '/public'));

router.post('/api/subset',api.subset);
router.post('/api/distance',api.distance);

app.use('/', router);

app.listen(app.get('port'));

console.log("Server started on port no. ", app.get('port'));