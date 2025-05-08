import React, { useEffect, useState } from "react";
import StockTable from '../components/StockTable';
import axios from "axios";

function StockPage(){
    const [stock, setStock]=useState([]);
    const [loading,setLoading]=useState(true);
    const [error, setError]=useState(null);

    useEffect(()=>{
        axios.get('http://localhost:3001/api/stock')
        .then(Response=>{
            setStock(Response.data);
            setLoading(false);
        })
        .catch(error=>{
            console.error('Error al obtener el stock',error);
            setError('Error al cargar el stock.');
            setLoading(false);
        });
    },[]);

    if(loading){
        return<div>Cargando Stock...</div>;
    }
    if(error){
        return<div>Error: {error}</div>;
    }
    return(
        <div>
            <h2>Stock de Bodega</h2>
            <StockTable stock={stock}/>
        </div>
    );
}

export default StockPage;