//external dependencies
var express = require('express');
var bodyParser = require('body-parser');
var ejsLayouts = require('express-ejs-layouts');
var flash = require('connect-flash');
var session = require('express-session');
var request = require('request');
//local dependencies
var authCtrl = require('./controllers/auth');
var db = require('./models');
var app = express();

app.set('view engine', 'ejs');
app.use(ejsLayouts);
app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static(__dirname + '/static'));
app.use(session({
  secret: 'SuperSecretLegoEncryption',
  resave: false,
  saveUninitialized: true
}));
app.use(flash());
app.use(function(req, res, next) {
  if (req.session.userId) {
    db.user.findById(req.session.userId).then(function(user) {
      req.currentUser = user;
      res.locals.currentUser = user;
      next();
    })
  } else {
    req.currentUser = false;
    res.locals.currentUser = false;
    next();
  }
});
app.use('/auth', authCtrl);


app.get('/', function(req, res) {
  res.render('index');
});
app.get('/success1', function(req, res) {
  res.render('success1');
});
app.get('/signup', function(req, res) {
  res.render('signup');
});
app.get('/welcome', function(req,res) {
  res.render('welcome');
});
//search API
app.get('/searchResult', function(req, res) {
  var query = req.query.q;
  console.log(query);
  var page = 1;
  var pageSize = 100;
  request('http://rebrickable.com/api/v3/lego/sets/?page=' + page + '&page_size=' + pageSize + '&search=' + query + '&key=' + key, function(err, response, body) {
    var data = JSON.parse(body);
    console.log(data.results);
    if (!err && response.statusCode === 200 && data.results) {
      res.render('searchResult', {legos: data.results,
                                      q: query});
    } else {
      res.render('error');
    }
  });
});

//get Show page
app.get('/searchResult/:set_id', function(req, res) {
  var searchQuery = req.query.q ? req.query.q : '';
  console.log(searchQuery);
  var set_id = req.params.set_id;
  console.log(set_id);
  request('https://rebrickable.com/api/v3/lego/sets/' + set_id + '/?key=' + key, function(err, response, body) {
    var data = JSON.parse(body);
    themeId = data.theme_id;
    console.log(data);
    console.log(themeId);

    request('https://rebrickable.com/api/v3/lego/themes/' + themeId + '/?key=' + key, function(err, response, body) {
      var dataT = JSON.parse(body);
      console.log(dataT);

      if (!err && response.statusCode === 200) {
        res.render('show', {lego: data,
                               q: searchQuery,
                           theme: dataT});
      } else {
        res.render('error');
      }
    });
  });
});

app.get('/collection', function(req, res) {
  db.collection.findAll({where: {userId: req.currentUser.id}})
  .then(function(collections) {
    res.render('collection', {
      collections: collections});
  });
});
//post collection
app.post('/collection', function(req, res) {
  var addToCollection = req.body;
  console.log("saving collection");
  console.log(addToCollection);
  console.log("creating collection");
  db.collection.create(addToCollection).then(function(collection) {
    console.log("adding collection to users");
    console.log(req.currentUser);
    if (req.currentUser) {
      req.currentUser.addCollection(collection);
      res.status(200).send('Added to Collection');
    } else {
      res.status(500).send("Please Log In");
      res.redirect('/');
    }
  });
});
//delete row from collection table
app.delete('/collection', function(req,res) {
  var deleteId = req.body.id;
  console.log(req.body);
  db.collection.find({where:{id:deleteId}}).then(function(collection) {
    collection.destroy().then(function(){
      console.log("Destroyed");
      res.sendStatus(200);
    });
  });
});

var port = 3000;
app.listen(process.env.PORT || port);
