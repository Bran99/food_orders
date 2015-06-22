var express        = require('express'),
    server         = express(),
    ejs            = require('ejs'),
    methodOverride = require('method-override'),
    bodyParser     = require('body-parser'),
    MongoClient    = require('mongodb').MongoClient,
    ObjectId       = require('mongodb').ObjectId,
    url            = 'mongodb://localhost:27017/menu';

server.set('view engine', 'ejs');
server.set('views', './views');

server.use(express.static('./public'));
server.use(bodyParser.urlencoded({
    extended: true
}));
server.use(methodOverride('_method'));
