import { FC } from "react";
import ReactDOM from "react-dom";

type ModalProps = {
  children: JSX.Element;
};

const Modal: FC<ModalProps> = ({ children }) => {
  const modal: any = document.getElementById("modal");
  return ReactDOM.createPortal(children, modal);
};

export default Modal;
