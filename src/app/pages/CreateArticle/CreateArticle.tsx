import { useDispatch } from "react-redux";
import { useArticlesForm } from "../../articles/hooks/use-articles-form";
import { AppDispatch } from "../../..";
import { postArticle } from "../../../core/articles/use-cases/post-article";
import ArticlesForm from "../../articles/ArticlesForm/ArticlesForm";
import Title from "../../UI/Title/Title";

const CreateArticle = () => {
  const dispatch: AppDispatch = useDispatch();

  const { inputValues, setInputValues, content, setContent } =
    useArticlesForm();

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
      <ArticlesForm
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
