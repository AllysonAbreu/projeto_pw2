import { FaTimes } from "react-icons/fa";

import { useContext } from "react";

import { ToastifyContext } from "../../../contexts/toastify/toastify.context";
import { TOASTIFY_STATE } from "../../../constants/toastify/toastify.constants";

import "./toastify.css";

const TOASTIFY_TYPE_CLASS = {
  [TOASTIFY_STATE.ERROR]: "toastify toastify-error",
  [TOASTIFY_STATE.SUCESSO]: "toastify toastify-success",
};

const TOASTIFY_MESSAGE_CLASS = {
  [TOASTIFY_STATE.ERROR]: "toastify-message toastify-message-error",
  [TOASTIFY_STATE.SUCESSO]: "toastify-message toastify-message-success",
};

const Toastify = () => {
  const { toastify, addToast } = useContext(ToastifyContext);

  const handleCloseToastify = () => {
    addToast({
      ...toastify,
      show: false,
    });
  };

  if (!toastify?.show) {
    return null;
  }

  return (
    <div className={TOASTIFY_TYPE_CLASS[toastify.type]}>
      <header className="toastify-header">
        <strong>{toastify.title}</strong>
        <button onClick={handleCloseToastify} className="toastify-close-icon">
          <FaTimes />
        </button>
      </header>
      <p className={TOASTIFY_MESSAGE_CLASS[toastify.type]}>
        {toastify.message}
      </p>
    </div>
  );
};

export default Toastify;
