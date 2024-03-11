// export const getUserThunk = () => {};

import { getCurrentUser, logout } from "../../services";

export const getUserThunk = (token) => {
  return async (dispatch) => {
    const user = await getCurrentUser(token);

    dispatch({
      type: "user/setUserData",
      payload: user.result,
    });
  };
};

export const logoutThunk = (token) => {
  return async (dispatch) => {
    const user = await logout(token);

    dispatch({
      type: "user/removeUserData",
      payload: user.result,
    });
  };
};
