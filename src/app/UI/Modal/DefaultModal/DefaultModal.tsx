import { FC } from "react";
import Modal from "../Modal";
import ModalOverlay from "../ModalOverlay/ModalOverlay";
import { Close } from "@styled-icons/material";
import { stopPropagation } from "../../utils/stopPropagation";
import classNames from "./DefaultModal.module.scss";

type DefaultModalProps = {
  children: JSX.Element;

  onClose?: any;
};

const DefaultModal: FC<DefaultModalProps> = ({ children, onClose }) => (
  <Modal>
    <ModalOverlay onClose={onClose}>
      <>
        <button
          className={classNames.modal__close}
          onClick={onClose}
          data-testid="close-modal"
        >
          <Close />
        </button>
        <div data-testid="modal" onClick={stopPropagation}>
          {children}
        </div>
      </>
    </ModalOverlay>
  </Modal>
);

export default DefaultModal;
