import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../core/store";
import { useArticlesForm } from "../../articles/hooks/use-articles-form";
import { AppDispatch } from "../../..";
import { postArticle } from "../../../core/articles/use-cases/post-article";
import ArticlesForm from "../../articles/ArticlesForm/ArticlesForm";
import Title from "../../UI/Title/Title";

const CreateArticle = () => {
  const dispatch: AppDispatch = useDispatch();

  const [isTopicError, setIsTopicError] = useState(false);

  const { inputValues, setInputValues, content, setContent } =
    useArticlesForm();

  const isEditorInLightMode = useSelector<RootState, boolean>(
    ({ ui: { isEditorInLightMode } }) => isEditorInLightMode
  );

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (isTopicError === true) return;
    await dispatch(
      postArticle({
        title: inputValues.title,
        summary: inputValues.description,
        topic: inputValues.topic,
        hide: inputValues.hide,
        date: Date.now(),
        lightMode: isEditorInLightMode,
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
        isTopicError={isTopicError}
        setIsTopicError={setIsTopicError}
      />
    </div>
  );
};

export default CreateArticle;
