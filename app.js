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

var bcrypt = require('bcrypt');
var nodemailer = require('nodemailer');
/*Declaración para manejo de estructuras JSON que comunicaran el servidor con la DB*/
var bodyParser = require("body-parser");
app.use(bodyParser.json()); // soporte para bodies codificados en jsonsupport
app.use(bodyParser.urlencoded({ extended: true })); // soporte para bodies
/*Declaración de dependencias para manejo de DB con mongoBD*/
var mongoose = require("mongoose");
if (process.env.NODE_ENV == "production"){
  mongoose.connect(process.env.MONGODB_URI, {useNewUrlParser: true});
}else{
  mongoose.connect(process.env.MONGODB_URI_LOCAL, {useNewUrlParser: true});
}
var db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once ("open", function(){
    console.log("conectado a la base de datos at:"+process.env.NODE_ENV);
});
/**Definicion para usar findOneAndUpdate()*/
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

var reservaSchema= new mongoose.Schema({
  _id: String,
  fecha:{
    type: String,
    required: true
  },
  nombre:{
    type: String,
    required: true
  },
  pago:{
    type:String,
    required: true
  },
  reservados:{
    type:[Number],
    required: true
  }
},{_id:false});
var reserva = mongoose.model('reservas', reservaSchema);
var viajeSchema = new mongoose.Schema({
  fecha:{
    type: String,
    required: true,
    index: true
  },
  salida:{
    type: String,
    required: true
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

app.get("/reserva/fechas", function (req, res) {
  viaje.find({reservados:{$lt:maxAsientos}},{fecha:1},function(err,ok){
    console.log(ok);
    if (err){return res.send("error al consultar en la base de datos.");}
    if (ok){return res.send(ok);}
  });
});
app.get("/reserva/asientos", function (req, res) {
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
app.get("/reserva/list", function(req,res){
  /*Porcesamos los valores del query para tratar en la busqueda*/
  var aux= req.query.asientos.split(",");
  for (var valor in aux){
    aux[valor]=parseInt(aux[valor]);
  }
  /*Buscamos en la base de datos si para la fecha seleccionada, los asientos que vamos a
  reservar ya están ocupados*/
  var query ={fecha:req.query.fecha, ocupado:{$in:aux}}
  viaje.find(query,{},function(err,ok){
    console.log(ok);
    if (err){return res.send("error al consultar en la base de datos.");}
    if (ok){
        if(ok.length){
          return res.send("lo sentimos al parecer algunos de los asientos pedido ya están ocupados.");
        }else {
          return res.send("OK");
        }
    }
  });
});
app.put("/reserva/crearReserva",function(req,res){
  console.log("he recibido PUT desde reserva");
  console.log(req.body);

  var asientos= req.body.asientos.split(",");
  for (var valor in asientos){
    asientos[valor]=parseInt(asientos[valor]);
  }
  viaje.updateOne({fecha:req.body.fecha}, { $push: { ocupado: { $each: asientos } } , $inc: {reservados: asientos.length} }, function (err, res){
    console.log(res);
    if (err){
      return res.send("error al actualizar el documento en viajes");
    }
  });
  var salt = bcrypt.genSaltSync();
  var pagoEncrip = bcrypt.hashSync(req.body.pago, salt);
  var id = createRandomString(15);
  console.log(id);
  console.log ("creando reserva.")
  console.log (asientos)
  var nuevaReserva= new reserva({_id:id,nombre:req.body.nombre,fecha:req.body.fecha,pago:pagoEncrip, reservados:asientos});
  console.log(nuevaReserva)
  nuevaReserva.save(function (error, reserva){
		if(error) return res.send("Ha habido un error.");
		if(reserva) {
      console.log ("enviando correo.")
      var transporte = nodemailer.createTransport({
       service: 'gmail',
       auth: {
              user: 'telefonica.space.journey@gmail.com',
              pass: 'telefonica2019'
          }
      });
      var cuerpo = "<p>Hola, "+req.body.nombre+":</p><p>Estás ahora un paso más cerca de dar ese gran salto que la humanidad empezó hace 50 años. Respecto a tu reserva ten en cuenta este indentificador:<br>"+id+"<br>para cualquier consulta y administración en tu reserva.<br>Te estaremos informando de cualquier novedad que refiera al proyecto, y actualizaciones que afecte a tu reserva.<br>Sin más que decir: PREPARANDO TODO HUOSTON</p><p>Este es un correo generado automáticamente, por favor no responda a este mensaje.</p>";
      var opciones = {
        from: 'aseert@spacejourney.com',
        to: req.body.email,
        subject: "Confirmación de reserva: "+id+" SpaceJourney",
        html:cuerpo
      };
      transporte.sendMail(opciones, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email enviado: ' + info.response);
        }
      });
      return res.send(id);
    }
  });
});
function createRandomString(length){
    var str = "";
    for ( ; str.length < length; str += Math.random().toString(36).substr(2));
    return str.substr( 0, length);
}
var server = app.listen(app.get("port"), function () {
    console.log("Servidor corriendo en:"+app.get("port"));
});
