import { selectFirstImg } from "../select-first-img";

describe("select the first img and give his src and alt", () => {
  it("should provide default img", () => {
    expect(
      selectFirstImg([
        { type: "p", id: 1, children: [{ text: "text1" }] },
        { type: "p", id: 2, children: [{ text: "text2" }] },
      ])
    ).toEqual({ src: "/fallback-image.png", alt: "" });
  });

  it("should select the first img in the top level nodes and give its src", () => {
    expect(
      selectFirstImg([
        { type: "p", id: 1, children: [{ text: "text1" }] },
        { type: "img", id: 3, url: "/img-url", children: [{ text: "" }] },
        { type: "p", id: 2, children: [{ text: "text2" }] },
      ])
    ).toEqual({ src: "/img-url", alt: "" });
  });

  it("should select the first img in the top levels nodes and give its src and alt when there is caption", () => {
    expect(
      selectFirstImg([
        { type: "p", id: 1, children: [{ text: "text1" }] },
        {
          type: "img",
          id: 3,
          url: "/img-url",
          caption: ["caption 1"],
          children: [{ text: "" }],
        },
        { type: "p", id: 2, children: [{ text: "text2" }] },
      ])
    ).toEqual({ src: "/img-url", alt: "caption 1" });
  });
});
