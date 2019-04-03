import {
  helpers
} from 'vuelidate/lib/validators'
export const telephoneValidator = (value) => value.length == 10
export const confimationpass = (param) =>
  (value) => param === value
