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
      <h1 className={classNames["create-page_title"]}>Create new Article</h1>
      <form>
        <RichTextEditor
          initialValue={articleContent}
          onChange={handleValueChange}
        />
      </form>
    </div>
  );
};

export default CreateArticle;
