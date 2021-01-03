export const timeChange = (time) => {
  return time.toLocaleString().replace("Z", "").replace("T", " ");
};
