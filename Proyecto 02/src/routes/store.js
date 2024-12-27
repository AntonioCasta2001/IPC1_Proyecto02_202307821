const express=require('express');
const router=express.Router();


const { newProduct,allProducts, login, newClientes, allclientes} = require('../controllers/products');
//metodos de peticion:
//POST: envia informacion al frontend y el backend recibe
//GET devolvemos informacion al nbackend
//DELETE eliminacion de un objeto en backend
//PUT actualizamos algo en el backend

//ruta para crear un producto nuevo
router.post('/store/clientes',newClientes);
router.get('/store/get-clientes',allclientes);
router.post('/store/new-product',newProduct);

//un endpoint para devolver todos los productos
router.get('/store/get-products',allProducts);
//enpoint para login
router.post('/store/login',login);

module.exports=router;