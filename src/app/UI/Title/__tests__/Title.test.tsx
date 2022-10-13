import { render, screen } from "@testing-library/react";
import Title from "../Title";

describe("Title", () => {
  it("should display the first letter and the rest of the title separatly", () => {
    render(<Title title={"My Page"} />);

    expect(screen.getByText("M")).toBeInTheDocument();
    expect(screen.getByText("y Page")).toBeInTheDocument();
  });
});
