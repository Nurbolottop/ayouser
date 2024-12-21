import React from "react";
import { Link } from "react-router-dom";
import useFetchData from "../../../../hooks/useFetchData";
import useFetchData2 from "../../../../hooks/useFetchData copy";

const Banner = () => {
  const { data: questions } = useFetchData2('https://ayo.webtm.ru/api/v1/cms/slides/');

  return (
    <section className="banner">
      <div className="container">
        <h2 className="banner__title">
          {questions[0]?.title}
        </h2>
        <div className="banner__content">
          <Link className="banner__content-login" to={"/login"}>
            Login
          </Link>
          <Link className="banner__content-register" to={"/register"}>
            Register          </Link>
        </div>
      </div>
    </section>
  );
};

export default Banner;
