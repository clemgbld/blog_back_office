import { useCallback, FC } from "react";
import { MyValue } from "../RichTextEditor/config/typescript";
import RichTextEditor from "../RichTextEditor/RichTextEditor";
import { Inputvalues } from "../../pages/CreateArticle/CreateArticle";
import ArticleInput from "./ArticleInput/ArticleInput";
import Button from "../../UI/Button/Button";
import classNames from "./ArticleForm.module.scss";

type ArticleFormProps = {
  onSubmit: (e: any) => Promise<void>;

  content: MyValue;

  setContent: React.Dispatch<React.SetStateAction<MyValue>>;

  inputValues: Inputvalues;

  setInputValues: React.Dispatch<React.SetStateAction<Inputvalues>>;

  validateButtonLabel: string;
};

const ArticleForm: FC<ArticleFormProps> = ({
  onSubmit,
  content,
  setContent,
  inputValues,
  setInputValues,
  validateButtonLabel,
}) => {
  const handleInputChange = ({ target: { name, value } }) =>
    setInputValues({ ...inputValues, [name]: value });

  const handleCheckBoxChange = () =>
    setInputValues({ ...inputValues, hide: !inputValues.hide });

  const handleValueChange = useCallback(
    (content: MyValue) => setContent(content),
    [setContent]
  );

  return (
    <form onSubmit={onSubmit}>
      <div className={classNames.form_flex}>
        <ArticleInput
          label={"Title: "}
          isRequired
          id="title"
          onChange={handleInputChange}
        />
        <ArticleInput
          label={"Topic: "}
          isRequired
          id="topic"
          onChange={handleInputChange}
        />
      </div>
      <ArticleInput
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
      <div className={classNames["form_editor-container"]}>
        <RichTextEditor initialValue={content} onChange={handleValueChange} />
      </div>
      <div>
        <div className={classNames["form_button-container"]}>
          <div className={classNames["form_button-flex"]}>
            <Button label={"Cancel"} />
            <Button
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

export default ArticleForm;
