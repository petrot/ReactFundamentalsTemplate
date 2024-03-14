import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import { createAuthorThunk, getAuthorsThunk } from "../authorsThunk";

import * as Services from "../../../services";
import { mockedState } from "../../../test-helpers";

const middlewares = [thunk];
const mockStoreCreator = configureStore(middlewares);

describe("[authorsThunk]", () => {
  let store;

  beforeEach(() => {
    store = mockStoreCreator();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("should createAuthorThunk dispatches saveAuthor", async () => {
    jest.spyOn(Services, "createAuthor").mockResolvedValue({
      result: { name: "author5", id: "mockId5" },
    });

    await store.dispatch(createAuthorThunk({ name: "authorName" }));
    const actions = store.getActions();

    expect(actions).toMatchSnapshot();
  });

  it("should getAuthorsThunk dispatches setAuthors", async () => {
    jest
      .spyOn(Services, "getAuthors")
      .mockResolvedValue({ result: mockedState.authors });

    await store.dispatch(getAuthorsThunk());
    const actions = store.getActions();

    expect(actions).toMatchSnapshot();
  });
});
