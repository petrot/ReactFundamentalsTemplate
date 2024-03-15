import { render, screen } from "@testing-library/react";

import { CourseInfo } from "../CourseInfo";
import {
  TestWrapper,
  mockSetItem,
  mockedState,
  prepareMockLocalStorage,
} from "../../../test-helpers";
import { formatCreationDate, getCourseDuration } from "../../../helpers";

const mockedUsedNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedUsedNavigate,
  useParams: () => ({
    courseId: mockedState.courses[0].id,
  }),
}));

const course = mockedState.courses[0];

describe("CourseInfo", () => {
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

  it("should render component", async () => {
    render(<CourseInfo />, { wrapper: TestWrapper });

    const container = await screen.findByTestId("courseInfo");

    expect(container).toBeInTheDocument();
  });

  it("should render course title", async () => {
    render(<CourseInfo />, {
      wrapper: TestWrapper,
    });

    const title = await screen.findByText(course.title);

    expect(title).toBeInTheDocument();
  });

  it("should render course id", async () => {
    render(<CourseInfo />, {
      wrapper: TestWrapper,
    });

    const id = await screen.findByText(course.id);

    expect(id).toBeInTheDocument();
  });

  it("should render course duration", async () => {
    const formattedDuration = getCourseDuration(course.duration);

    render(<CourseInfo />, {
      wrapper: TestWrapper,
    });

    const durationText = await screen.findByText(formattedDuration);

    expect(durationText).toBeInTheDocument();
  });

  it("should render course creation date", async () => {
    const formattedCreationDate = formatCreationDate(course.creationDate);

    render(<CourseInfo />, {
      wrapper: TestWrapper,
    });

    const creationDateText = await screen.findByText(formattedCreationDate);

    expect(creationDateText).toBeInTheDocument();
  });
});
