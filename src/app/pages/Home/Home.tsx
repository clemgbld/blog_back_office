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

const Home = () => {
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(retrieveArticles());
  }, [dispatch]);

  const articles = allArticlesFormatted(
    useSelector(articlesSelectors.selectAll)
  );

  const articlesStatus = useSelector(({ articles: { status } }) => status);

  return (
    <div className="page_form-layout">
      <Title title="Dashboard" />
      {articlesStatus === STATUS.PENDING && <div role="progressbar" />}
      <div>
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
          }) => (
            <ArticleCard
              key={id}
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
