import React, { FC } from "react";
import "./ModalHome.scss";
const ModalHome: FC<any> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;
  return (
    <>
      <div className="backdrop" onClick={onClose} />
      <div className="home" onClick={(e) => e.stopPropagation()}>
        <div className="home__content">{children}</div>
      </div>
    </>
  );
};

export default ModalHome;
