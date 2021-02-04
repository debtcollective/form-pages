import * as yup from 'yup'

export const skills = [
  'Accessibility/translation/captioning',
  'Community organizing',
  'Digital/Graphic design',
  'Legal research and assistance',
  'Outreach (phone calls & emails)',
  'Research and mapping',
  'Social media',
  'Web development',
]

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
        .min(1, 'Select at least ${min}'),
    }),
  otherSkills: yup.string(),
  username: yup.string(),
  bidenCampaign: yup.string(),
  locationToFocusOn: yup.string().required('This field is required'),
  areYouInDebt: yup.string().oneOf(['Yes', 'No'], 'Choose Yes or No'),
  areYouOnStrike: yup.string().oneOf(['Yes', 'No'], 'Choose Yes or No'),
})
