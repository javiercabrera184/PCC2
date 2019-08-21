var express = require('express');
var app = express();

var data = require("./class.js");
var bunyan = require('bunyan');

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
  log.info(datos);
  res.send(datos);
});
//edita x e y
app.post('/data/:match/:pla/:x/:y/:time/', function(req,res){

  var nuevos_datos = new data.Datos(req.params.match,req.params.pla,req.params.x,req.params.y,req.params.time);
  if(!datos[nuevos_datos.ID]){
    log.info("POST 404 NO EXISTS");
    res.status(404).send("No exists");
  }else{
    datos[nuevos_datos.ID].x=req.params.x;
    datos[nuevos_datos.ID].y=req.params.y;
    log.info("POST 200 "+ datos[nuevos_datos.ID]);
    res.status(200).send(datos[nuevos_datos.ID]);
  }

});

//crear
app.put('/data/:match/:pla/:x/:y/:time/',function(req, res){

  var nuevos_datos = new data.Datos(req.params.match,req.params.pla,req.params.x,req.params.y,req.params.time);
  datos[nuevos_datos.ID]= nuevos_datos;
  log.info("PUT 200 "+ datos[nuevos_datos.ID]);
  res.status(200).send(nuevos_datos);

});

//delete
app.delete('/data/:match/:pla/:x/:y/:time/',function(req,res){

  var nuevos_datos = new data.Datos(req.params.match,req.params.pla,req.params.x,req.params.y,req.params.time);
  if(!datos[nuevos_datos.ID]){
    log.info("DELETE 404 NO EXISTS");
    res.status(404).send("No exists");
  }else{
    delete datos[nuevos_datos.ID];
    log.info("DELETE 200 "+ datos);
    res.status(200).send(datos);
  }
});


var port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Listening on port 3000!');
  log.info('Listening on port 3000!');
});

module.exports = app;
