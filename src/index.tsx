import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import colors from './style/variables/colors.module.scss';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { Provider } from 'react-redux';
import store from './store/store';
const GOOGLE_CLIENT_ID = '252790528007-48nbm52elsl5p7qpmdvvidl2k92rh8so.apps.googleusercontent.com';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
    <Provider store={store}>

      <BrowserRouter>
        <ConfigProvider theme={{
          token: {
            colorPrimary: colors.primary50,
            colorPrimaryHover: colors.primary100,
            // colorBgLayout: colors.white,
            // colorBorder: colors.primaryborder,
            // colorText: colors.primarytext,
            // colorBgTextActive: colors.lightgrayfill,
            // colorBgTextHover: colors.lightgrayfill,
            // colorFillAlter: colors.lightgrayfill,
            // colorBgElevated: colors.lightgrayfill,
          },
        }}>
          <App />
        </ConfigProvider>

      </BrowserRouter>

    </Provider>
  </GoogleOAuthProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
