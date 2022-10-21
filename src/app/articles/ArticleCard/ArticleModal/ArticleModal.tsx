import { FC } from "react";
import { MyValue } from "../../../../core/articles/entities/article";
import { renderContent } from "../../render/renderContent";
import Modal from "../../../UI/Modal/Modal";
import ModalOverlay from "../../../UI/Modal/ModalOverlay/ModalOverlay";
import { Close } from "@styled-icons/material";
import { stopPropagation } from "../../../UI/utils/stopPropagation";
import classNames from "./ArticleModal.module.scss";

type ArticleModalProps = {
  content: MyValue;
  lightMode: boolean;
  onClose: () => void;
};

const ArticleModal: FC<ArticleModalProps> = ({
  content,
  lightMode,
  onClose,
}) => (
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
        <div
          onClick={stopPropagation}
          data-testid="modal"
          className={
            lightMode ? classNames.modal : classNames["modal--dark-theme"]
          }
        >
          {renderContent(content)}
        </div>
      </>
    </ModalOverlay>
  </Modal>
);

export default ArticleModal;
