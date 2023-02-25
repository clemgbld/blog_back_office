import React, { useCallback, FC } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../..";
import { MyValue } from "../RichTextEditor/config/typescript";
import { validateTopic } from "../../../core/articles/use-cases/validation/validateTopic";
import RichTextEditor from "../RichTextEditor/RichTextEditor";
import { InputValues } from "../hooks/use-articles-form";
import Input from "../../UI/Input/Input";
import Button from "../../UI/Button/Button";
import { pipe } from "ramda";
import classNames from "./ArticleForm.module.scss";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../routing/constants";

type ArticlesFormProps = {
  onSubmit: (e: any) => Promise<void>;

  content: MyValue;

  setContent: React.Dispatch<React.SetStateAction<MyValue>>;

  inputValues: InputValues;

  setInputValues: React.Dispatch<React.SetStateAction<InputValues>>;

  validateButtonLabel: string;

  isTopicError: boolean;

  setIsTopicError: React.Dispatch<React.SetStateAction<boolean>>;
};

const ArticlesForm: FC<ArticlesFormProps> = ({
  onSubmit,
  content,
  setContent,
  inputValues,
  setInputValues,
  validateButtonLabel,
  isTopicError,
  setIsTopicError,
}) => {
  const handleInputChange = ({ target: { name, value } }: any) => {
    setInputValues({ ...inputValues, [name]: value });
    return value;
  };

  const handleTopicValidation = (value: string) =>
    setIsTopicError(!validateTopic(value));

  const handleTopicChange = pipe(handleInputChange, handleTopicValidation);

  const handleCheckBoxChange = () =>
    setInputValues({ ...inputValues, hide: !inputValues.hide });

  const handleValueChange = useCallback(
    (content: MyValue) => setContent(content),
    [setContent]
  );

  const isEditorInLightMode = useSelector<RootState, boolean>(
    ({ ui: { isEditorInLightMode } }) => isEditorInLightMode
  );

  const navigate = useNavigate();

  return (
    <form onSubmit={onSubmit}>
      <div className={classNames.form_flex}>
        <Input
          value={inputValues.title}
          label={"Title: "}
          isRequired
          id="title"
          onChange={handleInputChange}
        />
        <div className={classNames.form__container}>
          <Input
            value={inputValues.topic}
            label={"Topic: "}
            id="topic"
            onChange={handleTopicChange}
          />
          {isTopicError && (
            <p className={classNames.form__error}>
              Please Provide a valid topic
            </p>
          )}
        </div>
      </div>
      <Input
        value={inputValues.description}
        label={"Description: "}
        id="description"
        onChange={handleInputChange}
      />
      <div className={classNames["form_checkbox-container"]}>
        <label className={classNames["form_checkbox-label"]} htmlFor="publish">
          Publish:
        </label>
        <input
          className={classNames.form_checkbox}
          id="publish"
          name="publish"
          type="checkbox"
          checked={inputValues.hide}
          onChange={handleCheckBoxChange}
        />
      </div>
      <div
        className={
          isEditorInLightMode
            ? classNames["form_editor-container"]
            : classNames["form_editor-container--dark"]
        }
      >
        <RichTextEditor initialValue={content} onChange={handleValueChange} />
      </div>
      <div>
        <div className={classNames["form_button-container"]}>
          <div className={classNames["form_button-flex"]}>
            <Button
              onClick={() => navigate(ROUTES.HOME)}
              className={classNames.form__button}
              label={"Cancel"}
            />
            <Button
              className={classNames.form__button}
              label={validateButtonLabel}
              type={"submit"}
              disabled={!!!content[0].children[0].text}
            />
          </div>
        </div>
      </div>
    </form>
  );
};

export default ArticlesForm;
