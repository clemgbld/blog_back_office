import { ResetTv } from "@styled-icons/material";
import { createElement, CSSProperties } from "react";
import { CopyBlock, dracula } from "react-code-blocks";
import { extractCodeLines } from "./extractCodeLines/extract-code-lines";

const buildSpecificProps = (content: any) => {
  let props = {};

  if (content.id) {
    props = { ...props, key: content.id };
  }

  if (content.type === "img") {
    props = {
      ...props,
      alt: content.caption?.length > 0 ? content.caption[0] : "",
    };
  }

  if (content.url) {
    props =
      content.type === "a"
        ? { ...props, href: content.url }
        : { ...props, src: content.url };
  }

  if (content.type === "media_embed") {
    props = {
      ...props,
      title: "Youtube video player",
      allow:
        "accelerometer; autoplay; clipboard-write; gyroscope; picture-in-picture",
      allowFullScreen: true,
      frameBorder: "0",
    };
  }

  if (content.dataTestId) {
    props = { ...props, "data-testid": content.dataTestId };
  }

  return props;
};

const buildStyle = (content: any) => {
  let style: CSSProperties = {};

  if (["media_embed", "table"].includes(content.type)) {
    style = { ...style, width: "100%" };
  }

  if (content.align) {
    style = { ...style, textAlign: content.align };
  }

  if (content.type === "media_embed") {
    style = { ...style, height: "315px" };
  }

  if (content.type === "h1") {
    style = { ...style, marginBottom: "3.6rem" };
  }

  if (content.type === "h2") {
    style = { ...style, marginBottom: "2.4rem" };
  }

  if (content.type === "h3") {
    style = { ...style, marginBottom: "1.6rem" };
  }

  if (content.type === "blockquote") {
    style = {
      ...style,
      marginTop: "0.5rem",
      marginBottom: "0.5rem",
      marginLeft: "0",
      marginRight: "0",
      borderLeft: "2px solid #ddd",
      padding: "1rem 2rem 1rem 1.6rem",
      color: "#aaa",
    };
  }

  if (content.type === "img") {
    style = { ...style, objectFit: "cover" };
  }

  if (content.strikethrough) {
    style = { ...style, textDecoration: "line-through" };
  }

  if (content.indent) {
    style = { ...style, marginLeft: `${content.indent * 2.5}rem` };
  }

  if (content.width) {
    style = { ...style, width: `${content.width / 10}rem` };
  }

  if (!content.children) return style;

  if (content.children[0].bold) {
    style = { ...style, fontWeight: "700" };
  }

  if (content.children[0].italic) {
    style = { ...style, fontStyle: "italic" };
  }

  if (content.children[0].underline) {
    style = { ...style, textDecoration: "underline" };
  }
  if (content.children[0].color) {
    style = { ...style, color: content.children[0].color };
  }

  if (content.children[0].backgroundColor) {
    style = {
      ...style,
      backgroundColor: content.children[0].backgroundColor,
    };
  }

  if (content.children[0].superscript) {
    style = {
      ...style,
      verticalAlign: "super",
      fontSize: "50%",
    };
  }

  if (content.children[0].subscript) {
    style = {
      ...style,
      verticalAlign: "sub",
      fontSize: "50%",
    };
  }

  return style;
};

const buildType = (content: any) => {
  if (content.type === "media_embed") return "iframe";

  return content.type;
};

const buildProps = (content: any) => ({
  style: buildStyle(content),
  ...buildSpecificProps(content),
});

export const renderContent = (content: any[]): any =>
  content.length === 0 ? null : content.map(renderElement);

const shouldRenderBr = (content: any) =>
  content.type === "p" &&
  content.children.length === 1 &&
  content.children[0].text === "";

function renderElement(content: any, i: number) {
  if (!content.type) {
    return i !== 0 && Object.keys(content).length !== 1 ? (
      <span
        style={buildStyle({
          children: [{ ...content }],
        })}
        key={i}
      >
        {content.text}
      </span>
    ) : (
      content.text
    );
  }

  if (content.type === "code_block") {
    return (
      <CopyBlock
        key={content.id}
        text={extractCodeLines(content.children)}
        language={content.lang}
        showLineNumbers={true}
        theme={dracula}
        codeBlock
      />
    );
  }

  if (shouldRenderBr(content)) {
    return createElement("p", buildProps(content), createElement("br"));
  }

  return createElement(
    buildType(content),
    buildProps(content),
    content.children && content.children[0].text !== ""
      ? renderContent(content.children)
      : null
  );
}
