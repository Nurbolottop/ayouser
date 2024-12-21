import { useGoogleLogin } from '@react-oauth/google';
import { Button } from 'antd';

import axios from 'axios';
import { useNavigate } from 'react-router-dom';


export function GoogleLoginButton() {
    const navigate = useNavigate()
    const login = useGoogleLogin({
        onSuccess: async (tokenResponse) => {
            try {
                const response = await axios.post('https://ayo.webtm.ru/api/v1/auth/google/', {
                    access_token: tokenResponse.access_token
                });

                // Сохраняем токены
                if (response.data) {
                    localStorage.setItem("access_token", response.data.tokens.access);
                    localStorage.setItem("refresh_token", response.data.tokens.refresh);

                    localStorage.setItem("user_id", response.data.user.id);
                    navigate("/"); // or any other page

                } else {
                    throw new Error("Token not received.");
                }

            } catch (error) {
                console.error('Ошибка аутентификации', error);
            }
        },
        onError: (errorResponse) => {
            console.error(errorResponse);
        }
    });

    return <Button block onClick={() => login()}>Войти через Google</Button>;
}