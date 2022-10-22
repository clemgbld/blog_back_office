import { FC } from "react";
import { stopPropagation } from "../../../UI/utils/stopPropagation";
import { useModal } from "../../../UI/Modal/hooks/useModal";
import { compose } from "@reduxjs/toolkit";

type ArticleButtonContainerProps = {
  onValidate: () => Promise<any>;
};

const ArticleButtonContainer: FC<ArticleButtonContainerProps> = ({
  onValidate,
}) => {
  const { isOpen, handleOpenModal, handleCloseModal } = useModal();

  const openModalHandler = compose(handleOpenModal, stopPropagation);

  const validateHandler = async () => {
    await onValidate();
    handleCloseModal();
  };

  return (
    <div>
      {isOpen && (
        <div>
          <button onClick={validateHandler}>validate</button>
        </div>
      )}
      <button onClick={openModalHandler}>Delete</button>
    </div>
  );
};

export default ArticleButtonContainer;
