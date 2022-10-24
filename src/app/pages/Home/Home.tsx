import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../..";
import { retrieveArticles } from "../../../core/articles/use-cases/retrieve-articles";
import {
  articlesSelectors,
  allArticlesFormatted,
  selectArticlesWithHideStatus,
  allTopics,
  selectArticlesBasedOnTopic,
} from "../../../core/articles/selectors/selectors";
import { searchSelector } from "../../../core/articles/selectors/select-searched-articles/select-searched-aticles";
import { STATUS } from "../../../core/utils/status-constants";
import ArticleCard from "../../articles/ArticleCard/ArticleCard";
import Title from "../../UI/Title/Title";
import { pipe } from "ramda";
import { HIDE_STATUS_TAGS, ALL_ARTICLES } from "./constants";
import classNames from "./Home.module.scss";
import { Article } from "../../../core/articles/entities/article";

const Home = () => {
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(retrieveArticles());
  }, [dispatch]);

  const searchTerms = useSelector(
    ({ ui: { searchTerms } }: RootState) => searchTerms
  );

  const [currentHideStatus, setCurrentHideStatus] = useState("all articles");
  const [currentTopic, setCurrentTopic] = useState(["all articles"]);

  const handleArticles: (
    articles: Article[]
  ) => ReturnType<typeof allArticlesFormatted> = pipe(
    allArticlesFormatted,
    searchSelector(searchTerms),
    selectArticlesWithHideStatus(currentHideStatus),
    selectArticlesBasedOnTopic(currentTopic)
  );

  const articlesFromStore = useSelector(articlesSelectors.selectAll);

  const articlesToDisplay = handleArticles(articlesFromStore);

  const articlesStatus = useSelector(({ articles: { status } }) => status);

  if (articlesStatus === STATUS.PENDING) return <div role="progressbar" />;

  return (
    <div className="page_form-layout">
      <Title title="Dashboard" />
      {articlesToDisplay.length === 0 && (
        <p className={classNames.home__empty}>No article yet...</p>
      )}
      <div>
        <div className={classNames.home__articles}>
          {articlesToDisplay.map(
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
        <div>
          <div>
            {[ALL_ARTICLES, ...allTopics(articlesFromStore)].map((topic) => (
              <div onClick={() => setCurrentTopic(topic)} key={topic}>
                {topic}
              </div>
            ))}
          </div>
          {HIDE_STATUS_TAGS.map((name) => (
            <div key={name} onClick={() => setCurrentHideStatus(name)}>
              {name}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
