import { fireEvent, render, screen } from "@testing-library/react";

import {
  TestWrapper,
  mockGetItem,
  mockSetItem,
  prepareMockLocalStorage,
} from "../../../test-helpers";
import { CourseForm } from "../CourseForm";

describe("CourseForm", () => {
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

  it("should have Title input", async () => {
    render(<CourseForm />, { wrapper: TestWrapper });

    const input = await screen.findByTestId("titleInput");

    expect(input).toBeInTheDocument();
  });

  it("should have Description input", async () => {
    render(<CourseForm />, { wrapper: TestWrapper });

    const input = await screen.findByTestId("descriptionTextArea");

    expect(input).toBeInTheDocument();
  });

  it("should have Duration input", async () => {
    render(<CourseForm />, { wrapper: TestWrapper });

    const input = await screen.findByTestId("durationInput");

    expect(input).toBeInTheDocument();
  });

  it("should have Create course button", async () => {
    render(<CourseForm />, { wrapper: TestWrapper });

    const button = await screen.findByTestId("createCourseButton");

    expect(button).toBeInTheDocument();
  });

  it("should Create course button click not calls handleSubmit on empty imputs", async () => {
    render(<CourseForm />, { wrapper: TestWrapper });

    const button = await screen.findByTestId("createCourseButton");
    fireEvent.click(button);

    expect(mockGetItem).toHaveBeenCalledTimes(0);
  });

  it("should Create course button click calls handleSubmit on filled imputs", async () => {
    render(<CourseForm />, { wrapper: TestWrapper });

    const titleInput = await screen.findByTestId("titleInput");
    const descriptionInput = await screen.findByTestId("descriptionTextArea");
    const durationInput = await screen.findByTestId("durationInput");
    const button = await screen.findByTestId("createCourseButton");

    fireEvent.change(titleInput, { target: { value: "New Title" } });
    fireEvent.change(descriptionInput, {
      target: { value: "New Description" },
    });
    fireEvent.change(durationInput, { target: { value: 100 } });
    fireEvent.click(button);

    // Read token
    expect(mockGetItem).toHaveBeenCalledTimes(1);
  });
});
