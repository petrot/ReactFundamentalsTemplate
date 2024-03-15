import store from "../index";

describe("Store", () => {
  it("should have been initialized", async () => {
    expect(store).toMatchSnapshot();
  });
});
