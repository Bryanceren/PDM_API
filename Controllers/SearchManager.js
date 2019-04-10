var BuscadorWebModel = require('../Models/KeyModel');
const SearchManager = {};

SearchManager.create = (req, res, next) =>{
    var buscador = new BuscadorWebModel();
    buscador.nombre = req.body.nombre;
    buscador.country = req.body.country;
    buscador.value = req.body.value;
    buscador.value_us = req.body.value_us;
    buscador.year = req.body.year;
    buscador.review = req.body.review;
    buscador.available = req.body.available;
    buscador.img = req.body.img;

    buscador.save((error, buscador)=>{
        if(error) return res.status(500).json({status:500, success: false, message:"Error interno del servidor"});

        if(buscador){
            return res.status(200).json({status:200, success: true, message:"Buscador guardado correctamente en el sistema", buscador});
        }else{
            return res.status(404).json({status:404, success: false, message:"Error al guardar el nuevo buscador", buscador});
        }
    });
};



SearchManager.getBuscador = (req, res, next) =>{
    BuscadorWebModel.findById(req.params.id, (error, buscador)=>{
        if(error) return res.status(500).json({status:500, success: false, message:"Error interno del servidor"});

        if(buscador){
            return res.status(200).json({status:200, success: true, message:"Buscador web encontrado", buscador});
        }else{
            return res.status(404).json({status:404, success: false, message:"No se encontro buscador"});
        }
    });
};

SearchManager.getBuscadores = (req, res, next) =>{
    BuscadorWebModel.find({}, (error, buscadores)=>{
        if(error) return res.status(500).json({status:500, success: false, message:"Error interno del servidor"});

        if(buscadores){
            return res.status(200).json({status:200, success: true, message:"Peticion de buscadores realizada con exito", buscadores});
        }else{
            return res.status(404).json({status:404, success: false, message:"No se encontraron buscadores"});
        }
    });
};
SearchManager.getBuscadorCountry = (req, res, next) =>{
    BuscadorWebModel.find({country:req.params.country}, (error, buscador)=>{
        if(error) return res.status(500).json({status:500, success: false, message:"Error interno del servidor"});

        if(buscador){
            return res.status(200).json({status:200, success: true, message:"Buscador web encontrado", buscador});
        }else{
            return res.status(404).json({status:404, success: false, message:"No se encontro buscador"});
        }
    });
};
SearchManager.getBuscadorYear = (req, res, next) =>{
    BuscadorWebModel.find({year:req.params.year}, (error, buscador)=>{
        if(error) return res.status(500).json({status:500, success: false, message:"Error interno del servidor"});

        if(buscador){
            return res.status(200).json({status:200, success: true, message:"Buscador web encontrado", buscador});
        }else{
            return res.status(404).json({status:404, success: false, message:"No se encontro buscador"});
        }
    });
};
SearchManager.getBuscadorAvailable = (req, res, next) =>{
    BuscadorWebModel.find({available:req.params.available}, (error, buscador)=>{
        if(error) return res.status(500).json({status:500, success: false, message:"Error interno del servidor"});

        if(buscador){
            return res.status(200).json({status:200, success: true, message:"Buscador web encontrado", buscador});
        }else{
            return res.status(404).json({status:404, success: false, message:"No se encontro buscador"});
        }
    });
};

module.exports = SearchManager;