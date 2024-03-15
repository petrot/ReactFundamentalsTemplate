import { render, screen } from "@testing-library/react";
import { BUTTON_CAPTIONS } from "../../../constants";
import {
  TestWrapper,
  mockSetItem,
  prepareMockLocalStorage,
} from "../../../test-helpers";
import { Courses } from "../Courses";

const mockedUsedNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedUsedNavigate,
}));

describe("Courses", () => {
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

  it("should have Search input", async () => {
    render(<Courses />, { wrapper: TestWrapper });

    const input = await screen.findByPlaceholderText("Input text");

    expect(input).toBeInTheDocument();
  });

  it("should have Search button", async () => {
    render(<Courses />, { wrapper: TestWrapper });

    const input = await screen.findByText(BUTTON_CAPTIONS.search);

    expect(input).toBeInTheDocument();
  });

  it("should render course cards", async () => {
    render(<Courses />, { wrapper: TestWrapper });

    const cards = await screen.queryAllByTestId("courseCard");

    expect(cards).toHaveLength(1);
  });
});
