//menu
import React from "react";
import {Link} from 'react-router-dom';
import './NavigationBar.css';

function NavigationBar(){
    return(
        <nav className="navbar">
            <ul className="=navbar-links">
                <li><Link to ="/stock">Stock</Link></li>
                <li><Link to="/crear-producto">Ingresar poducto</Link></li>
                <li><Link to="/registrar-salida">Registrar salida</Link></li>
            </ul>
        </nav>
    );
}

export default NavigationBar;