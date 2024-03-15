import { fireEvent, render, screen } from "@testing-library/react";

import { BUTTON_CAPTIONS } from "../../../../../constants";
import { formatCreationDate, getCourseDuration } from "../../../../../helpers";
import {
  mockedState,
  mockGetItem,
  mockSetItem,
  prepareMockLocalStorage,
  TestWrapper,
} from "../../../../../test-helpers";
import { CourseCard } from "../CourseCard";
import configureStore from "redux-mock-store";
import * as CoursesThunks from "../../../../../store/thunks/coursesThunk";

const course = mockedState.courses[0];
const authors = course?.authors?.map((authorId) =>
  mockedState.authors.find((author) => author?.id === authorId)
);

const mockStoreCreator = configureStore();

describe("CourseCard", () => {
  beforeAll(() => {
    prepareMockLocalStorage();
  });

  beforeEach(() => {
    mockSetItem.mockClear();
    mockSetItem.mockClear();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("should render CourseCard component", async () => {
    render(<CourseCard course={course} authorsList={authors} />, {
      wrapper: TestWrapper,
    });

    const card = await screen.findByTestId("courseCard");

    expect(card).toBeInTheDocument();
  });

  it("should render course title", async () => {
    render(<CourseCard course={course} authorsList={authors} />, {
      wrapper: TestWrapper,
    });

    const title = await screen.findByText(course.title);

    expect(title).toBeInTheDocument();
  });

  it("should render course description", async () => {
    render(<CourseCard course={course} authorsList={authors} />, {
      wrapper: TestWrapper,
    });

    const description = await screen.findByText(course.description);

    expect(description).toBeInTheDocument();
  });

  it("should render course duration", async () => {
    const formattedDuration = getCourseDuration(course.duration);

    render(<CourseCard course={course} authorsList={authors} />, {
      wrapper: TestWrapper,
    });

    const durationText = await screen.findByText(formattedDuration);

    expect(durationText).toBeInTheDocument();
  });

  it("should render course creation date", async () => {
    const formattedCreationDate = formatCreationDate(course.creationDate);

    render(<CourseCard course={course} authorsList={authors} />, {
      wrapper: TestWrapper,
    });

    const creationDateText = await screen.findByText(formattedCreationDate);

    expect(creationDateText).toBeInTheDocument();
  });

  it("should render course authors", async () => {
    const formattedAuthors = authors.map((author) => author?.name).join(", ");

    render(<CourseCard course={course} authorsList={authors} />, {
      wrapper: TestWrapper,
    });

    const authorsText = await screen.findByText(formattedAuthors);

    expect(authorsText).toBeInTheDocument();
  });

  it("should have SHOW COURSE button", async () => {
    render(<CourseCard course={course} authorsList={authors} />, {
      wrapper: TestWrapper,
    });

    // Logout button is not visible
    const button = await screen.queryByText(BUTTON_CAPTIONS.showCourse);
    expect(button).toBeInTheDocument();
  });

  it("should have delete button when the user has admin role", async () => {
    const initialState = { user: { role: "admin" } };
    const store = mockStoreCreator(initialState);

    render(
      <TestWrapper
        children={<CourseCard course={course} authorsList={authors} />}
        store={store}
      />
    );

    const deleteButton = await screen.findByTestId("deleteCourse");
    expect(deleteButton).toBeInTheDocument();
  });

  it("should delete button calls deleteCourseThunk", async () => {
    const initialState = { user: { role: "admin" } };
    const store = mockStoreCreator(initialState);

    const mockDeleteCourseThunk = jest
      .spyOn(CoursesThunks, "deleteCourseThunk")
      .mockReturnValueOnce({ successful: true, type: "courses/deleteCourse" });

    render(
      <TestWrapper
        children={<CourseCard course={course} authorsList={authors} />}
        store={store}
      />
    );

    const deleteButton = await screen.findByTestId("deleteCourse");
    fireEvent.click(deleteButton);

    // Read token
    expect(mockGetItem).toHaveBeenCalledTimes(1);

    // Call with course id and unknown token
    expect(mockDeleteCourseThunk).toHaveBeenCalledWith(course.id, undefined);
  });

  it("should have update button when the user has admin role", async () => {
    const initialState = { user: { role: "admin" } };
    const store = mockStoreCreator(initialState);

    render(
      <TestWrapper
        children={<CourseCard course={course} authorsList={authors} />}
        store={store}
      />
    );

    const updateButton = await screen.findByTestId("updateCourse");
    expect(updateButton).toBeInTheDocument();
  });

  it("should not have delete button when the user has admin role", async () => {
    const initialState = { user: { role: "" } };
    const store = mockStoreCreator(initialState);

    render(
      <TestWrapper
        children={<CourseCard course={course} authorsList={authors} />}
        store={store}
      />
    );

    const deleteButton = await screen.queryByTestId("deleteCourse");
    expect(deleteButton).not.toBeInTheDocument();
  });

  it("should not have update button when the user has admin role", async () => {
    const initialState = { user: { role: "" } };
    const store = mockStoreCreator(initialState);

    render(
      <TestWrapper
        children={<CourseCard course={course} authorsList={authors} />}
        store={store}
      />
    );

    const updateButton = await screen.queryByTestId("updateCourse");
    expect(updateButton).not.toBeInTheDocument();
  });
});
