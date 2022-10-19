/* eslint-disable testing-library/no-node-access */
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
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

  it("should render the content of the article in the modal", () => {
    const { title, timeToRead, content, topic, summary } = fakeArticle1;

    render(
      <>
        <div id="modal"></div>
        <ArticleCard
          title={title}
          content={content}
          timeToRead={timeToRead}
          date={"17/09/2022"}
          topic={topic}
          summary={summary}
        />
      </>
    );

    userEvent.click(screen.getByRole("contentinfo"));

    expect(
      screen.getAllByText(
        "Redundant re-renders are a common issue in React. If not taken seriously, this issue can quickly worsen the performance of your application."
      )[0]
    ).toBeInTheDocument();
  });
});
