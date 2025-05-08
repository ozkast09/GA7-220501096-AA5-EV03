//formulario para crear producto
import React, { useState } from "react";
import './ProductForm.css';
import axios from "axios";

function ProductForm(){
    const[nombreProducto, setNombreProducto]=useState('');
    const[cantidad, setCantidad]=useState('');
    const[unidadMedida, setUnidadMedida]=useState('');
    const[ubicacion, setUbicacion]=useState('');
    const[marcaProveedor, setMarcaProveedor]=useState('');
    const [mensaje, setMensaje] = useState('');

    const handleSubmit= async (event)=>{
        event.preventDefault();

        try {
            const response= await axios.post('http://localhost:3001/api/productos',{
                nombreProducto,
                cantidad,
                unidadMedida,
                ubicacion,
                marcaProveedor
            });
            setMensaje(response.data.message);
            setNombreProducto('');
            setCantidad('');
            setUnidadMedida('');
            setUbicacion('');
            setMarcaProveedor('');
            setTimeout(()=> setMensaje(''),3000);

        } catch (error) {
            console.error('Error al crear producto:',error);
            setMensaje('Error al crear el producto');
        }
    };

    return(
        <form className="product-form" onSubmit={handleSubmit}>
            <h2>Ingresar Nuevo Producto</h2>
            {mensaje && <div className="form-message">{mensaje}</div>}
            <div>
                <label htmlFor="nombreProducto">Nombre del Producto:</label>
                <input type="text" id="nombreProducto" value={nombreProducto} onChange={(e)=>setNombreProducto(e.target.value)}required/>
            </div>
            <div>
                <label htmlFor="cantidad">Cantidad:</label>
                <input type="text" id="cantidad" value={cantidad} onChange={(e)=> setCantidad(e.target.value)}required/>
            </div>
            <div>
                <label htmlFor="unidadMedida">Unidad de Medida:</label>
                <input type="text" id="unidadMedida" value={unidadMedida} onChange={(e)=> setUnidadMedida(e.target.value)} required/>
            </div>
            <div>
                <label htmlFor="ubicacion">Ubicacion:</label>
                <input type="text" id="ubicacion" value={ubicacion} onChange={(e)=> setUbicacion(e.target.value)}required/>
            </div>
            <div>
                <label htmlFor="marcaProveedor">Marca Proveedor:</label>
                <input type="text" id="marcaProveedor" value={marcaProveedor} onChange={(e)=> setMarcaProveedor(e.target.value)}required/>
            </div>
            <button type="submit">Crear Producto</button>
            <br></br>

        </form>
    );


}
export default ProductForm;