export const passwordRegExp =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/i;
export const emailRegExp =
  /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/i;
export const phoneRegExp =
  /^\d{10,14}$/i;
export const videoLinkRegExp =
  /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/i;

const regexFormat = {
  passwordRegExp,
  emailRegExp,
  phoneRegExp,
  videoLinkRegExp,
};

export default regexFormat;
