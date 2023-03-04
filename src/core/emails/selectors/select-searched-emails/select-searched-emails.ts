import { curry } from "ramda";
import { Email } from "../../entities/email";
import { NUMBER_OF_CHARS_TO_START_SEARCH } from "../../../utils/search-constants";
import { trimToLower } from "../../../utils/helper";

export const selectSearchedEmails = curry(
  (searchTerms: string, emails: Email[]) =>
    searchTerms.length < NUMBER_OF_CHARS_TO_START_SEARCH
      ? emails
      : emails.filter(({ email }) => email.includes(trimToLower(searchTerms)))
);
