"use strict"
/*******************************************************************************
  notas
*******************************************************************************/
//mongoimport --host spaceJourney-shard-0/spacejourney-shard-00-00-0iqdh.mongodb.net:27017,spacejourney-shard-00-01-0iqdh.mongodb.net:27017,spacejourney-shard-00-02-0iqdh.mongodb.net:27017 --ssl --username admin --password journey --authenticationDatabase admin --db spacejourney --collection viajes --type json --file viajes.json
//mongoexport --db spacejourney --collection viajes --out viajes.json
if (process.env.NODE_ENV != "production"){
  require("dotenv").config();
}
/*******************************************************************************
  Constantes
*******************************************************************************/
/*Declaración de la colecciones que se usaran*/
const baseDeDatos="spacejourney";
const colecciones= ["viajes","reservas"];
const maxAsientos = 32;
/*Declaración dede proyecciones que queremos ignorar en la busquedas en la BD*/
const ignore ={ _id: 0, __v:0 };
/*Declaración de dependencias necesarias para el servidor express*/
var express = require("express");
var app = express();
/*Declaración de la localización del Front-End*/
app.use(express.static("public"));
app.set("port", process.env.PORT || 8080)
/*Declaración para manejo de estructuras JSON que comunicaran el servidor con la DB*/
var bodyParser = require("body-parser");
app.use(bodyParser.json()); // soporte para bodies codificados en jsonsupport
app.use(bodyParser.urlencoded({ extended: true })); // soporte para bodies
/*Declaración de dependencias para manejo de DB con mongoBD*/
var mongoose = require("mongoose");
/*Declaración de conexión remota mongoAtlas*/
const connectionString = "mongodb+srv://admin:journey@spacejourney-0iqdh.mongodb.net/"+baseDeDatos+"?retryWrites=true"
/*Puerto por defecto para mongo 27017*/
mongoose.connect(process.env.MONGODB_URI_LOCAL, {useNewUrlParser: true});
var db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once ("open", function(){
    console.log("conectado a la base de datos.");
});
/**Definicion para usar findOneAndUpdate()*/
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

var viajeSchema = new mongoose.Schema({
  fecha:{
    type: String,
    required: true
  },
  salida:{
    type: String,
    required: true,
    index: true
  },
  precio:{
      adulto:{
        type: Number,
        required: true
      },
      niño:{
        type: Number,
        required: true
      }
  },
  asientos:{
    type:Number,
    required: true,
    default: maxAsientos
  },
  reservados:{
    type:Number,
    required: true
  },
  ocupado:{
    type:[Number],
    required: true
  }
});
var viaje = mongoose.model('viaje', viajeSchema);

app.get("/fechas", function (req, res) {
  viaje.find({reservados:{$lt:maxAsientos}},{fecha:1},function(err,ok){
    console.log(ok);
    if (err){return res.send("error al consultar en la base de datos.");}
    if (ok){return res.send(ok);}
  });
});
app.get("/asientos", function (req, res) {
  let query={};
  console.log(req.originalUrl);
  console.log(req.query.fecha);
  query["fecha"]=req.query.fecha;
  console.log(query);
  viaje.find(query,{_id:0},function(err,ok){
    console.log(ok);
    if (err){return res.send("error al consultar en la base de datos.");}
    if (ok){return res.send(ok);}
  });
});
var server = app.listen(app.get("port"), function () {
    console.log("Servidor corriendo en:"+app.get("port"));
});
