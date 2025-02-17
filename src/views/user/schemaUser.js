import * as yup from "yup";
import { MAX_FILE_SIZE, roles, validFileExtensions } from "../../config/Constant";
import { passwordRegExp } from "../../config/regexFormat";

export function isValidFileType(fileName, fileType) {
  return (
    fileName &&
    validFileExtensions[fileType].indexOf(fileName.split(".").pop()) > -1
  );
}

const schemaUser = yup.object().shape({
  name: yup.string().required("Name is required"),
  email: yup.string().email().required("Email is required"),
  phone: yup.string().required("Phone is required"),
  date_of_birth: yup.date().required("Date of birth is required"),
  password: yup
    .string()
    .matches(passwordRegExp, "Password must be at least 6 characters long, have at least one uppercase letter, one lowercase letter, one number, and one special character"),
  role: yup.number().required("Role is required"),
  institution_id: yup.number().when("role", {
    is: (role) => role === roles[2].id || roles[3].id, // Assuming 2 is institution admin and 3 is staff
    then: yup.number().required("Institution is required"),
    otherwise: yup.number(),
  }),
  social_uuid: yup.string().when("is_social", {
    is: true,
    then: yup.string().required("Social UUID is required"),
  }),
  profile_pic: yup.array().of(
    yup
      .mixed()
      .test("is-valid-type", "Not a valid image type", (value) =>
        isValidFileType(value && value.name.toLowerCase(), "image")
      )
      .test(
        "is-valid-size",
        "Max allowed size is 100KB",
        (value) => value && value.size <= MAX_FILE_SIZE
      )
  ),
});

export default schemaUser;