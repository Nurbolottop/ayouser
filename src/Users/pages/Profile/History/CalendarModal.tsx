import React, { FC } from "react";
import { Calendar } from "antd";
const CalendarModal: FC<any> = ({ isOpen, onClose, value, onChange }) => {
  if (!isOpen) return null;
  return (
    <div className="history__modal-calendar">
      <Calendar

        onChange={onChange}
        value={value}
      />
    </div>
  );
};

export default CalendarModal;
