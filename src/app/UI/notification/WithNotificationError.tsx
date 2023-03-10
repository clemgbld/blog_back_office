import { FC, useContext, useEffect, useState } from "react";
import { ClockContext } from "../../context/ClockContext";
import Modal from "../Modal/Modal";
import { ErrorOutline, Close } from "@styled-icons/material";

import classNames from "./WithNotificationError.module.scss";

type WithNotificationErrorProps = {
  children: JSX.Element;
  errorMessage: string | undefined;
  resetErrorMessage: () => void;
};

const TIME_DURIND_SHOW_NOTIFICATION = 5000;

const WithNotificationError: FC<WithNotificationErrorProps> = ({
  children,
  errorMessage,
  resetErrorMessage,
}) => {
  const clock = useContext(ClockContext);

  const [showNotification, setShowNotification] = useState(true);

  const closeNotification = () => clock.cancel();

  useEffect(() => {
    if (!errorMessage) return;
    const showNotificationFor = async () => {
      setShowNotification(true);
      await clock.waitAsync(TIME_DURIND_SHOW_NOTIFICATION);
      setShowNotification(false);
      resetErrorMessage();
    };
    showNotificationFor();
  }, [errorMessage, clock, resetErrorMessage]);

  return (
    <>
      {errorMessage && showNotification && (
        <Modal>
          <div className={classNames.notification}>
            <div className={classNames.notification__content}>
              <ErrorOutline className={classNames.notification__icon} />
              <p>{errorMessage}</p>
            </div>
            <button
              data-testid="close notification"
              className={classNames.notification__button}
              onClick={closeNotification}
            >
              <Close className={classNames.notification__close} />
            </button>
          </div>
        </Modal>
      )}

      {children}
    </>
  );
};

export default WithNotificationError;
