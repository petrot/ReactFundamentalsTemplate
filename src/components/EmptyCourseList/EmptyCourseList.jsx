import { useNavigate } from "react-router-dom";
import { Button } from "../../common";
import { BUTTON_CAPTIONS } from "../../constants";
import styles from "./styles.module.css";
import { useSelector } from "react-redux";
import { getUserRoleSelector } from "../../store/selectors";

export const EmptyCourseList = () => {
  const navigate = useNavigate();
  const userRole = useSelector(getUserRoleSelector);

  return (
    <>
      <div className={styles.container}>
        <h3>Your list is empty</h3>

        {userRole === "admin" ? (
          <>
            <p>Please use "Add New Course" button to add your first course</p>

            <div className={styles.addButton}>
              <Button
                className={styles.addButton}
                buttonText={BUTTON_CAPTIONS.addNewCourse}
                handleClick={() => navigate("/courses/add", { replace: true })}
                data-testid="addCourse"
              />
            </div>
          </>
        ) : (
          "You don't have permissions to create a course. Please log in as ADMIN"
        )}
      </div>
    </>
  );
};
