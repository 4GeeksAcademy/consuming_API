export const initialStore = () => {
  return {
    users: [],
    authToken: null,
    refreshToken: null,
    tax: [],
    oneTax: null,
  }
}
// -------------------------------------------------------------------- //
export default function storeReducer(store, action = {},) {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
      return {
        ...store,
        user: action.payload.user,
        token: action.payload.token,
        isAuthenticated: true,
      };
    case 'LOGIN_FAILURE':
      return {
        ...store,
        error: action.payload.error,
        isAuthenticated: false,
      };
    default:
      return store;
  }
}
// -------------------------------------------------------------------- //
// login con la API 
// -------------------------------------------------------------------- //
export const login = async (username, password) => {
  try {
    const response = await fetch(import.meta.env.VITE_API_URL + '/oauth/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username,
        password,
        grant_type: 'password',
        client_id: import.meta.env.VITE_CLIENT_ID_FAC,
        client_secret: import.meta.env.VITE_CLIENT_SECRET_FAC,
      }),
    });

    if (!response.ok) {
      throw new Error('No se pudo obtener el token');
    }

    const data = await response.json();
    console.log('Inicio de sesión exitoso', data);
    sessionStorage.setItem('authToken', data.access_token);
    return data.users;
  } catch (error) {
    console.error('Error login user', error);
    throw error;
  }
};
// -------------------------------------------------------------------- //
//vista de las facturas total
// -------------------------------------------------------------------- //
export const viewTax = async () => {
  try {
    const authToken = sessionStorage.getItem('authToken');
    if (!authToken) {
      throw new Error('No hay token de autenticación');
    }
    const response = await fetch(import.meta.env.VITE_API_URL + "/v1/bills?filter[identification]&filter[names]&filter[number]&filter[prefix]&filter[reference_code]&filter[status]", {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken}`,
        'Accept': 'application/json',
      }
    });
    if (!response.ok) {
      throw new Error('No se pudo obtener los datos');
    }
    const data = await response.json();
    const tax = data.data || [];
    console.log("Datos obtenidos:", tax);
    return tax;
  } catch (error) {
    console.error("Error al obtener los datos:", error);
    throw error;
  }
};
// -------------------------------------------------------------------- //
// vista de una factura
// -------------------------------------------------------------------- //
export const viewOneTax = async (number) =>{
   try {
     const authToken = sessionStorage.getItem('authToken');
     if (!authToken) {
       throw new Error('No hay token de autenticación');
    }
    const response = await fetch(`${import.meta.env.VITE_API_URL}/v1/bills/show/${number}`, {
      method: 'GET',
      headers: {
         'Content-Type': 'application/json',
         'Authorization': `Bearer ${authToken}`,
         'Accept': 'application/json',
       }
     });
     if (!response.ok) {
       throw new Error('No se pudo obtener la vista de una factura');
     }
     const data = await response.json();
     const oneTax = data || [];
     console.log("view one tax",data);
     
     return oneTax;
   } catch (error) {
     console.error("Error al obtener los datos de una factura:", error);
     throw error;
     }
 }

 // -------------------------------------------------------------------- //
 // descarga PDF 
 // -------------------------------------------------------------------- //
 
//  export const downloadPDF = async (number) =>{
//   try {
//     const authToken = sessionStorage.getItem('authToken');
//     if (!authToken) {
//       throw new Error('No hay token de autenticación');
//    }
//    const response = fetch(`${import.meta.env.VITE_API_URL}v1/bills/download-pdf/${number}`, {
//      method: 'GET',
//      headers: {
//         'Content-Type': 'application/json',
//         'Authorization': `Bearer ${authToken}`,
//         'Accept': 'application/json',
//       }
//     });
//     if (!response.ok) {
//       throw new Error('No se pudo descargar la factura');
//     }
//     const data = response.json();
//     console.log(data);
  
//   } catch (error) {
//     throw error;
//   }
//  }