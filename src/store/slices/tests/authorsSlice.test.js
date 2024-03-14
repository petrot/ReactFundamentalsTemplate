import { mockedState } from "../../../test-helpers";
import reducer, { setAuthors, saveAuthor } from "../authorsSlice";

describe("authorsSlice", () => {
  it("should return the initial state", async () => {
    expect(reducer(undefined, {})).toEqual([]);
  });

  it("should handle a course list being added to an empty list", async () => {
    const previousState = [];

    expect(
      reducer(previousState, setAuthors(mockedState.authors))
    ).toMatchSnapshot();
  });

  it("should handle a course being added", async () => {
    const previousState = [...mockedState.authors];
    const author = {
      name: "author4",
      id: "365fe3fc-e751-4745-9af5-bf9eed0ea9de",
    };

    expect(reducer(previousState, saveAuthor(author))).toMatchSnapshot();
  });
});
