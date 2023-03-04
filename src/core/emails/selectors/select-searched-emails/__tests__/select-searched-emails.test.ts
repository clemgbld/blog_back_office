import { selectSearchedEmails } from "../select-searched-emails";

describe("select searched emails", () => {
  it("should should select all the emails there is less than 3 chars", () => {
    const emails = [
      { id: "1", email: "foo@exemple.com" },
      { id: "2", email: "bar@exemple.com" },
    ];

    expect(selectSearchedEmails("fo", emails)).toEqual(emails);
  });

  it("should select the wanted email when there is at least 3 chars", () => {
    const emails = [
      { id: "1", email: "foo@exemple.com" },
      { id: "2", email: "bar@exemple.com" },
    ];

    expect(selectSearchedEmails("foo", emails)).toEqual([
      { id: "1", email: "foo@exemple.com" },
    ]);
  });

  it("should not take into account extra spaces", () => {
    const emails = [
      { id: "1", email: "foo@exemple.com" },
      { id: "2", email: "bar@exemple.com" },
    ];

    expect(selectSearchedEmails("foo ", emails)).toEqual([
      { id: "1", email: "foo@exemple.com" },
    ]);
  });

  it("should have a case insensitive search", () => {
    const emails = [
      { id: "1", email: "foo@exemple.com" },
      { id: "2", email: "bar@exemple.com" },
    ];

    expect(selectSearchedEmails("fOo", emails)).toEqual([
      { id: "1", email: "foo@exemple.com" },
    ]);
  });
});
