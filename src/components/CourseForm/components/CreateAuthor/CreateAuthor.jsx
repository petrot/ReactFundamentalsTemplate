import styles from "./styles.module.css";
import { Button, Input } from "../../../../common";
import { BUTTON_CAPTIONS } from "../../../../constants";
import { useState } from "react";

export const CreateAuthor = ({ createAuthor }) => {
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
          createAuthor({ name: authorName, id: new Date().getTime() });
        }}
        data-testid="createAuthorButton"
        type="button"
      />
    </div>
  );
};
