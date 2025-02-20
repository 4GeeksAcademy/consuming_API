import React, { useState } from "react";
import { Link } from "react-router-dom";
import factus from "../assets/img/factus.jpg";
import { VerFacturas } from "./viewTax.jsx";

export const Dashboard = () => {

  const [currentView, setCurrentView] = useState("home");

  const renderContent = () => {
    switch (currentView) {
      case "facturas":
        return <VerFacturas/>;
      // case "crearFactura":
      //   return <CrearFactura />;
      default:
        return (
          <div className="d-flex justify-content-center align-items-center mt-5">
            <img src={factus} style={{ opacity: 0.5 }} height={500} alt="factus-Logo" />
          </div>
        );
    }
  };


  return (
    <div className="d-flex">
      <div className="bg-dark text-white vh-100 p-3" style={{ width: "250px" }}>
        <h4 className="text-center"> Menu </h4>
        <ul className="nav flex-column">
          <li className="nav-item">
            <Link className="nav-link text-white p-2" to="/" onClick={() => setCurrentView("home")}>  Home</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link text-white p-2" onClick={() => setCurrentView("facturas")}>  Ver Facturas </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link text-white p-2" to="/productos"> Crear Factura </Link>
          </li>
        </ul>
      </div>

      <div className=" flex-grow-1 p-4">
      {renderContent()}
      </div>
    </div>
  );
};