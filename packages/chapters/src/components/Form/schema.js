import * as yup from 'yup'

export const validationSchema = yup.object().shape({
  fullName: yup
    .string()
    .min(5, 'Full name must be at least ${min} characters') // eslint-disable-line no-template-curly-in-string
    .required('Full name is a required field'),
  email: yup
    .string()
    .email('Must be a valid email')
    .required('Email is a required field'),
  city: yup.string().required('City is a required field'),
  state: yup.string().required('State is a required field'),
  zip: yup
    .string()
    .required('Zip is a required field')
    .min(4, 'Zip must be at least 4 characters'),
  country: yup.string().required('Country is a required field'),
  phoneNumber: yup
    .string()
    .required('Phone number is a required field')
    .min(8, 'Phone number must be at least 8 characters'),
  twitter: yup.string(),
  skills: yup
    .array()
    .of(yup.string())
    .when('otherSkills', {
      is: (val) => !!val,
      then: yup.array().of(yup.string()),
      otherwise: yup
        .array()
        .of(yup.string())
        .min(1, 'Select at least ${min} or fill other skills'),
    }),
  focusRegion: yup.string().required('This field is required'),
  areYouInDebt: yup.boolean(),
  // Share a bit about your background and interest*:
  // We are using separated fields for this question
  areYouOnStrike: yup.boolean(),
  whyStartAChapter: yup.boolean(),
  organizingExperience: yup.boolean(),
  username: yup.string(),
})
