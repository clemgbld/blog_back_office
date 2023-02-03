import { FC } from "react";
import { stopPropagation } from "../../../UI/utils/stopPropagation";
import { useModal } from "../../../UI/Modal/hooks/useModal";
import { compose } from "@reduxjs/toolkit";
import DefaultModal from "../../../UI/Modal/DefaultModal/DefaultModal";
import Button from "../../../UI/Button/Button";
import classNames from "./ArticleButtonContainer.module.scss";

type ArticleButtonContainerProps = {
  onValidate: () => Promise<void>;
  action: string;
};

const ArticleButtonContainer: FC<ArticleButtonContainerProps> = ({
  onValidate,
  action,
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
        <DefaultModal onClose={closeModalHandler}>
          <div className={classNames.modal}>
            <div className={classNames["modal__title-container"]}>
              <h3>{`${action} article`}</h3>
            </div>
            <p>{`Are you sure you want to ${action.toLowerCase()} this article ?`}</p>
            <div className={classNames["modal__button-container"]}>
              <Button
                className={classNames.modal__button}
                label="cancel"
                onClick={closeModalHandler}
              />
              <Button
                className={classNames.modal__button}
                label="validate"
                onClick={validateHandler}
              />
            </div>
          </div>
        </DefaultModal>
      )}
      <Button
        className={classNames.modal__button}
        label={action}
        onClick={openModalHandler}
      />
    </div>
  );
};

export default ArticleButtonContainer;
