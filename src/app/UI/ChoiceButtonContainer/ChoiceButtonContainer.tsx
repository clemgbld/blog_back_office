import { FC } from "react";
import { stopPropagation } from "../utils/stopPropagation";
import { useModal } from "../Modal/hooks/useModal";
import { pipe } from "ramda";
import DefaultModal from "../Modal/DefaultModal/DefaultModal";
import Button from "../Button/Button";
import classNames from "./ChoiceButtonContainer.module.scss";

type ChoiceButtonContainerProps = {
  onValidate: () => Promise<void>;
  action: string;
  afterAction: string;
};

const ChoiceButtonContainer: FC<ChoiceButtonContainerProps> = ({
  onValidate,
  action,
  afterAction,
}) => {
  const { isOpen, handleOpenModal, handleCloseModal } = useModal();

  const modalHandler = (fn: () => void) => pipe(stopPropagation, fn);

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
            <p>{`Are you sure you want to ${action.toLowerCase()} ${afterAction}`}</p>
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

export default ChoiceButtonContainer;
