import logo from "../../img/icons/ayoIoncPG.png";
import instagramIcon from "../../img/icons/instagramIcon.svg";
import telegramIcon from "../../img/icons/telegramIcon.svg";
import tiktokIcon from "../../img/icons/tiktokIcon.svg";
import facebookIcon from "../../img/icons/facebookIcon.svg";
import { Link } from "react-router-dom";
import useFetchData from "../../hooks/useFetchData";
import useFetchData2 from "../../hooks/useFetchData copy";


const Footer = () => {
  const { data } = useFetchData2(`https://ayo.webtm.ru/api/v1/cms/banner_index/`);

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__promo">
          <h2 className="footer__promo-title">
            {data[0]?.description}
          </h2>
          <button className="footer__promo-button"> <Link to={"/login"}>  Зарегистрировать  </Link></button>
        </div>
        <div className="footer__links">
          <div className="footer__links-logo">
            <img src={logo} alt="Logo" />
          </div>
          <div className="footer__links-a">
            <div className="footer__links-social">
              <a href=""> <div className="footer__social-item">
                <img src={instagramIcon} alt="" />
                <br />
                <span>INSTAGRAM</span>
              </div></a>
              <a href=""> <div className="footer__social-item">
                <img src={telegramIcon} alt="" />
                <br />
                <span>TELEGRAM</span>
              </div></a>
              <a href=""> <div className="footer__social-item">
                <img src={tiktokIcon} alt="" />
                <br />
                <span>TIK TOK</span>
              </div></a>
              <a href=""> <div className="footer__social-item">
                <img src={facebookIcon} alt="" />
                <br />
                <span>FACEBOOK</span>
              </div></a>
            </div>
            <div className="footer__links-text">
              Lorem ipsum dolor sit amet consectetur. Aliquam dolor libero
              volutpat id. Bibendum mattis vulputate congue feugiat. Pharetra
              felis id varius at et morbi donec. Maecenas dictum enim.
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
