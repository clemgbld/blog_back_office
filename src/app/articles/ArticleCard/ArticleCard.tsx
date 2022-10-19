import { FC } from "react";
import { selectFirstImg } from "../../../core/articles/selectors/select-first-img/select-first-img";

type ArticleCardProps = {
  title: string;
  summary?: string;
  timeToRead: string;
  date: string;
  content: any;
  topic?: string;
};

const ArticleCard: FC<ArticleCardProps> = ({
  title,
  summary,
  timeToRead,
  date,
  content,
  topic,
}) => {
  const { src, alt } = selectFirstImg(content);

  return (
    <figure>
      <div>
        <img src={src} alt={alt} />
      </div>
      <figcaption>
        <h2>{title}</h2>
        <div>
          <span>{date}</span>
          <span>{timeToRead}</span>
          <span>{topic}</span>
        </div>
        <p>{summary}</p>
      </figcaption>
    </figure>
  );
};

export default ArticleCard;
