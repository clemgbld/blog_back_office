import { FC } from "react";
import { useDispatch } from "react-redux";
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

  const { isOpen, handleOpenModal, handleCloseModal } = useModal();

  const dispatch: AppDispatch = useDispatch();

  const deleteArticleHandler = async () => await dispatch(deleteArticle(id));

  const toggleHideStatusHandler = async () =>
    await dispatch(toggleHideStatus(id));

  return (
    <>
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
            <Link to={`${ROUTES.UPDATE}/${id}`}>Modify</Link>
          </div>
        </div>
        <figcaption>
          <h2 className={classNames.card__title}>{title}</h2>
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
