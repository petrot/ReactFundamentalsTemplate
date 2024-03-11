import styles from "./styles.module.css";
import { Button, Input } from "../../../../common";
import { BUTTON_CAPTIONS } from "../../../../constants";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { createAuthorThunk } from "../../../../store/thunks/authorsThunk";

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

          const token = localStorage.getItem("token");
          dispatch(createAuthorThunk({ name: authorName }, token));
        }}
        data-testid="createAuthorButton"
        type="button"
      />
    </div>
  );
};
