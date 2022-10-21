import { FC } from "react";
import { selectFirstImg } from "../../../core/articles/selectors/select-first-img/select-first-img";
import { Coffee } from "@styled-icons/material";
import { CalendarToday } from "@styled-icons/material";
import { useModal } from "../../UI/Modal/hooks/useModal";
import ArticleModal from "./ArticleModal/ArticleModal";
import classNames from "./ArticleCard.module.scss";

type ArticleCardProps = {
  title: string;
  summary?: string;
  timeToRead: string;
  date: string;
  content: any;
  topic?: string;
  lightMode: boolean;
};

const ArticleCard: FC<ArticleCardProps> = ({
  title,
  summary,
  timeToRead,
  date,
  content,
  topic,
  lightMode,
}) => {
  const { src, alt } = selectFirstImg(content);

  const { isOpen, handleOpenModal, handleCloseModal } = useModal();

  return (
    <>
      {isOpen && (
        <ArticleModal
          content={content}
          lightMode={lightMode}
          onClose={handleCloseModal}
        />
      )}
      <figure
        onClick={handleOpenModal}
        role="contentinfo"
        className={classNames.card}
      >
        <div className={classNames["card__img--container"]}>
          <img className={classNames.card__img} src={src} alt={alt} />
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
