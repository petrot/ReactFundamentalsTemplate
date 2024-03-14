import { render, screen } from "@testing-library/react";

import { Logo } from "../Logo";
import {
  mockSetItem,
  prepareMockLocalStorage,
} from "../../../../../test-helpers";
import { TestWrapper } from "../../../../../test-helpers/test-wrapper.mock";

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
    render(<Logo />, { wrapper: TestWrapper });

    const logo = await screen.findByAltText("logo");

    expect(logo).toBeInTheDocument();
  });
});
