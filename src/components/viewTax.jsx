import React from "react";
import { viewTax } from "../store";

export const VerFacturas = () => {

    const tax = viewTax();
    console.log("esta es mi data" ,tax);
    
    return(
        <>
            <h1>Holaa</h1>
        </>
    )
}