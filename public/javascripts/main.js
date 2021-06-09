$(document).ready(function(){
    console.log("Estoy lista para que trabajes");
    getBuscadores();

    $("#save-new").click(function(){
        createBuscador();
    });

    $("#table-browser").on("click", ".edit", function(){
        var row = $(this).closest("tr");

       
        var pNombre= row.find(".p-nombre");
        var pImagen= row.find(".p-imagen");
        var pPrecio= row.find(".p-precio");
        var pDescripcion= row.find(".p-descripcion");

        $(pNombre).addClass("d-none");
        $(pImagen).addClass("d-none");
        $(pPrecio).addClass("d-none");
        $(pDescripcion).addClass("d-none");


    });
    $("#table-browser").on("click", ".delete", function(){
        deleteBuscador($(this).attr("data-id"));
    });


});

function getBuscadores(){
    var rowBuscador = "";
    $.ajax({
        url: "api/bebida",
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
        url: "api/bebida",
        type: "POST",
        dataType: "json",
        data: {
            nombre: $("#nombre").val(),
            imagen: $("#imagen").val(),
            precio: $("#precio").val(),
            descripcion: $("#descripcion").val(),
        },

        error: function(){
            console.log("Hubo un error en la peticion")
        },

        success: function(response){
            if(response.success){
                var row = createRow(response.buscador);
                $("#nombre").val("");
                $("#imagen").val("");
                $("#precio").val("");
                $("#descripcion").val("");
                $("tbody").append(row);
                
            }else{
                console.log(response.message);
            }
        }
    });
    
};
function deleteBuscador(id){
    $.ajax({
        url: "api/bebida/" + id,
        type: "DELETE",
        dataType: "json",

        error: function(){
            console.log("Hubo un error en la peticion")
        },

        success: function(response){
            if(response.success){
                getBuscadores();
            }else{
                console.log(response.message);
            }
        }
    })
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
                        <p class="mb-0 p-imagen">${data.imagen}</p>
                        <div class="form-group mb-0 d-none form-version-label">
                        </div>
                    </td>
                    <td>
                        <p class="mb-0 p-precio">${data.precio}</p>
                        <div class="form-group mb-0 d-none form-company-label">
                        </div>
                    </td>
                    <td>
                        <p class="mb-0 p-descripcion">${data.descripcion}</p>
                        <div class="form-group mb-0 d-none form-company-label">
                        </div>
                    </td>
                    <td>
                        <button type="button" class="btn btn-danger  mx-2 delete" data-id="${data._id}"><i class="fas fa-trash-alt font-2"></i></button>
                    </td>
                    
                    </form>
                </tr>`

    return row;
};






