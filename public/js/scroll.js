portada= document.getElementById("portada");
/* Hacer visible el article eslogan */
eslogan = document.getElementById("eslogan");
cabeceraH = document.getElementById("cabecera").offsetHeight/4;
let comp = window.getComputedStyle(eslogan);
var margenes= parseInt(comp.getPropertyValue("margin-top"))+parseInt(comp.getPropertyValue("margin-bottom"))

// The function actually applying the offset
function offsetAnchor() {
  if (location.hash.length !== 0) {
    window.scrollTo(window.scrollX, window.scrollY - 60);
  }
}

// Captures click events of all a elements with href starting with #
$(document).on('click', 'a[href^="#"]', function(event) {
  // Click events are captured before hashchanges. Timeout
  // causes offsetAnchor to be called after the page jump.
  window.setTimeout(function() {
    offsetAnchor();
  }, 0);
});

// Set the offset when entering page with hash present in the url
window.setTimeout(offsetAnchor, 0);


var scrollFunc = function() {
    var y = window.scrollY;
    if (y >= portada.offsetHeight/2) {
        eslogan.className = "eslog show"
    }else {
        eslogan.className = "eslog hide"
    }
};

window.addEventListener("scroll", scrollFunc);


/* Hacer visible el text eslogan */
textEslogan = document.getElementById("text-eslogan");

var scrollFunc = function() {
    var y = window.scrollY;
    var altura= 10+portada.offsetHeight/2
    if (y >= altura) {
        textEslogan.className = "txt-eslog show"
    }else {
        textEslogan.className = "txt-eslog hide"
    }
};

window.addEventListener("scroll", scrollFunc);

/* Hacer visible el article experiencia */
experiencia = document.getElementById("experiencia");

var scrollFunc = function() {
    var y = window.scrollY;
    var altura= eslogan.offsetHeight+margenes+(portada.offsetHeight/2);
    if (y >=altura) {
        experiencia.className = "exper show"
    }else {
        experiencia.className = "exper hide"
    }
};

window.addEventListener("scroll", scrollFunc);

/* Hacer visible el text experiencia */
textExper = document.getElementById("text-experi");

var scrollFunc = function() {
    var y = window.scrollY;
    var altura= eslogan.offsetHeight+margenes+(portada.offsetHeight/2)+10;
    if (y >= altura+100) {
        textExper.className = "txt-experi show"
    }else {
        textExper.className = "txt-experi hide"
    }
};

window.addEventListener("scroll", scrollFunc);

/* Hacer visible el article producto */
producto = document.getElementById("producto");

var scrollFunc = function() {
    var y = window.scrollY;
    var altura= eslogan.offsetHeight+portada.offsetHeight+(experiencia.offsetHeight/2)+margenes*2;
    if (y >= altura) {
        producto.className = "prod show"
    }else {
        producto.className = "prod hide"
    }
};

window.addEventListener("scroll", scrollFunc);

/* Hacer visible el text producto */
textProdu = document.getElementById("text-produ");

var scrollFunc = function() {
    var y = window.scrollY;
    var altura= eslogan.offsetHeight+portada.offsetHeight+(experiencia.offsetHeight/2)+10+margenes*2;
    if (y >= altura+100) {
        textProdu.className = "txt-produ show"
    }else {
        textProdu.className = "txt-produ hide"
    }
};

window.addEventListener("scroll", scrollFunc);

/* Hacer visible el article nosotros */
nosotros = document.getElementById("nosotros");

var scrollFunc = function() {
    var y = window.scrollY;
    var altura= eslogan.offsetHeight+portada.offsetHeight+experiencia.offsetHeight+(producto.offsetHeight/2)+margenes*3;
    if (y >= altura) {
        nosotros.className = "nos show"
    }else {
        nosotros.className = "nos hide"
    }
};

window.addEventListener("scroll", scrollFunc);

/* Hacer visible el text nosotros */
textNos = document.getElementById("text-noso");

var scrollFunc = function() {
    var y = window.scrollY;
    var altura= eslogan.offsetHeight+portada.offsetHeight+experiencia.offsetHeight+(producto.offsetHeight/2)+10+margenes*3;
    if (y >= altura+100){
      textNos.className = "txt-noso show"
    }else {
        textNos.className = "txt-noso hide"
    }
};

window.addEventListener("scroll", scrollFunc);

/* Hacer visible el article contacto */
contacto = document.getElementById("contacto");

var scrollFunc = function() {
    var y = window.scrollY;
    var altura= eslogan.offsetHeight+portada.offsetHeight+experiencia.offsetHeight+producto.offsetHeight+(experiencia.offsetHeight/2)+margenes*4;
    if (y >= altura) {
        contacto.className = "contt show"
    }else {
        contacto.className = "contt hide"
    }
};

window.addEventListener("scroll", scrollFunc);
