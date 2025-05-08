import React, { useState, useEffect } from 'react';
import './UpdateProductForm.css';
import axios from 'axios';

const API_BASE_URL = 'http://localhost:3001/api';

function RegistrarSalidaForm() {
    const [productId, setProductId] = useState('');
    const [productOptions, setProductOptions] = useState([]);
    const [cantidadRetirar, setCantidadRetirar] = useState('');
    const [mensaje, setMensaje] = useState('');

    useEffect(() => {
        axios.get(`${API_BASE_URL}/stock`)
            .then(res => setProductOptions(res.data))
            .catch(error => console.error('Error al cargar el stock:', error));
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!productId) {
            setMensaje('Por favor, selecciona un producto.');
            return;
        }
        if (!cantidadRetirar || parseInt(cantidadRetirar) <= 0) {
            setMensaje('Por favor, ingresa una cantidad válida a retirar.');
            return;
        }
        try {
            const response = await axios.put(`${API_BASE_URL}/productos/salida/${productId}`, { // Nuevo endpoint para la salida
                cantidad: parseInt(cantidadRetirar)
            });
            setMensaje(response.data.message);
            // Limpiar el formulario
            setProductId('');
            setCantidadRetirar('');
        } catch (error) {
            console.error('Error al registrar la salida:', error);
            setMensaje('Error al registrar la salida.');
        }
    };

    return (
        <form className="update-product-form" onSubmit={handleSubmit}>
            <h2>Registrar Salida de Producto</h2>
            {mensaje && <div className="form-message">{mensaje}</div>}
            <div className="form-group">
                <label htmlFor="productId">Seleccionar Producto:</label>
                <select id="productId" value={productId} onChange={(e) => setProductId(e.target.value)} required>
                    <option value="">Seleccionar Producto</option>
                    {productOptions.map(product => (
                        <option key={product._id} value={product._id}>{product.nombreProducto || 'No Name'}</option>
                    ))}
                </select>
            </div>
            <div className="form-group">
                <label htmlFor="cantidadRetirar">Cantidad a Retirar:</label>
                <input type="number" id="cantidadRetirar" value={cantidadRetirar} onChange={(e) => setCantidadRetirar(e.target.value)} required />
            </div>
            <button type="submit">Registrar Salida</button>
        </form>
    );
}

export default RegistrarSalidaForm;