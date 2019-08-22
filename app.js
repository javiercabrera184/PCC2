var express = require('express');
var app = express();

var data = require("./class.js");
var bunyan = require('bunyan');

var MongoClient = require('mongodb').MongoClient;
const url="mongodb://localhost/mydb";

MongoClient.connect(url,{ useNewUrlParser: true }, function(err, db) {
  if (err) throw err;
  var dbo = db.db("mydb");
  dbo.createCollection("app1", function(err, res) {
    if (err) throw err;
    console.log("Coleccion creada!");
    db.close();
  });
});

var log = bunyan.createLogger({name: 'API-REST',
  streams: [
    {
      level: 'info',
      path: './apirest-error.log'
    }
  ]
});

var datos = {};

app.get('/', function (req, res) {

  var output={
               "status": "OK",
               "ejemplo": { "ruta": "/data",
                            "valor": { "PositionS stored ": datos }
                          }
              }
  log.info(output);
  res.send(output);
});

//read and query
app.get('/data', function (req, res) {
  //res.setHeader('Content-Type', 'applicaton/json')
  MongoClient.connect(url, { useNewUrlParser: true },function(err, db) {
    if (err) throw err;
    var dbo = db.db("mydb");
    var mysort = { time: 1 };
    dbo.collection("app1").find().sort(mysort).toArray(function(err, result) {
      if (err) throw err;
      log.info(result);
      res.send(result);
      db.close();
    });
  });

  //log.info(datos);
  //res.send(datos);
});

//edita x e y
app.post('/data/:match/:pla/:x/:y/:time/', function(req,res){
  var nofind=0;
  var nuevos_datos = new data.Datos(req.params.match,req.params.pla,req.params.x,req.params.y,req.params.time);
  MongoClient.connect(url, { useNewUrlParser: true },function(err, db) {
    if (err) throw err;
    var dbo = db.db("mydb");
    var myquery = { ID: nuevos_datos.ID};
    var newvalues = { $set: nuevos_datos };
    dbo.collection("app").updateOne(myquery, newvalues, function(err, res) {
      if (err){
        nofind=1;
      }else{
        console.log("1 documento actualizado");
      }

      db.close();
    });
  });
  if(nofind==1){
    log.info("POST 404 NO EXISTS");
    res.status(404).send("No exisste");
  }else{

    log.info("POST 200 "+ nuevos_datos);
    res.status(200).send(nuevos_datos);
  }

});

//crear
app.put('/data/:match/:pla/:x/:y/:time/',function(req, res){

  var nuevos_datos = new data.Datos(req.params.match,req.params.pla,req.params.x,req.params.y,req.params.time);
  //datos[nuevos_datos.ID]= nuevos_datos;

  MongoClient.connect(url, { useNewUrlParser: true },function(err, db) {
    if (err) throw err;
    var dbo = db.db("mydb");

    dbo.collection("app1").insertOne(nuevos_datos, function(err, res) {
      if (err) throw err;
      console.log("1 documento insertedo");
      db.close();
    });
  });
  log.info("PUT 200 "+ datos[nuevos_datos.ID]);
  res.status(200).send(nuevos_datos);

});

//delete
app.delete('/data/:match/:pla/:x/:y/:time/',function(req,res){

  var nuevos_datos = new data.Datos(req.params.match,req.params.pla,req.params.x,req.params.y,req.params.time);
  var nofind=0;
  MongoClient.connect(url, { useNewUrlParser: true },function(err, db) {
    if (err) throw err;
    var dbo = db.db("mydb");
    var myquery = { ID: nuevos_datos.ID};
    dbo.collection("app1").deleteOne(myquery, function(err, obj) {
      if (err){ nofind=1;}
      else{
        console.log("1 documento borrado");
      }

      db.close();
    });

  });
  if(nofind==1){
    log.info("DELETE 404 NO EXISTS");
    res.status(404).send("No exists");
  }else{

    log.info("DELETE 200 "+ nuevos_datos);
    res.status(200).send(nuevos_datos);
  }
});


var port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Listening on port 3000!');
  log.info('Listening on port 3000!');
});

module.exports = app;
