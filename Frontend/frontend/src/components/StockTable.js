//mostrar stock
import React from "react";
import'./StockTable.css';

function StockTable({stock}){
    return(
        <table className="inventario-table">
            <thead className="inventario-header">
                <tr>
                    <th>Nombre del Producto</th>
                    <th>Cantidad</th>
                    <th>Unidad de Medida</th>
                    <th>Ubicacion</th>
                    <th>Marca</th>
                    <th>Proveedor</th>
                </tr>
            </thead>
            <tbody>
                {stock.map(item =>(
                <tr key={item._id}>
                  <td>{item.nombreProducto}</td>
                  <td>{item.cantidad}</td>
                  <td>{item.unidadMedida}</td>
                  <td>{item.ubicacion}</td>
                  <td>{item.marca}</td> 
                  <td>{item.proveedor}</td>
                </tr>  
                ))}
            </tbody>

        </table>
    );
}
export default StockTable;