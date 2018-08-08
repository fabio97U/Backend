$(document).ready(function(){
    inicializarSlider();
    inicializar();
    playVideoOnScroll();
});

$('#submitButton').click(function(){
    let ciudad = $('#selectCiudad option:selected').val();
    let tipo = $('#selectTipo option:selected').val();
    let precio = $('#rangoPrecio').val();
    console.log(ciudad + ' + ' + tipo + ' + ' + precio);
    debugger;
    $.get('buscador.php', {ciudad:ciudad, tipo:tipo, precio:precio}, function(res){
        let d = JSON.parse(res);
        var respuesta = d.data;
        mostrarResultado(respuesta);
    });
});

$.fn.scrollEnd = function(callback, timeout) {
  $(this).scroll(function(){
    var $this = $(this);
    if ($this.data('scrollTimeout')) {
      clearTimeout($this.data('scrollTimeout'));
    }
    $this.data('scrollTimeout', setTimeout(callback,timeout));
  });
};

function inicializarSlider(){
  $("#rangoPrecio").ionRangeSlider({
    type: "double",
    grid: false,
    min: 0,
    max: 100000,
    from: 20000,
    to: 80000,
    prefix: "$"
  });
}

function playVideoOnScroll(){
  var ultimoScroll = 0,
      intervalRewind;
  var video = document.getElementById('vidFondo');
  $(window)
    .scroll((event)=>{
      var scrollActual = $(window).scrollTop();
      if (scrollActual > ultimoScroll){
       $("#vidFondo").get(0).play();
     } else {
        $("#vidFondo").get(0).play();
     }
     ultimoScroll = scrollActual;
    })
    .scrollEnd(()=>{
      $("#vidFondo").get(0).pause();
    }, 10)
}

function inicializar(){
    let ciudades = [], tipos = [];
    $.get('data-1.json', (data)=>{
        for(let i = 0; i < data.length; i++){
            if(tipos.indexOf(data[i].Tipo) === -1) tipos.push(data[i].Tipo);
            if(ciudades.indexOf(data[i].Ciudad) === -1) ciudades.push(data[i].Ciudad);
        }
        for(let i = 0; i < tipos.length; i++)
            $('#selectTipo').append('<option value="'+tipos[i]+'">'+tipos[i]+'</option>');
        for(let i = 0; i < ciudades.length; i++)
            $('#selectCiudad').append('<option value="'+ciudades[i]+'">'+ciudades[i]+'</option>');

        $('select').material_select();
    });
}

$('#mostrarTodos').click(function(){
    $.get('data-1.json', function(data){
        mostrarResultado(data);
    });
});

function mostrarResultado(data){
    $('.resultados').empty();
    for(let i=0; i<data.length; i++){
        let number = 1 + Math.floor(Math.random() * 2)
        $('.resultados').append(`<div class="card horizontal"><div class="card-image place-wrapper"><img style="width:100%; height:100%" src="img/${data[i].Ciudad}_${number}.jpg"></div><div class="card-stacked"><div class="card-content"><p><b>Dirección: </b>${data[i].Direccion}<br><b>Ciudad: </b>${data[i].Ciudad}<br><b>Teléfono: </b>${data[i].Telefono}<br><b>Código Postal: </b>${data[i].Codigo_Postal}<br><b>Tipo: </b>${data[i].Tipo}<br><span class="price"><b>Precio: </b><h4 style="color:green">${data[i].Precio}</h4></span></p></div><div class="card-action"><a style="cursor:pointer" class="tooltipped" data-position="top" data-tooltip="Ver todos los detalles de tu lugar, ${data[i].Direccion}">Ver detalles</a></div></div></div>`);
    }
     $('.tooltipped').tooltip();
}
