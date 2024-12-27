
const express=require('express');
const app=express();
const {server } = require('./config/config');

const cors=require('cors');
const cookies=require('cookie-parser');
const productRoutes=require('./routes/store');
const invalidRoutes=require('./routes/404');

app.use(cors({
    origin:true,
    credentials:true
}));
app.use(cookies());
app.use(express.json());

app.use(productRoutes);
app.use(invalidRoutes);
app.listen(server.port,()=>{
    console.log("server runing on port: "+server.port);
})


