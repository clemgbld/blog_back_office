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

  const modalHandler = (fn: () => void) => compose(fn, stopPropagation);

  const openModalHandler = modalHandler(handleOpenModal);

  const closeModalHandler = modalHandler(handleCloseModal);

  const validateHandler = async () => {
    await onValidate();
    handleCloseModal();
  };

  return (
    <div>
      {isOpen && (
        <div>
          <button onClick={closeModalHandler}>cancel</button>
          <button onClick={validateHandler}>validate</button>
        </div>
      )}
      <button onClick={openModalHandler}>Delete</button>
    </div>
  );
};

export default ArticleButtonContainer;
