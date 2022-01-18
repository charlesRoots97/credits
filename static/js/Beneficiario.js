function someFunc() {
    add_beneficiario();
    extraerBeneficiario_dos();
}
document.getElementById('boton-continuar_pago').style.visibility = 'hidden';
$('#boton-continuar_DT').hide();
$('#terminos_input__condicion').hide();

function extraerBeneficiario_dos(){
	// $('#verificacion_titular').show();
	document.getElementById('boton-continuar_pago').style.visibility = 'visible';
	var nombre_benefi, apellido_paterno_benefi, apellido_materno_benefi, porcentaje_benefi, parentesco_benifi, id, curpMayus, titular_CURP;

    nombre_benefi = document.getElementById('nombre_beneficiario').value;
    apellido_paterno_benefi = document.getElementById('apellido_p_beneficiario').value;
    apellido_materno_benefi = document.getElementById('apellido_m_beneficiario').value;
    porcentaje_benefi = document.getElementById('porcentaje_beneficiario').value;
    parentesco_benifi = document.getElementById('parentesco_beneficiario').value;
	curpMayus = document.getElementById('curp_beneficiario_Comprobar').value;

	titular_CURP = document.getElementById('titular_CURP').value;

	id = curpMayus.toUpperCase();
	// console.log(id);
    valcurp = /^[A-Z\d]{18}$/;

	if(nombre_benefi == "" || apellido_paterno_benefi == "" || apellido_materno_benefi == "" || porcentaje_benefi == "" || parentesco_benifi =="") 
	{
		swal.fire("Complete los campos ","Antes de continúar complete los campos que se encuentren vacíos.","warning");
		$('#verificacion_titular').hide();
	} else if(!valcurp.test(id) ||  id.length < 18)
	{
		swal.fire("Error","Tienes que ingresar una CURP valida.","error");
		$('#verificacion_titular').hide();
	} else if(titular_CURP != id)
	{
		swal.fire("Error","La CURP ingresada no coincide con la del titular.","error");
		$('#verificacion_titular').hide();
	}
	else{
		var datos = "id="+id;
		// console.log(datos);
		$.ajax({
          url: '/verdtatitu/'+id,
          type: 'POST',
        	//   data: datos,
			success: function(responses)
			{
				
				sgList = responses.datas[0];
			
				var idCotiza = sgList.id_usuario_cotiza;
				var NombreCotiza = sgList.nombre;
				var apellidoP_Cotiza = sgList.apellido_paterno;
				var apellidoM_Cotiza = sgList.apellido_materno;
				var CURP_Cotiza = sgList.CURP;
				var imagen_seguro = sgList.img_seguro;
				var precio = sgList.precio;

				// if(id == CURP_Cotiza){
				// 	$('#verificacion_titular').show();
				// 	var dest = $("#dts_titular").offset().top;
				// 	$("html, body").animate({scrollTop: dest},600);
				// 	document.getElementById('boton-continuar_Resumen').style.visibility = 'hidden';
				// 	document.getElementById('boton-continuar_DT').style.visibility = 'hidden';

				// }

				$(document).ready(function()
				{


				$('#titular_veri').val(idCotiza);
				$('#nombre_titular').val(NombreCotiza);
				$('#apellido_paterno_titular').val(apellidoP_Cotiza);
				$('#apellido_materno_titular').val(apellidoM_Cotiza);
				$('#curp_titular').val(CURP_Cotiza);
				$('#precio_seguro').val("$"+precio);
				$('#imagen_seguro').html('<img class="logo-insignia"  src="/static/img/'+imagen_seguro +'" >');
				});  
			}
    	});
        
	}
}




function add_beneficiario(){  
	var id_titular, nombre_beneficiario, apellido_p_beneficiario, apellido_m_beneficiario, porcentaje_beneficiario, parentesco_beneficiario;
	var nombre_beneficiario_dina, apellido_p_beneficiario_dina, apellido_m_beneficiario_dina, porcentaje_beneficiario_dina, parentesco_beneficiario_dina;
	var nombre_beneficiario_dina3, apellido_p_beneficiario_dina3, apellido_m_beneficiario_dina3, porcentaje_beneficiario_dina3, parentesco_beneficiario_dina3;
	var nombre_beneficiario_dina4, apellido_p_beneficiario_dina4, apellido_m_beneficiario_dina4, porcentaje_beneficiario_dina4, parentesco_beneficiario_dina4; 
  
	nombre_beneficiario = document.getElementById('nombre_beneficiario').value;
	apellido_p_beneficiario = document.getElementById('apellido_p_beneficiario').value;
	apellido_m_beneficiario = document.getElementById('apellido_m_beneficiario').value;
	porcentaje_beneficiario = document.getElementById('porcentaje_beneficiario').value;
	parentesco_beneficiario = document.getElementById('parentesco_beneficiario').value;
	titular_veri = document.getElementById('id_name_usuario').value;

	nombre_beneficiario_dina = document.getElementById('nombre_beneficiario_dina').value;
	apellido_p_beneficiario_dina = document.getElementById('apellido_p_beneficiario_dina').value;
	apellido_m_beneficiario_dina = document.getElementById('apellido_m_beneficiario_dina').value;
	porcentaje_beneficiario_dina = document.getElementById('porcentaje_beneficiario_dina').value;
	parentesco_beneficiario_dina = document.getElementById('parentesco_beneficiario_dina').value;

	nombre_beneficiario_dina3 = document.getElementById('nombre_beneficiario_dina3').value;
	apellido_p_beneficiario_dina3 = document.getElementById('apellido_p_beneficiario_dina3').value;
	apellido_m_beneficiario_dina3 = document.getElementById('apellido_m_beneficiario_dina3').value;
	porcentaje_beneficiario_dina3 = document.getElementById('porcentaje_beneficiario_dina3').value;
	parentesco_beneficiario_dina3 = document.getElementById('parentesco_beneficiario_dina3').value;


	nombre_beneficiario_dina4 = document.getElementById('nombre_beneficiario_dina4').value;
	apellido_p_beneficiario_dina4 = document.getElementById('apellido_p_beneficiario_dina4').value;
	apellido_m_beneficiario_dina4 = document.getElementById('apellido_m_beneficiario_dina4').value;
	porcentaje_beneficiario_dina4 = document.getElementById('porcentaje_beneficiario_dina4').value;
	parentesco_beneficiario_dina4 = document.getElementById('parentesco_beneficiario_dina4').value;


    var porTotal = porcentaje_beneficiario + porcentaje_beneficiario_dina + porcentaje_beneficiario_dina3 + porcentaje_beneficiario_dina4;

    console.log(porTotal);



    if(porTotal < 100){
        swal.fire("Ocurrio un error","Debe sumar un total de 100 % en los beneficiarios y solo tienes "+ porTotal+"%","warning");
    } else if(porTotal > 100){
        swal.fire("Ocurrio un error","La suma del porcentaje de los beneficiarios no debe exceder a más del 100% ","warning");
    } 
	 else{
		$('#verificacion_titular').show();
					var dest = $("#dts_titular").offset().top;
					$("html, body").animate({scrollTop: dest},600);
					document.getElementById('boton-continuar_Resumen').style.visibility = 'hidden';
					document.getElementById('boton-continuar_DT').style.visibility = 'hidden';
	
	var datos = 'nombre_beneficiario='+nombre_beneficiario+'&apellido_p_beneficiario='+apellido_p_beneficiario+'&apellido_m_beneficiario='+apellido_m_beneficiario+'&porcentaje_beneficiario='+porcentaje_beneficiario+'&parentesco_beneficiario='+parentesco_beneficiario+'&titular_veri='+titular_veri+
				'&nombre_beneficiario_dina='+nombre_beneficiario_dina+'&apellido_p_beneficiario_dina='+apellido_p_beneficiario_dina+'&apellido_m_beneficiario_dina='+apellido_m_beneficiario_dina+'&porcentaje_beneficiario_dina='+porcentaje_beneficiario_dina+'&parentesco_beneficiario_dina='+parentesco_beneficiario_dina+
				'&nombre_beneficiario_dina3='+nombre_beneficiario_dina3+'&apellido_p_beneficiario_dina3='+apellido_p_beneficiario_dina3+'&apellido_m_beneficiario_dina3='+apellido_m_beneficiario_dina3+'&porcentaje_beneficiario_dina3='+porcentaje_beneficiario_dina3+'&parentesco_beneficiario_dina3='+parentesco_beneficiario_dina3+
				'&nombre_beneficiario_dina4='+nombre_beneficiario_dina4+'&apellido_p_beneficiario_dina4='+apellido_p_beneficiario_dina4+'&apellido_m_beneficiario_dina4='+apellido_m_beneficiario_dina4+'&porcentaje_beneficiario_dina4='+porcentaje_beneficiario_dina4+'&parentesco_beneficiario_dina4='+parentesco_beneficiario_dina4;
	$.ajax({
	  url: '/add_beneficiario',
	  type: 'POST',
	  data: datos,
	  success: function(data)
	  {
		// console.log(data);
		// window.location.href = '/banco';
		document.getElementById('boton-continuar_DT').style.visibility = 'visible';
		$('#terminos_input__condicion').show();
		document.getElementById('boton-continuar_pago').style.visibility = 'hidden';
	  }
	})

    }
  
}


$('#verificacion_titular').hide();
function extraerBeneficiario(){
	// $('#verificacion_titular').show();
	var nombre_benefi, apellido_paterno_benefi, apellido_materno_benefi, porcentaje_benefi, parentesco_benifi, id, curpMayus;

    nombre_benefi = document.getElementById('nombre_beneficiario').value;
    apellido_paterno_benefi = document.getElementById('apellido_p_beneficiario').value;
    apellido_materno_benefi = document.getElementById('apellido_m_beneficiario').value;
    porcentaje_benefi = document.getElementById('porcentaje_beneficiario').value;
    parentesco_benifi = document.getElementById('parentesco_beneficiario').value;
	curpMayus = document.getElementById('curp_beneficiario_Comprobar').value;

	let today = new Date();
	let day = today.getDate();
	let month = today.getMonth()+1;
	let year = today.getFullYear();
	let date = new Date(year+"-"+month+"-"+day);
	date.setDate(date.getDate()+5);
	let timestampAfterFiveDays = date.getTime();
	timestampAfterFiveDays = timestampAfterFiveDays+"";
	timestampAfterFiveDays = timestampAfterFiveDays.substr(0,10);

	let titular_name = document.getElementById('titular_name').value;
	let titular_email = document.getElementById('titular_email').value;
	let titular_phone = document.getElementById('titular_phone').value;
	let secure_price = document.getElementById('secure_price').value;
	secure_price = parseFloat(secure_price)*100;
	secure_price = parseInt(secure_price);
	let product_name = document.getElementById('product_name').value;
	product_name = "Seguro "+product_name;
	let url_payment = "";

	id = curpMayus.toUpperCase();
	// console.log(titular_name, titular_email, titular_phone, secure_price, product_name);
    valcurp = /^[A-Z\d]{18}$/;

	if(nombre_benefi == "" || apellido_paterno_benefi == "" || apellido_materno_benefi == "" || porcentaje_benefi == "" || parentesco_benifi =="") 
	{
		swal.fire("Error","Complete los campos antes de continúar.","error");
		$('#verificacion_titular').hide();
	} else if(!valcurp.test(id) ||  id.length < 18)
	{
		swal.fire("Error","Tienes que ingresar una CURP valida.","error");
		$('#verificacion_titular').hide();
	} else{
		var datos = "id="+id;
		$.ajax({
          url: '/verdtatitular/'+id,
          type: 'POST',
          data: {titular_name:titular_name, titular_email:titular_email, titular_phone:titular_phone, secure_price:secure_price, product_name:product_name, expires_at:timestampAfterFiveDays},
			success: function(response)
			{
				// console.log(response);
				url_payment = response.url;
				console.log(url_payment);
				let win = window.open(url_payment,'_blank');
				win.focus();
				return false;

				sgList = response.datas[0];
			
				var idCotiza = sgList.id_usuario_cotiza;
				var NombreCotiza = sgList.nombre;
				var apellidoP_Cotiza = sgList.apellido_paterno;
				var apellidoM_Cotiza = sgList.apellido_materno;
				var CURP_Cotiza = sgList.CURP;
				var imagen_seguro = sgList.img_seguro;
				var precio = sgList.precio;

				if(id == CURP_Cotiza){
					$('#verificacion_titular').show();
					var dest = $("#verificacion_titular").offset().top;
					$("html, body").animate({scrollTop: dest},600);
			}

				$(document).ready(function()
				{


				$('#titular_veri').val(idCotiza);
				$('#nombre_titular').val(NombreCotiza);
				$('#apellido_paterno_titular').val(apellidoP_Cotiza);
				$('#apellido_materno_titular').val(apellidoM_Cotiza);
				$('#curp_titular').val(CURP_Cotiza);
				$('#precio_seguro').val("$"+precio);
				$('#imagen_seguro').html('<img class="logo-insignia"  src="static/img/'+imagen_seguro +'" >');
				});  
			}
        })
        
	}
}




$("#info_curp").hide();
var nombre = $("#curp_beneficiario_Comprobar");
nombre.focus(function(){
	$(this).css("border","2px solid green")
	$("#info_curp").show();
})
nombre.blur(function(){
	$(this).css("border","1px solid #ccc");
	$("#info_curp").hide();
})


prog = document.getElementById("porcentaje_beneficiario"); // El progreso
labl = document.getElementById("labl"); // la etiqueta
	
document.getElementById("minu").onclick = function(){ // El evento click del boton menos
	if(prog.value>=10){ // Verificamos que el valor sera mayor o igual a 100
	prog.value -= 10;
	labl.innerHTML = "Valor: "+prog.value; // Actualizamos la etiqueta
	}else{
		// swal.fire("Alerta!!","Ya no puedes reducir.","warning");
	}
}
document.getElementById("plus").onclick = function(){ // El evento click del boton mas
	console.log("desde arriba "+prog.value);
	if(prog.value<100){ // Verificamos que el valor sera menor que 100
	prog.value += 10; // Actualizamos la etiqueta
	labl.innerHTML = "Valor: "+prog.value;
    console.log(prog.value);
	}else if(prog.value==100){ // Si el valor es 1000 entonces solo lanzamos un alerta
		// swal.fire("Alerta!!","Ya no puedes exceder.","warning");
	}
}

  var pm = pm || {};
        
  pm.toCapitalizeWords = function(text){
	  return text.replace(/\w\S*/g, function(txt){
		  return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
	  });
  }

  pm.inputKeyUp = function(e){
	  var value = e.target.value;
	  e.target.value = pm.toCapitalizeWords(value);
  }

  pm.inputKeyUpDirect = function(input){
	  input.value = pm.toCapitalizeWords(input.value);
  }

  var inputsToCapitalizeWordsCollection = document.getElementsByClassName("toCapitalizeWords");

  for (let i = 0; i < inputsToCapitalizeWordsCollection.length; i++) {
	  const element = inputsToCapitalizeWordsCollection[i];
	  element.addEventListener("keyup", pm.inputKeyUp);
	  
  }


$("#boton-continuar_DT").attr('disabled', true); //DESABILITA EL BOTON DE ELIMINAR EN EL FORM 3

$('input[type=checkbox]').on('change', function() {
    if ($(this).is(':checked') ) {
        // console.log("Checkbox " + $(this).prop("id") +  " (" + $(this).val() + ") => Seleccionado");
		$("#boton-continuar_DT").attr('disabled', false); //HABILITA EL BOTON DE ELIMINAR EN EL FORM 3
    } else {
		$("#boton-continuar_DT").attr('disabled', true); //DESABILITA EL BOTON DE ELIMINAR EN EL FORM 3
        // console.log("Checkbox " + $(this).prop("id") +  " (" + $(this).val() + ") => Deseleccionado");
    }
});