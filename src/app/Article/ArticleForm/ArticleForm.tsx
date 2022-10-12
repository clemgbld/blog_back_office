import { useCallback, FC } from "react";
import { MyValue } from "../RichTextEditor/config/typescript";
import RichTextEditor from "../RichTextEditor/RichTextEditor";
import { Inputvalues } from "../../pages/CreateArticle/CreateArticle";
import ArticleInput from "./ArticleInput/ArticleInput";
import classNames from "./ArticleForm.module.scss";

type ArticleFormProps = {
  content: MyValue;

  setContent: React.Dispatch<React.SetStateAction<MyValue>>;

  inputValues: Inputvalues;

  setInputValues: React.Dispatch<React.SetStateAction<Inputvalues>>;
};

const ArticleForm: FC = ({
  content,
  setContent,
  inputValues,
  setInputValues,
}: ArticleFormProps) => {
  const handleInputChange = ({ target: { name, value } }) =>
    setInputValues({ ...inputValues, [name]: value });

  const handleCheckBoxChange = () =>
    setInputValues({ ...inputValues, hide: !inputValues.hide });

  const handleValueChange = useCallback(
    (content: MyValue) => setContent(content),
    [setContent]
  );

  return (
    <form>
      <div>
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
        isRequired
        id="description"
        onChange={handleInputChange}
      />
      <div>
        <label htmlFor="description">Publish:</label>
        <input
          id="publish"
          name="publish"
          type="checkbox"
          checked={inputValues.hide}
          onChange={handleCheckBoxChange}
        />
      </div>
      <div>
        <RichTextEditor initialValue={content} onChange={handleValueChange} />
      </div>
      <div>
        <div>
          <button>Cancel</button>
          <button type="submit" disabled={!!!content[0].children[0].text}>
            Save
          </button>
        </div>
      </div>
    </form>
  );
};

export default ArticleForm;
