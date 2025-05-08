//menu
// frontend/src/components/NavigationBar.js
import React from 'react';
import { Link } from 'react-router-dom';
import './NavigationBar.css';

function NavigationBar() {
    return (
        <nav className="navbar">
            <ul className="navbar-links">
                <li><Link to="/stock">Stock</Link></li>
                <li><Link to="/ingresar-producto">Ingresar Producto</Link></li> {/* Enlace a la página de actualización */}
                <li><Link to="/crear-producto">Nuevo Producto</Link></li> {/* Enlace al formulario de creación */}
                <li><Link to="/registrar-salida">Registrar Salida</Link></li>
            </ul>
        </nav>
    );
}

export default NavigationBar;