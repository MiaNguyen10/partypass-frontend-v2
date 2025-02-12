import * as yup from "yup";
import dayjs from "dayjs";

const schemaTicket = yup.object().shape({
  name: yup.string().required("Name is required"),
  description: yup.string(),
  institution_id: yup
    .number()
    .typeError("Institution must be a number")
    .required("Institution is required"),
  price: yup
    .number()
    .typeError("Price must be a number")
    .min(0, "Price cannot be negative")
    .required("Price is required"),
  capacity: yup
    .number()
    .typeError("Capacity must be a number")
    .min(1, "Capacity must be at least 1")
    .required("Capacity is required"),
  benefits: yup.string(),
  is_regular: yup.boolean(),
  date: yup
    .date()
    .test("isValid", "Invalid date", (value) => dayjs(value).isValid())
    .min(dayjs().startOf('day').toDate(), "Date must be today or later")
    .when("is_regular", {
      is: false,
      then: (schema) => schema.required("Date is required"),
      otherwise: (schema) => schema.notRequired(),
    }),
  start_datetime: yup
    .string()
    .when("is_regular", {
      is: true,
      then: (schema) =>
        schema
          .required("Start time is required")
          .typeError("Invalid start time"),
      otherwise: (schema) => schema.notRequired(),
    }),
  end_datetime: yup
    .string()
    .when("is_regular", {
      is: true,
      then: (schema) =>
        schema.required("End time is required").typeError("Invalid end time"),
      otherwise: (schema) => schema.notRequired(),
    }),
});

export default schemaTicket;