// Module 1.
// * figma link: https://www.figma.com/file/m0N0SGLclqUEGR6TUNvyn9/Angular-Fundamentals?type=design&node-id=2905-67147&t=gTZjFcI0d4hheNiz-0
// * render this component inside 'Courses' component
// *this component should display single course info:
//   ** title;
//   ** description;
//   ** authors list. Authors' names should be displayed on the one line, add '...' if authors' names do not fit on one line.
//   ** duration (format: hh:mm + 'hours'). Create function 'src/helpers/getCourseDuration.js' for duration mapping;
//   ** creation date (format: dd.mm.yyyy). Create function 'src/helpers/formatCreationDate.js' for date formatting;
//   ** show course button. Render 'CourseInfo' component with course's data instead of 'Courses' component
// ** TASK DESCRIPTION ** - https://d17btkcdsmqrmh.cloudfront.net/new-react-fundamentals/docs/module-1/home-task/components#coursecard-component

// Module 3.
// * add two new buttons: update and delete'. Use icons from 'src/assets/...'.
// * remove course from the store by 'delete' button click
// * no functionality for 'update' button for now
// ** TASK DESCRIPTION ** - https://d17btkcdsmqrmh.cloudfront.net/new-react-fundamentals/docs/module-3/home-task/components#coursecard-component

// Module 4.
// * show 'delete' and 'update' buttons only for ADMIN user
// * make delete request by 'delete' button click
// * use 'deleteCourseService' from 'src/services.js' and 'deleteCourseThunk' thunk from 'src/store/thinks/coursesThunk.js'
// ** TASK DESCRIPTION ** - https://d17btkcdsmqrmh.cloudfront.net/new-react-fundamentals/docs/module-4/home-task/components#coursecard-component

// Module 5:
// * proposed cases for unit tests:
//   ** CourseCard should display title.
//   ** CourseCard should display description.
//   ** CourseCard should display duration in the correct format.
//   ** CourseCard should display authors list.
//   ** CourseCard should display created date in the correct format.

import { getCourseDuration, formatCreationDate } from "../../../../helpers";

import deleteIcon from "../../../../assets/deleteButtonIcon.svg";
import editIcon from "../../../../assets/editButtonIcon.svg";

import styles from "./styles.module.css";
import { Button } from "../../../../common";
import { useDispatch, useSelector } from "react-redux";
import { getUserRoleSelector } from "../../../../store/selectors";
import { Link } from "react-router-dom";
import { deleteCourseThunk } from "../../../../store/thunks/coursesThunk";

export const CourseCard = ({ course, handleShowCourse, authorsList }) => {
  const dispatch = useDispatch();

  const userRole = useSelector(getUserRoleSelector);

  const onDeleteButtonClick = () => {
    const token = localStorage.getItem("token");

    dispatch(deleteCourseThunk(course?.id, token));
  };

  return (
    <div className={styles.cardContainer} data-testid="courseCard">
      <div className={styles.cardText}>
        <h2>{course?.title}</h2>
        <p>{course?.description}</p>
      </div>
      <div className={styles.cardDetails}>
        <p>
          <b>Authors: </b>
          {authorsList?.map((author) => author?.name).join(", ")}
        </p>
        <p>
          <b>Duration:</b>
          <span>{getCourseDuration(course?.duration)}</span>
        </p>
        <p>
          <b>Created: </b>
          <span>{formatCreationDate(course?.creationDate)}</span>
        </p>
        <div className={styles.buttonsContainer}>
          <Button buttonText="SHOW COURSE" handleClick={handleShowCourse} />
          {userRole === "admin" ? (
            <>
              <Button
                data-testid="deleteCourse"
                buttonText={<img src={deleteIcon} alt="delete" />}
                handleClick={onDeleteButtonClick}
              />
              <Button
                data-testid="updateCourse"
                buttonText={
                  <Link
                    className={styles.addNewCourse}
                    to={"/courses/update/" + course?.id}
                  >
                    <img src={editIcon} alt="edit" />
                  </Link>
                }
              />
            </>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
};
