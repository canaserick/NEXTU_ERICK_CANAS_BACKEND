//Inicializador del elemento Slider
$("#rangoPrecio").ionRangeSlider({
  type: "double",
  grid: false,
  min: 0,
  max: 100000,
  from: 1000,
  to: 20000,
  prefix: "$"
})


function setSearch() {
  let busqueda = $('#checkPersonalizada')
  busqueda.on('change', (e) => {
    if (this.customSearch == false) {
      this.customSearch = true
    } else {
      this.customSearch = false
    }
    $('#personalizada').toggleClass('invisible')
  })
}

function ajaxRequest(url, type, data){
    return $.ajax({
      url: url,
      type: type,
      data: data
    })
}

function render(data){
  var lista = $('.lista')
  var dataTemplate = '<div class="card horizontal">' +
                      '  <div class="card-image">' +
                      '      <img src="img/home.jpg">' +
                      '  </div>' +
                      '  <div class="card-stacked">' +
                      '    <div class="card-content">' +
                      '      <div> <b>Direccion: </b>:direccion:</div>' +
                      '      <div> <b>Ciudad: </b>:ciudad:</div>' +
                      '      <div> <b>Telefono: </b>:telefono:</div>' +
                      '      <div> <b>Código postal: </b>:postal:</div>' +
                      '      <div> <b>Precio: </b>:precio:</div>' +
                      '      <div> <b>Tipo: </b>:tipo:</div>' +
                      '    </div>' +
                      '    <div class="card-action right-align">' +
                      '      <a href="#">Ver más</a>' +
                      '    </div>' +
                      '  </div>' +
                     '</div>'

  data.map(function (ddata){
    var newData = dataTemplate.replace(':direccion:', ddata.Direccion)
                              .replace(':ciudad:', ddata.Ciudad)
                              .replace(':telefono:', ddata.Telefono)
                              .replace(':postal:', ddata.Codigo_Postal)
                              .replace(':precio:', ddata.Tipo)
                              .replace(':tipo:', ddata.Precio)
    lista.append(newData)
  })
}
// funcion para cargar los datos en los selects
function cargaSelect(select, dataArray, tipo){
  let distinct = [... new Set(dataArray.map(item => item[tipo]))]
  for (var i = 0; i < distinct.length; i++){
    select.append($("<option></option>").attr("value", distinct[i]).text(distinct[i]));
  }
  $(select).material_select();
}
  var dataArray = [];

$(function(){
  setSearch()
  // arreglo para almacenar los datos del servidor
  var dataArray = [];
  var customSearch = false;
  // cargar la informacion del servidor
  var endpoint =  '/finder/'
  var data = 'nothing'
  ajaxRequest(endpoint, 'GET', data)
    .done(function(confirm){
        dataArray = confirm
        //cargar los datos en los selects
        cargaSelect($("#ciudad"),dataArray,"Ciudad")
        cargaSelect($("#tipo"),dataArray, "Tipo")
    }).fail(function (error){
        console.log(error)
  })

  // renderizar la data en el evento click del boton buscar
  $('#buscar').on('click', function(){
    if($('#checkPersonalizada').prop("checked") == false){
       $(".lista").empty()
        //busqueda general
        render(dataArray)
    } else {
      // obtener el rango de fechas
      var slider = $("#rangoPrecio").data("ionRangeSlider");
      var from = slider.result.from;
      var to = slider.result.to;
      //busqueda personalizada
      var dataFilter = jQuery.grep(dataArray, function(value, index){
          return (value.Ciudad == $("#ciudad").val() &&
                  value.Tipo == $("#tipo").val() &&
                  parseFloat(value.Precio.replace(/[$,]+/g,"")) >= from &&
                  parseFloat(value.Precio.replace(/[$,]+/g,"")) <= to
                  )
      })
      $(".lista").empty()
      render(dataFilter)
    }
  })


})
