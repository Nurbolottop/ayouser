import { lazy, useState } from 'react';
import './style/style.scss';
import { Route, Routes } from 'react-router-dom';
import { Header } from 'antd/es/layout/layout';
import Home from './Users/pages/Home/Home';
import Cert from './Users/pages/Cert/Cert';
import Company from './Users/pages/Company/Company';
import Assortment from './Users/pages/Assortment/Assortment';
import Product from './Users/pages/Product/Product';
import QrCode from './Users/pages/QrCode/QrCode';
import Main from './Layout/Main/Main';
import LogIn from './Users/pages/LogIn/LogIn';
import Register from './Users/pages/Register/Register';
import Profile from './Users/pages/Profile/Profile';
import UserHome from './Users/pages/UserHome/UserHome';
import User from './Layout/User/User';
import ProfileLayOut from './Users/pages/Profile/ProfileLayOut';
import Confirm from './Users/pages/Confirm/Confirm';
import Request from './Users/pages/Request/Request';
import OrganithationPage from './Users/pages/Organithation/OrganithationPage';
import ConfirmRegister from './Users/pages/Confirm/Confirm';
import Orders from './Users/pages/Profile/Orders/Orders';
import Cart from './Users/pages/Profile/Cart/Cart';
import City from './Users/pages/Profile/City/City';
import PromoCode from './Users/pages/Profile/PromoCode/PromoCode';
import Feedback from './Users/pages/Profile/Feedback/Feedback';
import History from './Users/pages/Profile/History/History';
import Certificates from './Users/pages/Profile/Certificates/Certificates';
import Notice from './Users/pages/Profile/Notice/Notice';
import Data from './Users/pages/Profile/Data/Data';
import ProfileMessage from './Users/pages/Profile/ProfileMessage/ProfileMessage';
import { ChatPage } from './Users/pages/Profile/ProfileMessage/ChatPage/ChatePage';

function App() {

  // const { organization } = useOrganization();
  const [tab, setTab] = useState("user");


  return (
    <Routes>

      <Route path='/' element={<Main />}>
        <Route path="/" element={<Home />} />
        <Route path="/Assortment/:id" element={<Assortment />} />

        <Route path='/login' element={<LogIn />} />
        <Route path='/register' element={<Register />} />
        <Route path="/confirm" element={<Confirm />} />
        <Route path="/confirmregister" element={<ConfirmRegister />} />

      </Route>

      <Route path='/' element={<User />}>
        <Route path="/user" element={<UserHome />} />

        <Route path="/profile" element={<Profile />}>
          <Route path="orders" element={<Orders />} />
          <Route path="cart" element={<Cart />} />
          <Route path="city" element={<City />} />
          <Route path="promo-code" element={<PromoCode />} />
          <Route path="feedback" element={<Feedback />} />
          <Route path="history" element={<History />} />
          <Route path="certificates" element={<Certificates />} />
          <Route path="analitik" element={<Notice />} />
          <Route path="" element={<Data />} />
          <Route path="message" element={<ProfileMessage />} />
          <Route path='chat/:chatId' element={<ChatPage />} />
        </Route>
        <Route path='/request' element={<Request />} />
        <Route path="/Mycert" element={<Cert />} />
        <Route path='/organithation' element={<OrganithationPage />} />
        <Route path="/Mycompany" element={<Company />} />
        <Route path="/Assortment/:id" element={<Assortment />} />
        <Route path="/product" element={<Product />} />
        <Route path="/qr" element={<QrCode />} />
      </Route>



    </Routes>
  );
}

export default App;
