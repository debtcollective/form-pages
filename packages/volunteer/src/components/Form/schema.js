import * as yup from 'yup'

export const skills = [
  'Legal research and assistance',
  'Social media',
  'Digital/Graphic design',
  'Web development',
  'Outreach (phone calls & emails)',
  'Accessibility/translation/captioning'
]

const phoneRegExp = /^(\([0-9]{3}\) |[0-9]{3}-)[0-9]{3}-[0-9]{4}$/

export const validationSchema = yup.object().shape({
  fullName: yup
    .string()
    .min(5, 'Full name must be at least ${min} characters') // eslint-disable-line no-template-curly-in-string
    .required('Full name is a required field'),
  email: yup
    .string()
    .email('Must be a valid email')
    .required('Email is a required field'),
  address: yup.object().shape({
    name: yup.string().required('Address is required'),
    administrative: yup.string(),
    county: yup.string(),
    city: yup.string(),
    suburb: yup.string(),
    country: yup.string(),
    countryCode: yup.string(),
    type: yup.string(),
    latlng: yup.object().shape({
      lat: yup.number(),
      lng: yup.number()
    }),
    postcode: yup.string(),
    postcodes: yup
      .array()
      .of(yup.string())
      .nullable(),
    value: yup.string()
  }),
  phoneNumber: yup.string().matches(phoneRegExp, {
    message: 'Phone number must be valid',
    excludeEmptyString: true
  }),
  twitter: yup.string(),
  skills: yup.array().of(yup.string()),
  otherSkills: yup.string(),
  username: yup.string()
})
