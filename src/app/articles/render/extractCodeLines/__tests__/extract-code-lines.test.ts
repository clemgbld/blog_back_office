import { extractCodeLines } from "../extract-code-lines";

describe("extract code lines", () => {
  it("should be \n when there is an empty text", () => {
    const codeLines = [{ id: 1, type: "code_line", children: [{ text: "" }] }];
    expect(extractCodeLines(codeLines)).toBe("\n");
  });

  it("should be add \n at the end of each line of code", () => {
    const codeLines = [
      {
        id: 1,
        type: "code_line",
        children: [{ text: "class HelloMessage extends React.Component {" }],
      },
    ];
    expect(extractCodeLines(codeLines)).toBe(
      "class HelloMessage extends React.Component {\n"
    );
  });

  it("should be able to handle multiple lines of code", () => {
    const codeLines = [
      {
        id: 1,
        type: "code_line",
        children: [{ text: "class HelloMessage extends React.Component {" }],
      },
      {
        id: 2,
        type: "code_line",
        children: [{ text: "  handlePress = () => {" }],
      },
      {
        id: 3,
        type: "code_line",
        children: [{ text: "    alert('Hello')" }],
      },
    ];

    expect(extractCodeLines(codeLines)).toBe(
      "class HelloMessage extends React.Component {\n  handlePress = () => {\n    alert('Hello')\n"
    );
  });
});
