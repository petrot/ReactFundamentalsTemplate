import { fireEvent, render, screen } from "@testing-library/react";
import { Header } from "../Header";

import { BUTTON_CAPTIONS } from "../../../constants";
import {
  TEST_NAME,
  TestWrapper,
  mockGetItem,
  mockRemoveItem,
  mockSetItem,
  prepareMockLocalStorage,
} from "../../../test-helpers";

describe("Header", () => {
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

  it("should have a logo", async () => {
    render(<Header />, { wrapper: TestWrapper });

    const logo = await screen.findByAltText("logo");

    expect(logo).toBeInTheDocument();
  });

  it("should have logged user name", async () => {
    render(<Header />, { wrapper: TestWrapper });

    const userName = await screen.findByText(TEST_NAME);

    expect(userName).toBeInTheDocument();
  });

  it("should have logout button when token is exists", async () => {
    // Mock the token value
    mockGetItem.mockReturnValueOnce("someToken");

    render(<Header />, { wrapper: TestWrapper });

    // Read token
    expect(mockGetItem).toHaveBeenCalledTimes(1);

    // Logout button is visible
    const button = await screen.findByText(BUTTON_CAPTIONS.logout);
    expect(button).toBeInTheDocument();
  });

  it("should not have logout button when token is not exists", async () => {
    render(<Header />, { wrapper: TestWrapper });

    // Read token
    expect(mockGetItem).toHaveBeenCalledTimes(1);

    // Logout button is not visible
    const button = await screen.queryByText(BUTTON_CAPTIONS.logout);
    expect(button).not.toBeInTheDocument();
  });

  it("should logout button calls onLogoutClick and clear localStorage", async () => {
    // Mock the token value
    mockGetItem.mockReturnValueOnce("someToken");

    render(<Header />, { wrapper: TestWrapper });

    // Logout button click
    const button = await screen.findByText(BUTTON_CAPTIONS.logout);
    fireEvent.click(button);

    // Remove token and user
    expect(mockRemoveItem).toHaveBeenCalledTimes(2);
  });
});
