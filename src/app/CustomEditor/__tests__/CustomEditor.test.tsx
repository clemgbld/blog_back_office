import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CustomeEditor from "../CustomEditor";

describe("CustomEditor", () => {
  describe("Text genration", () => {
    it("should be able to generate text", () => {
      render(<CustomeEditor />);
      const customEditor = screen.getByRole("textbox");
      userEvent.type(customEditor, "text");
      expect(screen.getByText("text")).toBeInTheDocument();
    });
  });

  describe("Code block genration", () => {
    it("should be able to generate code block", () => {});
  });
});
