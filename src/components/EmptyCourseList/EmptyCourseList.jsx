import { useNavigate } from "react-router-dom";
import { Button } from "../../common";
import { BUTTON_CAPTIONS } from "../../constants";
import styles from "./styles.module.css";
import { useSelector } from "react-redux";
import { getUserRoleSelector } from "../../store/selectors";

export const EmptyCourseList = () => {
  const navigate = useNavigate();
  const userRole = useSelector(getUserRoleSelector);

  const onAddCourseButtonClick = () => {
    userRole === "admin"
      ? navigate("/courses/add", { replace: true })
      : window.alert(
          "You don't have permissions to create a course. Please log in as ADMIN"
        );
  };

  return (
    <>
      <div className={styles.container}>
        <h3>Your list is empty</h3>

        <p>Please use "Add New Course" button to add your first course'</p>

        <div className={styles.addButton}>
          <Button
            className={styles.addButton}
            buttonText={BUTTON_CAPTIONS.addNewCourse}
            handleClick={onAddCourseButtonClick}
            data-testid="addCourse"
          />
        </div>
      </div>
    </>
  );
};
