var BuscadorWebModel = require('../Models/KeyModel');
const SearchManager = {};

SearchManager.create = (req, res, next) =>{
    var buscador = new BuscadorWebModel();
    buscador.imagen = req.body.imagen;
    buscador.nombre = req.body.nombre;
    buscador.precio = req.body.precio;
    buscador.descripcion = req.body.descripcion;

    buscador.save((error, buscador)=>{
        if(error) return res.status(500).json({status:500, success: false, message:"Error interno del servidor"});

        if(buscador){
            return res.status(200).json(buscador);
        }else{
            return res.status(404).json({status:404, success: false, message:"Error al guardar el nuevo buscador", buscador});
        }
    });
};



SearchManager.getBuscador = (req, res, next) =>{
    BuscadorWebModel.findById(req.params.id, (error, buscador)=>{
        if(error) return res.status(500).json({status:500, success: false, message:"Error interno del servidor"});

        if(buscador){
            return res.status(200).json(buscador);
        }else{
            return res.status(404).json({status:404, success: false, message:"No se encontro buscador"});
        }
    });
};

SearchManager.getBuscadores = (req, res, next) =>{
    BuscadorWebModel.find({}, (error, buscadores)=>{
        if(error) return res.status(500).json({status:500, success: false, message:"Error interno del servidor"});

        if(buscadores){
            return res.status(200).json(buscadores);
        }else{
            return res.status(404).json({status:404, success: false, message:"No se encontraron buscadores"});
        }
    });
};
SearchManager.getBuscadorNombre = (req, res, next) =>{
    BuscadorWebModel.find({nombre:req.params.nombre}, (error, buscador)=>{
        if(error) return res.status(500).json({status:500, success: false, message:"Error interno del servidor"});

        if(buscador){
            return res.status(200).json({status:200, success: true, message:"Buscador web encontrado", buscador});
        }else{
            return res.status(404).json({status:404, success: false, message:"No se encontro buscador"});
        }
    });
};
SearchManager.getBuscadorPrecio = (req, res, next) =>{
    BuscadorWebModel.find({precio:req.params.precio}, (error, buscador)=>{
        if(error) return res.status(500).json({status:500, success: false, message:"Error interno del servidor"});

        if(buscador){
            return res.status(200).json({status:200, success: true, message:"Buscador web encontrado", buscador});
        }else{
            return res.status(404).json({status:404, success: false, message:"No se encontro buscador"});
        }
    });
};
SearchManager.delete = (req, res, next) =>{
    var id = req.params.id;
    BuscadorWebModel.findByIdAndDelete(id, (error, buscador)=>{
        if(error) return res.status(500).json({status:500, success: false, message:"Error interno del servidor"});

        if(buscador){
            return res.status(200).json({status:200, success: true, message:"Buscador eliminado con exito del sistema", buscador});
        }else{
            return res.status(404).json({status:404, success: false, message:"Error al eliminar buscador"});
        }
    });
};

module.exports = SearchManager;