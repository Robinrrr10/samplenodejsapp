var bodyParser = require('body-parser')
var mongodb = require('mongoose')
//mongodb.connect('mongodb://localhost:27017/?compressors=disabled&gssapiServiceName=mongodb');

mongodb.connect('mongodb://localhost:27017/mydb');

var book = new mongodb.Schema({
  name: String,
  age: Number
})

var DoSave = mongodb.model('book', book);

var data = [{"name": "Ram"}, {"name": "Ravi"}, {"name": "Babu"}]
var urlEncoded = bodyParser.urlencoded({extended: false});

module.exports = function(app){

  app.get('/home', function(req, res){
    DoSave.find({}, function(err, data){
      if(err) throw err;
      res.render('myhome', {"allItems": data});
    });

  });

  app.post('/add', urlEncoded, function(req, res){
    //data.push(req.body);
    var newVal = DoSave(req.body).save(function(err, data){
      if(err) throw err;
      //res.json(data)
      res.redirect('/home')
    })
  });

  app.post('/remove', urlEncoded, function(req, res){
    console.log("came inside remove: " + req.body.name)
    //res.render('myhome', {"allItems": data})
    //var newVal = DoSave(req.body).remove(function(err, data){
    DoSave.find({name: req.body.name}).remove().exec();
      //res.json(data)
    res.redirect('/home');
  });

}
