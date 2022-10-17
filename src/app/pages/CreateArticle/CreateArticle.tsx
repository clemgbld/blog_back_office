import { useDispatch } from "react-redux";
import { useArticleForm } from "../../article/hooks/use-article-form";
import { AppDispatch } from "../../..";
import { postArticle } from "../../../core/articles/use-cases/post-article";
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

  const { inputValues, setInputValues, content, setContent } = useArticleForm();

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
