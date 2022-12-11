import "tippy.js/dist/tippy.css";
import { useRef } from "react";
import {
  createPlateUI,
  HeadingToolbar,
  MentionCombobox,
  Plate,
  createAlignPlugin,
  createAutoformatPlugin,
  createBlockquotePlugin,
  createBoldPlugin,
  createCodeBlockPlugin,
  createCodePlugin,
  createExitBreakPlugin,
  createHeadingPlugin,
  createHighlightPlugin,
  createKbdPlugin,
  createImagePlugin,
  createItalicPlugin,
  createLinkPlugin,
  createListPlugin,
  createMediaEmbedPlugin,
  createNodeIdPlugin,
  createParagraphPlugin,
  createResetNodePlugin,
  createSelectOnBackspacePlugin,
  createSoftBreakPlugin,
  createDndPlugin,
  createStrikethroughPlugin,
  createSubscriptPlugin,
  createSuperscriptPlugin,
  createTablePlugin,
  createTodoListPlugin,
  createTrailingBlockPlugin,
  createUnderlinePlugin,
  createComboboxPlugin,
  createMentionPlugin,
  createIndentPlugin,
  createFontColorPlugin,
  createFontBackgroundColorPlugin,
  createDeserializeMdPlugin,
  createDeserializeCsvPlugin,
  createNormalizeTypesPlugin,
  createFontSizePlugin,
  createHorizontalRulePlugin,
  createDeserializeDocxPlugin,
  PlateEventProvider,
  AutoformatPlugin,
  ELEMENT_CODE_BLOCK,
  CodeBlockElement,
} from "@udecode/plate";
import { createJuicePlugin } from "@udecode/plate-juice";
import {
  MarkBallonToolbar,
  ToolbarButtons,
} from "./config/components/Toolbars";
import { withStyledPlaceHolders } from "./config/components/withStyledPlaceHolders";
import { withStyledDraggables } from "./config/components/withStyledDraggables";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { MENTIONABLES } from "./config/mentionables";
import { CONFIG } from "./config/config";
import { createDragOverCursorPlugin } from "./config/plugins";
import { CursorOverlayContainer } from "./config/components/CursorOverlayContainer";
import {
  createMyPlugins,
  MyEditor,
  MyPlatePlugin,
  MyValue,
} from "./config/typescript";

const id = "Blog/BackOffice";

let components = createPlateUI({
  [ELEMENT_CODE_BLOCK]: CodeBlockElement,
});
components = withStyledPlaceHolders(components);
components = withStyledDraggables(components);

const plugins: any = createMyPlugins(
  [
    createParagraphPlugin(),
    createBlockquotePlugin(),
    createTodoListPlugin(),
    createHeadingPlugin(),
    createImagePlugin(),
    createHorizontalRulePlugin(),
    createLinkPlugin(),
    createListPlugin(),
    createTablePlugin(),
    createMediaEmbedPlugin(),
    createCodeBlockPlugin(),
    createAlignPlugin(CONFIG.align),
    createBoldPlugin(),
    createCodePlugin(),
    createItalicPlugin(),
    createHighlightPlugin(),
    createUnderlinePlugin(),
    createStrikethroughPlugin(),
    createSubscriptPlugin(),
    createSuperscriptPlugin(),
    createFontColorPlugin(),
    createFontBackgroundColorPlugin(),
    createFontSizePlugin(),
    createKbdPlugin(),
    createNodeIdPlugin(),
    createDndPlugin(),
    createDragOverCursorPlugin(),
    createIndentPlugin(CONFIG.indent),
    createAutoformatPlugin<
      AutoformatPlugin<MyValue, MyEditor>,
      MyValue,
      MyEditor
    >(CONFIG.autoformat),
    createResetNodePlugin(CONFIG.resetBlockType),
    createSoftBreakPlugin(CONFIG.softBreak),
    createExitBreakPlugin(CONFIG.exitBreak),
    createNormalizeTypesPlugin(CONFIG.forceLayout),
    createTrailingBlockPlugin(CONFIG.trailingBlock),
    createSelectOnBackspacePlugin(CONFIG.selectOnBackspace),
    createComboboxPlugin(),
    createMentionPlugin(),
    createDeserializeMdPlugin(),
    createDeserializeCsvPlugin(),
    createDeserializeDocxPlugin(),
    createJuicePlugin() as unknown as MyPlatePlugin,
  ],
  {
    components,
  }
);

type RichTextEditorProps = {
  initialValue?: MyValue;
  onChange?: (content: MyValue) => void;
};

const RichTextEditor: React.FC<RichTextEditorProps> = ({
  initialValue = [{ type: "p", children: [{ text: "" }] }],
  onChange = (content: MyValue) => {},
}) => {
  const containerRef = useRef(null);

  return (
    <DndProvider backend={HTML5Backend}>
      <PlateEventProvider>
        <HeadingToolbar>
          <ToolbarButtons />
        </HeadingToolbar>
      </PlateEventProvider>

      <div ref={containerRef} style={{ position: "relative" }}>
        <Plate<MyValue>
          id={id}
          initialValue={initialValue}
          onChange={onChange}
          editableProps={CONFIG.editableProps}
          plugins={plugins}
        >
          <MarkBallonToolbar />

          <MentionCombobox items={MENTIONABLES} />

          <CursorOverlayContainer containerRef={containerRef} />
        </Plate>
      </div>
    </DndProvider>
  );
};

export default RichTextEditor;
