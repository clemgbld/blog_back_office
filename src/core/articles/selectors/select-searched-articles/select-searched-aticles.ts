import { Article } from "../../entities/article";
import { compose } from "@reduxjs/toolkit";
import { curry } from "ramda";

const extractTextField = (str: string) =>
  str.match(/"(text)":("([^""]+)"|\[[^[]+])/gim);

const replaceAllTextKeyByNothing = (str: string) =>
  str?.replace(/"text":/gi, ";");

const isSearchvalueInText = (text: string, searchValue: string) =>
  new RegExp(searchValue.toLowerCase().trim()).test(text?.toLowerCase());

const extractTextFromContent = compose(
  replaceAllTextKeyByNothing,
  (str?: string[]) => str?.join(";"),
  extractTextField,
  JSON.stringify
);

export const searchSelector = curry(
  (searchTerms: string, articles: Article[]) =>
    searchTerms.length < 3
      ? articles
      : articles.filter(
          ({ timeToRead, title, summary = "", content }) =>
            isSearchvalueInText(title, searchTerms) ||
            isSearchvalueInText(timeToRead, searchTerms) ||
            isSearchvalueInText(summary, searchTerms) ||
            isSearchvalueInText(extractTextFromContent(content), searchTerms)
        )
);
