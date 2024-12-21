import { useCallback, useEffect, useState } from 'react';
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://ayo.webtm.ru/api/v1',
  // withCredentials: true,
});

// Функция для обновления токена
const refreshAccessToken = async () => {
  try {
    const refreshToken = localStorage.getItem('refresh_token');
    if (!refreshToken) throw new Error('Refresh token отсутствует');

    const response = await axios.post(`${axiosInstance.defaults.baseURL}/token/refresh/`, {
      refresh: refreshToken,
    });
    
    const newAccessToken = response.data.access;
    localStorage.setItem('access_token', newAccessToken); // Сохраняем новый access-токен
    return newAccessToken;
  } catch (error) {
    console.error('Ошибка обновления токена', error);
    throw error;
  }
};

// Перехват ответов для обработки истекшего access токена
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      try {
        const newAccessToken = await refreshAccessToken();
        axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${newAccessToken}`;
        originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
        return axiosInstance(originalRequest);
      } catch (err) {
        return Promise.reject(err);
      }
    }
    return Promise.reject(error);
  }
);

const useFetchData = (url: string) => {
  const [data, setData] = useState<any>([]);
  const [error, setError] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(url, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        },
      });
      setData(response.data);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }, [url]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, error, loading };
};

export default useFetchData;
