import React, { useEffect } from "react";

const Modal = ({ modalContent, setIsModalOpen, messageType }) => {
  useEffect(() => {
    setTimeout(() => {
      setIsModalOpen(false);
    }, 2000);
  });
  return (
    <div className="modal">
      <h4 className={`${messageType}`}>{modalContent}</h4>
    </div>
  );
};

export default Modal;
