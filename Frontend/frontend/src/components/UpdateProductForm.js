import React, { useState, useEffect } from 'react';
import './UpdateProductForm.css';
import axios from 'axios';

const API_BASE_URL = 'http://localhost:3001/api'; // Definimos la URL base

function UpdateProductForm() {
    const [productId, setProductId] = useState('');
    const [productOptions, setProductOptions] = useState([]);
    const [cantidad, setCantidad] = useState('');
    //const [ubicacion, setUbicacion] = useState('');
    const [mensaje, setMensaje] = useState('');

    useEffect(() => {
        axios.get(`${API_BASE_URL}/stock`)
            .then(res => {
                console.log('Datos del stock en UpdateForm:', res.data); // Log para verificar los datos
                setProductOptions(res.data);
            })
            .catch(error => console.error('Error al cargar el stock:', error));
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!productId) {
            setMensaje('Por favor, selecciona un producto para actualizar.');
            return;
        }
        try {
            console.log('productId:', productId);
            const response = await axios.put(`${API_BASE_URL}/productos/${productId}`, {
                cantidad: parseInt(cantidad) 
            });
            setMensaje(response.data.message);
            // ... limpiar el formulario ...
        } catch (error) {
            console.error('Error al actualizar el producto:', error);
            setMensaje('Error al actualizar el producto.');
        }
    };

    return (
        <form className="update-product-form" onSubmit={handleSubmit}>
            <h2>Ingresar Datos a Producto Existente</h2>
            {mensaje && <div className="form-message">{mensaje}</div>}
            <div className="form-group">
                <label htmlFor="productId">Seleccionar Producto:</label>
                <select id="productId" value={productId} onChange={(e) => {
                  setProductId(e.target.value);
                  console.log('productId en onChange:', e.target.value);
                  }} required>
                  <option value="">Seleccionar Producto</option>
                  {productOptions.map(product => (
                  <option key={product._id} value={product._id}>{product.nombreProducto || 'No Name'}</option>
                  ))}
                 </select>
            </div>
            <div className="form-group">
                <label htmlFor="cantidad">Cantidad:</label>
                <input type="number" id="cantidad" value={cantidad} onChange={(e) => setCantidad(e.target.value)} />
            </div>
            
            <button type="submit">Actualizar Producto</button>
        </form>
    );
}

export default UpdateProductForm;