import { createSelector } from "@reduxjs/toolkit";

export const selectFirstImg = createSelector(
  (content: any[]) => content,
  (content: any[]) => {
    const img = content.find(({ type }) => type === "img");
    return img
      ? { src: img.url, alt: img.caption?.length > 0 ? img.caption[0] : "" }
      : null;
  }
);
