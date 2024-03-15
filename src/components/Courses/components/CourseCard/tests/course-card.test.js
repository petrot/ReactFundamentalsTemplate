import { render, screen } from "@testing-library/react";

import { BUTTON_CAPTIONS } from "../../../../../constants";
import { formatCreationDate, getCourseDuration } from "../../../../../helpers";
import {
  mockedState,
  mockSetItem,
  prepareMockLocalStorage,
  TestWrapper,
} from "../../../../../test-helpers";
import { CourseCard } from "../CourseCard";

const course = mockedState.courses[0];
const authors = course?.authors?.map((authorId) =>
  mockedState.authors.find((author) => author?.id === authorId)
);

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

  it("should render courseCard component", async () => {
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

    // Read token
    // expect(mockGetItem).toHaveBeenCalledTimes(1);

    // Logout button is not visible
    const button = await screen.queryByText(BUTTON_CAPTIONS.showCourse);
    expect(button).toBeInTheDocument();
  });

  /*
  it("should have logout button when token is exists", async () => {

    // Mock the token value
    useSelector

    render(<CourseCard course={course} authorsList={authors} />, {
        wrapper: TestWrapper,
      });

    // Read token
    expect(mockGetItem).toHaveBeenCalledTimes(1);

    // Logout button is visible
    const button = await screen.findByText(BUTTON_CAPTIONS.logout);
    expect(button).toBeInTheDocument();

  });
  */
});
