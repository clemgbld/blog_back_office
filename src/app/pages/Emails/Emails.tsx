import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../..";
import {
  selectAllEmails,
  selectEmailsStatus,
  selectEmailsError,
} from "../../../core/emails/selectors/selectors";
import { selectSearchedEmails } from "../../../core/emails/selectors/select-searched-emails/select-searched-emails";
import { retrieveSubscribersEmails } from "../../../core/emails/use-cases/retrieve-subscribers-emails";
import { resetEmailsError } from "../../../core/emails/emails-slice";
import Spinner from "../../UI/Spinner/Spinner";
import { STATUS } from "../../../core/utils/status-constants";
import WithNotificationError from "../../UI/notification/WithNotificationError";

const Emails = () => {
  const dispatch: AppDispatch = useDispatch();
  const emailsFromStore = useSelector(selectAllEmails);
  const emailsStatus = useSelector(selectEmailsStatus);
  const emailsErrorMessage = useSelector(selectEmailsError);
  const emailsSearchTerms = useSelector(
    ({ ui: { emailsSearchTerms } }: RootState) => emailsSearchTerms
  );

  const filteredEmails = useMemo(
    () => selectSearchedEmails(emailsSearchTerms, emailsFromStore),
    [emailsSearchTerms, emailsFromStore]
  );

  useEffect(() => {
    dispatch(retrieveSubscribersEmails());
  }, [dispatch]);

  if (emailsStatus === STATUS.PENDING) return <Spinner />;

  return (
    <WithNotificationError
      resetErrorMessage={() => dispatch(resetEmailsError())}
      errorMessage={emailsErrorMessage}
    >
      <>
        {filteredEmails.length === 0 && <div>No emails...</div>}
        <div>
          <div>
            {filteredEmails.length > 0 &&
              filteredEmails.map(({ email, id }) => (
                <div key={id}>
                  <p>{email}</p>
                </div>
              ))}
          </div>
        </div>
      </>
    </WithNotificationError>
  );
};

export default Emails;
