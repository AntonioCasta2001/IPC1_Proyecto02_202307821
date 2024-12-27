import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Login.css'
import Swal from 'sweetalert2';
import descarga from './assets/img/descarga.png'
const Login =()=>{
    // useState para manejar el estado de las credenciales
    const [credentials,setCredentials]= useState({username:'',password:''});
    // useState para manejar el estado de los errores a mostrar
    const [error, setError]=useState('');
    // Para permitirnos navegar entre rutas de react
    const navigate=useNavigate();


    const handleInputChange=(e)=>{
        const {name,value} =e.target;
        setCredentials({...credentials, [name]:value})
    }

    const handleSubmit=async(e)=>{
        e.preventDefault();
        try{
            const response = await axios.post('http://localhost:2024/store/login',credentials);
            if(response.data.status==="success"){
                await Swal.fire({
                    title:'<span style="color:#A0A4B4;">Exito</span>',
                    html:'<span style="color:#A0A4B4;">Inicio de sesion exitoso</span>',
                    icon:"success",
                    confirmButtonText:"Cerrar",
                    background:"#222",
                    confirmButtonColor:"blue",
                })
                navigate('/dashboard');
            }
        }catch(err){
            if(err.response && err.response.status===401){
                await Swal.fire({
                    title:'<span style="color:#A0A4B4;">Error</span>',
                    html:'<span style="color:#A0A4B4;">Usuario o contraseña incorrectos</span>',
                    icon:"error",
                    confirmButtonText:"Cerrar",
                    background:"#222",
                    confirmButtonColor:"red",
                })
            }else{
                setError('Error al conectar con el backend :(');
            }
        }
    }

    return(
        <div className='login-container'>
            <h2>Inicio de Sesion</h2>
            <h2>Cobra Kai Dojo</h2>
            <img src={descarga}/>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Usuario:</label>
                    <input 
                        type="text" 
                        name="username" 
                        placeholder='usuario'
                        value={credentials.username}
                        onChange={handleInputChange}
                        required
                        >
                    </input>
                </div>
                <div>
                    <label>Contraseña:</label>
                    <input 
                        type="password"
                        name="password"
                        placeholder='contraseña'
                        value={credentials.password}
                        onChange={handleInputChange}
                        required
                        >
                    </input>
                </div>
                <button type="submit">Iniciar sesión</button>
                {error && <p style={{color:'red'}}>{error}</p>}
            </form>
        </div>
    );
}


export default Login;