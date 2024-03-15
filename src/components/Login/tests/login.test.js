import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import * as Services from "../../../services";
import { BUTTON_CAPTIONS } from "../../../constants";
import {
  mockSetItem,
  prepareMockLocalStorage,
  TestWrapper,
} from "../../../test-helpers";
import { Login } from "../Login";

const mockedUsedNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedUsedNavigate,
}));

describe("Login", () => {
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

  it("should have Email input", async () => {
    render(<Login />, { wrapper: TestWrapper });

    const input = await screen.findByLabelText("Email");

    expect(input).toBeInTheDocument();
  });

  it("should have Password input", async () => {
    render(<Login />, { wrapper: TestWrapper });

    const input = await screen.findByLabelText("Password");

    expect(input).toBeInTheDocument();
  });

  it("should have Submit button", async () => {
    render(<Login />, { wrapper: TestWrapper });

    const button = await screen.findByText(BUTTON_CAPTIONS.login);

    expect(button).toBeInTheDocument();
  });

  it("should submit form with valid values and navigate to login", async () => {
    const mockLoginService = jest
      .spyOn(Services, "login")
      .mockReturnValueOnce({ successful: true });

    render(<Login />, { wrapper: TestWrapper });

    const emailInput = await screen.findByLabelText("Email");
    const passwordInput = await screen.findByLabelText("Password");
    const button = await screen.findByText(BUTTON_CAPTIONS.login);

    fireEvent.change(emailInput, { target: { value: "New Email" } });
    fireEvent.change(passwordInput, { target: { value: "New Password" } });
    fireEvent.click(button);

    await waitFor(() => {
      expect(mockLoginService).toHaveBeenCalledWith({
        email: "New Email",
        password: "New Password",
      });

      expect(mockedUsedNavigate).toHaveBeenCalledWith("/courses", {
        replace: true,
      });
    });
  });

  it("should submit form with valid values and not navigate to login on unsuccessful response", async () => {
    const mockLoginService = jest
      .spyOn(Services, "login")
      .mockReturnValueOnce({ successful: true });

    render(<Login />, { wrapper: TestWrapper });

    const emailInput = await screen.findByLabelText("Email");
    const passwordInput = await screen.findByLabelText("Password");
    const button = await screen.findByText(BUTTON_CAPTIONS.login);

    fireEvent.change(emailInput, { target: { value: "New Email" } });
    fireEvent.change(passwordInput, { target: { value: "New Password" } });
    fireEvent.click(button);

    await waitFor(() => {
      expect(mockLoginService).toHaveBeenCalledWith({
        email: "New Email",
        password: "New Password",
      });

      expect(mockedUsedNavigate).not.toHaveBeenCalled();
    });
  });

  it("should not submit form with missing Email values", async () => {
    const mockLoginService = jest
      .spyOn(Services, "login")
      .mockReturnValueOnce({ successful: true });

    render(<Login />, { wrapper: TestWrapper });

    const passwordInput = await screen.findByLabelText("Password");
    const button = await screen.findByText(BUTTON_CAPTIONS.login);

    fireEvent.change(passwordInput, { target: { value: "New Password" } });
    fireEvent.click(button);

    expect(mockLoginService).not.toHaveBeenCalled();
  });

  it("should not submit form with missing Password values", async () => {
    const mockLoginService = jest
      .spyOn(Services, "login")
      .mockReturnValueOnce({ successful: true });

    render(<Login />, { wrapper: TestWrapper });

    const emailInput = await screen.findByLabelText("Email");
    const button = await screen.findByText(BUTTON_CAPTIONS.login);

    fireEvent.change(emailInput, { target: { value: "New Email" } });
    fireEvent.click(button);

    expect(mockLoginService).not.toHaveBeenCalled();
  });
});
