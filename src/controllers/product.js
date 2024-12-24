const products=require('../models/product');

// controlador para manejar la creacion de un nuevo producto

module.exports.newProduct=async(req,res,next)=>{
    try {
        //obtenemos los datos del producto
        const newProduct=req.body;
        //push para agg producto
        products.push(newProduct);
        res.status(200).json({
            message:"producto creado con exito"
        })
    } catch (error) {
        res.status(400).json({
            error:error.message
        })
    }
}