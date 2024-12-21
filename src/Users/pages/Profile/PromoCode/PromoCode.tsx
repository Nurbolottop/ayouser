import React, { useState } from "react";
import { Form, Input, Button, message } from "antd";
import Application from "../../../../components/Application/Application";
import "./PromoCode.scss";
import UserPromoCodeComponent from "../../../../components/UserPromoCode/UserPromoCode";

const PromoCode = () => {

  return (
    <div className="promoCode">
      <UserPromoCodeComponent />
    </div>
  );
};

export default PromoCode;
