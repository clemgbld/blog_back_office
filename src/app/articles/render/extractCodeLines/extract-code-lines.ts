type CodeLine = {
  id: number;
  type: string;
  children: { text: string }[];
};

export const extractCodeLines = (codeLines: CodeLine[]) =>
  codeLines.reduce((acc, curr) => `${acc}${`${curr.children[0].text}\n`}`, "");
