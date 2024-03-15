import { fireEvent, render, screen } from "@testing-library/react";

import { Registration } from "../Registration";
import {
  mockSetItem,
  prepareMockLocalStorage,
  TestWrapper,
} from "../../../test-helpers";
import { BUTTON_CAPTIONS } from "../../../constants";
import * as Services from "../../../services";

describe("Registration", () => {
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

  it("should have Name input", async () => {
    render(<Registration />, { wrapper: TestWrapper });

    const input = await screen.findByLabelText("Name");

    expect(input).toBeInTheDocument();
  });

  it("should have Email input", async () => {
    render(<Registration />, { wrapper: TestWrapper });

    const input = await screen.findByLabelText("Email");

    expect(input).toBeInTheDocument();
  });

  it("should have Password input", async () => {
    render(<Registration />, { wrapper: TestWrapper });

    const input = await screen.findByLabelText("Password");

    expect(input).toBeInTheDocument();
  });

  it("should have Submit button", async () => {
    render(<Registration />, { wrapper: TestWrapper });

    const button = await screen.findByText(BUTTON_CAPTIONS.register);

    expect(button).toBeInTheDocument();
  });

  it("should submit form with valid values", async () => {
    const mockCreateUserService = jest
      .spyOn(Services, "createUser")
      .mockReturnValueOnce({ successful: true });

    // const navigateMock = jest.fn();
    // useNavigateMock.mockReturnValue(navigateMock);

    render(<Registration />, { wrapper: TestWrapper });

    const nameInput = await screen.findByLabelText("Name");
    const emailInput = await screen.findByLabelText("Email");
    const passwordInput = await screen.findByLabelText("Password");
    const button = await screen.findByText(BUTTON_CAPTIONS.register);

    fireEvent.change(nameInput, { target: { value: "New Name" } });
    fireEvent.change(emailInput, { target: { value: "New Email" } });
    fireEvent.change(passwordInput, { target: { value: "New Password" } });
    fireEvent.click(button);

    expect(mockCreateUserService).toHaveBeenCalledWith({
      email: "New Email",
      name: "New Name",
      password: "New Password",
    });
  });

  it("should not submit form with missing Name values", async () => {
    const mockCreateUserService = jest
      .spyOn(Services, "createUser")
      .mockReturnValueOnce({ successful: true });

    render(<Registration />, { wrapper: TestWrapper });

    const emailInput = await screen.findByLabelText("Email");
    const passwordInput = await screen.findByLabelText("Password");
    const button = await screen.findByText(BUTTON_CAPTIONS.register);

    fireEvent.change(emailInput, { target: { value: "New Email" } });
    fireEvent.change(passwordInput, { target: { value: "New Password" } });
    fireEvent.click(button);

    expect(mockCreateUserService).not.toHaveBeenCalled();
  });

  it("should not submit form with missing Email values", async () => {
    const mockCreateUserService = jest
      .spyOn(Services, "createUser")
      .mockReturnValueOnce({ successful: true });

    render(<Registration />, { wrapper: TestWrapper });

    const nameInput = await screen.findByLabelText("Name");
    const passwordInput = await screen.findByLabelText("Password");
    const button = await screen.findByText(BUTTON_CAPTIONS.register);

    fireEvent.change(nameInput, { target: { value: "New Name" } });
    fireEvent.change(passwordInput, { target: { value: "New Password" } });
    fireEvent.click(button);

    expect(mockCreateUserService).not.toHaveBeenCalled();
  });

  it("should not submit form with missing Password values", async () => {
    const mockCreateUserService = jest
      .spyOn(Services, "createUser")
      .mockReturnValueOnce({ successful: true });

    render(<Registration />, { wrapper: TestWrapper });

    const nameInput = await screen.findByLabelText("Name");
    const emailInput = await screen.findByLabelText("Email");
    const button = await screen.findByText(BUTTON_CAPTIONS.register);

    fireEvent.change(nameInput, { target: { value: "New Name" } });
    fireEvent.change(emailInput, { target: { value: "New Email" } });
    fireEvent.click(button);

    expect(mockCreateUserService).not.toHaveBeenCalled();
  });
});
