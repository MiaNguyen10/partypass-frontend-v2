import * as yup from 'yup';
import { roles, validFileExtensions } from '../../config/Constant';

export function isValidFileType(fileName, fileType) {
  return fileName && validFileExtensions[fileType].indexOf(fileName.split('.').pop()) > -1;
}

const schemaUser = yup.object().shape({
  name: yup.string().required('Name is required'),
  email: yup.string().email().required('Email is required'),
  phone: yup.string().required('Phone is required'),
  date_of_birth: yup.date().required('Date of birth is required'),
  password: yup.string().when('$isEdit', {
    is: false,
    then: yup.string().required('Password is required'),
    otherwise: yup.string(),
  }),
  role: yup.number().required('Role is required'),
  institution_id: yup
    .mixed()
    .nullable()
    .transform((value, originalValue) => {
      return originalValue === '' ? null : Number(originalValue);
    })
    .when('role', (role, schema) => {
      if ([roles[2]?.id, roles[3]?.id].includes(role)) {
        return schema.required('Institution is required');
      }
      return schema;
    }),
  social_uuid: yup.string().when('is_social', {
    is: true,
    then: yup.string().required('Social UUID is required'),
  }),
});

export default schemaUser;
