var express = require('express');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());


// APIs
 var mongoose = require('mongoose');
  mongoose.connect('mongodb://test:user@ds123399.mlab.com:23399/anoop_database');
  //mongoose.connect('mongodb://localhost:27017/shop');

var db = mongoose.connection;
db.on('error', console.error.bind(console, '# MongoDB - connection error: '));
// --->>> SET UP SESSIONS <<<----
app.use(session({
  secret: 'mySecretString',
  saveUninitialized: false,
  resave:false,
  cookie: {maxAge: 1000 * 60 * 60 * 24 * 2}, // 2 days in milliseconds
  store: new MongoStore({mongooseConnection: db, ttl: 2 * 24 * 60 * 60})
  //ttl: 2 days * 24 hours * 60 minutes * 60 seconds
}))
 // SAVE SESSION CART API
  app.post('/cart', function(req, res){
    var cart = req.body;
    req.session.cart = cart;
    req.session.save(function(err){
      if(err){
        throw err;
      }
      res.json(req.session.cart);
    })
  });
// GET SESSION CART API
  app.get('/cart', function(req, res){
    if(typeof req.session.cart !== 'undefined'){
      res.json(req.session.cart);
    }
  });
//--->>> END SESSION SET UP <<<----


  var Products = require('./modals/product.js');
  app.post('/product',function(req,res){
    var products =req.body;
    Products.create(products,function(err,product){
      if(err){
        throw err;
      }
      res.json(product);
    })
  });
  // write get Api
  
 app.get('/product',function(req,res){ 
   var products =req.body;
    Products.find(products,function(err, product){
      if(err){
        throw err;
      }
      res.json(product);
    })
  });

  app.delete('/product/:_id', function(req, res){
    var query ={_id:req.params._id};
    Products.remove(query, function(err, product){
      if(err){
        throw err;
      }
      res.json(product);
    })
  });
// Update Api
  app.put('/product/:_id', function(req,res){
    var products = req.body;
    var query = req.params._id;
    var update = {
      '$set':{
        'title':products.title,
        'description':products.description,
        'images':products.images,
        'price':products.price
      }
    };
    var option = {new:true}
    Products.findOneAndUpdate(query,update,option, function(err, product){
      if(err){
        throw err;
      }
      res.json(product);
    })
  })

  // --->>> GET BOOKS IMAGES API <<<------
  app.get('/images', function(req, res){

    const imgFolder = __dirname + '/public/images/';
    // REQUIRE FILE SYSTEM
    const fs = require('fs');
    //READ ALL FILES IN THE DIRECTORY
    fs.readdir(imgFolder, function(err, files){
      if(err){
        return console.error(err);
      }
      //CREATE AN EMPTY ARRAY
      const filesArr = [];
      //var i = 1;
      // ITERATE ALL IMAGES IN THE DIRECTORY AND ADD TO THE ARRAY
      files.forEach(function(file){
        filesArr.push({name: file});
        //i++
      });
      // SEND THE JSON RESPONSE WITH THE ARARY
      res.json(filesArr);
    })
  })
// END APIs

app.listen(3001, function(err){
  if(err){
    return console.log(err);
  }
  console.log('API Sever is listening on http://localhost:3001');
});
