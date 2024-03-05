import ReactDOM from "react-dom/client";

import App from "./App";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import {
  CourseForm,
  CourseInfo,
  Courses,
  Login,
  Registration,
} from "./components";
import "./index.css";
import { mockedAuthorsList, mockedCoursesList } from "./constants";

const root = ReactDOM.createRoot(document.getElementById("root"));

const coursesList = mockedCoursesList;
const authorsList = mockedAuthorsList;

root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route path="courses" element={<Courses />}></Route>
        <Route path="courses/add" element={<CourseForm />} />
        <Route
          path="courses/:courseId"
          element={
            <CourseInfo coursesList={coursesList} authorsList={authorsList} />
          }
        />
        <Route path="login" element={<Login />} />
        <Route path="registration" element={<Registration />} />
      </Route>
    </Routes>
  </BrowserRouter>
);
