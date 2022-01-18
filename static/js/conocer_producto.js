$("#tabl_beneficiario").click(function() {
    $("#tabl_beneficiario").addClass('button-clicked1');
    $('#tabl_caracteristica').removeClass("button-clicked1").addClass("button-clicked");
    $('#tabl_requisito').removeClass("button-clicked1").addClass("button-clicked");
    $('#tabl_documento').removeClass("button-clicked1").addClass("button-clicked");
    $('#tabl_cat').removeClass("button-clicked1").addClass("button-clicked");

});

$("#tabl_caracteristica").click(function() {
    $('#tabl_beneficiario').removeClass("button-clicked1").addClass("button-clicked");
    $('#tabl_requisito').removeClass("button-clicked1").addClass("button-clicked");
    $('#tabl_cat').removeClass("button-clicked1").addClass("button-clicked");
    $('#tabl_documento').removeClass("button-clicked1").addClass("button-clicked");
    $("#tabl_caracteristica").addClass('button-clicked1');
    
});

$("#tabl_requisito").click(function() {
    $('#tabl_caracteristica').removeClass("button-clicked1").addClass("button-clicked");
    $('#tabl_beneficiario').removeClass("button-clicked1").addClass("button-clicked");
    $('#tabl_documento').removeClass("button-clicked1").addClass("button-clicked");
    $('#tabl_cat').removeClass("button-clicked1").addClass("button-clicked");
    $("#tabl_requisito").addClass('button-clicked1');
});

$("#tabl_cat").click(function() {
    $('#tabl_requisito').removeClass("button-clicked1").addClass("button-clicked");
    $('#tabl_caracteristica').removeClass("button-clicked1").addClass("button-clicked");
    $('#tabl_beneficiario').removeClass("button-clicked1").addClass("button-clicked");
    $('#tabl_documento').removeClass("button-clicked1").addClass("button-clicked");
    $("#tabl_cat").addClass('button-clicked1');
});

$("#tabl_documento").click(function() {
    $('#tabl_caracteristica').removeClass("button-clicked1").addClass("button-clicked");
    $('#tabl_beneficiario').removeClass("button-clicked1").addClass("button-clicked");
    $('#tabl_requisito').removeClass("button-clicked1").addClass("button-clicked");
    $('#tabl_cat').removeClass("button-clicked1").addClass("button-clicked");
    $("#tabl_documento").addClass('button-clicked1');
});




$('#tabl_1').hide();
    $('#tabl_2').hide();
    $('#tabl_3').hide();
    $('#tabl_4').hide();
    $('#tabl_5').hide();
    $('#par__text').hide();
    function tabl_beneficiario() {
        $('#par__text').show();
        $('#tabl_1').show(1000);
        $('#tabl_2').hide(1000);
        $('#tabl_3').hide(1000);
        $('#tabl_4').hide(1000);
        $('#tabl_5').hide(1000);
    }
    function tabl_caracteristica() {
        $('#par__text').show();
        $('#tabl_1').hide(1000);
        $('#tabl_3').hide(1000);
        $('#tabl_2').show(1000);
        $('#tabl_4').hide(1000);
        $('#tabl_5').hide(1000);
    }
    function tabl_requisito() {
        $('#par__text').show();
        $('#tabl_1').hide(1000);
        $('#tabl_3').show(1000);
        $('#tabl_2').hide(1000);
        $('#tabl_4').hide(1000);
        $('#tabl_5').hide(1000);
    }
    function tabl_cat() {
        $('#par__text').show();
        $('#tabl_1').hide(1000);
        $('#tabl_3').hide(1000);
        $('#tabl_2').hide(1000);
        $('#tabl_4').show(1000);
        $('#tabl_5').hide(1000);
    }
    function tabl_documento() {
        $('#par__text').show();
        $('#tabl_1').hide(1000);
        $('#tabl_3').hide(1000);
        $('#tabl_2').hide(1000);
        $('#tabl_4').hide(1000);
        $('#tabl_5').show(1000);
    }