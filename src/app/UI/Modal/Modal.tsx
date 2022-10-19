import { FC } from "react";
import ReactDOM from "react-dom";

type ModalProps = {
  children: JSX.Element;
};

const Modal: FC<ModalProps> = ({ children }) =>
  ReactDOM.createPortal(children, document.getElementById("modal"));

export default Modal;
