import React from "react";
import logo from "../../img/icons/ayoLogo.svg";
import instagram from "../../img/icons/instagramBlack.svg";
import telegram from "../../img/icons/telegramBlack.svg";
import facebook from "../../img/icons/facebookBlack.svg";
import tiktok from "../../img/icons/tiktokBlack.svg";
import "./UserFooter.scss";
import useFetchData2 from "../../hooks/useFetchData copy";
const UserFooter = () => {
  const { data } = useFetchData2('https://ayo.webtm.ru/api/v1/cms/settings/')
  return (
    <footer className="footerLight">
      <div className="container">
        <img src={logo} alt="" className="footerLight__logo" />
        <div className="footerLight__content">
          <div className="row">
            <div className="col-3">
              <a href={data[0]?.instagram} className="footerLight__content-item">
                <img src={instagram} alt="" />
                <p>instagram</p>
              </a>
            </div>
            <a href={data[0]?.telegram} className="col-3">
              <div className="footerLight__content-item">
                <img src={telegram} alt="" />
                <p>telegram</p>
              </div>
            </a>
            <a href={data[0]?.tiktok} className="col-3">
              <div className="footerLight__content-item">
                <img src={tiktok} alt="" />
                <p>tik tok</p>
              </div>
            </a>
            <a href={data[0]?.facebook} className="col-3">
              <div className="footerLight__content-item">
                <img src={facebook} alt="" />
                <p>facebook</p>
              </div>
            </a>
          </div>
          <p className="footerLight__content-text">
            Lorem ipsum dolor sit amet consectetur. Aliquam dolor libero
            volutpat id. Bibendum mattis <br /> vulputate congue feugiat.
            Pharetra felis id varius at et morbi donec. Maecenas dictum enim
          </p>
        </div>
      </div>
    </footer>
  );
};

export default UserFooter;
