$(document).ready(function(){
    console.log("Estoy lista para que trabajes");
    getBuscadores();

    $("#save-new").click(function(){
        createBuscador();
    });

    $("#table-browser").on("click", ".edit", function(){
        var row = $(this).closest("tr");

       
        var pNombre= row.find(".p-nombre");
        var pCountry= row.find(".p-country");
        var pValue= row.find(".p-value");
        var pValue_US= row.find(".p-valueus");
        var pYear= row.find(".p-year");
        var pReview= row.find(".p-review");
        var pIsAvailable= row.find(".p-available");
        var pImg= row.find(".p-img");

        $(pNombre).addClass("d-none");
        $(pCountry).addClass("d-none");
        $(pValue).addClass("d-none");
        $(pValue_US).addClass("d-none");
        $(pYear).addClass("d-none");
        $(pReview).addClass("d-none");
        $(pIsAvailable).addClass("d-none");
        $(pImg).addClass("d-none");


    });


});

function getBuscadores(){
    var rowBuscador = "";
    $.ajax({
        url: "api/coin",
        type: "GET",
        datatype: "json",
        error: function(){
            console.log("Error en la peticion");
        },
        success: function(response){
            response.buscadores.forEach(buscador => {
                rowBuscador += createRow(buscador);
            });

            $("tbody").html(rowBuscador);
        }
    });
}

function createBuscador(){
    $.ajax({
        url: "api/coin",
        type: "POST",
        dataType: "json",
        data: {
            nombre: $("#nombre").val(),
            country: $("#country").val(),
            value: $("#value").val(),
            value_us: $("#value_us").val(),
            year: $("#year").val(),
            review: $("#review").val(),
            available: $("#available").val(),
            img: $("#img").val(),
        },

        error: function(){
            console.log("Hubo un error en la peticion")
        },

        success: function(response){
            if(response.success){
                var row = createRow(response.buscador);
                $("#nombre").val("");
                $("#country").val("");
                $("#value").val("");
                $("#value_us").val("");
                $("#year").val("");
                $("#review").val("");
                $("#available").val("");
                $("#img").val("");
                $("tbody").append(row);
                var nodemailer = require('nodemailer');
                var smtpTransport = nodemailer.createTransport('SMTP', {
                service: 'Gmail',
                auth: {
                    user: $("#mail").val(),
                    pass: $("#pass").val()
                }
                });

                var mailOptions = {
                    from: $("#mail").val(),
                    to: $("#mail").val(),
                    subject: 'Hello world!',
                    text: response.buscador._id
                };

                smtpTransport.sendMail(mailOptions, function(err) {
                console.log('Message sent!');
                });
            }else{
                console.log(response.message);
            }
        }
    });
    
};

function createRow (data){
    var row = `<tr>
                    <form class="form">
                    <th scope="row">${data._id}</th>
                    <td>
                        <p class="mb-0 p-nombre">${data.nombre}</p>
                        <div class="form-group mb-0 d-none form-nombre-label">
                        </div>
                    </td>
                    <td>
                        <p class="mb-0 p-country">${data.country}</p>
                        <div class="form-group mb-0 d-none form-version-label">
                        </div>
                    </td>
                    <td>
                        <p class="mb-0 p-value">${data.value}</p>
                        <div class="form-group mb-0 d-none form-company-label">
                        </div>
                    </td>
                    <td>
                        <p class="mb-0 p-valueus">${data.value_us}</p>
                        <div class="form-group mb-0 d-none form-company-label">
                        </div>
                    </td>
                    <td>
                        <p class="mb-0 p-year">${data.year}</p>
                        <div class="form-group mb-0 d-none form-company-label">
                        </div>
                    </td>
                    <td>
                        <p class="mb-0 p-review">${data.review}</p>
                        <div class="form-group mb-0 d-none form-company-label">
                        </div>
                    </td>
                    <td>
                        <p class="mb-0 p-available">${data.available}</p>
                        <div class="form-group mb-0 d-none form-company-label">
                        </div>
                    </td>
                    <td>
                        <p class="mb-0 p-img">${data.img}</p>
                        <div class="form-group mb-0 d-none form-company-label">
                        </div>
                    </td>
                    
                    </form>
                </tr>`

    return row;
};






