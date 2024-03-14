import { mockedState } from "../../test-helpers";
import {
  getAuthorsSelector,
  getCoursesSelector,
  getUserNameSelector,
  getUserRoleSelector,
  getUserTokenSelector,
} from "../selectors";

describe("Selectors", () => {
  it("should get courses", async () => {
    const courses = getCoursesSelector(mockedState);

    expect(courses).toMatchSnapshot();
  });

  it("should get authors", async () => {
    const authors = getAuthorsSelector(mockedState);

    expect(authors).toMatchSnapshot();
  });

  it("should get user name", async () => {
    const userName = getUserNameSelector(mockedState);

    expect(userName).toMatchInlineSnapshot(`"Test Name"`);
  });

  it("should get user role", async () => {
    const userRole = getUserRoleSelector(mockedState);

    expect(userRole).toMatchInlineSnapshot(`"admin"`);
  });

  it("should get user token", async () => {
    const userToken = getUserTokenSelector(mockedState);

    expect(userToken).toMatchInlineSnapshot(`"mock-token"`);
  });
});
