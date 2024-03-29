import { useState, useId } from "react";
import { MyValue } from "../RichTextEditor/config/typescript";

export interface InputValues {
  title: string;
  topic?: string;
  description?: string;
  hide: boolean;
  notify: false;
}

export const useArticlesForm = (
  formValues: InputValues = {
    title: "",
    topic: "",
    description: "",
    hide: false,
    notify: false,
  },
  articleContent?: MyValue
) => {
  const [inputValues, setInputValues] = useState<InputValues>(formValues);

  const id = useId();

  const [content, setContent] = useState<MyValue>(
    articleContent || [{ type: "h1", id, children: [{ text: "" }] }]
  );

  return {
    inputValues,
    setInputValues,
    content,
    setContent,
  };
};
