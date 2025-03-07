import React, { useState } from "react";
import {viewTax } from "../store";
import { useNavigate } from "react-router-dom";


export const VerFacturas = () => {
  const [loading, setLoading] = useState(false); 
  const [taxData, setTaxData] = useState([]); 
  const navigate = useNavigate();


  const handleViewTax = async () => {
    setLoading(true); 
    try {
      const data = await viewTax(); 
      setTaxData(data.data); 
      console.log("Datos obtenidos en el componente:", data); 
    } catch (error) {
      console.error("Error al obtener los datos de impuestos:", error);
    } finally {
      setLoading(false); 
      
    }
  };

  const handleOnetax = (number) =>{
    navigate(`/factura/${number}`);
  };
  
  

  return (
    <div style={{ padding: "20px" }}>
      <h1>Ver Total de facturas</h1>
      <button onClick={handleViewTax} disabled={loading} style={{ marginBottom: "20px" }}>
        {loading ? "Cargando..." : "Ver Datos"}
      </button>

      {taxData.length > 0 ? (
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ backgroundColor: "#f2f2f2" }}>
              <th style={{ padding: "10px", border: "1px solid #ddd" }}>ID</th>
              <th style={{ padding: "10px", border: "1px solid #ddd" }}>Número</th>
              <th style={{ padding: "10px", border: "1px solid #ddd" }}>Estado</th>
              <th style={{ padding: "10px", border: "1px solid #ddd" }}>Total</th>
              <th style={{ padding: "10px", border: "1px solid #ddd" }}>Ver Factura</th>
            </tr>
          </thead>
          <tbody>
            {taxData.map((tax) => (
              <tr key={tax.id} style={{ borderBottom: "1px solid #ddd" }}>
                <td style={{ padding: "10px", border: "1px solid #ddd" }}>{tax.id}</td>
                <td style={{ padding: "10px", border: "1px solid #ddd" }}>{tax.number}</td>
                <td style={{ padding: "10px", border: "1px solid #ddd" }}>{tax.status}</td>
                <td style={{ padding: "10px", border: "1px solid #ddd" }}>{tax.total}</td>
                <td style={{ padding: "10px", border: "1px solid #ddd" }}> <button onClick={() => handleOnetax(tax.number)}> ver factura </button></td>
              </tr>
            ))}
          </tbody>
          
        </table>
      ) : (
        <p>No hay datos de impuestos disponibles.</p>
      )}
    </div>
  );
};