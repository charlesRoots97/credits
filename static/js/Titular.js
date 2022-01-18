function add_cotizacion(){
  
    var nombre, apellido_paterno, apellido_materno, sexo, fecha_nacimiento, email, telefono, profesion, curp, precio_seguro, curpMayus, nombreMayus, apePeMayus, apeMeMayus;
  
    nombre = document.getElementById('nombre').value;
    apellido_paterno = document.getElementById('apellido_paterno').value;
    apellido_materno = document.getElementById('apellido_materno').value;
    sexo = document.getElementById('sexo').value;
    fecha_nacimiento = document.getElementById('fecha_nacimiento').value;
    email = document.getElementById('email').value;
    telefono = document.getElementById('telefono').value;
    profesion = document.getElementById('profesion').value;
    curp = document.getElementById('curp').value;
    precio_seguro = document.getElementById('precio_seguro').value;
    // console.log(fecha_nacimiento)
    curpMayus = curp.toUpperCase();
    nombreMayus = nombre.toUpperCase();
    apePeMayus = apellido_paterno.toUpperCase();
    apeMeMayus = apellido_materno.toUpperCase();
    let id_seguro = document.getElementById('seguro_id').value;

 
    var hoy = new Date();
    var cumpleanos = new Date(fecha_nacimiento);
    var edad = hoy.getFullYear() - cumpleanos.getFullYear();
    var m = hoy.getMonth() - cumpleanos.getMonth();
  
    if (m < 0 || (m === 0 && hoy.getDate() < cumpleanos.getDate())) {
        edad--;
    }

  //strtoupper

    emailval = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    intval =/^([0-9])*$/;
    valcurp = /^[A-Z\d]{18}$/;
  
    if(nombre == '' || email == '' || 
    telefono == '' || sexo == '')
    {
      
      swal.fire("Complete los campos ",
                "Antes de continúar complete los campos que se encuentren vacíos.",
                "warning"
                );
  
    } else if (!emailval.test(email)) {
      swal.fire("Error","Ingrese un correo valido.","warning");   
      return 0;
    // } else if (!intval.test(telefono) ||  telefono.length < 10) {
    //   swal.fire("Error","Ingrese un telefono valido.","warning");   
    //   return 0;
    } else if (!valcurp.test(curpMayus) ||  curpMayus.length < 18) {
      swal.fire("Error","Ingrese una CURP valida.","warning");   
      return 0;
    } else if(edad < 18){
      Swal.fire({
      title: 'Error!!',
      text: 'Aún no eres mayor de edad',
      type: 'warning',
      showConfirmButton: true,
      timer: 3000
  });
  }
    else{
      var datos = 'nombre='+nombre+'&apellido_paterno='+apellido_paterno+'&apellido_materno='+apellido_materno+'&sexo='+sexo+'&curp='+curp+'&fecha_nacimiento='+fecha_nacimiento+'&telefono='+telefono+'&email='+email+'&profesion='+profesion+'&precio_seguro='+precio_seguro;
      $.ajax({
        url: '/add_titular',
        type: 'POST',
        data: datos,
        success: function(data)
        {
          if(data.id != 0){
            window.location.href = "/beneficiario/"+data.id+"/"+id_seguro+"#registroNuevoBene";
          }else{
            Swal.fire({
                title: 'Woops!!',
                text: 'El titular con la CURP '+ curp.toUpperCase() +' ya existe dentro de nuestros registros.',
                type: 'warning',
                showConfirmButton: true,
                timer: 2000
            });
          }
          
          // nombre = document.getElementById('nombre').value = "";
          $("#boton-continuar-eve").click(function(event) {
            $("#formTitular")[0].reset();
          });
        }
      })
    }
  }





document.getElementById('boton-continuar_eve').style.visibility = 'hidden';
function btn_no(){
  Swal.fire({
    title: '¿Estás seguro de continuar?',
    text: "You won't be able to revert this!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Continuar'
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire(
        'Adelante!',
        'Puedes continuar con el registro, exito!!.',
        'success',
        document.getElementById('boton-continuar_eve').style.visibility = 'visible',
        document.getElementById('boton-si').style.visibility = 'hidden',
        document.getElementById('boton-no').style.visibility = 'hidden'
      )
    }
  });
}






$('#enfermedades').hide();
function btn_si(){
  $('#enfermedades').show();
  var dest = $("#enfermedades").offset().top;
  $("html, body").animate({scrollTop: dest},600);
}


$('#close_form__enferme').click(function(){
  $('#enfermedades').hide(1000);
});

  
  $(":input").inputmask();

  $("#telefono").inputmask({"mask": "9999999999"}); //(999) 999-9999




  var picker = new Lightpick({ 
    format: 'YYYY-MM-DD',
    field: document.getElementById('fecha_nacimiento') 
  });

  $(function () {
    $('#boton-continuar-eve').bind("click", function () {
        var dest = $("#registroNuevoBene").offset().top;
        $("html, body").animate({scrollTop: dest},600);
    });

  });

  // PARA PONER LA PRIMERA LETRA EN MAYUSCULA
  // var pm = pm || {};
        
  // pm.toCapitalizeWords = function(text){
	//   return text.replace(/\w\S*/g, function(txt){
	// 	  return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
	//   });
  // }

  // pm.inputKeyUp = function(e){
	//   var value = e.target.value;
	//   e.target.value = pm.toCapitalizeWords(value);
  // }

  // pm.inputKeyUpDirect = function(input){
	//   input.value = pm.toCapitalizeWords(input.value);
  // }

  var inputsToCapitalizeWordsCollection = document.getElementsByClassName("toCapitalizeWords");

  for (let i = 0; i < inputsToCapitalizeWordsCollection.length; i++) {
	  const element = inputsToCapitalizeWordsCollection[i];
	  element.addEventListener("keyup", pm.inputKeyUp);
	  
  }

  //** PREGUNTA #1 **/
  var miCheckbox = document.getElementById('preg_infarto');
  var msg = document.getElementById('msg');

  miCheckbox.addEventListener('click', function() {
    if(miCheckbox.checked) {
      // msg.innerText = 'Desmarcar la casilla si tu respuesta es Si';
      document.getElementById('preg_infarto1').style.visibility = 'hidden'
      document.getElementById('text_si').style.visibility = 'hidden'
    } else {
      // msg.innerText = '';
      document.getElementById('preg_infarto1').style.visibility = 'visible'
      document.getElementById('text_si').style.visibility = 'visible'
    }
  });


  var miCheckbox1 = document.getElementById('preg_infarto1');
  var msg = document.getElementById('msg2');

  miCheckbox1.addEventListener('click', function() {
    if(miCheckbox1.checked) {
      // msg.innerText = 'Desmarcar la casilla si tu respuesta es No';
      document.getElementById('preg_infarto').style.visibility = 'hidden'
      document.getElementById('text_no').style.visibility = 'hidden'
    } else {
      // msg.innerText = '';
      document.getElementById('preg_infarto').style.visibility = 'visible'
      document.getElementById('text_no').style.visibility = 'visible'
    }
  });


  //** PREGUNTA 2**/
  var miCheckbox3 = document.getElementById('preg_insufi');
  var msg = document.getElementById('msg');

  miCheckbox3.addEventListener('click', function() {
    if(miCheckbox3.checked) {
      // msg.innerText = 'Desmarcar la casilla si tu respuesta es Si';
      document.getElementById('preg_insufi1').style.visibility = 'hidden'
      document.getElementById('text_si1').style.visibility = 'hidden'
    } else {
      // msg.innerText = '';
      document.getElementById('preg_insufi1').style.visibility = 'visible'
      document.getElementById('text_si1').style.visibility = 'visible'
    }
  });


  var miCheckbox4 = document.getElementById('preg_insufi1');
  var msg = document.getElementById('msg2');

  miCheckbox4.addEventListener('click', function() {
    if(miCheckbox4.checked) {
      // msg.innerText = 'Desmarcar la casilla si tu respuesta es No';
      document.getElementById('preg_insufi').style.visibility = 'hidden'
      document.getElementById('text_no1').style.visibility = 'hidden'
    } else {
      // msg.innerText = '';
      document.getElementById('preg_insufi').style.visibility = 'visible'
      document.getElementById('text_no1').style.visibility = 'visible'
    }
  });


   //** PREGUNTA 3**/
   var miCheckbox5 = document.getElementById('preg_cardia');
   var msg = document.getElementById('msg');
 
   miCheckbox5.addEventListener('click', function() {
     if(miCheckbox5.checked) {
       // msg.innerText = 'Desmarcar la casilla si tu respuesta es Si';
       document.getElementById('preg_cardia1').style.visibility = 'hidden'
       document.getElementById('text_si2').style.visibility = 'hidden'
     } else {
       // msg.innerText = '';
       document.getElementById('preg_cardia1').style.visibility = 'visible'
       document.getElementById('text_si2').style.visibility = 'visible'
     }
   });
 
 
   var miCheckbox6 = document.getElementById('preg_cardia1');
   var msg = document.getElementById('msg2');
 
   miCheckbox6.addEventListener('click', function() {
     if(miCheckbox6.checked) {
       // msg.innerText = 'Desmarcar la casilla si tu respuesta es No';
       document.getElementById('preg_cardia').style.visibility = 'hidden'
       document.getElementById('text_no2').style.visibility = 'hidden'
     } else {
       // msg.innerText = '';
       document.getElementById('preg_cardia').style.visibility = 'visible'
       document.getElementById('text_no2').style.visibility = 'visible'
     }
   });

      //** PREGUNTA 4**/
      var miCheckbox7 = document.getElementById('preg_renal');
      var msg = document.getElementById('msg');
    
      miCheckbox7.addEventListener('click', function() {
        if(miCheckbox7.checked) {
          // msg.innerText = 'Desmarcar la casilla si tu respuesta es Si';
          document.getElementById('preg_renal1').style.visibility = 'hidden'
          document.getElementById('text_si3').style.visibility = 'hidden'
        } else {
          // msg.innerText = '';
          document.getElementById('preg_renal1').style.visibility = 'visible'
          document.getElementById('text_si3').style.visibility = 'visible'
        }
      });
    
    
      var miCheckbox8 = document.getElementById('preg_renal1');
      var msg = document.getElementById('msg2');
    
      miCheckbox8.addEventListener('click', function() {
        if(miCheckbox8.checked) {
          // msg.innerText = 'Desmarcar la casilla si tu respuesta es No';
          document.getElementById('preg_renal').style.visibility = 'hidden'
          document.getElementById('text_no3').style.visibility = 'hidden'
        } else {
          // msg.innerText = '';
          document.getElementById('preg_renal').style.visibility = 'visible'
          document.getElementById('text_no3').style.visibility = 'visible'
        }
      });

           //** PREGUNTA 4**/
      var miCheckbox7 = document.getElementById('preg_renal');
      var msg = document.getElementById('msg');
    
      miCheckbox7.addEventListener('click', function() {
        if(miCheckbox7.checked) {
          // msg.innerText = 'Desmarcar la casilla si tu respuesta es Si';
          document.getElementById('preg_renal1').style.visibility = 'hidden'
          document.getElementById('text_si3').style.visibility = 'hidden'
        } else {
          // msg.innerText = '';
          document.getElementById('preg_renal1').style.visibility = 'visible'
          document.getElementById('text_si3').style.visibility = 'visible'
        }
      });
    
    
      var miCheckbox8 = document.getElementById('preg_renal1');
      var msg = document.getElementById('msg2');
    
      miCheckbox8.addEventListener('click', function() {
        if(miCheckbox8.checked) {
          // msg.innerText = 'Desmarcar la casilla si tu respuesta es No';
          document.getElementById('preg_renal').style.visibility = 'hidden'
          document.getElementById('text_no3').style.visibility = 'hidden'
        } else {
          // msg.innerText = '';
          document.getElementById('preg_renal').style.visibility = 'visible'
          document.getElementById('text_no3').style.visibility = 'visible'
        }
      });

     //** PREGUNTA 5**/
     var miCheckbox9 = document.getElementById('preg_SIDA');
     var msg = document.getElementById('msg');
   
     miCheckbox9.addEventListener('click', function() {
       if(miCheckbox9.checked) {
         // msg.innerText = 'Desmarcar la casilla si tu respuesta es Si';
         document.getElementById('preg_SIDA1').style.visibility = 'hidden'
         document.getElementById('text_si4').style.visibility = 'hidden'
       } else {
         // msg.innerText = '';
         document.getElementById('preg_SIDA1').style.visibility = 'visible'
         document.getElementById('text_si4').style.visibility = 'visible'
       }
     });
   
   
     var miCheckbox10 = document.getElementById('preg_SIDA1');
     var msg = document.getElementById('msg2');
   
     miCheckbox10.addEventListener('click', function() {
       if(miCheckbox10.checked) {
         // msg.innerText = 'Desmarcar la casilla si tu respuesta es No';
         document.getElementById('preg_SIDA').style.visibility = 'hidden'
         document.getElementById('text_no4').style.visibility = 'hidden'
       } else {
         // msg.innerText = '';
         document.getElementById('preg_SIDA').style.visibility = 'visible'
         document.getElementById('text_no4').style.visibility = 'visible'
       }
     });

     //** PREGUNTA 6**/
     var miCheckbox11 = document.getElementById('preg_cirro');
     var msg = document.getElementById('msg');
   
     miCheckbox11.addEventListener('click', function() {
       if(miCheckbox11.checked) {
         // msg.innerText = 'Desmarcar la casilla si tu respuesta es Si';
         document.getElementById('preg_cirro1').style.visibility = 'hidden'
         document.getElementById('text_si5').style.visibility = 'hidden'
       } else {
         // msg.innerText = '';
         document.getElementById('preg_cirro1').style.visibility = 'visible'
         document.getElementById('text_si5').style.visibility = 'visible'
       }
     });
   
   
     var miCheckbox12 = document.getElementById('preg_cirro1');
     var msg = document.getElementById('msg2');
   
     miCheckbox12.addEventListener('click', function() {
       if(miCheckbox12.checked) {
         // msg.innerText = 'Desmarcar la casilla si tu respuesta es No';
         document.getElementById('preg_cirro').style.visibility = 'hidden'
         document.getElementById('text_no5').style.visibility = 'hidden'
       } else {
         // msg.innerText = '';
         document.getElementById('preg_cirro').style.visibility = 'visible'
         document.getElementById('text_no5').style.visibility = 'visible'
       }
     });

     //** PREGUNTA 7**/
     var miCheckbox13 = document.getElementById('preg_hiper');
     var msg = document.getElementById('msg');
   
     miCheckbox13.addEventListener('click', function() {
       if(miCheckbox13.checked) {
         // msg.innerText = 'Desmarcar la casilla si tu respuesta es Si';
         document.getElementById('preg_hiper1').style.visibility = 'hidden'
         document.getElementById('text_si6').style.visibility = 'hidden'
       } else {
         // msg.innerText = '';
         document.getElementById('preg_hiper1').style.visibility = 'visible'
         document.getElementById('text_si6').style.visibility = 'visible'
       }
     });
   
   
     var miCheckbox14 = document.getElementById('preg_hiper1');
     var msg = document.getElementById('msg2');
   
     miCheckbox14.addEventListener('click', function() {
       if(miCheckbox14.checked) {
         // msg.innerText = 'Desmarcar la casilla si tu respuesta es No';
         document.getElementById('preg_hiper').style.visibility = 'hidden'
         document.getElementById('text_no6').style.visibility = 'hidden'
       } else {
         // msg.innerText = '';
         document.getElementById('preg_hiper').style.visibility = 'visible'
         document.getElementById('text_no6').style.visibility = 'visible'
       }
     });

          //** PREGUNTA 7**/
     var miCheckbox13 = document.getElementById('preg_hiper');
     var msg = document.getElementById('msg');
   
     miCheckbox13.addEventListener('click', function() {
       if(miCheckbox13.checked) {
         // msg.innerText = 'Desmarcar la casilla si tu respuesta es Si';
         document.getElementById('preg_hiper1').style.visibility = 'hidden'
         document.getElementById('text_si6').style.visibility = 'hidden'
       } else {
         // msg.innerText = '';
         document.getElementById('preg_hiper1').style.visibility = 'visible'
         document.getElementById('text_si6').style.visibility = 'visible'
       }
     });
   
   
     var miCheckbox14 = document.getElementById('preg_hiper1');
     var msg = document.getElementById('msg2');
   
     miCheckbox14.addEventListener('click', function() {
       if(miCheckbox14.checked) {
         // msg.innerText = 'Desmarcar la casilla si tu respuesta es No';
         document.getElementById('preg_hiper').style.visibility = 'hidden'
         document.getElementById('text_no6').style.visibility = 'hidden'
       } else {
         // msg.innerText = '';
         document.getElementById('preg_hiper').style.visibility = 'visible'
         document.getElementById('text_no6').style.visibility = 'visible'
       }
     });

     //** PREGUNTA 8**/
     var miCheckbox15 = document.getElementById('preg_diabetes');
     var msg = document.getElementById('msg');
   
     miCheckbox15.addEventListener('click', function() {
       if(miCheckbox15.checked) {
         // msg.innerText = 'Desmarcar la casilla si tu respuesta es Si';
         document.getElementById('preg_diabetes1').style.visibility = 'hidden'
         document.getElementById('text_si7').style.visibility = 'hidden'
       } else {
         // msg.innerText = '';
         document.getElementById('preg_diabetes1').style.visibility = 'visible'
         document.getElementById('text_si7').style.visibility = 'visible'
       }
     });
   
   
     var miCheckbox16 = document.getElementById('preg_diabetes1');
     var msg = document.getElementById('msg2');
   
     miCheckbox16.addEventListener('click', function() {
       if(miCheckbox16.checked) {
         // msg.innerText = 'Desmarcar la casilla si tu respuesta es No';
         document.getElementById('preg_diabetes').style.visibility = 'hidden'
         document.getElementById('text_no7').style.visibility = 'hidden'
       } else {
         // msg.innerText = '';
         document.getElementById('preg_diabetes').style.visibility = 'visible'
         document.getElementById('text_no7').style.visibility = 'visible'
       }
     });

      //** PREGUNTA 9**/
      var miCheckbox15 = document.getElementById('preg_derrame');
      var msg = document.getElementById('msg');
        
      miCheckbox15.addEventListener('click', function() {
        if(miCheckbox15.checked) {
            // msg.innerText = 'Desmarcar la casilla si tu respuesta es Si';
          document.getElementById('preg_derrame1').style.visibility = 'hidden'
          document.getElementById('text_si8').style.visibility = 'hidden'
        } else {
            // msg.innerText = '';
          document.getElementById('preg_derrame1').style.visibility = 'visible'
          document.getElementById('text_si8').style.visibility = 'visible'
        }
      });
        
        
      var miCheckbox16 = document.getElementById('preg_derrame1');
      var msg = document.getElementById('msg2');
        
      miCheckbox16.addEventListener('click', function() {
        if(miCheckbox16.checked) {
          // msg.innerText = 'Desmarcar la casilla si tu respuesta es No';
          document.getElementById('preg_derrame').style.visibility = 'hidden'
          document.getElementById('text_no8').style.visibility = 'hidden'
        } else {
          // msg.innerText = '';
          document.getElementById('preg_derrame').style.visibility = 'visible'
          document.getElementById('text_no8').style.visibility = 'visible'
        }
      });

            //** PREGUNTA 9**/
      var miCheckbox15 = document.getElementById('preg_derrame');
      var msg = document.getElementById('msg');
        
      miCheckbox15.addEventListener('click', function() {
        if(miCheckbox15.checked) {
            // msg.innerText = 'Desmarcar la casilla si tu respuesta es Si';
          document.getElementById('preg_derrame1').style.visibility = 'hidden'
          document.getElementById('text_si8').style.visibility = 'hidden'
        } else {
            // msg.innerText = '';
          document.getElementById('preg_derrame1').style.visibility = 'visible'
          document.getElementById('text_si8').style.visibility = 'visible'
        }
      });
        
        
      var miCheckbox16 = document.getElementById('preg_derrame1');
      var msg = document.getElementById('msg2');
        
      miCheckbox16.addEventListener('click', function() {
        if(miCheckbox16.checked) {
          // msg.innerText = 'Desmarcar la casilla si tu respuesta es No';
          document.getElementById('preg_derrame').style.visibility = 'hidden'
          document.getElementById('text_no8').style.visibility = 'hidden'
        } else {
          // msg.innerText = '';
          document.getElementById('preg_derrame').style.visibility = 'visible'
          document.getElementById('text_no8').style.visibility = 'visible'
        }
      });

      //** PREGUNTA 10**/
      var miCheckbox17 = document.getElementById('preg_cancer');
      var msg = document.getElementById('msg');
        
      miCheckbox17.addEventListener('click', function() {
        if(miCheckbox17.checked) {
            // msg.innerText = 'Desmarcar la casilla si tu respuesta es Si';
          document.getElementById('preg_cancer1').style.visibility = 'hidden'
          document.getElementById('text_si9').style.visibility = 'hidden'
        } else {
            // msg.innerText = '';
          document.getElementById('preg_cancer1').style.visibility = 'visible'
          document.getElementById('text_si9').style.visibility = 'visible'
        }
      });
        
        
      var miCheckbox18 = document.getElementById('preg_cancer1');
      var msg = document.getElementById('msg2');
        
      miCheckbox18.addEventListener('click', function() {
        if(miCheckbox18.checked) {
          // msg.innerText = 'Desmarcar la casilla si tu respuesta es No';
          document.getElementById('preg_cancer').style.visibility = 'hidden'
          document.getElementById('text_no9').style.visibility = 'hidden'
        } else {
          // msg.innerText = '';
          document.getElementById('preg_cancer').style.visibility = 'visible'
          document.getElementById('text_no9').style.visibility = 'visible'
        }
      });

            //** PREGUNTA 10**/
      var miCheckbox17 = document.getElementById('preg_cancer');
      var msg = document.getElementById('msg');
        
      miCheckbox17.addEventListener('click', function() {
        if(miCheckbox17.checked) {
            // msg.innerText = 'Desmarcar la casilla si tu respuesta es Si';
          document.getElementById('preg_cancer1').style.visibility = 'hidden'
          document.getElementById('text_si9').style.visibility = 'hidden'
        } else {
            // msg.innerText = '';
          document.getElementById('preg_cancer1').style.visibility = 'visible'
          document.getElementById('text_si9').style.visibility = 'visible'
        }
      });
        
        
      var miCheckbox18 = document.getElementById('preg_cancer1');
      var msg = document.getElementById('msg2');
        
      miCheckbox18.addEventListener('click', function() {
        if(miCheckbox18.checked) {
          // msg.innerText = 'Desmarcar la casilla si tu respuesta es No';
          document.getElementById('preg_cancer').style.visibility = 'hidden'
          document.getElementById('text_no9').style.visibility = 'hidden'
        } else {
          // msg.innerText = '';
          document.getElementById('preg_cancer').style.visibility = 'visible'
          document.getElementById('text_no9').style.visibility = 'visible'
        }
      });

  

  