var express        = require('express'),
    app            = express(),
    ejs            = require('ejs'),
    methodOverride = require('method-override'),
    bodyParser     = require('body-parser'),
    MongoClient    = require('mongodb').MongoClient,
    ObjectId       = require('mongodb').ObjectId,
    url            = 'mongodb://localhost:27017/restaurant';

app.set('view engine', 'ejs');
app.set('views', './views');

app.use(express.static('./public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

// CONNECT TO MONGODB
MongoClient.connect(url, function (err, db) {
	if (err) { throw err };

	app.db = db;

  app.listen(1337, function () {
    console.log('Listening on our 1337 port 1337');
  });
});

// INDEX
app.get('/restaurant', function (req, res) {
  res.render('index.ejs');
});

// NEW
app.get('/restaurant/order', function (req, res) {
  app.db.collection('menu')
        .find()
        .toArray(function (err, menuItems) {
          res.render('menu.ejs', { menu : menuItems });
        });
});


// CREATE
app.post('/restaurant', function (req, res) {
  app.db.collection('orders')
        .insert(req.body.orders, function (err, result) {
          res.redirect(301, '/restaurant/order/' + req.body._id);
        });
});

// SHOW
app.get('/restaurant/order/:id', function (req, res) {
  var id = new ObjectId(req.params.id);
  app.db.collection('orders')
        .findOne( { _id : id }, function (err, orders) {
          res.render('show.ejs', { orders: orders });
        });
});

// EDIT ORDER
app.get('/restaurant/order/:id/edit', function (req, res) {
  var id = new ObjectId(req.params.id);
  app.db.collection('orders')
        .findOne( { _id : id }, function (err, orders) {
          res.render('order_edit.ejs', { orders : orders });
        });
});

// EDIT MENU
app.get('/restaurant/menu/edit', function (req, res) {
  app.db.collection('menu')
        .find()
        .toArray(function (err, menuArray) {
          res.render('menu_edit.ejs', { menu : menuArray });
        });
});

// UPDATE
app.patch('/restaurant/order/:id', function (req, res) {
  var id = new ObjectId(req.params.id);
  app.db.collection('orders')
        .update({ _id : id }, req.body.orders, function (err, result) {
                                                res.redirect(301, '/restaurant/order/' + req.params.id)
                                               });
});

// DELETE
app.delete('/restaurant/order/:id', function (req, res) {
  var id = new ObjectId(req.params.id);
  app.db.collection('orders')
        .remove({ _id : id}, function (err, result) {
          res.redirect(301, '/restaurant');
        })
});

// 404
app.get('/*', function (req, res) {
  res.render('404.ejs', { path : req.path });
});
