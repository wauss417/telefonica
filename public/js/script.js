var reservados;
var asientosPedidos;
var maxAsientos;
var ocupados=[];
var aReservar=[];
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
  req.open("GET", "http://localhost:8080/fechas", true);
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
      /*ocupados.forEach(function(element){
        let obj = document.getElementById(element);
        obj.src="./imagenes/asiento_reservado.png";
        obj.removeEventListener("onclick", CambiarClase);
        obj.className = "asiento ocupado";
      });*/
    }
  }
  req.open("GET", "http://localhost:8080/asientos?fecha="+document.getElementById("fechas").value, true);
  req.send();;
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
function display(id){
  document.getElementById(id).style.display="block";
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
  
}
