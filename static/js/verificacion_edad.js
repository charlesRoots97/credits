$('#animacion_edad_joven').hide();
$('#animacion_edad_mayor').hide();
document.getElementById('boton-verificar__edad').style.visibility = 'hidden';
function verif_edad(){
    var fecha_nacimiento_verificacion;
    fecha_nacimiento_verificacion = document.getElementById('fecha_nacimiento__verificacion').value;
    var hoy = new Date();
    var cumpleanos = new Date(fecha_nacimiento_verificacion);
    var edad = hoy.getFullYear() - cumpleanos.getFullYear();
    var m = hoy.getMonth() - cumpleanos.getMonth();

    if (m < 0 || (m === 0 && hoy.getDate() < cumpleanos.getDate())) {
        edad--;
    }

    if(edad > 18 && edad < 29){
        // alert(edad);
        $('#animacion_edad_joven').show();
        $('#animacion_edad_mayor').hide();
        $('#boton-verif_edad').hide();
        
        document.getElementById('boton-verif_edad').style.visibility = 'hidden';
        document.getElementById('boton-verificar__edad').style.visibility = 'visible';
    } else if( edad > 30 && edad < 70){
        // alert(edad);
        
        $('#animacion_edad_mayor').show();
        $('#animacion_edad_joven').hide();
        $('#boton-verif_edad').hide();

        document.getElementById('boton-verif_edad').style.visibility = 'hidden';
        document.getElementById('boton-verificar__edad').style.visibility = 'visible';
    }
}

function mov_seguro(){
    window.location.href = '/seguro';
}


var picker = new Lightpick({ 
    format: 'YYYY-MM-DD',
    field: document.getElementById('fecha_nacimiento__verificacion') 
  });

  var inputsToCapitalizeWordsCollection = document.getElementsByClassName("toCapitalizeWords");

  for (let i = 0; i < inputsToCapitalizeWordsCollection.length; i++) {
	  const element = inputsToCapitalizeWordsCollection[i];
	  element.addEventListener("keyup", pm.inputKeyUp);
	  
  }