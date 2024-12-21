import React, { FC, useEffect } from "react";
import UserEdit from "./UserEdit";
import "./Data.scss";

const Data: FC<any> = ({ user }) => {
  console.log(user);

  return (
    <div className="data">
      <h2 className="data__title">Personal data</h2>
      <UserEdit />
    </div>
  );
};

export default Data;
