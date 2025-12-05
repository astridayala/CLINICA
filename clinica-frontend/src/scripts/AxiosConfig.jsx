import axios from 'axios';

// URL base de tu API desde .env ( VITE_API_URL esté definida)
const API_URL = import.meta.env.VITE_API_URL;

// 1. Crea una instancia de Axios con la URL base
const api = axios.create({
  baseURL: API_URL,
});

// 2. Interceptor de Solicitudes: Añade el token JWT antes de cada petición
api.interceptors.request.use(
  (config) => {
    // Obtenemos el token guardado en el login
    const token = localStorage.getItem('accessToken'); 

    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;