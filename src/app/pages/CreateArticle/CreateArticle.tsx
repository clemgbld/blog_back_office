import { useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../..";
import { postArticle } from "../../../core/articles/use-cases/post-article";
import { MyValue } from "../../article/RichTextEditor/config/typescript";
import ArticleForm from "../../article/ArticleForm/ArticleForm";
import Title from "../../UI/Title/Title";

export interface Inputvalues {
  title: string;
  topic: string;
  description: string;
  hide: boolean;
}

const CreateArticle = () => {
  const dispatch: AppDispatch = useDispatch();

  const [content, setContent] = useState<MyValue>([
    { type: "h1", children: [{ text: "" }] },
  ]);

  console.log(content);

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
        content,
      })
    );
  };

  return (
    <div className="page_form-layout">
      <Title title="Create a new article" />
      <ArticleForm
        onSubmit={handleSubmit}
        content={content}
        setContent={setContent}
        inputValues={inputValues}
        setInputValues={setInputValues}
        validateButtonLabel="Save"
      />
    </div>
  );
};

export default CreateArticle;
