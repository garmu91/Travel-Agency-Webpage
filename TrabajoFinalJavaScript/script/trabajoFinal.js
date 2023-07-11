/**********************************************************************************************************
***********************************Funciones para cargar noticias******************************************
**********************************************************************************************************/

/*Intenté usar un archivo de noticias tipo .json, pero no encontré. Este es la función que hubiese usado para cargarlo en la página.*/

/*function cargar() {
            $.ajax({
                url: 'ficha.json',
                type: 'GET',
                success: function (data) {
                    //eval() evalúa el contenido de data, data es el array del archivo json
                    objeto_json = eval(data);

                    //para traer data de archivos txt
                    //objeto_json = eval("(" + data + ")");

                    //leemos el contenido
                    var cadena = "";
                    for (i = 0; i < objeto_json.ficha.length; i++) {
                        cadena = cadena + "Nombre: <b>" +
                            objeto_json.ficha[i].nombre + "</b><br/>";
                        cadena = cadena + "Edad: " +
                            objeto_json.ficha[i].parametros.edad + "<br/>";
                        cadena = cadena + "Ciudad: " +
                            objeto_json.ficha[i].parametros.ciudad + "<br/>";
                        cadena = cadena + "Profesion: " +
                            objeto_json.ficha[i].parametros.profesion + "<br/>";
                        cadena = cadena + "Carnet: " +
                            objeto_json.ficha[i].parametros.carnet + "<br/><br/>";
                    }
                    $("#caja").html(cadena);
                },
                error: function (xhr, status) {
                    alert('Disculpe, existió un problema');
                }
            });
        }*/

//para traer data de archivos XML
function loadNews() {
    var objHttp = null;
    //Objeto XMLHttpRequest es el elemento clave para crear un canal de comunicación asíncrono con el servidor
    if (window.XMLHttpRequest) { //si es mozilla, chrome, safari....
        objHttp = new XMLHttpRequest();
    } else if (window.ActiveXObject) { // si es internet explorer
        objHttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    /*- open: abre un canal asíncrono con el servidor. Recibe varios parámetros: 
    open(metodo, url, [asincrono]es opcional, [usuario]opcional, [clave]opcional)*/
    objHttp.open("GET", "xml/rss.xml", true);
    /*onreadystatechange: propiedad que contiene el nombre de la función que se ejecutará al cambiar el estado del objeto.*/
    objHttp.onreadystatechange = function () {
        //readyState: almacena el estado actual del objeto, en este caso 4 Completado.
        if (objHttp.readyState == 4) {
            //responseXML: almacena la cadena devuelta por el servidor con la diferencia de que esta en XML
            var documento = objHttp.responseXML;
            var noticias = documento.documentElement;
            var cadena = "";
            //recorremos los elementos del archivo xml
            for (i = 0; i < 3; i++) {
                cadena = cadena + "<b>Titular:</b> " + noticias.getElementsByTagName("item")[i].childNodes[1].firstChild.nodeValue + "<br/><br/>";
                cadena = cadena + "<b>Descripción:</b> " + noticias.getElementsByTagName("item")[i].childNodes[5].firstChild.nodeValue + "<br/><br/>";
                cadena = cadena + "<b>Enlace:</b> <a href='" + noticias.getElementsByTagName("item")[i].childNodes[3].firstChild.nodeValue + "' target='_blank'>" + noticias.getElementsByTagName("item")[i].childNodes[3].firstChild.nodeValue + "</a><br/><br/><br/><br/>";
            }
            document.getElementById("caja1").innerHTML = cadena;
        }
    }
    /*send realiza la petición http, hasta que no se llama a este método no comienza la conexión. Recibe un parámetro por defecto con valor “null” que indica los posibles parámetros asociados al envío de la petición.*/
    objHttp.send(null);
}

/**********************************************************************************************************
******************************Funciones para crear un slider de imágenes***********************************
**********************************************************************************************************/

function moverizq() {
    //variable para guardar la última imagen y no se pierda
    var imagen11 = document.getElementById("img11").src;

    //las imágenes toman la fuente de la imagen a su derecha
    document.getElementById("img11").src = document.getElementById("img1").src;
    document.getElementById("img1").src = document.getElementById("img2").src;
    document.getElementById("img2").src = document.getElementById("img3").src;
    document.getElementById("img3").src = document.getElementById("img4").src;
    document.getElementById("img4").src = document.getElementById("img5").src;
    document.getElementById("img5").src = document.getElementById("img6").src;
    document.getElementById("img6").src = document.getElementById("img7").src;
    document.getElementById("img7").src = document.getElementById("img8").src;
    document.getElementById("img8").src = document.getElementById("img9").src;
    document.getElementById("img9").src = document.getElementById("img10").src;
    document.getElementById("img10").src = imagen11;
}

function moverder() {
    //variable para guardar la primera imagen y no se pierda
    var imagen1 = document.getElementById("img1").src;

    //las imágenes toman la fuente de la imagen a su izquierda
    document.getElementById("img1").src = document.getElementById("img11").src;
    document.getElementById("img11").src = document.getElementById("img10").src;
    document.getElementById("img10").src = document.getElementById("img9").src;
    document.getElementById("img9").src = document.getElementById("img8").src;
    document.getElementById("img8").src = document.getElementById("img7").src
    document.getElementById("img7").src = document.getElementById("img6").src;
    document.getElementById("img6").src = document.getElementById("img5").src;
    document.getElementById("img5").src = document.getElementById("img4").src;
    document.getElementById("img4").src = document.getElementById("img3").src;
    document.getElementById("img3").src = document.getElementById("img2").src
    document.getElementById("img2").src = imagen1;
}

/**********************************************************************************************************
******************************Funcion para validar presupuesto*********************************************
**********************************************************************************************************/

//Para calcular el presupuesto final, aplicando un porcentaje de descuento 10% mayor por cada día que pase hasta llegar al 50%. Al precio final le sumamos el valor de cada actividad extra elegida
function calcularPrecio() {
    var plazo = Number(document.getElementById("plazo").value);
    var porcentaje = null;
    var extraSeleccionada = document.getElementsByName("extras");
    var extras = 0;
    var producto = Number(document.getElementById("producto").value);

    if (plazo == 0) {
        porcentaje = null;
    } else if (plazo == 1) {
        porcentaje = porcentaje + 10;
    } else if (plazo == 2) {
        porcentaje = porcentaje + 20;
    } else if (plazo == 3) {
        porcentaje = porcentaje + 30;
    } else if (plazo == 4) {
        porcentaje = porcentaje + 40;
    } else if (plazo >= 5) {
        porcentaje = porcentaje + 50;
    }

    var descuento = porcentaje / 100;

    for (let i = 0; i < extraSeleccionada.length; i++) {
        if (extraSeleccionada[i].checked) {
            extras = extras + Number(extraSeleccionada[i].value);
        }
    }

    document.getElementById("precio").value = producto - (producto * descuento) + extras;
}

/**********************************************************************************************************
******************************Funcion para validar formularios*********************************************
**********************************************************************************************************/

function validar(form) {

    var msg = ''; //variable para ir generando el mensaje de error, son comillas simples

    // Controla que el campo del nombre sólo contiene letras de la a-z y A-Z, y tiene entre 1 y 15 caracteres
    re = /^[a-zA-Z]{1,15}$/
    //exec() ejecuta una busqueda sobre las coincidencias de una expresión regular en una cadena especifica.
    if (!re.exec(form.nombre.value)) {
        msg = msg + 'El campo "Nombre:" no puede estar vacío, sólo puede contener letras y no puede tener más de 15 caracteres.\n';
    }

    // Controla que el apellido no contiene números ni más de 40 caracteres
    re = /^[a-zA-Z]{1,40}$/
    if (!re.exec(form.apellidos.value)) {
        msg = msg + 'El campo "Apellidos:" no puede estar vacío, sólo puede contener letras y no puede tener más de 40 caracteres.\n';
    }

    // Comprobamos si el campo teléfono es un número
    //Debe comenzar por uno de los cuatro dígitos siguientes: ^(6|7|8|9), y tiene que haber 8 dígitos más entre 0-9
    re = /^(6|7|8|9)[0-9]{8}$/
    if (!re.exec(form.telefono.value)) {
        msg = msg + 'El campo "Teléfono de contacto:" debe comenzar por uno de los cuatro dígitos siguientes: 6|7|8|9 y debe contener 9 números.\n';
    }

    //Comprobamos el campo E-mail
    //Con la variable re controlamos que tenga caracteres antes del @, caracteres despúes del @, luego
    // un punto(.) y 2 o 3 caracteres luego del punto (.)
    re = /^(.+@.+[.]([_a-z0-9]{2,3}))$/
    if (!re.exec(form.correo.value)) {
        msg = msg + 'El campo "Correo electrónico:" está erroneo. Ejemplo = nnnnn_nnn@zzzzz.aaa\n';
    }

    //Para validar que se ha seleccionado un destino
    if (form.producto.value == "") {
        msg = msg + 'Debe seleccionar una opción de viaje.\n';
    }

    //Para validar que se ha indicado el plazo
    if (form.plazo.value == "") {
        msg = msg + 'Debe seleccionar un número de días.\n';
    }

    //Para validar que el checkbox de aceptación de condiciones ha sido marcado
    if (form.casilla.checked == false) {
        msg = msg + 'Debes aceptar las condiciones de privacidad.\n';
    }

    //Finalmente,
    if (msg != '') { //si hay error en alguna de las variables
        alert(msg); //los mostramos en un mensaje
        return false;
    } else {
        form.submit();
    }
}

/**********************************************************************************************************
******************************Funcion para crear mapa******************************************************
**********************************************************************************************************/

//Usamos L.map('mapa') para indicar el contenedor destino para el mapa y con
//setView indicamos las coordenadas, .setView([longitud, latitud], zoom);
var mimapa = L.map('mapa').setView([8.968235, -79.539318], 18);

//L.tileLayer será la URL que usara para cargar la imagen del mapa.
L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    //maxZoom será el zoom máximo    
    maxZoom: 28,
    /*attribution son los derechos del mapa, es obligatorio rellenarlo con los
    derechos de autor del mapa así como los de los otros proveedores usados
    como seria MapBox*/
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> '
}).addTo(mimapa);

/*Aparte de capas del mapa, geográfico, político, etc. podemos añadir otras
capas extra a nuestro mapa, como polígonos, círculos, líneas y marcadores.*/
L.marker([8.968159, -79.539374], {
    draggable: true
}).addTo(mimapa);

/*Para averiguar las coordenadas de nuestro mapa, preparamos un evento onClick que nos dé la posición tanto del pixel como la longitud y latitud.*/
mimapa.on("click", function (e) {
    var pixelPosition = e.layerPoint;
    var latLng = mimapa.layerPointToLatLng(pixelPosition);
    alert("Position Pixel = " + pixelPosition + "\n LatLng = " + latLng);
});

/*Este código nos crea una ruta entre dos coordenadas, que además nos
permite recalcular la ruta mientras se mueve un marcador.
L.Routing.control inicia la función. Como su nombre indica, toma el control.*/
L.Routing.control({
    //Waypoints son los puntos de control, los marcadores que se mostrarán en dichas coordenadas
    waypoints: [
        L.latLng(8.968159, -79.539374),
        L.latLng(8.968235, -79.539318)
    ],
    /*routeWhileDragging permite al pluging recalcular la ruta mientras se arrastra el
    marcador, esto consumirá más ancho de banda y carga de procesado pero
    permite dar buen feedback al usuario a la hora de desplazarse.*/
    routeWhileDragging: true
}).addTo(mimapa);