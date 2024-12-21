import React, { FC } from "react";

const ModalHistory: FC<any> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;
  return (
    <>
      <div className="backdrop" onClick={onClose} />
      <div className="history__modal">{children}</div>
    </>
  );
};

export default ModalHistory;
