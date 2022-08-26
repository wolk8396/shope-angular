import { environment } from "src/environments/environment";

export interface Massage {
  [x: string]: any;
  uppercase: string,
  lowercase: string,
  numbers: string,
  characters: string,
  completed: string
}

export interface Errors {
  email: string,
  required: string,
  password: string,
  error: string
}

export interface ShoppingCart {
  upDate: string,
  error: string
}

export const errorsMessages = new Map<string, string>([
  ['email', 'Please enter a valid email.'],
  ['first_name', 'Please enter a valid name'],
  ['last_name', 'Please enter a valid last name'],
  ['required', 'This field is required.'],
  ['passwords', 'Both passwords must be the same.']
]);

export const REGEX = {
  upper_case: /(?=.*[A-Z])/,
  lower_case: /(?=.*[a-z])/,
  numbers: /(?=.*\d)/,
  EIGHT_CHARACTERS: /[a-zA-Z\d@$#!%?&*^()-=+_]{8,}/,
}

export const massage_advance:Massage = {
  uppercase: 'your password must contain at least one uppercase letter',
  lowercase: 'your password must contain at least one letter in lowercase',
  numbers: 'your password must contain at least one number',
  characters: 'your password must contain at least 8 symbols',
  completed: 'Password verification hsa been completed successfully'
}

export const massage_error: Errors = {
  email:'Please enter a valid email.',
  required:'This field is required.',
  password:'your password must contain at least 8 symbol',
  error: 'email or password is incorrect'
}

export const cart_massage: ShoppingCart = {
  upDate:"your cart has been update successfully",
  error: "ERROR!! Unfortunately, it is not possible to update your shopping cart. Try again later"
}

export const DateStorage: string = `firebase:authUser:${environment.firebase.apiKey}:[DEFAULT]`
