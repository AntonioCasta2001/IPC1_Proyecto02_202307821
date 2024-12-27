const express = require('express');

const router=express.Router();
//res la respuesta

router.use((req,res,next)=>{
    res.status(404).json({
        message:"invalid endpoint"
    })
})

module.exports=router;