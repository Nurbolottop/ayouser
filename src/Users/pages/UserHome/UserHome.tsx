import React from "react";
import UserFooter from "../../../components/UserFooter/UserFooter";
import QrCode from "../../../img/default_qrcode 1.png";
import certificates from "../../../img/messageEmpty.png";
import Organizations from "../Home/Organizations/Organizations";
import Questions from "../Home/Questions/Questions";
import "./UserHome.scss";
import searchIcon from "../../../img/icons/searchIcon.svg";
import logo from "../../../img/icons/humanLowLogo.svg";
import search from "../../../img/ion_search-outline.png";
import useModal from "../../../hooks/useModal";
import ModalHome from "../../../components/ModalHome/ModalHome";
import useFetchData from "../../../hooks/useFetchData";
import { Carousel } from "antd";

const bannerData = [
  { image_ad: 'https://media.kasperskydaily.com/wp-content/uploads/sites/90/2021/02/18170011/what-is-off-facebook-activity-featured.jpg' },
  { image_ad: 'https://media.kasperskydaily.com/wp-content/uploads/sites/90/2021/02/18170011/what-is-off-facebook-activity-featured.jpg' },
  { image_ad: 'https://media.kasperskydaily.com/wp-content/uploads/sites/90/2021/02/18170011/what-is-off-facebook-activity-featured.jpg' },
];
const UserHome = () => {
  const { data } = useFetchData(`https://ayo.webtm.ru/api/v1/users/users/${localStorage.getItem('user_id')}/`)
  const { data: baners } = useFetchData('https://ayo.webtm.ru/api/v1/cms/ad_slide/')
  return (
    <>


      <main className="userHome">
        <section className="agency">
          <div className="container">
            <div className="row">
              <div className="col-9">
                <Carousel style={{
                  borderRadius: '20px',
                  boxShadow: "3px 3px 9px 3px rgba(0, 0, 0, 0.338)"
                }} autoplay>
                  {baners.map((item: any, index: any) => (
                    <div key={index}>
                      <div
                        className="agency__content"
                        style={{
                          background: `url(${item.image}) center/cover`,
                        }}
                      >
                        <h4 className="agency__content-subtitle">
                          {/* Здесь можно разместить текст или дополнительные элементы */}
                        </h4>
                      </div>
                    </div>
                  ))}
                </Carousel>
              </div>
              <div className="col-3">
                <div className="agency__qr">
                  <div className="showQr__content">
                    <img
                      className="showQr__content-img"
                      src={data?.profile_qr_code}
                      alt=""
                    />
                    <p className="showQr__content-number">
                      {data?.wallet_address}
                    </p>
                    <p className="showQr__content-text">
                      To place an order <br /> scan the QR code.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-4">
                <div className="agency__qr">
                  <div className="showQr__content">
                    <img src={data.profile_qr_code} alt="" />
                    <p className="showQr__content-number">
                      {data?.wallet_address}
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-4">
                <div className="agency__card">
                  <div className="agency__card-row">
                    <h4 className="agency__card-title">Total Bbalance  AYO</h4>
                    <img
                      src={certificates}
                      className="agency__card-img none"
                      alt=""
                    />
                  </div>
                  <p className="agency__card-total">Total Amount</p>
                  <div className="agency__card-square">
                    <p className="agency__card-price">{data.total_balance} p </p>
                  </div>
                </div>
              </div>
              <div className="col-4">
                <div className="agency__card">
                  <div className="agency__card-row">
                    <h4 className="agency__card-title">Saved with AYO</h4>
                    <img
                      src={certificates}
                      className="agency__card-img none"
                      alt=""
                    />
                  </div>
                  <p className="agency__card-total">Total Amount</p>
                  <div className="agency__card-square">
                    <p className="agency__card-price">{data.saved_balance} $</p>
                  </div>
                </div>
              </div>
              <div className="col-4">
                <div className="agency__card">
                  <div className="agency__card-row">
                    <h4 className="agency__card-title">My Companies</h4>
                    <img
                      src={certificates}
                      className="agency__card-img"
                      alt=""
                    />
                  </div>
                  <p className="agency__card-text">
                    You currently do not have any companies.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        <br /><br />
        <Organizations />
        <Questions />
        {/* <Footer /> */}
      </main>
      <UserFooter />
    </>
  );
};

export default UserHome;
