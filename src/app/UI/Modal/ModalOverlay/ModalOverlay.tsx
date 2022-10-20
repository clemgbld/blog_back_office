import { FC } from "react";
import classNames from "./ModalOverlay.module.scss";

type ModalOverlayProps = {
  children: JSX.Element;
};

const ModalOverlay: FC<ModalOverlayProps> = ({ children }) => (
  <div className={classNames.overlay}>{children}</div>
);

export default ModalOverlay;
