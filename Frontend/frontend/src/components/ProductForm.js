import React, { useState, useEffect } from 'react';
import './ProductForm.css';
import axios from 'axios';

const API_BASE_URL = 'http://localhost:3001/api'; // Definimos la URL base

function ProductForm() {
    const [nombreProducto, setNombreProducto] = useState('');
    const [cantidad, setCantidad] = useState(''); 
    const [unidadMedida, setUnidadMedida] = useState('');
    const [marca, setMarca] = useState('');
    const [ubicacion, setUbicacion] = useState('');
    const [proveedor, setProveedor] = useState('');
    const [mensaje, setMensaje] = useState('');

    const [unidadesMedidaOptions, setUnidadesMedidaOptions] = useState([]);
    const [marcasOptions, setMarcasOptions] = useState([]);
    const [ubicacionesOptions, setUbicacionesOptions] = useState([]);
    const [proveedoresOptions, setProveedoresOptions] = useState([]);

    const [nuevaUnidadMedida, setNuevaUnidadMedida] = useState('');
    const [nuevaMarca, setNuevaMarca] = useState('');
    const [nuevaUbicacion, setNuevaUbicacion] = useState('');
    const [nuevoProveedor, setNuevoProveedor] = useState('');

    useEffect(() => {
        axios.get(`${API_BASE_URL}/unidades-medida`).then(res => setUnidadesMedidaOptions(res.data)).catch(err => console.error('Error unidades:', err));
        axios.get(`${API_BASE_URL}/marcas`).then(res => setMarcasOptions(res.data)).catch(err => console.error('Error marcas:', err));
        axios.get(`${API_BASE_URL}/ubicaciones`).then(res => setUbicacionesOptions(res.data)).catch(err => console.error('Error ubicaciones:', err));
        axios.get(`${API_BASE_URL}/proveedores`).then(res => setProveedoresOptions(res.data)).catch(err => console.error('Error proveedores:', err));
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post(`${API_BASE_URL}/productos`, {
                nombreProducto,
                cantidad: parseInt(cantidad), // Tomamos el valor del estado cantidad
                unidadMedida,
                marca,
                ubicacion,
                proveedor
            });
            setMensaje(response.data.message);
            // ... limpiar el formulario ...
        } catch (error) {
            console.error('Error al crear el producto:', error);
            setMensaje('Error al crear el producto.');
        }
    };

    const handleCrearNuevaUnidadMedida = async () => {
        try {
            const response = await axios.post(`${API_BASE_URL}/unidades-medida`, { nombre: nuevaUnidadMedida });
            setUnidadesMedidaOptions([...unidadesMedidaOptions, response.data]);
            setNuevaUnidadMedida('');
        } catch (error) {
            console.error('Error al crear unidad de medida:', error);
        }
    };

    const handleCrearNuevaMarca = async () => {
        try {
            const response = await axios.post(`${API_BASE_URL}/marcas`, { nombre: nuevaMarca });
            setMarcasOptions([...marcasOptions, response.data]);
            setNuevaMarca('');
        } catch (error) {
            console.error('Error al crear marca:', error);
        }
    };

    const handleCrearNuevaUbicacion = async () => {
        try {
            const response = await axios.post(`${API_BASE_URL}/ubicaciones`, { nombre: nuevaUbicacion });
            setUbicacionesOptions([...ubicacionesOptions, response.data]);
            setNuevaUbicacion('');
        } catch (error) {
            console.error('Error al crear ubicación:', error);
        }
    };

    const handleCrearNuevoProveedor = async () => {
        try {
            const response = await axios.post(`${API_BASE_URL}/proveedores`, { nombre: nuevoProveedor });
            setProveedoresOptions([...proveedoresOptions, response.data]);
            setNuevoProveedor('');
        } catch (error) {
            console.error('Error al crear proveedor:', error);
        }
    };

    return (
        <form className="product-form" onSubmit={handleSubmit}>
            <h2>Ingresar Nuevo Producto</h2>
            {mensaje && <div className="form-message">{mensaje}</div>}
            <div className="form-group">
                <label htmlFor="nombreProducto">Nombre del Producto:</label>
                <input type="text" id="nombreProducto" value={nombreProducto} onChange={(e) => setNombreProducto(e.target.value)} required />
            </div>
            <div className="form-group">
                <label htmlFor="cantidad">Cantidad Inicial:</label>
                <input type="number" id="cantidad" value={cantidad} onChange={(e) => setCantidad(e.target.value)} required />
            </div>
            <div className="form-group">
                <label htmlFor="unidadMedida">Unidad de Medida:</label>
                <div className="select-with-create">
                    <select id="unidadMedida" value={unidadMedida} onChange={(e) => setUnidadMedida(e.target.value)} required>
                        <option value="">Seleccionar Unidad</option>
                        {unidadesMedidaOptions.map(unidad => (
                            <option key={unidad._id} value={unidad.nombre}>{unidad.nombre}</option>
                        ))}
                    </select>
                    <input type="text" value={nuevaUnidadMedida} onChange={(e) => setNuevaUnidadMedida(e.target.value)} placeholder="Nueva Unidad" />
                    <button type="button" onClick={handleCrearNuevaUnidadMedida}>Crear Medida</button>
                </div>
            </div>
            <div className="form-group">
                <label htmlFor="marca">Marca:</label>
                <div className="select-with-create">
                    <select id="marca" value={marca} onChange={(e) => setMarca(e.target.value)} required>
                        <option value="">Seleccionar Marca</option>
                        {marcasOptions.map(marca => (
                            <option key={marca._id} value={marca.nombre}>{marca.nombre}</option>
                        ))}
                    </select>
                    <input type="text" value={nuevaMarca} onChange={(e) => setNuevaMarca(e.target.value)} placeholder="Nueva Marca" />
                    <button type="button" onClick={handleCrearNuevaMarca}>Crear Marca</button>
                </div>
            </div>
            <div className="form-group">
                <label htmlFor="ubicacion">Ubicación:</label>
                <div className="select-with-create">
                    <select id="ubicacion" value={ubicacion} onChange={(e) => setUbicacion(e.target.value)} required>
                        <option value="">Seleccionar Ubicación</option>
                        {ubicacionesOptions.map(ubicacion => (
                            <option key={ubicacion._id} value={ubicacion.nombre}>{ubicacion.nombre}</option>
                        ))}
                    </select>
                    <input type="text" value={nuevaUbicacion} onChange={(e) => setNuevaUbicacion(e.target.value)} placeholder="Nueva Ubicación" />
                    <button type="button" onClick={handleCrearNuevaUbicacion}>Crear Ubicación</button>
                </div>
            </div>
            <div className="form-group">
                <label htmlFor="proveedor">Proveedor:</label>
                <div className="select-with-create">
                    <select id="proveedor" value={proveedor} onChange={(e) => setProveedor(e.target.value)} required>
                        <option value="">Seleccionar Proveedor</option>
                        {proveedoresOptions.map(proveedor => (
                            <option key={proveedor._id} value={proveedor.nombre}>{proveedor.nombre}</option>
                        ))}
                    </select>
                    <input type="text" value={nuevoProveedor} onChange={(e) => setNuevoProveedor(e.target.value)} placeholder="Nuevo Proveedor" />
                    <button type="button" onClick={handleCrearNuevoProveedor}>Crear Proveedor</button>
                </div>
            </div>
            <button type="submit">Crear Producto</button>
        </form>
    );
}

export default ProductForm;