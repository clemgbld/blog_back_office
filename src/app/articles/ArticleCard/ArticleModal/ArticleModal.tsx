import { FC } from "react";
import { MyValue } from "../../../../core/articles/entities/article";
import { renderContent } from "../../render/renderContent";
import Modal from "../../../UI/Modal/Modal";

type ArticleModalProps = {
  content: MyValue;
};

const ArticleModal: FC<ArticleModalProps> = ({ content }) => (
  <Modal>
    <div>{renderContent(content)}</div>
  </Modal>
);

export default ArticleModal;
