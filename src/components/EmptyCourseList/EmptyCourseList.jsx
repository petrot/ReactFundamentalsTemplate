import { Link } from "react-router-dom";
import { Button } from "../../common";
import { BUTTON_CAPTIONS } from "../../constants";
import styles from "./styles.module.css";

export const EmptyCourseList = () => {
  return (
    <>
      <div className={styles.container}>
        <h3>Your list is empty</h3>

        <p>Please use "Add New Course" button to add your first course'</p>

        <div className={styles.addButton}>
          <Button
            className={styles.addButton}
            buttonText={
              <Link className={styles.addNewCourse} to="/courses/add">
                {BUTTON_CAPTIONS.addNewCourse}
              </Link>
            }
            data-testid="addCourse"
          />
        </div>
      </div>
    </>
  );
};
