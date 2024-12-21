import React, { FC } from "react";
import RegisterForm from "../../../components/Auth/RegisterForm";
import "./Register.scss";
const Register: FC<any> = () => {

  return (
    <section className="register">
      <RegisterForm />
    </section>
  );
};

export default Register;
