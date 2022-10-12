import { useState, useCallback } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../..";
import { postArticle } from "../../../core/articles/use-cases/post-article";
import { MyValue } from "../../RichTextEditor/config/typescript";
import RichTextEditor from "../../RichTextEditor/RichTextEditor";
import classNames from "./CreateArticle.module.scss";

interface Inputvalues {
  title: string;
  topic: string;
  description: string;
  hide: boolean;
}

const CreateArticle = () => {
  const dispatch: AppDispatch = useDispatch();

  const [articleContent, setArticleContent] = useState<MyValue>([
    { type: "h1", children: [{ text: "" }] },
  ]);

  const [inputValues, setInputValues] = useState<Inputvalues>({
    title: "",
    topic: "",
    description: "",
    hide: false,
  });

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    await dispatch(
      postArticle({
        title: inputValues.title,
        summary: inputValues.description,
        topic: inputValues.topic,
        hide: inputValues.hide,
        date: Date.now(),
        content: articleContent,
      })
    );
  };

  const handleInputChange = ({ target: { name, value } }) =>
    setInputValues({ ...inputValues, [name]: value });

  const handleValueChange = useCallback((content: MyValue) => {
    setArticleContent(content);
  }, []);

  return (
    <div className={classNames["create-page"]}>
      <h1 className={classNames["create-page_title"]}>
        <span className={classNames["create-page_title--three-d"]}>C</span>
        reate new Article
      </h1>
      <form onSubmit={handleSubmit}>
        <div className={classNames["create-page_flex-container"]}>
          <div className={classNames["create-page_input-box"]}>
            <label className={classNames["create-page_label"]} htmlFor="title">
              Title:
            </label>
            <input
              required
              className={classNames["create-page_input"]}
              id="title"
              name="title"
              type="text"
              onChange={handleInputChange}
            />
          </div>
          <div className={classNames["create-page_input-box"]}>
            <label className={classNames["create-page_label"]} htmlFor="topic">
              Topic:
            </label>
            <input
              required
              className={classNames["create-page_input"]}
              id="topic"
              name="topic"
              type="text"
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className={classNames["create-page_input-box"]}>
          <label
            className={classNames["create-page_label"]}
            htmlFor="description"
          >
            Description:
          </label>
          <input
            className={classNames["create-page_input"]}
            id="description"
            name="description"
            type="text"
            onChange={handleInputChange}
          />
        </div>
        <div className={classNames["create-page_checkbox-container"]}>
          <label htmlFor="description">Publish:</label>
          <input
            className={classNames["create-page_checkbox"]}
            id="publish"
            name="publish"
            type="checkbox"
            checked={inputValues.hide}
            onChange={() =>
              setInputValues({ ...inputValues, hide: !inputValues.hide })
            }
          />
        </div>

        <div className={classNames["create-page_editor-container"]}>
          <RichTextEditor
            initialValue={articleContent}
            onChange={handleValueChange}
          />
        </div>
        <div className={classNames["create-page_button-container"]}>
          <div className={classNames["create-page_button-flex"]}>
            <button
              className={`${classNames["create-page_button"]} ${classNames["create-page_button--cancel"]}`}
            >
              Cancel
            </button>
            <button
              disabled={!!!articleContent[0].children[0].text}
              className={`${classNames["create-page_button"]} ${classNames["create-page_button--valid"]}`}
            >
              Save
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreateArticle;
