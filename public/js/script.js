var reservados;
var asientosPedidos;
var maxAsientos;
var ocupados=[];
var aReservar=[];
var salida;
var precios={};
function listarFechas(){
  let req = new XMLHttpRequest();
  displayNone("btn_reserva");
  req.onreadystatechange = function() {
    if (req.readyState == 4 && req.status == 200) {
      var response = req.responseText;
      listado = JSON.parse(response);
      var contenido ="<option value='' disabled selected hidden>Elija fecha...</option>";
      var cantidad = listado.length;
      for(a=0;a<cantidad;a++){
        contenido = contenido + "<option value='" + listado[a].fecha + "'>" + listado[a].fecha + "</option>";
      }
      document.getElementById("fechas").innerHTML = contenido;
    }
  }
  req.open("GET", document.URL+"/fechas", true);
  req.send();
}
function reservarAsientos(){
  asientosPedidos= parseInt(document.getElementById("pedirAsientos").value);
  let req = new XMLHttpRequest();
  req.onreadystatechange = function() {
    if (req.readyState == 4 && req.status == 200) {
      var response = req.responseText;
      contenido=tryParseJSON(response);
      if (contenido == false){
        document.getElementById("asientosERR").innerHTML = "Error al obtener datos de la fecha correspondiente."
        return;
      }
      reservados = contenido[0].reservados;
      maxAsientos = contenido[0].asientos;
      ocupados= contenido[0].ocupado;
      salida = contenido[0].salida;
      precios= contenido[0].precio;
      if(reservados+asientosPedidos>maxAsientos){
        document.getElementById("asientosERR").innerHTML = "lo lamentamos, no es posible reservar esta cantidad de asientos al vuelo"
        return;
      }
      for(let i=1; i<= maxAsientos; i++){
        let obj = document.getElementById(i);
        if(ocupados.includes(i)){
          obj.src="./imagenes/asiento_reservado.png";
          obj.className = "asiento ocupado";
        }else{
          obj.addEventListener("click",CambiarClase,false);
          obj.src="./imagenes/asiento_disponible.png";
        }
      }
      document.getElementById("salida").innerHTML="salida desde:"+salida
      display("asientos","grid");
    }
  }
  req.open("GET", document.URL+"/asientos?fecha="+document.getElementById("fechas").value, true);
  req.send();
}
/*******************************************************************************
  Funcion: tryParseJSON
  Parametros:
    jsonString: Cadena de texto a tratar si es de formato JSON.
  Devuelve la cadena parseada a un coleccion de obj e caso que la cadena sea un
  formato correcto, en caso de fallos devuelve "false".
*******************************************************************************/
function tryParseJSON (jsonString){
    try {
        var o = JSON.parse(jsonString);
        if (o && typeof o === "object") {
            return o;
        }
    }
    catch (e) { }
    return false;
};
function display(id,type){
  document.getElementById(id).style.display=type;
}
function displayNone(id){
  document.getElementById(id).style.display="none";
}
function CambiarClase(click){
  //COMPROBAR SI ES IGUAL EL NUMERO DE ASIENTOS SELECCIONADOS CON LOS RESERVADOS EN EL FORMULARIO
  if(aReservar.length< asientosPedidos && click.target.classList.contains("libre")){
    click.target.className= "asiento seleccionado";
    click.target.src="./imagenes/asiento_hover.png";
    aReservar.push(click.target.id);
    if(aReservar.length==asientosPedidos){
        document.getElementById("btn_reserva").style.display="block";
    }
  }else if(click.target.classList.contains("seleccionado")){
    click.target.className= "asiento libre";
    click.target.src="./imagenes/asiento_disponible.png";
    aReservar = aReservar.filter(function(aReservar){return click.target.id!=aReservar});
    if(aReservar.length<asientosPedidos){
        displayNone("btn_reserva");
    }
    displayNone("btn_reserva");
  }
}
function reserva(){
  let req = new XMLHttpRequest();
  req.onreadystatechange = function() {
    if (req.responseText=="OK"){
      document.getElementById("fechaResumen").innerHTML="Fecha para salir (aprox.): "+document.getElementById("fechas").value;
      document.getElementById("salidaResumen").innerHTML="Para salir desde: "+salida;
      var auxText=""
      for(asiento in aReservar){
        auxText += " " + aReservar[asiento]+","
      }
      document.getElementById("asientosResumen").innerHTML="Asientos: "+auxText+" ("+aReservar.length+")";
      document.getElementById("precioResumen").innerHTML="Precio total: "+(aReservar.length*Object.values(precios)[0])+ " ("+Object.values(precios)[0]+" por asiento)";
    }else{
      document.getElementById("asientosERR").innerHTML=req.responseText;
    }
    display("resumenContenedor","block");
  }
  req.open("GET", document.URL+"list?fecha="+document.getElementById("fechas").value+"&asientos="+aReservar, true);
  req.send();
}
function realizarReserva(){
  console.log("vamos a hacer la reserva");
  let req = new XMLHttpRequest();
  req.onreadystatechange = function() {
  form =  new formData;

  }
  req.open("PUT", document.URL+"crearReserva", true);
  req.send();
}
