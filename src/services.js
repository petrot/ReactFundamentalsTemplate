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

export const getCurrentUser = async () => {
  // write your code here
};

export const updateCourseService = async () => {
  // write your code here
};

export const logout = async () => {
  // write your code here
};

export const deleteCourseService = async () => {
  // write your code here
};

export const createCourse = async () => {
  // write your code here
};

export const createAuthor = async () => {
  // write your code here
};
