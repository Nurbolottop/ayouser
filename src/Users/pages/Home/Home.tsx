import React, { useEffect } from "react";
import Banner from "./Banner/Banner";
import Shop from "./Shop/Shop";
import Organizations from "./Organizations/Organizations";
import Questions from "./Questions/Questions";
import ModalHome from "../../../components/ModalHome/ModalHome";
import useModal from "../../../hooks/useModal";
// import Footer from "../../../../components/Footer/Footer";
import Footer from "../../../components/Footer/Footer";
import "./Home.scss";
import "./MediaHome.scss";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate()
  // Ensure that fallback and children are of type ReactNode and will return at least an empty fragment if undefined
  useEffect(() => {
    const access_token = localStorage.getItem('access_token');
    console.log('Access Token:', access_token); // Check if the token is retrieved

    if (access_token) {
      navigate('/user');
    }
  }, [navigate]);
  return (
    <React.Fragment>
      <main className="home">
        <Banner />
        <Shop />
        <Organizations />

        <Questions />
      </main>
      <Footer />
    </React.Fragment>
  );
};

export default Home;
