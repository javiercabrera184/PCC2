var express = require('express');
var app = express();

var data = require("./class.js");


var datos = {};

app.get('/', function (req, res) {

  var output={
               "status": "OK",
               "ejemplo": { "ruta": "/data",
                            "valor": { "PositionS stored ": 0 }
                          }
              }
  res.send(output);
});

//read and query
app.get('/data', function (req, res) {

  res.send(datos);
});
//edita x e y
app.post('/data/:match/:pla/:x/:y/:time/', function(req,res){

  var nuevos_datos = new data.Datos(req.params.match,req.params.pla,req.params.x,req.params.y,req.params.time);
  if(!datos[nuevos_datos.ID]){
    res.status(404).send("No exists");
  }else{
    datos[nuevos_datos.ID].x=req.params.x;
    datos[nuevos_datos.ID].y=req.params.y;
    res.status(200).send(datos[nuevos_datos.ID]);
  }

});

//crear
app.put('/data/:match/:pla/:x/:y/:time/',function(req, res){

  var nuevos_datos = new data.Datos(req.params.match,req.params.pla,req.params.x,req.params.y,req.params.time);
  datos[nuevos_datos.ID]= nuevos_datos;
  res.status(200).send(nuevos_datos);

});

//delete
app.delete('/data/:match/:pla/:x/:y/:time/',function(req,res){

  var nuevos_datos = new data.Datos(req.params.match,req.params.pla,req.params.x,req.params.y,req.params.time);
  if(!datos[nuevos_datos.ID]){
    res.status(404).send("No exists");
  }else{
    delete datos[nuevos_datos.ID];
    res.status(200).send(datos);
  }
});


var port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Listening on port 3000!');
});

module.exports = app;
