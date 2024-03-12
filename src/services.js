export const createUser = async (data) => {
  const response = await fetch("http://localhost:4000/register", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });

  return await response?.json();
};

export const login = async (data) => {
  const response = await fetch("http://localhost:4000/login", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });

  return await response?.json();
};

export const getCourses = async () => {
  const response = await fetch("http://localhost:4000/courses/all", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  return await response?.json();
};

export const getAuthors = async () => {
  const response = await fetch("http://localhost:4000/authors/all", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  return await response?.json();
};

export const getCurrentUser = async (token) => {
  const response = await fetch("http://localhost:4000/users/me", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
  });

  return await response?.json();
};

export const updateCourseService = async (data, token) => {
  const response = await fetch("http://localhost:4000/courses/" + data?.id, {
    method: "PUT",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
  });

  return await response?.json();
};

export const logout = async (token) => {
  const response = await fetch("http://localhost:4000/logout", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
  });

  return await response;
};

export const deleteCourseService = async (courseId, token) => {
  const response = await fetch("http://localhost:4000/courses/" + courseId, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
  });

  return await response?.json();
};

export const createCourse = async (data, token) => {
  const response = await fetch("http://localhost:4000/courses/add", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
  });

  return await response?.json();
};

export const createAuthor = async (data, token) => {
  const response = await fetch("http://localhost:4000/authors/add", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
  });

  return await response?.json();
};
