import React, { FC } from "react";
import "./Confirm.scss";
import ConfirmForm from "../../../components/Auth/ConfirmForm";
import ConfirmFormREgister from "../../../components/Auth/ConfirmFormRegister";

const Confirm: FC<any> = ({ email }) => {


  return (
    <section className="confirm">
      <div className="container">
        <ConfirmFormREgister email={email} />
      </div>
    </section>
  );
};

export default Confirm;
