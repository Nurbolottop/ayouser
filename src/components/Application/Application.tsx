import React from "react";
import { Link } from "react-router-dom";

const Application = () => {
  return (
    <div className="data__application">
      <p className="data__application-text">
        Do you want your company to be in AYO too?
      </p>
      <Link className="data__save" to={"https://ayoadmin.vercel.app/login"}>
        Apply Now
      </Link>
    </div>
  );
};

export default Application;
