import { Button } from "../../../../common";
import styles from "./styles.module.css";
import deleteIcon from "../../../../assets/deleteButtonIcon.svg";

export const AuthorItem = ({ author, addAuthor, removeAuthor, mode }) => (
  <div className={styles.authorItem} data-testid="authorItem">
    <span>{author?.name}</span>

    <div className={styles.buttons}>
      {mode === "add" ? (
        <Button
          className={styles.addButton}
          buttonText="+"
          data-testid="addAuthor"
          handleClick={addAuthor}
        />
      ) : (
        <Button
          className={styles.deleteButton}
          buttonText={<img src={deleteIcon} alt="delete" />}
          data-testid="deleteAuthor"
          handleClick={removeAuthor}
        />
      )}
    </div>
  </div>
);
