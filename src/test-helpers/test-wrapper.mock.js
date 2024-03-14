import { Provider } from "react-redux";
import { MemoryRouter as Router } from "react-router-dom";
import { mockedStore } from "./store.mock";

export const TestWrapper = ({ children, store = mockedStore }) => (
  <Provider store={store}>
    <Router>{children}</Router>
  </Provider>
);
