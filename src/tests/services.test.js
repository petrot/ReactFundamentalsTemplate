import {
  createAuthor,
  createCourse,
  createUser,
  deleteCourseService,
  getAuthors,
  getCourses,
  getCurrentUser,
  login,
  logout,
  updateCourseService,
} from "../services";
import { mockedState } from "../test-helpers";

const token = "mockToken";

describe("[Services]", () => {
  it("createUser function fetches the register endpoint correctly", async () => {
    const data = { name: "John Doe" };

    global.fetch = jest.fn(() =>
      Promise.resolve({ json: () => Promise.resolve({ response: data }) })
    );

    const response = await createUser(data);

    expect(fetch).toHaveBeenCalledWith("http://localhost:4000/register", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });

    expect(response).toMatchSnapshot();
  });

  it("login function fetches the login endpoint correctly", async () => {
    const data = { email: "john@doe.com", password: "asdfg" };

    global.fetch = jest.fn(() =>
      Promise.resolve({ json: () => Promise.resolve({ response: data }) })
    );

    const response = await login(data);

    expect(fetch).toHaveBeenCalledWith("http://localhost:4000/login", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });

    expect(response).toMatchSnapshot();
  });

  it("getCourses function fetches the courses/all endpoint correctly", async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({ response: mockedState.courses }),
      })
    );

    const response = await getCourses();

    expect(fetch).toHaveBeenCalledWith("http://localhost:4000/courses/all", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    expect(response).toMatchSnapshot();
  });

  it("getAuthors function fetches the authors/all endpoint correctly", async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({ response: mockedState.authors }),
      })
    );

    const response = await getAuthors();

    expect(fetch).toHaveBeenCalledWith("http://localhost:4000/authors/all", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    expect(response).toMatchSnapshot();
  });

  it("getCurrentUser function fetches the users/me endpoint correctly", async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () =>
          Promise.resolve({ response: { name: "John Doe", role: "admin" } }),
      })
    );

    const response = await getCurrentUser(token);

    expect(fetch).toHaveBeenCalledWith("http://localhost:4000/users/me", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    });

    expect(response).toMatchSnapshot();
  });

  it("updateCourseService function fetches the courses endpoint correctly", async () => {
    const data = { ...mockedState.courses[0], title: "New Title" };
    const { id, ...dataWithoutId } = data;

    global.fetch = jest.fn(() =>
      Promise.resolve({ json: () => Promise.resolve({ response: data }) })
    );

    const response = await updateCourseService(data, token);

    expect(fetch).toHaveBeenCalledWith("http://localhost:4000/courses/" + id, {
      method: "PUT",
      body: JSON.stringify(dataWithoutId),
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    });

    expect(response).toMatchSnapshot();
  });

  it("logout function fetches the logout endpoint correctly", async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({ json: () => Promise.resolve({ response: "OK" }) })
    );

    const response = await logout(token);

    expect(fetch).toHaveBeenCalledWith("http://localhost:4000/logout", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    });

    expect(response).toMatchSnapshot();
  });

  it("deleteCourseService function fetches the courses endpoint correctly", async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({ json: () => Promise.resolve({ response: "OK" }) })
    );

    const response = await deleteCourseService(
      mockedState.courses[0].id,
      token
    );

    expect(fetch).toHaveBeenCalledWith(
      "http://localhost:4000/courses/" + mockedState.courses[0].id,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      }
    );

    expect(response).toMatchSnapshot();
  });

  it("createCourse function fetches the courses/add endpoint correctly", async () => {
    const { id, ...data } = mockedState.courses[0];

    global.fetch = jest.fn(() =>
      Promise.resolve({ json: () => Promise.resolve({ response: data }) })
    );

    const response = await createCourse(data, token);

    expect(fetch).toHaveBeenCalledWith("http://localhost:4000/courses/add", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    });

    expect(response).toMatchSnapshot();
  });

  it("createCourse function fetches the authors/add endpoint correctly", async () => {
    const { id, ...data } = mockedState.authors[0];

    global.fetch = jest.fn(() =>
      Promise.resolve({ json: () => Promise.resolve({ response: data }) })
    );

    const response = await createAuthor(data, token);

    expect(fetch).toHaveBeenCalledWith("http://localhost:4000/authors/add", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    });

    expect(response).toMatchSnapshot();
  });
});
