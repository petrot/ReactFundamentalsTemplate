// Module 1. You don't need to do anything with this component (we had to comment this component for 1st module tests)

// Module 2.
// * uncomment this component (ctrl + a => ctrl + /)
// * finish markup according to the figma https://www.figma.com/file/m0N0SGLclqUEGR6TUNvyn9/Fundamentals-Courses?type=design&node-id=2932-219&mode=design&t=0FIG0iRzKcD0s16M-0
// * add validation for fields: all fields are required. Show validation message. https://www.figma.com/file/m0N0SGLclqUEGR6TUNvyn9/Fundamentals-Courses?type=design&node-id=2932-257&mode=design&t=0FIG0iRzKcD0s16M-0
// * render this component by route '/registration'
// * submit form data and make POST API request '/registration'.
// * after successful registration navigates to '/login' route.
// * component should have a link to the Login page (see design)
// ** TASK DESCRIPTION ** - https://d17btkcdsmqrmh.cloudfront.net/new-react-fundamentals/docs/module-2/home-task/components#registration-new-component

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Input } from "../../common";
import { BUTTON_CAPTIONS } from "../../constants";
import styles from "./styles.module.css";
import { createUser } from "../../services";

export const Registration = () => {
  const navigate = useNavigate();

  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [formErrors, setFormErrors] = useState({
    name: false,
    email: false,
    password: false,
  });

  const handleInputChange = (event) => {
    setFormValues({ ...formValues, [event.target.name]: event.target.value });
    setFormErrors({
      ...formErrors,
      [event.target.name]: formErrors[event.target.name] && !event.target.value,
    });
  };

  const validate = () => {
    const errors = {
      email: !formValues?.email,
      name: !formValues?.name,
      password: !formValues?.password,
    };

    setFormErrors(errors);

    return errors;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const errors = validate();
    const hasErrors = Object.values(errors).some((error) => !!error);

    if (!hasErrors) {
      const response = await createUser(formValues);

      if (response?.successful) {
        console.error("CALL LOGIN");
        navigate("/login", { replace: true });
      }
    }
  };

  return (
    <div className={styles.container}>
      <h1>Registration</h1>

      <div className={styles.formContainer}>
        <form onSubmit={handleSubmit}>
          <Input
            name="name"
            className={styles.filterInput}
            placeholderText="Input text"
            labelText="Name"
            value={formValues?.name}
            onChange={handleInputChange}
            error={formErrors?.name}
          />

          <Input
            name="email"
            className={styles.filterInput}
            placeholderText="Input text"
            labelText="Email"
            value={formValues?.email}
            onChange={handleInputChange}
            error={formErrors?.email}
          />

          <Input
            name="password"
            className={styles.filterInput}
            placeholderText="Input text"
            labelText="Password"
            value={formValues?.password}
            onChange={handleInputChange}
            error={formErrors?.password}
          />

          <Button
            className={styles.filterButton}
            buttonText={BUTTON_CAPTIONS.register}
          />
        </form>
        <p>
          If you have an account you may{" "}
          <Link className={styles.login} to={`/login`}>
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};
