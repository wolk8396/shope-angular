import { environment } from "src/environments/environment";
import { Modal_Photo } from "../interface/interface-const";

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

export interface Profile {
  update: string,
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

export const upUser_massage: Profile = {
  update: "your profile has been update successfully",
  error: "ERROR!! Unfortunately, it is not possible to update your profile. Try again later"
}

export const modal_add: Modal_Photo = {
  type: 'Pleas use files .png, .jpeg, .jpg, jpeg',
  title: 'Add photo to your account',
  error:'your file is incorrect. Pleas use files .png, .jpeg, .jpg, jpeg',
}

export const modal_delete = {
  item: 'Are You are sure ? Do you want to remove this item from your shopping cart',
  photo: 'Are You are sure ? Do you want to remove this photo form your account'
}

export const File_Type: string[] = ['image/png','image/jpg','image/peg','image/jpeg'];


export const DateStorage: string = `firebase:authUser:${environment.firebase.apiKey}:[DEFAULT]`
