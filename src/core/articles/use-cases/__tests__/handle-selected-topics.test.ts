import { handleSelectedTopics } from "../handle-selected-topics";

describe("handle the list of selected topic", () => {
  it("adds a topic to an empty list", () => {
    expect(handleSelectedTopics("React", [])).toEqual(["React"]);
  });

  it("should delete the topic if the selected topic is already in the list", () => {
    expect(handleSelectedTopics("React", ["React", "Vue"])).toEqual(["Vue"]);
  });

  it("should should add all articles when we delete the last topic from the list", () => {
    expect(handleSelectedTopics("React", ["React"])).toEqual(["all articles"]);
  });

  it("should remove all topics when we add all articles", () => {
    expect(handleSelectedTopics("all articles", ["React"])).toEqual([
      "all articles",
    ]);
  });

  it("should remove all articles when it is the first element when we add another topic", () => {
    expect(handleSelectedTopics("React", ["all articles"])).toEqual(["React"]);
  });
});
