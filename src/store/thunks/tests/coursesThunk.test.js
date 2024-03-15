import configureStore from "redux-mock-store";
import thunk from "redux-thunk";

import * as Services from "../../../services";
import { mockedState } from "../../../test-helpers";
import {
  createCourseThunk,
  deleteCourseThunk,
  getCoursesThunk,
  updateCourseThunk,
} from "../coursesThunk";

const middlewares = [thunk];
const mockStoreCreator = configureStore(middlewares);

describe("[coursesThunk]", () => {
  let store;

  beforeEach(() => {
    store = mockStoreCreator();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("should createCourseThunk dispatches saveCourse", async () => {
    const courseData = { ...mockedState.courses[0], title: "New course" };

    jest.spyOn(Services, "createCourse").mockResolvedValue({
      result: courseData,
    });

    await store.dispatch(createCourseThunk(courseData));
    const actions = store.getActions();

    expect(actions).toMatchSnapshot();
  });

  it("should updateCourseThunk dispatches updateCourse", async () => {
    const courseData = { ...mockedState.courses[0], title: "Modified" };

    jest.spyOn(Services, "updateCourseService").mockResolvedValue({
      result: courseData,
    });

    await store.dispatch(updateCourseThunk(courseData));
    const actions = store.getActions();

    expect(actions).toMatchSnapshot();
  });

  it("should updateCourseThunk not dispatches updateCourse without response id", async () => {
    const courseData = {
      ...mockedState.courses[0],
      title: "Modified",
      id: undefined,
    };

    jest.spyOn(Services, "updateCourseService").mockResolvedValue({
      result: courseData,
    });

    await store.dispatch(updateCourseThunk(courseData));
    const actions = store.getActions();

    expect(actions).toMatchInlineSnapshot(`Array []`);
  });

  it("should deleteCourseThunk dispatches deleteCourse", async () => {
    jest.spyOn(Services, "deleteCourseService").mockResolvedValue({
      result: "OK",
    });

    await store.dispatch(deleteCourseThunk("mockId"));
    const actions = store.getActions();

    expect(actions).toMatchSnapshot();
  });

  it("should deleteCourseThunk not dispatches deleteCourse without result", async () => {
    jest.spyOn(Services, "deleteCourseService").mockResolvedValue({
      result: undefined,
    });

    await store.dispatch(deleteCourseThunk("mockId"));
    const actions = store.getActions();

    expect(actions).toMatchInlineSnapshot(`Array []`);
  });

  it("should getCoursesThunk dispatches setCourses", async () => {
    jest
      .spyOn(Services, "getCourses")
      .mockResolvedValue({ result: mockedState.courses });

    await store.dispatch(getCoursesThunk());
    const actions = store.getActions();

    expect(actions).toMatchSnapshot();
  });
});
