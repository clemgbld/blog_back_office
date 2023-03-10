import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../..";
import {
  selectAllEmails,
  selectEmailsStatus,
} from "../../../core/emails/selectors/selectors";
import { retrieveSubscribersEmails } from "../../../core/emails/use-cases/retrieve-subscribers-emails";
import Spinner from "../../UI/Spinner/Spinner";
import { STATUS } from "../../../core/utils/status-constants";

const Emails = () => {
  const dispatch: AppDispatch = useDispatch();
  const emailsFromStore = useSelector(selectAllEmails);
  const emailsStatus = useSelector(selectEmailsStatus);

  useEffect(() => {
    dispatch(retrieveSubscribersEmails());
  }, [dispatch]);

  if (emailsStatus === STATUS.PENDING) return <Spinner />;

  if (emailsFromStore.length === 0) return <div>No emails...</div>;

  return (
    <div>
      <div>
        {emailsFromStore.length > 0 &&
          emailsFromStore.map(({ email, id }) => <p key={id}>{email}</p>)}
      </div>
    </div>
  );
};

export default Emails;
