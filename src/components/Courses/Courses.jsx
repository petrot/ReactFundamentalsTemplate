import { useState } from "react";

import styles from "./styles.module.css";
import { CourseCard } from "./components";
import { Button, Input } from "../../common";
import { BUTTON_CAPTIONS } from "../../constants";
import { EmptyCourseList } from "../EmptyCourseList";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { getAuthorsSelector, getCoursesSelector } from "../../store/selectors";

// Module 1:
// * render list of components using 'CourseCard' component for each course
// * render 'ADD NEW COURSE' button (reuse Button component)
// ** TASK DESCRIPTION ** - https://d17btkcdsmqrmh.cloudfront.net/new-react-fundamentals/docs/module-1/home-task/components#courses-component
// * render EmptyCourseList component when no courses
// ** TASK DESCRIPTION ** - https://d17btkcdsmqrmh.cloudfront.net/new-react-fundamentals/docs/module-1/home-task/components#emptycourselist-component

// Module 2:
// * render this component by route '/courses'
// * navigate to this component if 'localStorage' contains user's token
// * navigate to the route courses/add by clicking Add New Course button.
// ** TASK DESCRIPTION ** - https://d17btkcdsmqrmh.cloudfront.net/new-react-fundamentals/docs/module-2/home-task/components#courses

// Module 3:
// * stop using mocked courses and authors data
// * delete props 'coursesList' and 'authorsList'
// * use useSelector to get courses and authors from the store. Use selectors...
// ** TASK DESCRIPTION ** - https://d17btkcdsmqrmh.cloudfront.net/new-react-fundamentals/docs/module-3/home-task/components#courses-component

// Module 4:
// navigate to '/courses/add' route by clicking 'ADD NEW COURSE' button in the 'EmptyCourseList'.
// show message 'You don't have permissions to create a course. Please log in as ADMIN' by clicking ADD NEW COURSE button in the 'EmptyCourseList'.
// ** TASK DESCRIPTION ** - https://d17btkcdsmqrmh.cloudfront.net/new-react-fundamentals/docs/module-4/home-task/components#emptycourselist-component

// Module 5:
// * proposed cases for unit tests:
//   ** Courses should display amount of CourseCard equal length of courses array.
//   ** CourseForm should be shown after a click on the "Add new course" button.

export const Courses = () => {
  const navigate = useNavigate();

  const coursesList = useSelector(getCoursesSelector);
  const authorsList = useSelector(getAuthorsSelector);

  const getCourseItems = () => {
    return coursesList
      ?.filter((c) =>
        filter
          ? c.title?.toString().includes(filter) ||
            c.id?.toString().includes(filter)
          : true
      )
      .map((course, i) => {
        return (
          <CourseCard
            course={course}
            key={i}
            handleShowCourse={() =>
              navigate("/courses/" + course?.id, { replace: true })
            }
            data-testid="courseCard"
            authorsList={course?.authors?.map((authorId) =>
              authorsList?.find((author) => author?.id === authorId)
            )}
          ></CourseCard>
        );
      });
  };

  const [filter, setFilter] = useState("");

  const onSearchClick = () => {};

  return coursesList?.length > 0 ? (
    <>
      <div className={styles.toolbar}>
        <div className={styles.search}>
          <Input
            className={styles.filterInput}
            placeholderText="Input text"
            labelText=""
            onChange={({ target }) => setFilter(target?.value)}
          />
          <Button
            className={styles.filterButton}
            buttonText={BUTTON_CAPTIONS.search}
            handleClick={onSearchClick}
          />
        </div>
        <div className={styles.panel}>
          <Link className={styles.addNewCourse} to="/courses/add">
            <Button
              className={styles.addNewCourse}
              buttonText={BUTTON_CAPTIONS.addNewCourse}
            />
          </Link>
        </div>
      </div>
      {getCourseItems()}
      <Outlet />
    </>
  ) : (
    <EmptyCourseList data-testid="emptyContainer"></EmptyCourseList>
  );
};
