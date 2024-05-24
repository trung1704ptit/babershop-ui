/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';
import cookie from 'js-cookie';

const UNAUTH_MESSAGE = 'the user belonging to this token no logger exists'

const api = () => {
  const defaultOptions = {
    baseURL: process.env.NEXT_PUBLIC_APP_API_PATH,
    withCredentials: true,
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-store, no-cache, must-revalidate',
    },
  };

  // Create instance
  const instance = axios.create(defaultOptions);

  // Set the AUTH token for any request
  instance.interceptors.request.use((config) => {
    const accessToken = cookie.get('access_token');
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  }, (error) => {
    return Promise.reject(error);
  });

  let isRefreshing = false;
  let refreshSubscribers: any[] = [];

  instance.interceptors.response.use(
    (response) => {
      return response;
    },
    async (error: any) => {
      const originalRequest = error.config;

      // Check if the error is due to an expired access token
      if ((error.response && error?.response?.status === 401 || error?.response?.status == 403 && error?.response?.data?.message === UNAUTH_MESSAGE) && !originalRequest._retry) {
        if (isRefreshing) {
          try {
            // Wait for token refresh and retry the original request
            const token = await new Promise((resolve) => {
              refreshSubscribers.push((newToken: string) => {
                resolve(newToken);
              });
            });
            originalRequest.headers.Authorization = `Bearer ${token}`;
            return instance(originalRequest);
          } catch (refreshError) {
            return Promise.reject(refreshError);
          }
        }

        originalRequest._retry = true;
        isRefreshing = true;

        try {
          const response = await axios.get(`${process.env.NEXT_PUBLIC_APP_API_PATH}/api/auth/refresh`);

          if (response.status === 200) {
            const { access_token: newAccessToken } = response.data;
            /* Function to store the new access token securely */
            // Update the authorization header with the new access token
            instance.defaults.headers.common.Authorization = `Bearer ${newAccessToken}`;

            // Call subscribers with the new token
            refreshSubscribers.forEach((callback) => callback(newAccessToken));
            refreshSubscribers = [];

            // Retry the original request with the new token
            return instance(originalRequest);
          } else {
            // Handle refresh token request failure
            return Promise.reject(error);
          }
        } catch (refreshError) {
          return window.location.href = '/dang-nhap'
        } finally {
          isRefreshing = false;
        }
      } else {
        return Promise.reject(error);
      }
    }
  );


  return instance;
};

export default api();