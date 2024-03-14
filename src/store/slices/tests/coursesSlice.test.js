import { mockedState } from "../../../test-helpers";
import reducer, {
  deleteCourse,
  saveCourse,
  setCourses,
  updateCourse,
} from "../coursesSlice";

describe("coursesSlice", () => {
  it("should return the initial state", async () => {
    expect(reducer(undefined, {})).toEqual([]);
  });

  it("should handle a course list being added to an empty list", async () => {
    const previousState = [];

    expect(
      reducer(previousState, setCourses(mockedState.courses))
    ).toMatchSnapshot();
  });

  it("should handle a course being added", async () => {
    const previousState = [...mockedState.courses];
    const course = { ...mockedState.courses[0], title: "A new course" };

    expect(reducer(previousState, saveCourse(course))).toMatchSnapshot();
  });

  it("should handle a course being deleted", async () => {
    const previousState = [...mockedState.courses];

    expect(
      reducer(previousState, deleteCourse(mockedState.courses[0].id))
    ).toMatchSnapshot();
  });

  it("should handle a course being updated", async () => {
    const previousState = [...mockedState.courses];
    const course = { ...mockedState.courses[0], title: "Updateds title" };

    expect(reducer(previousState, updateCourse(course))).toMatchSnapshot();
  });
});
