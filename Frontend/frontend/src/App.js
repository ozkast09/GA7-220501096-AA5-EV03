import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import StockPage from './pages/StockPage';
import CreateProductPage from './pages/CreateProductPage';
import UpdateProductPage from './pages/UpdateProductPage'; // Importa la nueva página
import RegistrarSalidaForm from './components/RegistrarSalidaForm';
// ... otras importaciones ...

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Layout><StockPage /></Layout>} />
                <Route path="/stock" element={<Layout><StockPage /></Layout>} />
                <Route path="/ingresar-producto" element={<Layout><UpdateProductPage /></Layout>} /> {/* Usa UpdateProductPage */}
                <Route path="/crear-producto" element={<Layout><CreateProductPage /></Layout>} /> {/* Usa CreateProductPage */}
                {/* Asegúrate de tener un componente para Registrar Salida */}
                <Route path="/registrar-salida" element={<Layout><RegistrarSalidaForm/></Layout>} />
            </Routes>
        </Router>
    );
}

export default App;