import React from "react";
import one from "../../../../img/icons/one.svg";
import three from "../../../../img/icons/three.svg";
import two from "../../../../img/icons/two.svg";

const Shop = () => {
  return (
    <section className="shop">
      <div className="container">
        <div className="row">
          <div className="col-4">
            <div className="shop__content">
              <span className="shop__content-img">
                <img src={one} alt="" />
              </span>
              <p className="shop__content-text">
                Cashback allows you to get back part of the money spent on purchases, making shopping more profitable.
              </p>
            </div>
          </div>
          <div className="col-4">
            <div className="shop__content">
              <span className="shop__content-img">
                <img src={two} alt="" />
              </span>
              <p className="shop__content-text">
                Cashback services often provide information about current discounts and sales at various stores.
              </p>
            </div>
          </div>
          <div className="col-4">
            <div className="shop__content">
              <span className="shop__content-img">
                <img src={three} alt="" />
              </span>
              <p className="shop__content-text">
                Cashback is especially beneficial for purchasing expensive items, such as electronics, furniture, and travel.
              </p>
            </div>
          </div>
        </div>
        <h3 className="shop__title">
          Hundreds of stores,<br /> thousands of great <br/> deals!
        </h3>
        <p className="shop__text">
          AYO — your personal assistant in the world of online<br />
          shopping, helping you save on your favorite <br />
          products and services.
        </p>
        <p className="shop__text">
          With AYO, you earn cashback for every purchase <br />
          made through our website or app. This means <br />
          you get part of the money back into your account, <br />
          making shopping even more rewarding.
        </p>
      </div>
    </section>
  );
};

export default Shop;
