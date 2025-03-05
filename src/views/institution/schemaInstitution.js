import * as yup from "yup";
import { emailRegExp } from "../../config/regexFormat";

const schemaInstitution = yup.object().shape({
  name: yup.string().required("Name is required"),
  email: yup.string().matches(emailRegExp, "Email is not valid").required("Email is required"),
  phone: yup.string().required("Phone is required"),
  address: yup.string().required("Address is required"),
  map_location: yup.string(),
  details: yup.string(),
  video_link: yup.string(),
  status: yup.string().required("Status is required"),
});

export default schemaInstitution;