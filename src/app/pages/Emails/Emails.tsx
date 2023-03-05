import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../..";
import { selectAllEmails } from "../../../core/emails/selectors/selectors";
import { retrieveSubscribersEmails } from "../../../core/emails/use-cases/retrieve-subscribers-emails";

const Emails = () => {
  const dispatch: AppDispatch = useDispatch();
  const emailsFromStore = useSelector(selectAllEmails);

  useEffect(() => {
    dispatch(retrieveSubscribersEmails());
  }, [dispatch]);

  return (
    <div>
      <div>No emails...</div>
      <div>
        {emailsFromStore.length > 0 &&
          emailsFromStore.map(({ email, id }) => <p key={id}>{email}</p>)}
      </div>
    </div>
  );
};

export default Emails;
