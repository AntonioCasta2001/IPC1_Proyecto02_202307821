const products=require('../models/product');
const clientes=require('../models/product');
//instalar admindata
const {adminData}=require("../config/config");
//controlador par manejar la creacion de un nuevo producto
//todas estas seran usadas en el ruteo

module.exports.newProduct=async(req,res,next)=>{
    if(req.body.id_producto && req.body.precio_producto && req.body.stock_producto && req.body.nombre_producto){
        if (req.body.precio_producto>0) {
            if (req.body.stock_producto>=0) {
                try {
                    //obtenemos los datos del producto
                    const newProduct=req.body;
                    products.push(newProduct);
                    res.status(200).json({
                        message:"producto creado con exito",
                        status:"success",
                    })
                } catch (error) {
                    res.status(400).json({
                        error: error.message,
                        status:"error"
                    })
                }
            }else{
                res.status(400).json({
                    error:"El stock debe ser mayor o igual a 0",
                    status:"error"
                })
            }
        }else{
            res.status(400).json({
                error:"El precio no puede ser menor a 0",
                status:"error"
            })
        }
    } else{
        res.status(400).json({
            error:"no se encontraron todas las variables",
            status:"error"
        })
    }

}

//controlador para todos los productos
module.exports.allProducts=async(req,res)=>{
    try {
        res.status(200).json(products);
    } catch (error) {
        res.status(400).json({
            error:error.message,
        })
    }
}

module.exports.newClientes=async(req,res,next)=>{
    if (req.body.id_cliente && req.body.nombre && req.body.apellido && req.body.nit && req.body.nit !== undefined && req.body.edad) {
            try {
                //obtenemos los datos del producto
                const newClientes=req.body;
                clientes.push(newClientes);
                res.status(200).json({
                    message:"Cliente creado con exito",
                    status:"success"
                })
            } catch (error) {
                res.status(400).json({
                    error: error.message,
                    status:"error"
                })
            }
    } else{
        res.status(400).json({
            message: "el nit no puede estar vacio"
        })
    }
}
module.exports.allclientes=async(req,res)=>{
    try {
        res.status(200).json(products);
    } catch (error) {
        res.status(400).json({
            error:error.message,
        })
    }
}
//controlador administrar el login
// en js "2"==2 => sera verdadero(true)
// "2"===2 => false

module.exports.login=async(req,res)=>{
    try {
        if(req.body.username===adminData.username && req.body.password===adminData.password){
            res.status(200).json({
                message: "login exitoso",
                status:"success"
            });
        } else{
            res.status(401).json({
                message:"usuario/contra incorrecta, intente de nuevo",
                status:"error"
            });
        }
    } catch (error) {
        res.status(500).json({
            error:error.message
        })
    }
}