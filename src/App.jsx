import { useEffect, useRef, useState } from "react";

import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import styles from "./App.module.css";
import {
  CourseForm,
  CourseInfo,
  Courses,
  Header,
  Login,
  Registration,
} from "./components";
import { mockedAuthorsList, mockedCoursesList } from "./constants";

// Module 1:
// * use mockedAuthorsList and mockedCoursesList mocked data
// * add next components to the App component: Header, Courses and CourseInfo
// * pass 'mockedAuthorsList' and 'mockedCoursesList' to the Courses and CourseInfo components

// Module 2:
// * use mockedAuthorsList and mockedCoursesList mocked data
// * wrap your App with BrowserRouter in src/index.js
// ** TASK DESCRIPTION ** - https://d17btkcdsmqrmh.cloudfront.net/new-react-fundamentals/docs/module-2/home-task/components#add-the-router-to-the-app-component

// Module 3:
// * wrap your App with Redux Provider in src/index.js
// * remove 'mockedAuthorsList' and 'mockedCoursesList' constants amd import and their use throughout the project
// * get courses and authors from the server. Use courses/all and authors/all GET requests.
// * save courses and authors to the store. Use 'setCourses' and 'setAuthors' actions from appropriate slices here 'src/store/slices'
// ** TASK DESCRIPTION ** - https://d17btkcdsmqrmh.cloudfront.net/new-react-fundamentals/docs/module-3/home-task/components#app-component

// Module 4:
// * rewrite old GET requests /courses/all with 'getCoursesThunk' from 'src/store/thunks/coursesThunk.js' using getCourses service from 'src/services.js'.
// * rewrite old GET requests /authors/all with 'getAuthorsThunk' from 'src/store/thunks/authorsThunk.js' using getAuthors service from 'src/services.js'.
// * wrap 'CourseForm' in the 'PrivateRoute' component

function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const isCalledRef = useRef(false);

  const [coursesList, setCoursesList] = useState(mockedCoursesList);
  const [authorsList, setAuthorsList] = useState(mockedAuthorsList);

  const createAuthor = (author) => {
    setAuthorsList([...authorsList, author]);
  };

  useEffect(() => {
    if (!isCalledRef.current) {
      isCalledRef.current = true;
      const token = localStorage.getItem("token");

      if (token && location.pathname === "/") {
        navigate("/courses", { replace: true });
      }
      /* else if (!token && location.pathname !== "/registration") {
        navigate("/login", { replace: true });
      }*/
    }
  }, [navigate, location]);

  return (
    <div className={styles.wrapper}>
      <Header />

      <div className={styles.container}>
        <Routes>
          <Route
            path="courses"
            element={
              <Courses
                coursesList={coursesList || []}
                authorsList={authorsList || []}
              />
            }
          ></Route>
          <Route
            path="courses/add"
            element={
              <CourseForm
                authorsList={authorsList || []}
                createCourse={() => {
                  console.log("CREATE COURSE CALLED");
                }}
                createAuthor={createAuthor}
              />
            }
          />
          <Route
            path="courses/:courseId"
            element={
              <CourseInfo
                coursesList={coursesList || []}
                authorsList={authorsList || []}
              />
            }
          />
          <Route path="login" element={<Login />} />
          <Route path="registration" element={<Registration />} />
          <Route path="*" element={<Login />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
