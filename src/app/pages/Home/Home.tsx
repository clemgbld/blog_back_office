import { FC, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../..";
import { retrieveArticles } from "../../../core/articles/use-cases/retrieve-articles";
import { handleSelectedTopics } from "../../../core/articles/use-cases/handle-selected-topics";
import { handleHideStatus } from "../../../core/articles/use-cases/handle-hide-status";
import {
  articlesSelectors,
  allArticlesFormatted,
  selectArticlesWithHideStatus,
  allTopics,
  selectArticlesBasedOnTopic,
} from "../../../core/articles/selectors/selectors";
import {
  calcNumPages,
  selectArticlesOnPage,
} from "../../../core/articles/selectors/pagination/pagination";
import { sortByDate } from "../../../core/articles/selectors/sort-by-date/sort-by-date";
import {
  countArticlesInTopic,
  countArticlesByHideStatus,
} from "../../../core/articles/selectors/count-selector/count-selector";
import { searchSelector } from "../../../core/articles/selectors/select-searched-articles/select-searched-aticles";
import { STATUS } from "../../../core/utils/status-constants";
import ArticleCard from "../../articles/ArticleCard/ArticleCard";
import Button from "../../UI/Button/Button";
import Title from "../../UI/Title/Title";
import { pipe } from "ramda";
import { HIDE_STATUS_TAGS, ALL_ARTICLES, ARTICLES_PER_PAGE } from "./constants";
import classNames from "./Home.module.scss";
import { Article } from "../../../core/articles/entities/article";

type HomeProps = {
  articlesPerPages?: number;
};

const Home: FC<HomeProps> = ({ articlesPerPages = ARTICLES_PER_PAGE }) => {
  const dispatch: AppDispatch = useDispatch();

  const articlesFromStore = useSelector(articlesSelectors.selectAll);

  useEffect(() => {
    if (articlesFromStore.length > 0) return;
    dispatch(retrieveArticles());
  }, [dispatch, articlesFromStore.length]);

  const searchTerms = useSelector(
    ({ ui: { searchTerms } }: RootState) => searchTerms
  );

  const [currentHideStatus, setCurrentHideStatus] = useState("all articles");
  const [currentTopics, setCurrentTopics] = useState(["all articles"]);
  const [isDesc, setIsDesc] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  const handleArticles: (
    articles: Article[]
  ) => ReturnType<typeof allArticlesFormatted> = pipe(
    sortByDate(isDesc),
    searchSelector(searchTerms),
    selectArticlesWithHideStatus(currentHideStatus),
    selectArticlesBasedOnTopic(currentTopics),

    allArticlesFormatted
  );

  const articles = handleArticles(articlesFromStore);

  const articlesToDisplay = selectArticlesOnPage(
    currentPage,
    articlesPerPages,
    articles
  );
  const articlesStatus = useSelector(({ articles: { status } }) => status);

  if (articlesStatus === STATUS.PENDING) return <div role="progressbar" />;

  return (
    <div className="page_form-layout">
      <Title title="Dashboard" />
      {articlesToDisplay.length === 0 && (
        <p className={classNames.home__empty}>No article yet...</p>
      )}
      <div className={articlesToDisplay.length ? classNames.home__box : ""}>
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
          <h2 className={classNames.home__title}>Topic filter</h2>
          <div className={classNames.home__grid}>
            {[ALL_ARTICLES, ...allTopics(articlesFromStore)].map((topic) => (
              <Button
                onClick={() => setCurrentTopics(handleSelectedTopics(topic))}
                key={topic}
                label={`${topic} ${countArticlesInTopic(
                  topic,
                  articlesFromStore
                )}`}
                className={
                  currentTopics.includes(topic)
                    ? `${classNames["home__button--active"]} ${classNames.home__button}`
                    : classNames.home__button
                }
              />
            ))}
          </div>
          <h2 className={classNames.home__title}>Hidden status filter</h2>
          <div className={classNames.home__grid}>
            {HIDE_STATUS_TAGS.map((name) => (
              <Button
                key={name}
                onClick={() => setCurrentHideStatus(handleHideStatus(name))}
                label={`${name} ${countArticlesByHideStatus(
                  name,
                  articlesFromStore
                )}`}
                className={
                  currentHideStatus === name
                    ? `${classNames["home__button--active"]} ${classNames.home__button}`
                    : classNames.home__button
                }
              />
            ))}
          </div>
          <h2 className={classNames.home__title}>Sort by Date</h2>
          <div className={classNames.home__grid}>
            <Button
              label={"DESC"}
              onClick={() => setIsDesc(true)}
              className={
                isDesc === true
                  ? `${classNames["home__button--active"]} ${classNames.home__button}`
                  : classNames.home__button
              }
            />
            <Button
              label={"ASC"}
              onClick={() => setIsDesc(false)}
              className={
                isDesc === false
                  ? `${classNames["home__button--active"]} ${classNames.home__button}`
                  : classNames.home__button
              }
            />
          </div>
        </div>
      </div>
      <div className={classNames["home__page-container"]}>
        {calcNumPages(articlesPerPages, articles).map((numPage) => (
          <button
            className={
              numPage === currentPage
                ? `${classNames["home__page-button"]} ${classNames["home__page-button--active"]}`
                : classNames["home__page-button"]
            }
            onClick={() => setCurrentPage(numPage)}
            key={numPage}
          >
            {numPage}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Home;
