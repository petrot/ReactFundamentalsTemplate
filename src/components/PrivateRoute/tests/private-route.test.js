import { render, screen } from "@testing-library/react";
import configureStore from "redux-mock-store";
import {
  TestWrapper,
  mockSetItem,
  prepareMockLocalStorage,
} from "../../../test-helpers";
import { PrivateRoute } from "../PrivateRoute";

const mockStoreCreator = configureStore();

describe("PrivateRoute", () => {
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

  it("should embed private route", async () => {
    const initialState = { user: { role: "admin" } };
    const store = mockStoreCreator(initialState);

    render(
      <TestWrapper
        children={<PrivateRoute children={<div>Private content</div>} />}
        store={store}
      />
    );

    const privateContent = await screen.queryByText("Private content");

    expect(privateContent).toBeInTheDocument();
  });

  it("should not embed private route", async () => {
    const initialState = { user: { role: "" } };
    const store = mockStoreCreator(initialState);

    render(
      <TestWrapper
        children={<PrivateRoute children={<div>Private content</div>} />}
        store={store}
      />
    );

    const privateContent = await screen.queryByText("Private content");

    expect(privateContent).not.toBeInTheDocument();
  });
});
