import { useState, useCallback } from "react";
import { MyValue } from "../../RichTextEditor/config/typescript";
import RichTextEditor from "../../RichTextEditor/RichTextEditor";
import classNames from "./CreateArticle.module.scss";

const CreateArticle = () => {
  const [articleContent, setArticleContent] = useState<MyValue>([
    { type: "p", children: [{ text: "" }] },
  ]);

  console.log(articleContent);

  const handleValueChange = useCallback((content: MyValue) => {
    setArticleContent(content);
  }, []);

  return (
    <div className={classNames["create-page"]}>
      <h1 className={classNames["create-page_title"]}>
        <span className={classNames["create-page_title--three-d"]}>C</span>
        reate new Article
      </h1>
      <form>
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
          />
        </div>
        <div className={classNames["create-page_checkbox-container"]}>
          <label htmlFor="description">Publish:</label>
          <input
            className={classNames["create-page_checkbox"]}
            id="publish"
            name="publish"
            type="checkbox"
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
