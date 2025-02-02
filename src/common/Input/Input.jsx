// Module 1.
// ** TASK DESCRIPTION ** - https://d17btkcdsmqrmh.cloudfront.net/new-react-fundamentals/docs/module-1/home-task/components#create-input-component

import styles from "./styles.module.css";

export const Input = ({
  placeholderText,
  labelText,
  value,
  name,
  type = "text",
  onChange,
  "data-testid": dataTestId,
  error,
}) => {
  return (
    <label className={styles.label}>
      {labelText}
      <input
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholderText}
        className={styles.input}
        data-testid={dataTestId}
      />

      {error && (
        <p className={styles.validationError}>{labelText} is required.</p>
      )}
    </label>
  );
};
