import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { useArticlesForm } from "../../articles/hooks/use-articles-form";
import { RootState } from "../../../core/store";
import { articlesSelectors } from "../../../core/articles/selectors/selectors";
import { AppDispatch } from "../../..";
import { updateArticle } from "../../../core/articles/use-cases/update-article";
import { resetError } from "../../../core/articles/articles-slice";
import { setTheme } from "../../../core/UI/use-cases/set-theme";
import ArticlesForm from "../../articles/ArticlesForm/ArticlesForm";
import WithNotificationError from "../../UI/notification/WithNotificationError";
import Title from "../../UI/Title/Title";
import { STATUS } from "../../../core/utils/status-constants";
import { ROUTES } from "../../routing/constants";

const UpdateArticle = () => {
  const [onMount, setOnMount] = useState(false);
  const [isTopicError, setIsTopicError] = useState(false);
  const dispatch: AppDispatch = useDispatch();

  const { id } = useParams();

  const articleToUpdate = useSelector((state: RootState) =>
    articlesSelectors.selectById(state, id)
  );

  const isEditorInLightMode = useSelector<RootState, boolean>(
    ({ ui: { isEditorInLightMode } }) => isEditorInLightMode
  );

  const errorMessage = useSelector(
    ({ articles: { error } }: RootState) => error
  );

  const articlesStatus = useSelector(
    ({ articles: { status } }: RootState) => status
  );

  useEffect(() => {
    if (onMount) return;
    dispatch(setTheme(articleToUpdate.lightMode));
    setOnMount(true);
  }, [dispatch, articleToUpdate, onMount]);

  const { inputValues, setInputValues, content, setContent } = useArticlesForm(
    {
      title: articleToUpdate.title,
      topic: articleToUpdate.topic || "",
      description: articleToUpdate.summary || "",
      hide: articleToUpdate.hide || false,
    },
    articleToUpdate.content
  );

  const navigate = useNavigate();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (isTopicError === true) return;
    await dispatch(
      updateArticle({
        id: articleToUpdate.id,
        title: inputValues.title,
        summary: inputValues.description,
        topic: inputValues.topic,
        hide: inputValues.hide,
        date: articleToUpdate.date,
        lightMode: isEditorInLightMode,
        content,
      })
    );

    if (articlesStatus === STATUS.REJECTED) return;

    navigate(ROUTES.HOME);
  };

  const resetErrorMessage = () => {
    dispatch(resetError());
  };

  return (
    <WithNotificationError
      resetErrorMessage={resetErrorMessage}
      errorMessage={errorMessage}
    >
      <div className="page_form-layout">
        <Title title="Update an existing article" />
        <ArticlesForm
          onSubmit={handleSubmit}
          content={content}
          setContent={setContent}
          inputValues={inputValues}
          setInputValues={setInputValues}
          validateButtonLabel="Update"
          isTopicError={isTopicError}
          setIsTopicError={setIsTopicError}
        />
      </div>
    </WithNotificationError>
  );
};

export default UpdateArticle;
