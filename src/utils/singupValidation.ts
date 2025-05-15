import * as yup from 'yup';

export const signupValidationSchema = yup.object().shape({
  first_name: yup
    .string()
    .matches(/^[A-Za-z]+$/, 'First name must contain only letters')
    .min(2, 'First name must be at least 2 characters')
    .required('First name is required'),

  last_name: yup
    .string()
    .matches(/^[A-Za-z]+$/, 'Last name must contain only letters')
    .min(2, 'Last name must be at least 2 characters')
    .required('Last name is required'),

  email: yup
    .string()
    .email('Enter a valid email')
    .required('Email is required'),

  password: yup
    .string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),

  phoneNumber: yup
    .string()
    .matches(/^[0-9]{10}$/, 'Phone number must be exactly 10 digits')
    .required('Phone number is required'),
});
