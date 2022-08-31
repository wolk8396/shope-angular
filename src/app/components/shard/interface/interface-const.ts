
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
    first_name: string,
    last_name: string,
    name?: string,
    idLink?: string,
    key:string,
    // basketId:string
    photoUrl: string
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

  export interface UserBasket {
    goods: Product[],
    userId: string,
    idCart?: string
  }

export interface Url_photo {
  avatar: string
}

export interface Modal_Photo {
  type: string,
  title: string
}

export interface FileLis {
  0:{
    lastModified: number
    lastModifiedDate?:Date
    name: string,
    size:number,
    type: string,
    webkitRelativePath: string
  }
  length: number
}
// FileList {0: File, length: 1}
