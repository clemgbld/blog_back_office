import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "../../../core/store";
import { useArticlesForm } from "../../articles/hooks/use-articles-form";
import { AppDispatch } from "../../..";
import { postArticle } from "../../../core/articles/use-cases/post-article";
import ArticlesForm from "../../articles/ArticlesForm/ArticlesForm";
import Title from "../../UI/Title/Title";
import WithNotificationError from "../../UI/notification/WithNotificationError";
import { ROUTES } from "../../routing/constants";

const CreateArticle = () => {
  const dispatch: AppDispatch = useDispatch();

  const [isTopicError, setIsTopicError] = useState(false);

  const { inputValues, setInputValues, content, setContent } =
    useArticlesForm();

  const isEditorInLightMode = useSelector<RootState, boolean>(
    ({ ui: { isEditorInLightMode } }) => isEditorInLightMode
  );

  const errorMessage = useSelector(
    ({ articles: { error } }: RootState) => error
  );

  const navigate = useNavigate();

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
    navigate(ROUTES.HOME);
  };

  return (
    <WithNotificationError errorMessage={errorMessage}>
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
    </WithNotificationError>
  );
};

export default CreateArticle;
