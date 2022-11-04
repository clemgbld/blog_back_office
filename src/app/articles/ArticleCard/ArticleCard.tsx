import { FC, useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { AppDispatch } from "../../..";
import { deleteArticle } from "../../../core/articles/use-cases/deleteArticle";
import { toggleHideStatus } from "../../../core/articles/use-cases/toogle-hide-status";
import { selectFirstImg } from "../../../core/articles/selectors/select-first-img/select-first-img";
import { Coffee } from "@styled-icons/material";
import { CalendarToday } from "@styled-icons/material";
import { useModal } from "../../UI/Modal/hooks/useModal";
import { renderContent } from "../render/renderContent";
import ArticleButtonContainer from "./ArticleButtonContainer/ArticleButtonContainer";
import DefaultModal from "../../UI/Modal/DefaultModal/DefaultModal";
import { ClockContext } from "../../context/ClockContext";
import { ROUTES } from "../../routing/constants";
import classNames from "./ArticleCard.module.scss";

type ArticleCardProps = {
  id: string;
  title: string;
  summary?: string;
  timeToRead: string;
  date: string;
  content: any;
  topic?: string;
  lightMode: boolean;
  hide?: boolean;
};

const ArticleCard: FC<ArticleCardProps> = ({
  id,
  title,
  summary,
  timeToRead,
  date,
  content,
  topic,
  lightMode,
  hide = false,
}) => {
  const { src, alt } = selectFirstImg(content);

  const clock = useContext(ClockContext);

  const { isOpen, handleOpenModal, handleCloseModal } = useModal();

  const [showNotification, setShowNotification] = useState(true);

  const dispatch: AppDispatch = useDispatch();

  const errorMessage = useSelector(({ articles: { error } }) => error);

  useEffect(() => {
    if (!errorMessage) return;
    const showNotificationFor = async () => {
      await clock.waitAsync(5000);
      setShowNotification(false);
    };
    showNotificationFor();
    return () => clock.cancel();
  }, [errorMessage, clock]);

  const deleteArticleHandler = async () => {
    await dispatch(deleteArticle(id));
  };

  const toggleHideStatusHandler = async () =>
    await dispatch(toggleHideStatus(id));

  return (
    <>
      {errorMessage && showNotification && <div>{errorMessage}</div>}
      {isOpen && (
        <DefaultModal onClose={handleCloseModal}>
          <div
            className={
              lightMode
                ? classNames.card__modal
                : `${classNames.card__modal}  ${classNames["card__modal--dark-theme"]}`
            }
          >
            {renderContent(content)}
          </div>
        </DefaultModal>
      )}
      <figure
        data-testid="article"
        onClick={handleOpenModal}
        role="contentinfo"
        className={classNames.card}
      >
        <div>
          <div className={classNames["card__img--container"]}>
            <img className={classNames.card__img} src={src} alt={alt} />
          </div>
          <div className={classNames.card__buttons}>
            <ArticleButtonContainer
              action="Delete"
              onValidate={deleteArticleHandler}
            />
            <ArticleButtonContainer
              action={hide ? "Publish" : "Hide"}
              onValidate={toggleHideStatusHandler}
            />
            <Link
              className={`${classNames.card__button} button`}
              to={`${ROUTES.UPDATE}/${id}`}
            >
              Modify
            </Link>
          </div>
        </div>
        <figcaption>
          <h2 data-testid="title" className={classNames.card__title}>
            {title}
          </h2>
          <div className={classNames["card__tag--container"]}>
            <div className={classNames.card__tag}>
              <div className={classNames.card__icon}>
                <CalendarToday />
              </div>
              <span>{date}</span>
            </div>
            <div className={classNames.card__tag}>
              <div className={classNames.card__icon}>
                <Coffee />
              </div>
              <span>{timeToRead}</span>
            </div>
            {topic && (
              <div className={classNames.card__tag}>
                <div className={classNames.card__icon}>#</div>
                <span>{topic}</span>
              </div>
            )}
          </div>
          {summary && <p className={classNames.card__summary}>{summary}</p>}
        </figcaption>
      </figure>
    </>
  );
};

export default ArticleCard;
