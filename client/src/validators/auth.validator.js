import * as yup from 'yup';

export const RegistrationSchema = yup.object().shape({
  firstName: yup
    .string()
    .required('No first name provided')
    .min(2, 'Too Short!')
    .max(50, 'Too Long!'),
  lastName: yup
    .string()
    .required('No last name provided')
    .min(2, 'Too Short!')
    .max(50, 'Too Long!'),
  email: yup.string().email('Invalid email').required('No email provided'),
  affiliation: yup.string().required('No affiliation provided'),
  password: yup
    .string()
    .required('No password provided.')
    .min(8, 'Password should be at least 8 characters.')
    .matches(
      ///^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
      /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{8,}$/,  
      'Password must contain eight characters, at least one letter and one number. It can also contain @$!%*?&'
    ),
  passwordConfirmation: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Passwords must match'),
});

export const LoginSchema = yup.object().shape({
  email: yup.string().email('Invalid email').required('No email provided'),
  password: yup.string().required('No password provided.'),
});

export const RequestPasswordSchema = yup.object().shape({
  email: yup.string().email('Invalid email').required('No email provided')
});


export const ResetPasswordSchema = yup.object().shape({
  password: yup
    .string()
    .required('No password provided.')
    .min(8, 'Password should be at least 8 characters.')
    .matches(
      ///^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
      /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{8,}$/,  
      'Password must contain eight characters, at least one letter and one number. It can also contain @$!%*?&'
    ),
  passwordConfirmation: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Passwords must match'),
});

