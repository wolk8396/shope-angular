import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Auth, Config, getAuth, signInWithEmailAndPassword } from '@angular/fire/auth';
import { createUserWithEmailAndPassword, UserCredential } from '@firebase/auth';
import { Observable, Subject } from 'rxjs';
import { UserDate, UserDate2 } from '../interface/interface-const';

interface CreateConfig {
  auth: Auth,
  email: string,
  password: string
}

@Injectable({
  providedIn: 'root'
})
export class AipHandlers {

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
    console.log(id, 'id');
    return this.http.get<UserDate>(`https://shop-angular-eb10e-default-rtdb.firebaseio.com/users/${id}.json`)
  }

  getUsersDate():Observable<UserDate2[]> {
    return this.http.get<UserDate2[]>(`https://shop-angular-eb10e-default-rtdb.firebaseio.com/users.json`)
  }
}




