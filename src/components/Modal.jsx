import React from "react";

const Modal = ({ children, open = false , onClose}) => {
  if (!open) return null;

  return (
    <div className="fixed p-2 inset-0 bg-black/70 backdrop-blur z-40" onClick={onClose}>
      <div
        className={`fixed z-50 bg-(--bg) shadow-2xl rounded-lg p-6`}
        style={{
          top: "50%",
          left: "50%",
          width: "400px",
          transform: "translate(-50%, -50%)",
        }}
        onClick={(e)=>{e.stopPropagation()}}
      >
        <div className="mb-6">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
