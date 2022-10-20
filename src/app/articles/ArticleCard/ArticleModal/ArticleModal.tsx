import { FC } from "react";
import { MyValue } from "../../../../core/articles/entities/article";
import { renderContent } from "../../render/renderContent";
import Modal from "../../../UI/Modal/Modal";
import ModalOverlay from "../../../UI/Modal/ModalOverlay/ModalOverlay";
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
    <ModalOverlay>
      <>
        <button onClick={onClose} data-testid="close-modal">
          close modal
        </button>
        <div
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
