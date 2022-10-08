import React, { useState } from "react";
import {
  createEditor,
  BaseEditor,
  //   Descendant,
  //   Transforms,
  //   Editor,
} from "slate";

import { Slate, Editable, withReact, ReactEditor } from "slate-react";
type CustomElement = { type: string; children: CustomText[] };
type CustomText = { text: string };

declare module "slate" {
  interface CustomTypes {
    Editor: BaseEditor & ReactEditor;
    Element: CustomElement;
    Text: CustomText;
  }
}

const DefaultElement = (props: any) => (
  <p {...props.artibutes}>{props.children}</p>
);

const renderElement = (props: any) => {
  switch (props.type) {
    default:
      return <DefaultElement {...props} />;
  }
};

const CustomEditor: React.FC = () => {
  const [editor] = useState(() => withReact(createEditor()));

  return (
    <Slate
      editor={editor}
      value={[
        {
          type: "paragraph",
          children: [{ text: "" }],
        },
      ]}
    >
      <Editable renderElement={renderElement}></Editable>
    </Slate>
  );
};

export default CustomEditor;
