import React from "react";
import { Link } from "react-router-dom";
import factus from "../assets/img/factus.jpg";

export const Dashboard = () => {
  return (
    <div className="d-flex">
      <div className="bg-dark text-white vh-100 p-3" style={{ width: "250px" }}>
        <h4 className="text-center">Dashboard</h4>
        <ul className="nav flex-column">
          <li className="nav-item">
            <Link className="nav-link text-white" to="/usuarios">👤 Usuarios</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link text-white" to="/ventas">💰 Ventas</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link text-white" to="/productos">📦 Productos</Link>
          </li>
        </ul>
      </div>

      {/* Contenido principal */}
      <div className=" center flex-grow-1 p-4">
        
            <div className="container ">
            <img src={factus} height={600} alt="factus-Logo" />

            </div>
      </div>
    </div>
  );
};