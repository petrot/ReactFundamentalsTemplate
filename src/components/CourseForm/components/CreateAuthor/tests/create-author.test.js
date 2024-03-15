import { fireEvent, render, screen } from "@testing-library/react";

import {
  TestWrapper,
  mockGetItem,
  mockSetItem,
  prepareMockLocalStorage,
} from "../../../../../test-helpers";
import { CreateAuthor } from "../CreateAuthor";

describe("CreateAuthor", () => {
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

  it("should have author input", async () => {
    render(<CreateAuthor />, { wrapper: TestWrapper });

    const input = await screen.findByTestId("createAuthorInput");

    expect(input).toBeInTheDocument();
  });

  it("should have create author button", async () => {
    render(<CreateAuthor />, { wrapper: TestWrapper });

    const button = await screen.findByTestId("createAuthorButton");

    expect(button).toBeInTheDocument();
  });

  it("should have create author button", async () => {
    render(<CreateAuthor />, { wrapper: TestWrapper });

    const button = await screen.findByTestId("createAuthorButton");
    fireEvent.click(button);

    expect(mockGetItem).toHaveBeenCalledTimes(1);
  });
});
