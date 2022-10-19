/* eslint-disable testing-library/no-node-access */
import { render } from "@testing-library/react";
import ArticleCard from "../ArticleCard";
import { fakeArticle1 } from "../../fixtures/articles";

describe("ArticleContent", () => {
  it("should not display any topic or summary when there no topic or summary", () => {
    const { title, timeToRead, content } = fakeArticle1;

    const { container } = render(
      <ArticleCard
        title={title}
        content={content}
        timeToRead={timeToRead}
        date={"17/09/2022"}
      />
    );

    expect(container.children[0].children[1].children.length).toBe(2);
    expect(container.children[0].children[1].children[1].children.length).toBe(
      2
    );
  });
});
