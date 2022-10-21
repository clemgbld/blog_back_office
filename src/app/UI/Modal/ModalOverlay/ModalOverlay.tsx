import { FC } from "react";
import classNames from "./ModalOverlay.module.scss";

type ModalOverlayProps = {
  children: JSX.Element;
  onClose: () => void;
};

const ModalOverlay: FC<ModalOverlayProps> = ({ children, onClose }) => (
  <div
    onClick={onClose}
    data-testid="modal-overlay"
    className={classNames.overlay}
  >
    {children}
  </div>
);

export default ModalOverlay;
