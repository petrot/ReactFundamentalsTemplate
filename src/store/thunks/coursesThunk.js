import {
  createCourse,
  deleteCourse,
  getCourses,
  updateCourse,
} from "../../services";

export const updateCourseThunk = (data, token) => {
  return async (dispatch) => {
    const course = await updateCourse(data, token);

    if (course?.result?.id) {
      dispatch({
        type: "courses/updateCourse",
        payload: course?.result,
      });
    }
  };
};

export const deleteCourseThunk = (courseId, token) => {
  return async (dispatch) => {
    const course = await deleteCourse(courseId, token);

    if (course?.result) {
      dispatch({
        type: "courses/deleteCourse",
        payload: courseId,
      });
    }
  };
};

export const createCourseThunk = (data, token) => {
  return async (dispatch) => {
    const course = await createCourse(data, token);

    if (course?.result?.id) {
      dispatch({
        type: "courses/saveCourse",
        payload: course?.result,
      });
    }
  };
};

export const getCoursesThunk = () => {
  return async (dispatch) => {
    const courses = await getCourses();

    dispatch({
      type: "courses/setCourses",
      payload: courses?.result,
    });
  };
};
