import { createAuthor, getAuthors } from "../../services";

export const createAuthorThunk = (data, token) => {
  return async (dispatch) => {
    const author = await createAuthor(data, token);

    if (author?.result?.id) {
      dispatch({
        type: "authors/saveAuthor",
        payload: author.result,
      });
    }
  };
};

export const getAuthorsThunk = () => {
  return async (dispatch) => {
    const authors = await getAuthors();

    dispatch({
      type: "authors/setAuthors",
      payload: authors.result,
    });
  };
};
