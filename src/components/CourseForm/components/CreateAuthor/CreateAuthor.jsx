import styles from "./styles.module.css";
import { Button, Input } from "../../../../common";
import { BUTTON_CAPTIONS } from "../../../../constants";
import { useState } from "react";
import { saveAuthor } from "../../../../store/slices/authorsSlice";
import { useDispatch } from "react-redux";

export const CreateAuthor = () => {
  const dispatch = useDispatch();

  const [authorName, setAuthorName] = useState("");

  return (
    <div className={styles.newAuthorContainer}>
      <Input
        name="authorName"
        placeholderText="Input text"
        labelText="Author name"
        data-testid="createAuthorInput"
        value={authorName}
        onChange={(event) => setAuthorName(event.target.value)}
      />
      <Button
        className={styles.filterButton}
        buttonText={BUTTON_CAPTIONS.createAuthor}
        handleClick={() => {
          setAuthorName("");

          dispatch(saveAuthor({ name: authorName, id: new Date().getTime() }));
        }}
        data-testid="createAuthorButton"
        type="button"
      />
    </div>
  );
};
