import axios from 'axios';

// Создаем экземпляр Axios
const instance = axios.create({
  baseURL: 'https://ayo.webtm.ru/api/v1',
  withCredentials: true, // Если нужно отправлять учетные данные
});

// Функция для обновления токена
const refreshAccessToken = async () => {
  try {
    const refreshToken = localStorage.getItem('refresh_token'); // Получаем refresh-токен из localStorage
    if (!refreshToken) throw new Error('Refresh token отсутствует');

    const response = await axios.post(`${instance.defaults.baseURL}/token/refresh/`, {
      refresh: refreshToken,
    });
    
    const newAccessToken = response.data.access;
    localStorage.setItem('access_token', newAccessToken); // Сохраняем новый access-токен
    return newAccessToken;
  } catch (error) {
    console.error('Ошибка обновления токена', error);
    throw error; // Выброс ошибки для обработки её в дальнейшем
  }
};

// Перехват ответов
instance.interceptors.response.use(
  (response) => response, // Возвращаем ответ, если он успешный
  async (error) => {
    const originalRequest = error.config;

    // Если ошибка связана с истекшим access токеном и запрос ещё не был повторен
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true; // Отмечаем, что попытка запроса уже была

      try {
        const newAccessToken = await refreshAccessToken(); // Получаем новый токен
        instance.defaults.headers.common['Authorization'] = `Bearer ${newAccessToken}`; // Устанавливаем новый токен в заголовки
        originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
        return instance(originalRequest); // Повторный запрос с новым токеном
      } catch (err) {
        return Promise.reject(err); // Обработка ошибки при обновлении токена
      }
    }
    return Promise.reject(error); // Если другая ошибка, возвращаем её
  }
);

// Экспорт API модулей
const api = {
  // Определите здесь другие API-модули и методы
};

export { instance, api };
