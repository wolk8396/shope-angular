import { user } from "@angular/fire/auth"

export interface Product {
  bookId: string,
  photo: string,
  product: string,
  description: string,
  recommendations: string
  story: string,
  author: string,
  category: string,
  cost: number ,
  count: number
  exist?:boolean,
  [searchField:string]: any
  }

 export interface UserDate {
    authId: string,
    email: string,
    birth: string,
    date?: Date,
    firstName: string,
    lastName: string,
    name?: string,
    idDate?: string,
    key:string
  }

  export interface UserDate2 {
      authId: string,
      email: string,
      birth: string,
      date?: Date,
      firstName: string,
      lastName: string,
      name?: string,
      idLink:string
      users?:any,
   }

  export interface FormValue {
    email:string,
    birth:string,
    password_1: string,
    password_2?: string,
    firstName: string,
    lastName:string
  }

  export interface SignInResponse {
    user: {
        accessToken: string;
        uid: string;
    }
}

interface Identifier {
  [users: string]: any;
}

type KEY = {
  [key: string]: number | string;
}

