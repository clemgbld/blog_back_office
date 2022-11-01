import { FC, SetStateAction } from "react";

import { calcNumPages } from "../../../core/articles/selectors/pagination/pagination";
import { allArticlesFormatted } from "../../../core/articles/selectors/selectors";
import classNames from "./PaginationFooter.module.scss";

type PaginationFooterProps = {
  currentPage: number;
  articlesPerPages: number;
  articles: ReturnType<typeof allArticlesFormatted>;
  setCurrentPage: (value: SetStateAction<number>) => void;
};

const PaginationFooter: FC<PaginationFooterProps> = ({
  currentPage,
  articlesPerPages,
  articles,
  setCurrentPage,
}) => (
  <div>
    {calcNumPages(articlesPerPages, articles).length > 1 && (
      <div className={classNames["page__container"]}>
        {calcNumPages(articlesPerPages, articles).map((numPage) => (
          <button
            className={
              numPage === currentPage
                ? `${classNames["page__button"]} ${classNames["page__button--active"]}`
                : classNames["page__button"]
            }
            onClick={() => setCurrentPage(numPage)}
            key={numPage}
          >
            {numPage}
          </button>
        ))}
      </div>
    )}
  </div>
);

export default PaginationFooter;
