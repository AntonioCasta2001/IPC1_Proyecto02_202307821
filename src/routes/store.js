const express=require('express');
const router=express.Router();
//'../controllers/project'
const {newProduct}=require('../controllers/product');
//MEtodos de peticion
//POST: enviamos informaicon
//GET: obtenemos informacion
//DELETE: eliminamos informacion

//ruta para crear un nuevo producto

router.post('store/new-product',newProduct);
module.exports=router;
