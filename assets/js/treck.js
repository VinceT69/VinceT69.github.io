$(document).ready(function(){
    //---contact us
    $('#submitButton').click(function(e) {
        $.ajaxSetup({
            headers: {
                'X-CSRF-TOKEN': jQuery('meta[name="csrf-token"]').attr('content')
            }
        });
        e.preventDefault();
        Contact();

    });

});

function Contact() {
    var formData = {
        name: $('#name').val(),
        email: $('#email').val(),
        subject:$('#subject').val(),
        body:$('#description').val(),
    };

    var type = "POST";
    var ajaxurl = '/contact-us';
    $("#submitButton").find($(".fa")).removeClass('fa fa-check-circle-o').addClass('fa fa-refresh fa-lg fa-spin');
    $.ajax({
        url:ajaxurl,
        method:type,
        type:'Application/json',
        data:formData,
        success:function (result) {

            $("#submitButton").find($(".fa")).removeClass('fa fa-refresh fa-lg fa-spin').addClass('fa fa-check-circle-o');
            toastr.options = {
                "closeButton": true,
                "progressBar": true,
                "positionClass": "toast-top-center",
                "showEasing": "swing",
                "hideEasing": "linear",
                "showMethod": "fadeIn",
                "hideMethod": "fadeOut" } ;
            if(result.error){
                toastr.error(result.error);
            }else{
                document.getElementById('contact-form').reset();
                toastr.success(result.success);
            }
        }
    });
}

