import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch } from "../../..";
import { retrieveArticles } from "../../../core/articles/use-cases/retrieve-articles";
import {
  articlesSelectors,
  allArticlesFormatted,
} from "../../../core/articles/selectors/selectors";
import { selectFirstImg } from "../../../core/articles/selectors/select-first-img/select-first-img";

const Home = () => {
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(retrieveArticles());
  }, [dispatch]);

  const articles = allArticlesFormatted(
    useSelector(articlesSelectors.selectAll)
  );

  return (
    <div>
      <h1>Dashboard</h1>
      <div>
        {articles.map(({ title, id, summary, timeToRead, date, content }) => (
          <div key={id}>
            <div>
              <img
                src={selectFirstImg(content).src}
                alt={selectFirstImg(content).alt}
              />
            </div>
            <div>
              <h2>{title}</h2>
              <div>
                <span>{date}</span>
                <span>{timeToRead}</span>
              </div>
              <p>{summary}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
