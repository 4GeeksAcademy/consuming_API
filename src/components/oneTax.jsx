import React, { useEffect, useState } from "react";
import { downloadPDF, viewOneTax } from "../store";
import { useParams } from "react-router-dom";


export const OneTax = () => {
  const { number } = useParams();
  const [fact, setFact] = useState(null);
  const [loading, setLoading] = useState(false);

  console.log(number);

  useEffect(() => {
    console.log("Número de factura recibido:", number);
    const fetchFactura = async (number) => {
      setLoading(true);
      try {
        const data = await viewOneTax(number);
        setFact(data);
        console.log("Datos de la factura en el componente:", data);
      } catch (error) {
        console.error("Error al obtener la factura:", error);
      } finally {
        setLoading(false);
      }
    };
    if (number) {
      fetchFactura(number);
    }
  }, [number]);

  
  if (loading) {
    return <p>Cargando...</p>; 
  }

  if (!fact || !fact.data) {
    return <p>No se encontró la factura.</p>; 
  }
  return (
    <div>
      <h1>Detalles de la Factura</h1>

      <h2>Información de la Empresa</h2>
      <table border="1" cellPadding="10" cellSpacing="0">
        <tbody>
          <tr>
            <td><strong>Nombre:</strong></td>
            <td>{fact.data.company.name}</td>
          </tr>
          <tr>
            <td><strong>NIT:</strong></td>
            <td>{fact.data.company.nit}-{fact.data.company.dv}</td>
          </tr>
          <tr>
            <td><strong>Dirección:</strong></td>
            <td>{fact.data.company.direction}</td>
          </tr>
          <tr>
            <td><strong>Municipio:</strong></td>
            <td>{fact.data.company.municipality}</td>
          </tr>
          <tr>
            <td><strong>Teléfono:</strong></td>
            <td>{fact.data.company.phone}</td>
          </tr>
          <tr>
            <td><strong>Email:</strong></td>
            <td>{fact.data.company.email}</td>
          </tr>
          <tr>
            <td><strong>Actividad Económica:</strong></td>
            <td>{fact.data.company.economic_activity}</td>
          </tr>
          <tr>
            <td><strong>Código de Registro:</strong></td>
            <td>{fact.data.company.registration_code}</td>
          </tr>
        </tbody>
      </table>

      <h2>Información del Cliente</h2>
      <table border="1" cellPadding="10" cellSpacing="0">
        <tbody>
          <tr>
            <td><strong>Nombre:</strong></td>
            <td>{fact.data.customer.names}</td>
          </tr>
          <tr>
            <td><strong>Identificación:</strong></td>
            <td>{fact.data.customer.identification}</td>
          </tr>
          <tr>
            <td><strong>Dirección:</strong></td>
            <td>{fact.data.customer.address}</td>
          </tr>
          <tr>
            <td><strong>Email:</strong></td>
            <td>{fact.data.customer.email}</td>
          </tr>
          <tr>
            <td><strong>Teléfono:</strong></td>
            <td>{fact.data.customer.phone}</td>
          </tr>
          <tr>
            <td><strong>Tipo de Organización:</strong></td>
            <td>{fact.data.customer.legal_organization.name}</td>
          </tr>
          <tr>
            <td><strong>Impuesto:</strong></td>
            <td>{fact.data.customer.tribute.name}</td>
          </tr>
        </tbody>
      </table>

      <h2>Información de la Factura</h2>
      <table border="1" cellPadding="10" cellSpacing="0">
        <tbody>
          <tr>
            <td><strong>Número:</strong></td>
            <td>{fact.data.bill.number}</td>
          </tr>
          <tr>
            <td><strong>Prefijo:</strong></td>
            <td>{fact.data.numbering_range.prefix}</td>
          </tr>
          <tr>
            <td><strong>Fecha de Creación:</strong></td>
            <td>{fact.data.bill.created_at}</td>
          </tr>
          <tr>
            <td><strong>Estado:</strong></td>
            <td>{fact.data.bill.status === 1 ? "Activa" : "Inactiva"}</td>
          </tr>
          <tr>
            <td><strong>Valor Bruto:</strong></td>
            <td>${fact.data.bill.gross_value}</td>
          </tr>
          <tr>
            <td><strong>Impuestos:</strong></td>
            <td>${fact.data.bill.tax_amount}</td>
          </tr>
          <tr>
            <td><strong>Total:</strong></td>
            <td>${fact.data.bill.total}</td>
          </tr>
          <tr>
            <td><strong>Observación:</strong></td>
            <td>{fact.data.bill.observation}</td>
          </tr>
          <tr>
            <td><strong>URL Pública:</strong></td>
            <td>
              <a href={fact.data.bill.public_url} target="_blank" rel="noopener noreferrer">
                Ver Factura
              </a>
            </td>
          </tr>
        </tbody>
      </table>

      <h2>Ítems de la Factura</h2>
      <table border="1" cellPadding="10" cellSpacing="0">
        <thead>
          <tr>
            <th>Referencia</th>
            <th>Nombre</th>
            <th>Cantidad</th>
            <th>Precio Unitario</th>
            <th>Valor Bruto</th>
            <th>Impuestos</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {fact.data.items.map((item, index) => (
            <tr key={index}>
              <td>{item.code_reference}</td>
              <td>{item.name}</td>
              <td>{item.quantity}</td>
              <td>${item.price}</td>
              <td>${item.gross_value}</td>
              <td>${item.tax_amount}</td>
              <td>${item.total}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>Información Adicional</h2>
      <table border="1" cellPadding="10" cellSpacing="0">
        <tbody>
          <tr>
            <td><strong>Forma de Pago:</strong></td>
            <td>{fact.data.bill.payment_form.name}</td>
          </tr>
          <tr>
            <td><strong>Método de Pago:</strong></td>
            <td>{fact.data.bill.payment_method.name}</td>
          </tr>
          <tr>
            <td><strong>CUFE:</strong></td>
            <td>{fact.data.bill.cufe}</td>
          </tr>
          <tr>
            <td><strong>QR:</strong></td>
            <td>
              <img src={fact.data.bill.qr_image} alt="Código QR" />
            </td>
          </tr>
        </tbody>
      </table>
      <button className="btn btn-primary"> descarga </button>
    </div>
  )
}