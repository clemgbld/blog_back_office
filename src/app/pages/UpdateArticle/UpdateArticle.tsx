import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useArticleForm } from "../../article/hooks/use-article-form";
import { RootState } from "../../../core/store";
import { articlesSelectors } from "../../../core/articles/selectors/selectors";
import { AppDispatch } from "../../..";
import { updateArticle } from "../../../core/articles/use-cases/update-article";
import ArticleForm from "../../article/ArticleForm/ArticleForm";
import Title from "../../UI/Title/Title";

const UpdateArticle = () => {
  const dispatch: AppDispatch = useDispatch();

  const { id } = useParams();

  const articleToUpdate = useSelector((state: RootState) =>
    articlesSelectors.selectById(state, id)
  );

  const { inputValues, setInputValues, content, setContent } = useArticleForm(
    {
      title: articleToUpdate.title,
      topic: articleToUpdate.topic || "",
      description: articleToUpdate.summary || "",
      hide: articleToUpdate.hide || false,
    },
    articleToUpdate.content
  );

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    await dispatch(
      updateArticle({
        id: articleToUpdate.id,
        title: inputValues.title,
        summary: inputValues.description,
        topic: inputValues.topic,
        hide: inputValues.hide,
        date: articleToUpdate.date,
        content,
      })
    );
  };

  return (
    <div className="page_form-layout">
      <Title title="Update an existing article" />
      <ArticleForm
        onSubmit={handleSubmit}
        content={content}
        setContent={setContent}
        inputValues={inputValues}
        setInputValues={setInputValues}
        validateButtonLabel="Update"
      />
    </div>
  );
};

export default UpdateArticle;
