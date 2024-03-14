import { mockedState } from "../../../test-helpers";
import reducer, {
  setUserData,
  removeUserData,
  initialUserState,
} from "../userSlice";

describe("authorsSlice", () => {
  it("should return the initial state", async () => {
    expect(reducer(undefined, {})).toEqual(initialUserState);
  });

  it("should handle a user being updated", async () => {
    const previousState = [];

    expect(
      reducer(previousState, setUserData(mockedState.user))
    ).toMatchSnapshot();
  });

  it("should handle a user being removed", async () => {
    const previousState = { ...mockedState.user };

    expect(reducer(previousState, removeUserData())).toMatchSnapshot();
  });
});
