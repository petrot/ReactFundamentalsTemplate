// Module 1. You don't need to do anything with this component (we had to comment this component for 1st module tests)

// Module 2.
// * uncomment this component (ctrl + a => ctrl + /)
// * finish markup according to the figma https://www.figma.com/file/m0N0SGLclqUEGR6TUNvyn9/Fundamentals-Courses?type=design&node-id=2927-216&mode=design&t=0FIG0iRzKcD0s16M-0
// * add validation for fields: all fields are required. Show validation message. https://www.figma.com/file/m0N0SGLclqUEGR6TUNvyn9/Fundamentals-Courses?type=design&node-id=2932-191&mode=design&t=0FIG0iRzKcD0s16M-0
// * render this component by route '/login'
// * use login service to submit form data and make POST API request '/login'.
// * component should have a link to the Registration page (see design)
// * save token from API after success login to localStorage.
// ** PAY ATTATION ** token should be saved to localStorage inside login handler function after login service responce
// ** TASK DESCRIPTION ** - https://d17btkcdsmqrmh.cloudfront.net/new-react-fundamentals/docs/module-2/home-task/components#login-new-component

// Module 3.
// * save user's name, token and email to the store after success login.
// ** TASK DESCRIPTION ** - https://d17btkcdsmqrmh.cloudfront.net/new-react-fundamentals/docs/module-3/home-task/components#login-component

import { Link, useNavigate } from "react-router-dom";
import styles from "./styles.module.css";

import { useState } from "react";
import { Button, Input } from "../../common";
import { BUTTON_CAPTIONS } from "../../constants";
import { login } from "../../services";
import { useDispatch } from "react-redux";
import { setUserData } from "../../store/slices/userSlice";

export const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
  });
  const [formErrors, setFormErrors] = useState({
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
      const response = await login(formValues);

      localStorage.setItem("token", response?.result);

      dispatch(setUserData({ ...response.user, token: response.result }));
      // dispatch(getUserThunk(response?.result));
      navigate("/courses", { replace: true });
    }
  };

  return (
    <div className={styles.container}>
      <h1>Login</h1>
      <div className={styles.formContainer}>
        <form onSubmit={handleSubmit}>
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
            buttonText={BUTTON_CAPTIONS.login}
          />
        </form>
        <p>
          If you don't have an account you may &nbsp;
          <Link className={styles.registration} to={`/registration`}>
            Registration
          </Link>
        </p>
      </div>
    </div>
  );
};
