import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Auth, Config, getAuth, signInWithEmailAndPassword } from '@angular/fire/auth';
import { createUserWithEmailAndPassword, UserCredential } from '@firebase/auth';
import { Observable, Subject } from 'rxjs';
import { Product, UserBasket, UserDate, UserDate2 } from '../interface/interface-const';
import { LocalService } from '../local-storage-service/local-storage';



export interface CartItem {
  goods:Product[],
  userId: string,
  idCart?:string,
}

@Injectable({
  providedIn: 'root'
})
export class AipHandlers {
  getUserId:string = LocalService.getUserDate().authId;

  constructor(
    private http: HttpClient,
    private auth: Auth
    ) { }

  createUserAuthRequest( email: string, password: string):Promise<UserCredential> {
   return createUserWithEmailAndPassword(this.auth, email, password)
  }

  signInRequest(email: string, password: string): Promise<UserCredential> {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  addUser(dateUser: UserDate):Observable<UserDate> {
    return  this.http.post<UserDate>(`https://shop-angular-eb10e-default-rtdb.firebaseio.com/users.json`, dateUser)
  }

  getUserDate(id: string | undefined):Observable<UserDate> {
    return this.http.get<UserDate>(`https://shop-angular-eb10e-default-rtdb.firebaseio.com/users/${id}.json`)
  }

  getUsersDate():Observable<UserDate2[]> {
    return this.http.get<UserDate2[]>(`https://shop-angular-eb10e-default-rtdb.firebaseio.com/users.json`)
  }

  addCart(items: Product[] | number, userId: string): Observable<CartItem> {
    return this.http.post<CartItem>(`https://shop-angular-eb10e-default-rtdb.firebaseio.com/basket.json`, {
      goods: items,
      userId: userId,
    })
  }

  getProduct():Observable<CartItem> {
    return this.http.get<CartItem>(`https://shop-angular-eb10e-default-rtdb.firebaseio.com/basket/.json`)
  }

  upDateCart(id: string | undefined, items: Product[], authId: string ):Observable<CartItem> {
    console.log(this.getUserId);
    return this.http.put<CartItem>(`https://shop-angular-eb10e-default-rtdb.firebaseio.com/basket/${id}.json`, {
      goods: items,
      userId: authId
    })
  }

  getUserItems(id: string | undefined):Observable<UserBasket[]> {
    return this.http.get<UserBasket[]>(`https://shop-angular-eb10e-default-rtdb.firebaseio.com/basket/${id}.json`)
  }
}




