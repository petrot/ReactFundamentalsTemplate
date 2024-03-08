export const formatCreationDate = (date) => {
  return date?.toString().split("/").join(".");
};
