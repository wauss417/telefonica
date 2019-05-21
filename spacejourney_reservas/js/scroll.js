
/* Hacer visible el article eslogan */
eslogan = document.getElementById("eslogan");

var scrollFunc = function() {
    var y = window.scrollY;
    if (y >= 400) {
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
    if (y >= 600) {
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
    if (y >= 1200) {
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
    if (y >= 1400) {
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
    if (y >= 1800) {
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
    if (y >= 1400) {
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
    if (y >= 2500) {
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
    if (y >= 2700) {
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
    if (y >= 3200) {
        contacto.className = "contt show"
    }else {
        contacto.className = "contt hide"
    }
};

window.addEventListener("scroll", scrollFunc);
