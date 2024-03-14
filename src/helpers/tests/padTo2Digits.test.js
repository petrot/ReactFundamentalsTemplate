import { padTo2Digits } from "../padTo2Digits";

describe("padTo2Digits", () => {
  it("should pad number to 2 digits", async () => {
    const test1 = padTo2Digits("1");
    const test2 = padTo2Digits("10");

    expect(test1).toBe("01");
    expect(test2).toBe("10");
  });
});
