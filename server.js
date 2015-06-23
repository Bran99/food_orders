var express        = require('express'),
    app            = express(),
    ejs            = require('ejs'),
    methodOverride = require('method-override'),
    bodyParser     = require('body-parser'),
    MongoClient    = require('mongodb').MongoClient,
    ObjectId       = require('mongodb').ObjectId,
    url            = 'mongodb://localhost:27017/restaurant',
    mongoose       = require('mongoose'),
    Schema         = mongoose.Schema;

app.set('view engine', 'ejs');
app.set('views', './views');

app.use(express.static('./public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

// CONNECT TO MONGOOSE
mongoose.connect(url);
var db = mongoose.connection;

db.once('open', function () {
  app.listen(1337, function () {
    console.log('Listening on our 1337 port 1337');
  });
});

var menuSchema = Schema({
  name: {type : String, required : true},
  description: String,
  price: {type : Number, required : true, min : 0},
  type: {type : String, required : true}
}, {collection : 'menu'});

var orderSchema = Schema({
  items: [menuSchema]
}, {collection : 'orders'});

var Menu = mongoose.model('Menu', menuSchema);
var Order = mongoose.model('Order', menuSchema);

// INDEX
app.get('/restaurant', function (req, res) {
  res.render('index.ejs');
});

// NEW
app.get('/restaurant/order', function (req, res) {
  Menu.find({}, function (err, menuArray) {
    if (err) {
      console.log(err);
    } else {
      res.render('menu.ejs', { menu : menuArray })
    };
  });
});


// CREATE ORDER
app.post('/restaurant', function (req, res) {
  Order.create(req.body.orders, function (err, order) {
    if (err) {
      console.log(err);
    } else {
      res.redirect(301, '/restaurant/order/' + order._id);
    };
  });
});

// CREATE MENU
app.post('/restaurant/menu', function (req, res) {
  Menu.create(req.body.menu, function (err, result) {
    if (err) {
      console.log(err);
    } else {
      res.redirect(301, '/restaurant/menu')
    }
  });
})

// SHOW ORDER
app.get('/restaurant/order/:id', function (req, res) {
  Order.findById(req.params.id, function (err, order) {
    if (err) {
      console.log(err);
    } else {
      res.render('show.ejs', { orders : order });
    };
  });
});

// SHOW MENU
app.get('/restaurant/menu', function (req, res) {
  res.render('menu.ejs', db.collection('menu'))
})

// EDIT ORDER
app.get('/restaurant/order/edit/:id', function (req, res) {
  Menu.findById(req.params.id, function (err, order) {
      if (err) {
        console.log(err);
      } else {
        res.render('order_edit.ejs', { orders : order });
      };
    });
});

// EDIT MENU
app.get('/restaurant/menu/edit', function (req, res) {
  res.render('menu_edit.ejs');
});

// UPDATE
app.patch('/restaurant/order/:id', function (req, res) {
  var id = new ObjectId(req.params.id);
  Order.update({_id : id}, req.body.orders, function (err, result) {
    if (err) {
      console.log(err);
    } else {
      res.redirect(301, '/restaurant/order' + req.params.id)
    };
  });
});

// DELETE
app.delete('/restaurant/order/:id', function (req, res) {
  var id = new ObjectId(req.params.id);
  Order.remove({_id : id}, function (err, result) {
    if (err) {
      console.log(err);
    } else {
      res.redirect(301, '/restaurant');
    };
  });
});

// 404
app.get('/*', function (req, res) {
  res.render('404.ejs', { path : req.path });
});
