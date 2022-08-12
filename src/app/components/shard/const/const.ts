export interface Massage {
  [x: string]: any;
  uppercase: string,
  lowercase: string,
  numbers: string,
  characters: string,
  completed: string
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
