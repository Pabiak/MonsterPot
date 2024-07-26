import axios from 'axios';
import { deleteCookie, getCookie, setCookie } from '../helpers/cookies';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  // withCredentials: true, // Enable sending cookies with requests
});

axiosInstance.interceptors.request.use(
  (config) => {
    const updatedConfig = config;
    const accessToken = getCookie('accessToken');

    if (accessToken) {
      updatedConfig.headers.Authorization = `Bearer ${accessToken}`;
    }

    return updatedConfig;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    // extracting response and config objects
    const { response, config } = error;
    // checking if error is unauthorized error
    if (response.status === 401) {
      const refreshToken = getCookie('refreshToken');
      if (refreshToken) {
        // if refresh token exists in cookies proceed
        try {
          // try refreshing token
          const refreshTokenResponse = await axiosInstance.post(
            `${import.meta.env.VITE_AUTH_URL}/token/refresh`,
            {
              refresh: refreshToken,
            }
          );
          const { accessToken, newRefreshToken } = refreshTokenResponse.data;
          if (accessToken && newRefreshToken) {
            // if request is successful and token exists in response
            // store it in cookies
            setCookie('accessToken', accessToken);
            setCookie('refreshToken', newRefreshToken);
            // with new token retry original request
            config.headers.Authorization = accessToken;
            return await axiosInstance(config);
          }
        } catch (e) {
          // TODO add toast notification here
          console.error(e);
        }
      }
    }
    // if none above worked clear cookies and log user out
    // logout();
    deleteCookie('accessToken');
    deleteCookie('refreshToken');
    return error;
  }
);

export default axiosInstance;
