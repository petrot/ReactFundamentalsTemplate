import { padTo2Digits } from "./padTo2Digits";

export const formatCreationDate = (date) => {
  // write your solution here
  const dateObject = new Date(date);

  return [
    padTo2Digits(dateObject.getMonth() + 1),
    padTo2Digits(dateObject.getDate()),
    dateObject.getFullYear(),
  ].join(".");
};
