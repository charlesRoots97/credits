(function () {
    $("#seguro_cat").hide();
    $(".seguroCat").click(function (verSeguro) {
        $("#seguro_cat").show();
        var id = $(this).attr('id');
        let card = '';
        // console.log(lalo);
        $.ajax({
            url:   '/verseguro/'+id,
            type:  'GET', 
            success: function (response) {
                // console.log(response)
                let url_for = "";
                sgList = response.seguros;
                sgList.forEach(function(e){
                    console.log(e);
                    url_for = "{url_for ('static', filename = 'img/"+e.img_seguro+"')}";
                   card+="<li class='mv'>"+
                       "<div class='tabla-precio tabla_precio__dm'>"+
                           "<h3>"+e.nombre_cat+"</h3>"+
                           "<div class='logo-insignia'>"+
                            //    "<img src='"+url_for+"' alt='logo gdlwebcamp'>"+
                               "<img src='static/img/"+e.img_seguro+"' alt='logo gdlwebcamp'>"+
                           "</div>"+
                           "<ul>"+
                               "<li>De 18 hasta 65 años</li>"+
                               "<li>Cobertura inmediata</li>"+
                               "<li>Prima asegurada menor a 100,000 </li>"+
                            
                           "<div class='orden'>"+
                            //    "<a class='hollow button' id='adquirirCompra' href='/titular/id="+e.id_cat_seguro+"'>Adquiérelo por: $"+e.precio+"</a>"+
                               "<a class='hollow ' id='adquirirCompra' href='/titular/"+e.id_cat_seguro+"#registro_titu'>Adquiérelo por: $"+e.precio+"</a>"+
                               "<input type='hidden' value='"+e.id_cat_seguro+"' name='pase_dia' placeholder='200'>"+
                           "</div>"+
                       "</div>"+
                   "</li>"
                    
                });
                $('#listContent').html(card); 
                    location.href = '#listContent';
            }
        });
        
    });
})();


