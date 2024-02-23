import { padTo2Digits } from "./padTo2Digits";

export const getCourseDuration = (duration) => {
  const m = duration % 60;
  const h = (duration - m) / 60;

  return `${padTo2Digits(h)}:${padTo2Digits(m)} hour${h > 1 ? "s" : ""}`;
};
