import dayjs from 'dayjs';
import * as yup from 'yup';

const schemaTicket = yup.object().shape({
  name: yup.string().required('Name is required'),
  institution_id: yup
    .number()
    .typeError('Institution must be a number')
    .required('Institution is required'),
  price: yup
    .number()
    .typeError('Price must be a number')
    .min(0, 'Price cannot be negative')
    .required('Price is required'),
  capacity: yup
    .number()
    .typeError('Capacity must be a number')
    .min(1, 'Capacity must be at least 1')
    .required('Capacity is required'),
  is_regular: yup.boolean(),
  date: yup
    .date()
    .nullable()
    .test('isValid', 'Invalid date', (value) => !value || dayjs(value).isValid()) // Allows empty/null values
    .test('isEmptyString', 'Invalid date', (value) => value !== '')
    .transform((value, originalValue) => (originalValue === '' ? null : value))
    .min(dayjs().startOf('day').toDate(), 'Date must be today or later')
    .when('is_regular', {
      is: false,
      then: (schema) => schema.required('Date is required'),
      otherwise: (schema) => schema.notRequired(),
    }),

  start_datetime: yup
    .string()
    .nullable()
    .when('is_regular', {
      is: false,
      then: (schema) => schema.typeError('Invalid start time'),
      otherwise: (schema) => schema.notRequired(),
    }),

  end_datetime: yup
    .string()
    .nullable()
    .when('is_regular', {
      is: false,
      then: (schema) => schema.typeError('Invalid end time'),
      otherwise: (schema) => schema.notRequired(),
    }),
});

export default schemaTicket;
