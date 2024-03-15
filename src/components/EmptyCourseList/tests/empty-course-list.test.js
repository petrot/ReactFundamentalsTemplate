import { BUTTON_CAPTIONS } from "../../../constants";
import {
  TestWrapper,
  mockSetItem,
  prepareMockLocalStorage,
} from "../../../test-helpers";
import { EmptyCourseList } from "../EmptyCourseList";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import configureStore from "redux-mock-store";

const mockStoreCreator = configureStore();

const mockedUsedNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedUsedNavigate,
}));

describe("EmptyCourseList", () => {
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

  it("should render info message if user has admin role", async () => {
    const initialState = { user: { role: "admin" } };
    const store = mockStoreCreator(initialState);

    render(<TestWrapper children={<EmptyCourseList />} store={store} />);

    const message = await screen.queryByText(
      'Please use "Add New Course" button to add your first course'
    );
    expect(message).toBeInTheDocument();
  });

  it("should render info message if user does not have admin role", async () => {
    const initialState = { user: { role: "" } };
    const store = mockStoreCreator(initialState);

    render(<TestWrapper children={<EmptyCourseList />} store={store} />);

    const message = await screen.queryByText(
      "You don't have permissions to create a course. Please log in as ADMIN"
    );
    expect(message).toBeInTheDocument();
  });

  it("should add new course with button click", async () => {
    const initialState = { user: { role: "admin" } };
    const store = mockStoreCreator(initialState);

    render(<TestWrapper children={<EmptyCourseList />} store={store} />);

    const button = await screen.findByText(BUTTON_CAPTIONS.addNewCourse);
    fireEvent.click(button);

    await waitFor(() => {
      expect(mockedUsedNavigate).toHaveBeenCalledWith("/courses/add", {
        replace: true,
      });
    });
  });
});
