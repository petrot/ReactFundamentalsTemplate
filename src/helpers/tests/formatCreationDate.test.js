import { formatCreationDate } from "../formatCreationDate";

describe("formatCreationDate", () => {
  it("should format date", async () => {
    const test1 = formatCreationDate("2023/12/24");
    const test2 = formatCreationDate("2023/01/01");

    expect(test1).toBe("2023.12.24");
    expect(test2).toBe("2023.01.01");
  });
});
