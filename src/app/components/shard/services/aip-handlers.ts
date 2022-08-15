import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Auth, getAuth, signInWithEmailAndPassword } from '@angular/fire/auth';
import { createUserWithEmailAndPassword, UserCredential } from '@firebase/auth';
import { Subject } from 'rxjs';

interface CreateConfig {
  auth: Auth,
  email: string,
  password: string
}

@Injectable({
  providedIn: 'root'
})
export class AipHandlers {
  auth: Auth = getAuth()

  constructor(private http: HttpClient) { }

  createUserAuthRequest( email: string, password: string):Promise<UserCredential> {
   return createUserWithEmailAndPassword(this.auth, email, password)
  }

 signInRequest(email: string, password: string):Promise<UserCredential> {
    return signInWithEmailAndPassword(this.auth, email, password);
  }
}
