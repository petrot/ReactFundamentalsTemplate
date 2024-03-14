import configureStore from "redux-mock-store";
import thunk from "redux-thunk";

import * as Services from "../../../services";
import { mockedState } from "../../../test-helpers";
import { initialUserState } from "../../slices/userSlice";
import { getUserThunk, logoutThunk } from "../userThunk";

const middlewares = [thunk];
const mockStoreCreator = configureStore(middlewares);

describe("[userThunk]", () => {
  let store;

  beforeEach(() => {
    store = mockStoreCreator();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("should getUserThunk dispatches setUserData", async () => {
    jest.spyOn(Services, "getCurrentUser").mockResolvedValue({
      result: mockedState.user,
    });

    await store.dispatch(getUserThunk());
    const actions = store.getActions();

    expect(actions).toMatchSnapshot();
  });

  it("should logoutThunk dispatches removeUserData", async () => {
    jest
      .spyOn(Services, "logout")
      .mockResolvedValue({ result: initialUserState });

    await store.dispatch(logoutThunk());
    const actions = store.getActions();

    expect(actions).toMatchSnapshot();
  });
});
