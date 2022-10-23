import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch } from "../../..";
import { retrieveArticles } from "../../../core/articles/use-cases/retrieve-articles";
import {
  articlesSelectors,
  allArticlesFormatted,
} from "../../../core/articles/selectors/selectors";
import { STATUS } from "../../../core/utils/status-constants";
import ArticleCard from "../../articles/ArticleCard/ArticleCard";
import Title from "../../UI/Title/Title";
import classNames from "./Home.module.scss";

const Home = () => {
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(retrieveArticles());
  }, [dispatch]);

  const articles = allArticlesFormatted(
    useSelector(articlesSelectors.selectAll)
  );

  const articlesStatus = useSelector(({ articles: { status } }) => status);

  if (articlesStatus === STATUS.PENDING) return <div role="progressbar" />;

  return (
    <div className="page_form-layout">
      <Title title="Dashboard" />
      {articles.length === 0 && <p>No article yet...</p>}
      <div className={classNames.home__articles}>
        {articles.map(
          ({
            title,
            summary,
            timeToRead,
            date,
            content,
            topic,
            id,
            lightMode,
            hide,
          }) => (
            <ArticleCard
              key={id}
              id={id}
              hide={hide}
              title={title}
              summary={summary}
              timeToRead={timeToRead}
              date={date}
              content={content}
              topic={topic}
              lightMode={lightMode}
            />
          )
        )}
      </div>
    </div>
  );
};

export default Home;
