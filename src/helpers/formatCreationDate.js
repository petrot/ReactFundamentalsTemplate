export const formatCreationDate = (date) => {
  return date.toString().split("/").join(".");
  /*
  // write your solution here
  const dateObject = new Date(date);

  return [
    padTo2Digits(dateObject.getMonth() + 1),
    padTo2Digits(dateObject.getDate()),
    dateObject.getFullYear(),
  ].join(".");
  */
};
