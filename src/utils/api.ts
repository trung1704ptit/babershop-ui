import axios from 'axios';

const api = () => {
  const defaultOptions = {
    baseURL: process.env.NEXT_PUBLIC_APP_API_PATH,
    headers: {
      'Content-Type': 'application/json',
    },
  };

  // Create instance
  const instance = axios.create(defaultOptions);

  // Set the AUTH token for any request
  instance.interceptors.request.use(function (config) {
    const token = localStorage.getItem('token');
    config.headers.Authorization = token ? `Bearer ${token}` : '';
    return config;
  });

  return instance;
};

export default api();