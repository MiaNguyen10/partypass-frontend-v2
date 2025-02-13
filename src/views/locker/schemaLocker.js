import * as yup from "yup";

const schemaLocker = yup.object().shape({
  locker_number: yup.number().required("Locker number is required"),
  status: yup.number().required("Locker status is required"),
  institution_id: yup.number().required("Institution is required"),
});

export default schemaLocker;