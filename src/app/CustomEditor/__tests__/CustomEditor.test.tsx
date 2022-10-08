import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CustomeEditor from "../CustomEditor";

describe("CustomEditor", () => {
  it("should be able to generate text", () => {
    render(<CustomeEditor />);
    const customEditor = screen.getByRole("textbox");
    userEvent.type(customEditor, "text");
    expect(screen.getByText("text")).toBeInTheDocument();
  });
});
