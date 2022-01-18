 /**   FORMULARIO NUEVO 1**/
 $(function () {
    $('#add-dina_benefe').bind("click", function () {
        var dest = $("#registroNuevoBene_dina2").offset().top;
        $("html, body").animate({scrollTop: dest},600);
    });

});

$(function () {
     $('#dele-form_dina2').bind("click", function () {
         var dest = $("#registroNuevoBene").offset().top;
         $("html, body").animate({scrollTop: dest},600);
         $("#dele-form_dina3").attr('disabled', false);
     });

 });

 $("#registroNuevoBene_dina2").hide();
 function verFormDina2(){
     $("#registroNuevoBene_dina2").show();
     $("#add-dina_benefe").hide();
 }

 function cerrar_fomr_dina2(){
     $("#registroNuevoBene_dina2").hide();
     $('.limpiar-input').val('');
     $('#labl_dina').html('Valor: 0');

     $("#parentesco_beneficiario_dina3").find('option').not(':first').remove();
     $("#parentesco_beneficiario_dina3").val($("#parentesco_beneficiario_dina3 option:first").val());
     $("#add-dina_benefe").show();
 }

progreso2 = document.getElementById("porcentaje_beneficiario_dina");
lable2 = document.getElementById("labl_dina");

document.getElementById("minu2").onclick = function(){
	if(progreso2.value>=10){
	progreso2.value -= 10;
	lable2.innerHTML = "Valor: "+progreso2.value;
	}else{
		alert("No se puede disminuir!");
	}
}
document.getElementById("plus2").onclick = function(){
	console.log("desde arriba "+progreso2.value);
	if(progreso2.value<100){
	progreso2.value += 10;
	lable2.innerHTML = "Valor: "+progreso2.value;
    console.log(progreso2.value);
	}else if(progreso2.value==100){
		alert("No se puede sobrepasar!");
	}
}

 /** FIN DE FORMULARIO NUEVO 1**/



 /**   FORMULARIO NUEVO 2**/
 $(function () {
    $('#add-dina_benefe2').bind("click", function () {
        var dest = $("#registroNuevoBene_dina3").offset().top;
        $("html, body").animate({scrollTop: dest},600);
        $("#dele-form_dina2").attr('disabled', true); // DESABILITA EL BOTON DE ELIMINAR DEL FORM 2
    });

});

$(function () {
     $('#dele-form_dina3').bind("click", function () {
         var dest = $("#registroNuevoBene_dina2").offset().top;
         $("html, body").animate({scrollTop: dest},600);
         $("#dele-form_dina2").attr('disabled', false); // HABILITA EL BOTON DE ELIMINAR DEL FORM 2
     });

 });

 $("#registroNuevoBene_dina3").hide();
 function verFormDina3(){
     $("#registroNuevoBene_dina3").show();
     $("#add-dina_benefe2").hide();
 }

 function cerrar_fomr_dina3(){
     $("#registroNuevoBene_dina3").hide();
     $('.limpiar-input').val('');
     $('#labl3').html('Valor: 0');

     $("#parentesco_beneficiario_dina").find('option').not(':first').remove();
     $("#parentesco_beneficiario_dina").val($("#parentesco_beneficiario_dina option:first").val());
     $("#add-dina_benefe2").show();
 }

progreso3 = document.getElementById("porcentaje_beneficiario_dina3");
lable3 = document.getElementById("labl3");

document.getElementById("minu3").onclick = function(){
	if(progreso3.value>=10){
	progreso3.value -= 10;
	lable3.innerHTML = "Valor: "+progreso3.value;
	}else{
		alert("No se puede disminuir!");
	}
}
document.getElementById("plus3").onclick = function(){
	console.log("desde arriba "+progreso3.value);
	if(progreso3.value<100){
	progreso3.value += 10;
	lable3.innerHTML = "Valor: "+progreso3.value;
    console.log(progreso3.value);
	}else if(progreso3.value==100){
		alert("No se puede sobrepasar!");
	}
}

 /** FIN DE FORMULARIO NUEVO 2**/



 /**   FORMULARIO NUEVO 3**/
 $(function () {
    $('#add-dina_benefe3').bind("click", function () {
        var dest = $("#registroNuevoBene_dina4").offset().top;
        $("html, body").animate({scrollTop: dest},600);
    });

});

$(function () {
     $('#dele-form_dina4').bind("click", function () {
         var dest = $("#registroNuevoBene_dina3").offset().top;
         $("html, body").animate({scrollTop: dest},600);
         $("#dele-form_dina3").attr('disabled', false); //HABILITA EL BOTON DE ELIMINAR EN EL FORM 3
     });

 });

 $("#registroNuevoBene_dina4").hide();
 function verFormDina4(){
     $("#registroNuevoBene_dina4").show();
     $("#add-dina_benefe3").hide();
     $("#dele-form_dina3").attr('disabled', true); //DESABILITA EL BOTON DE ELIMINAR EN EL FORM 3
 }

 function cerrar_fomr_dina4(){
     $("#registroNuevoBene_dina4").hide();
     $('.limpiar-input').val('');
     $('#labl4').html('Valor: 0');

     $("#parentesco_beneficiario_dina4").find('option').not(':first').remove();
     $("#parentesco_beneficiario_dina4").val($("#parentesco_beneficiario_dina4 option:first").val());
     $("#add-dina_benefe3").show();

 }


progreso4 = document.getElementById("porcentaje_beneficiario_dina4");
lable4 = document.getElementById("labl4");

document.getElementById("minu4").onclick = function(){
	if(progreso4.value>=10){
	progreso4.value -= 10;
	lable4.innerHTML = "Valor: "+progreso4.value;
	}else{
		alert("No se puede disminuir!");
	}
}
document.getElementById("plus4").onclick = function(){
	console.log("desde arriba "+progreso4.value);
	if(progreso4.value<100){
	progreso4.value += 10;
	lable4.innerHTML = "Valor: "+progreso4.value;
    console.log(progreso4.value);
	}else if(progreso4.value==100){
		alert("No se puede sobrepasar!");
	}
}

 /** FIN DE FORMULARIO NUEVO 3**/



//  $(function () {
//     $('#boton-continuar_DT').bind("click", function () {
//         var dest = $("#verificacion_titular").offset().top;
//         $("html, body").animate({scrollTop: dest},600);
//     });

// });