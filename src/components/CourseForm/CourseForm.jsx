// Module 1. You don't need to do anything with this component (we had to comment this component for 1st module tests)

// Module 2.
// * uncomment this component (ctrl + a => ctrl + /)
// * add functionality to create new course with:
//   ** title
//   ** description
//   ** duration (user enters in minutes, you should map in format «hh:mm»)
//   ** existing authors (use 'authorsList' prop)
//   ** new created author (create field and button, update 'authorsList')
//   ** user should be able to remove author from the course
//   ** add validation to the fields
//   ** add new course to the 'coursesList' and navigate to the '/courses' page => new course should be in the courses list
// ** TASK DESCRIPTION ** - https://d17btkcdsmqrmh.cloudfront.net/new-react-fundamentals/docs/module-2/home-task/components#add-new-course

// Module 3.
// * save new course to the store. Use action 'saveCourse' from 'src/store/slices/coursesSlice'
// * save new author to the store. Use action 'saveAuthor' from 'src/store/slices/authorsSlice'
// ** TASK DESCRIPTION ** - https://d17btkcdsmqrmh.cloudfront.net/new-react-fundamentals/docs/module-3/home-task/components#add-new-course

// Module 4.
// * render this component only for ADMIN user
// * in this module you should separate functionality for this component:
//   ** create mode:
//     * form for the course creation should be opened by 'courses/add' route by 'ADD NEW COURSE' button click (as before)
//     * make a request to save new course
//     * use 'createCourse' service from 'src/services.js' and 'createCourseThunk' thunk from 'src/store/thinks/coursesThunk.js'
//     * use 'createAuthor ' service from 'src/services.js' and 'createAuthorThunk' thunk from 'src/store/thinks/authorsThunk.js'
//     * save new course to the store after success response
// ** TASK DESCRIPTION ** - https://d17btkcdsmqrmh.cloudfront.net/new-react-fundamentals/docs/module-4/home-task/components#add-new-course
//   ** update mode:
//     * form should be opened by route '/courses/update/:courseId' route by 'update' button click
//     * appropriate forms field should be prefilled with course's info
//     * user should have ability to modify course information in the fields and change authors list
//     * make a request to save updated course
//     * use 'updateCourseService' from 'src/services.js' and 'updateCourseThunk' thunk from 'src/store/thinks/coursesThunk.js'
//     save updated course to the store after success response.
// ** TASK DESCRIPTION ** - https://d17btkcdsmqrmh.cloudfront.net/new-react-fundamentals/docs/module-4/home-task/components#update-course

// Module 5:
// * proposed cases for unit tests:
//   ** CourseForm should show authors lists (all and course authors).
//   **  CourseForm 'Create author' button click should call dispatch.
//   **  CourseForm 'Add author' button click should add an author to the course authors list.
//   **  CourseForm 'Delete author' button click should delete an author from the course list.

import { useState } from "react";

import styles from "./styles.module.css";

import { Button, Input } from "../../common";
import { getCourseDuration } from "../../helpers";
import { BUTTON_CAPTIONS, mockedAuthorsList } from "../../constants";
import { AuthorItem, CreateAuthor } from "./components";

export const CourseForm = ({ authorsList, createCourse, createAuthor }) => {
  const [formValues, setFormValues] = useState({
    title: "",
    description: "",
    duration: 0,
    authors: [],
  });

  const [formErrors, setFormErrors] = useState({
    title: true,
    description: true,
    duration: true,
  });

  const [formTouched, setFormTouched] = useState(false);

  const [authors, setAuthors] = useState([
    ...(authorsList || mockedAuthorsList),
  ]);

  const handleInputChange = (event) => {
    setFormValues({ ...formValues, [event.target.name]: event.target.value });
    setFormErrors({ ...formErrors, [event.target.name]: !event.target.value });
    setFormTouched(true);
  };

  const getAuthorItems = () => {
    return (authors || [])
      .filter((a) => !(formValues.authors || []).includes(a.id))
      .map((author, i) => (
        <AuthorItem
          author={author}
          key={i}
          addAuthor={(event) => {
            event.preventDefault();

            setFormValues({
              ...formValues,
              authors: [...formValues.authors, author.id],
            });
          }}
          mode="add"
        ></AuthorItem>
      ));
  };

  const getCourseAuthorItems = () => {
    return (formValues.authors || []).map((authorId, i) => (
      <AuthorItem
        author={authors.find((a) => a.id === authorId)}
        key={i}
        removeAuthor={(event) => {
          event.preventDefault();

          setFormValues({
            ...formValues,
            authors: formValues.authors.filter((id) => id !== authorId),
          });
        }}
        mode="remove"
      ></AuthorItem>
    ));
  };

  const onCreateAuthor = async (author) => {
    setAuthors([...authors, author]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setFormTouched(true);

    const hasErrors = Object.values(formErrors).some((error) => !!error);

    if (!hasErrors) {
      createCourse();
    }
  };

  return (
    <div className={styles.container}>
      <h2>Course edit/Create page</h2>

      <pre>{formValues.authors}</pre>
      <form onSubmit={handleSubmit}>
        <Input
          name="title"
          placeholderText="Input text"
          labelText="Title"
          data-testid="titleInput"
          value={formValues.title}
          onChange={handleInputChange}
          error={formTouched && formErrors.title}
        />

        <label>
          Description
          <textarea
            name="description"
            className={styles.description}
            value={formValues.description}
            onChange={handleInputChange}
            data-testid="descriptionTextArea"
          />
          {formTouched && formErrors.description && (
            <p className={styles.validationError}>Description is required.</p>
          )}
        </label>
        <div className={styles.infoWrapper}>
          <div>
            <div className={styles.duration}>
              <Input
                name="duration"
                placeholderText="Input text"
                labelText="Duration"
                data-testid="durationInput"
                value={formValues.duration}
                onChange={handleInputChange}
                error={formTouched && formErrors.duration}
              />

              <p>{getCourseDuration(formValues.duration)}</p>
            </div>
            <h2>Authors</h2>

            <CreateAuthor onCreateAuthor={onCreateAuthor}></CreateAuthor>
            <div className={styles.authorsContainer}>
              <h3>Authors List</h3>
              {getAuthorItems()}
            </div>
          </div>

          <div className={styles.courseAuthorsContainer}>
            <h2>Course authors</h2>
            {(formValues.authors || []).length > 0 ? (
              getCourseAuthorItems()
            ) : (
              <p className={styles.notification}>List is empty</p>
            )}
          </div>
        </div>
      </form>

      <div className={styles.buttonsContainer}>
        <Button buttonText={BUTTON_CAPTIONS.cancel} />
        <Button
          buttonText={BUTTON_CAPTIONS.createCourse}
          handleClick={handleSubmit}
          data-testid="createCourseButton"
        />
      </div>
    </div>
  );
};
