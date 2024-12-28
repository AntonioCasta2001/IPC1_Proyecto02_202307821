import React, {useEffect, useState} from 'react';
import Swal from 'sweetalert2';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Dashboard.css';

import Table from 'react-bootstrap/Table';
import {Bar,Pie} from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    ArcElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js'

ChartJS.register(CategoryScale,LinearScale,BarElement,ArcElement,Title,Tooltip,Legend)
const Dashboard=()=>{
    const [productBody, setProductBody]=useState('');//contenido del nuevo producto
    const [ClienteBody, setClienteBody]=useState('');//contenido del nuevo cliente
    //UseState para administrar los productos que obtengamos de nuestro backend
    const[products,setProducts]=useState([]);
    const[clientes,setclients]=useState([]);
    // Datos de mi gráfica de barras de productos por precio
    const[barChartData,setBarChartData]=useState(null);
    // Datos de mi gráfica de pie (Productos con precio mayor a 100 vs productos con precio menor/igual a 100)
    const[pieChartData,setPieChartData]=useState(null);
    //funcion que maneja el cambio de texto en el textarea
    const handleChange=(event)=>{
        setProductBody(event.target.value);
    };
    const handleChange2=(event)=>{
        setClienteBody(event.target.value);
    };
    //funcion que maneja el envio de mi producto hacia el backend
    const handleSubmit=async()=>{
        const data={
            content:productBody//contenido del textarea
        }
        //realizamos la solicitud del backend
        const response = await fetch('http://localhost:2024/store/new-product',{
            method: 'POST',
            headers:{
                'Content-Type':'application/json',
            },
            body: JSON.stringify(JSON.parse(data.content)),
        });
        const result = await response.json();
        if(result.status==="success"){
            await Swal.fire({
                title:'<span style="color:#A0A4B4;">Nuevo producto</span>',
                html:'<span style="color:#A0A4B4;">Creacion de producto exitoso</span>',
                icon:"success",
                confirmButtonText:"Cerrar",
                background:"#222",
                confirmButtonColor:"red",
            })
            await updateProducts();
        }else{
            await Swal.fire({
                title:'<span style="color:#A0A4B4;">Nuevo producto</span>',
                html:'<span style="color:#A0A4B4;">Error al crear el producto</span>',
                icon:"error",
                confirmButtonText:"Cerrar",
                background:"#222",
                confirmButtonColor:"red",
            })
        }
    }
    //peticion al backend para productos registrados
//funcion para actualizar los productos actuales.
const getProducts = async()=>{
    const response=await fetch("http://localhost:2024/store/get-products",{
        method:"GET",
        headers:{
            'Content-Type':'application.json',
        },
    });
    const products=await response.json();
    return products;
}
const deleteProducts=async()=>{
    var products=await getProducts();
    delete setProducts(products);
}
const updateProducts=async()=>{
    try {
        var products=await getProducts();
        setProducts(products);
    } catch (error) {
        console.log(error)
    }
}
    const handleSubmit2=async()=>{
        const data={
            content:ClienteBody//contenido del textarea
        }
        //realizamos la solicitud del backend
        const response2 = await fetch('http://localhost:2024/store/clientes',{
            method: 'POST',
            headers:{
                'Content-Type':'application/json',
            },
            body: JSON.stringify(JSON.parse(data.content)),
        });
        const result = await response2.json();
        if(result.status==="success"){
            await Swal.fire({
                title:'<span style="color:#A0A4B4;">Nuevo cliente</span>',
                html:'<span style="color:#A0A4B4;">Creacion de cliente exitoso</span>',
                icon:"success",
                confirmButtonText:"Cerrar",
                background:"#222",
                confirmButtonColor:"red",
            })
            await updateClients();
        }else{
            await Swal.fire({
                title:'<span style="color:#A0A4B4;">Nuevo cliente</span>',
                html:'<span style="color:#A0A4B4;">Error al crear cliente</span>',
                icon:"error",
                confirmButtonText:"Cerrar",
                background:"#222",
                confirmButtonColor:"red",
            })
        }
    }

    const getclientes=async()=>{
        const response2=await fetch("http://localhost:2024/store/get-clientes",{
            method:"GET",
            headers:{
                'Content-Type':'application.json',
            },
        });
        const clientes=await response2.json();
        return clientes;
    }

    const updateClients=async()=>{
        try {
            var clientes=await getclientes();
            setclients(clientes);
        } catch (error) {
            console.log(error)
        }
    }
    //const deleteProducts=async()=>{
      //  delete 
    //}
    useEffect(()=>{
        if(products.length>0){
            // Gráfica de barras
            const sortedProducts= [...products].sort((a,b)=>a.precio_producto-b.precio_producto);
            const barData={
                labels: sortedProducts.map((product)=>product.nombre_producto),
                datasets:[
                    {
                        label:'Precio',
                        data:sortedProducts.map((product)=>product.precio_producto),
                        backgroundColor:['rgba(10, 255, 0)'],
                    }
                ]
            }
            // Actualizamos la información de mi gráfica de barras
            setBarChartData(barData);
        }
    },
    [products]);
    useEffect(()=>{
        if(clientes.length>0){
            // Gráfica de pie
            // Cantidad de productos con precio mayor a 100
            const Mayores = clientes.filter((cliente)=> cliente.edad>18).length;
            // Cantidad de productos con precio menor o igual a 100
            const Menores=clientes.length-Mayores;
            const pieData={
                labels:['Mayores de edad', 'Menores de edad'],
                datasets:[
                    {
                        data:[Mayores,Menores],
                        backgroundColor:['rgba(192, 192, 192)','rgba(139, 0, 0)'],
                    }
                ]
            };
            setPieChartData(pieData);
        }
    },
    [clientes]);
    return(
        <>
        <div>
            <h2>Cobra Kai Dashboard</h2>
            <textarea 
                rows="10"
                cols="50"
                placeholder='crea un nuevo producto aqui..'
                value={productBody}
                onChange={handleChange}
            />
            <textarea
                rows="12"
                cols="50"
                placeholder='crea un usuario aqui'
                value={ClienteBody}
                onChange={handleChange2}
            />
            <br/>
            <button className="productos_container" onClick={handleSubmit}>Enviar</button>
            <button className="clientes_container"onClick={handleSubmit2}>Enviar</button>
        </div>
        <h1>Productos registrados en el Sistema</h1>
        <div className="table-container">
            <Table striped bordered hover variant='solid black'>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Nombre</th>
                        <th>Precio</th>
                        <th>Stock</th>
                        <th>Estado</th>
                    </tr>
                </thead>
                <tbody>{/*recorremos los productos*/}
                    {products.length>0?(
                        products.map((product)=>(
                            <tr ley={product.id_producto}>
                                <td>{product.id_producto}</td>
                                <td>{product.nombre_producto}</td>
                                <td>{product.precio_producto}</td>
                                <td>{product.stock_producto}</td>
                                //<button onClick={deleteProducts}>Eliminar</button>
                            </tr>
                        ))
                    ):(
                        <tr>
                            <td colSpan="4">No hay productos registrados</td>
                        </tr>
                    )}
                </tbody>
            </Table>
            <h1>Clientes</h1>
            <Table striped bordered hover variant='dark'>
                <thead>
                    <tr>
                        <th>Id cliente</th>
                        <th>Nombre del cliente</th>
                        <th>Apellido del cliente</th>
                        <th>nit</th>
                        <th>edad</th>
                    </tr>
                </thead>
                <tbody>{/*recorremos los productos*/}
                    {clientes.length>0?(
                        clientes.map((cliente)=>(
                            <tr ley={cliente.id_cliente}>
                                <td>{cliente.id_cliente}</td>
                                <td>{cliente.nombre}</td>
                                <td>{cliente.apellido}</td>
                                <td>{cliente.nit}</td>
                                <td>{cliente.edad}</td>
                            </tr>
                        ))
                    ):(
                        <tr>
                            <td colSpan="5">No hay clientes registrados</td>
                        </tr>
                    )}
                </tbody>
            </Table>
            <h1>Gráfica de productos ordenados por precio</h1>
                <div style={{width:'70%', margin:'auto'}}>
                    {barChartData? <Bar data={barChartData}/>:<p>Cargando gráfica......</p>}
                </div>
                <h1>Grafica de edades&gt; 18 vs edad&lt;=18</h1>
                <div style={{width:'70%', margin:'auto'}}>
                    {pieChartData? <Pie data={pieChartData}/>:<p>Cargando gráfica......</p>}
                </div>
        </div>
        </>
    );
}
export default Dashboard;
//value=valor del textarea
//onchange=funcion para actualizar el estado de mi producto

//44 minutos clase 11
//<button onClick={deleteProducts}>Eliminar</button>