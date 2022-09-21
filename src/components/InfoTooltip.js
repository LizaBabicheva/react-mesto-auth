import React from "react";
import { loginConfirm } from "../images/login-confirm.svg";
import { loginReject } from "../images/login-reject.svg";

function InfoTooltip({ isOpen, onClose }) {
  return (
    <div className={`popup popup_type_login-status ${isOpen && 'popup_opened'}`}>
      <div className="popup__container popup__container_type_login-status">
        <img className="popup__tooltip-icon" src={loginReject} alt=""></img>
        <h3>Что-то пошло не так!<br />Попробуйте ещё раз.</h3>
        <button className="popup__close-button" type="button" aria-label="Закрыть"
          onClick={onClose}
        >
        </button>
      </div>
    </div>
  )
}

export default InfoTooltip;