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
import { removeSubscriberEmail } from "../../../core/emails/use-cases/remove-subscriber-email";
import { resetEmailsError } from "../../../core/emails/emails-slice";
import Spinner from "../../UI/Spinner/Spinner";
import { STATUS } from "../../../core/utils/status-constants";
import WithNotificationError from "../../UI/notification/WithNotificationError";
import ChoiceButtonContainer from "../../UI/ChoiceButtonContainer/ChoiceButtonContainer";
import Title from "../../UI/Title/Title";
import classes from "./Emails.module.scss";

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

  const removeSubscriberEmailHandler = async (id: string) => {
    await dispatch(removeSubscriberEmail(id));
  };

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
        <div className="page_form-layout">
          <Title title="Emails Management Dashboard" />
          <div className={classes.emails__container}>
            {filteredEmails.length > 0 &&
              filteredEmails.map(({ email, id }) => (
                <div key={id} className={classes.email}>
                  <p>{email}</p>
                  <ChoiceButtonContainer
                    action="Delete"
                    onValidate={() => removeSubscriberEmailHandler(id)}
                    afterAction="this email ?"
                  />
                </div>
              ))}
          </div>
        </div>
      </>
    </WithNotificationError>
  );
};

export default Emails;
