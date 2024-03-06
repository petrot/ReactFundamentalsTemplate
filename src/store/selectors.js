// Module 3:
// * create selectors

export const getCoursesSelector = (state) => state.courses;
export const getAuthorsSelector = (state) => state.authors;
export const getUserSelector = (state) => state.user;
export const getUserNameSelector = (state) => state.user?.name;
export const getUserRoleSelector = (state) => null;
export const getUserTokenSelector = (state) => null;
