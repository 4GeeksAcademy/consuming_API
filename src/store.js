export const initialStore = () => {
  return {
    users: [],
    authToken: null,
    refreshToken: null,
    tax: [],
  }
}

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
        'Accept': 'application/json',
        'Authorization': `Bearer ${authToken}`,
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

