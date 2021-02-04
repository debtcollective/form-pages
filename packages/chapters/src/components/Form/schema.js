import * as yup from 'yup'

export const nationalWorkingGroups = [
  'Media',
  'Social media',
  'Local actions',
  'Research & mapping',
  'Art & Design',
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
  bidenCampaign: yup.string(),
  nationalWorkingGroups: yup
    .array()
    .of(yup.string())
    .min(1, 'Select at least ${min} or fill other skills'),
  // Share a bit about your background and interest*:
  // We are using separated fields for this question
  locationToFocusOn: yup.string().required('This field is required'),
  areYouInDebt: yup.string().oneOf(['Yes', 'No'], 'Choose Yes or No'),
  areYouOnStrike: yup.string().oneOf(['Yes', 'No'], 'Choose Yes or No'),
  organizingExperience: yup.string().oneOf(['Yes', 'No'], 'Choose Yes or No'),
  whyStartAChapter: yup.string().required('This field is required'),
  tellUsMoreAboutOrganizingExperience: yup
    .string()
    .when('organizingExperience', {
      is: (val) => val === 'Yes',
      then: yup.string().required('This is a required field'),
      otherwise: yup.string()
    }),
  username: yup.string(),
})
