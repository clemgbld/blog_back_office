import { compose } from "@reduxjs/toolkit";
import { curry } from "ramda";
import { Article } from "../../entities/article";
import { NUMBER_OF_CHARS_TO_START_SEARCH } from "../../../utils/search-constants";
import { trimToLower } from "../../../utils/helper";

const extractTextField = (str: string) =>
  str.match(/"(text)":("([^""]+)"|\[[^[]+])/gim);

const replaceAllTextKeyByNothing = (str: string) =>
  str?.replace(/"text":/gi, ";");

const isSearchvalueInText = (text: string, searchValue: string) =>
  new RegExp(trimToLower(searchValue)).test(text?.toLowerCase());

const extractTextFromContent: (...args: any[]) => string = compose(
  replaceAllTextKeyByNothing,
  (str?: string[]) => str?.join(";"),
  extractTextField,
  JSON.stringify
);

export const searchSelector = curry(
  (searchTerms: string, articles: Article[]): Article[] =>
    searchTerms.length < NUMBER_OF_CHARS_TO_START_SEARCH
      ? articles
      : articles.filter(
          ({ timeToRead, title, summary = "", content }) =>
            isSearchvalueInText(title, searchTerms) ||
            isSearchvalueInText(timeToRead, searchTerms) ||
            isSearchvalueInText(summary, searchTerms) ||
            isSearchvalueInText(extractTextFromContent(content), searchTerms)
        )
);
