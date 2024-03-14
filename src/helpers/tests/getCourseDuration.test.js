import { getCourseDuration } from "../getCourseDuration";

describe("getCourseDuration", () => {
  it("should calculate course duration", async () => {
    const test1 = getCourseDuration("1");
    const test2 = getCourseDuration("10");
    const test3 = getCourseDuration("100");
    const test4 = getCourseDuration("200");
    const test5 = getCourseDuration("1000");

    expect(test1).toBe("00:01 hour");
    expect(test2).toBe("00:10 hour");
    expect(test3).toBe("01:40 hour");
    expect(test4).toBe("03:20 hours");
    expect(test5).toBe("16:40 hours");
  });
});
