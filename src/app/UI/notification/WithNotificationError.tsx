import { FC, useContext, useEffect, useState } from "react";
import { ClockContext } from "../../context/ClockContext";
import Modal from "../Modal/Modal";

type WithNotificationErrorProps = {
  children: JSX.Element;
  errorMessage: string;
};

const TIME_DURIND_SHOW_NOTIFICATION = 5000;

const WithNotificationError: FC<WithNotificationErrorProps> = ({
  children,
  errorMessage,
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
    };
    showNotificationFor();
    return () => clock.cancel();
  }, [errorMessage, clock]);

  return (
    <>
      {errorMessage && showNotification && (
        <Modal>
          <div>
            <button
              onClick={closeNotification}
              data-testid="close notification"
            >
              X
            </button>
            <p>{errorMessage}</p>
          </div>
        </Modal>
      )}

      {children}
    </>
  );
};

export default WithNotificationError;
