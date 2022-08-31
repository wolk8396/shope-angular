import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Auth, Config, getAuth, signInWithEmailAndPassword } from '@angular/fire/auth';
import { createUserWithEmailAndPassword, UserCredential } from '@firebase/auth';
import { catchError, Observable, Subject } from 'rxjs';
import { cart_massage } from '../const/const';
import { Product, UserBasket, UserDate, UserDate2 } from '../interface/interface-const';
import { LocalService } from '../local-storage-service/local-storage';
import { ServicesService } from './services.service';
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
  StorageReference,
  UploadTask,
  UploadTaskSnapshot,
  deleteObject
} from 'firebase/storage';

import { v4 as uuidv4 } from 'uuid';

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
  errorCart: string = cart_massage.error;
  isProgressBar$ = new Subject<number>();
  isDownloadURL$ = new Subject<string>();

  constructor(
    private http: HttpClient,
    private auth: Auth,
    private simpleService: ServicesService,
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

  upDateCart(id: string | undefined, items: Product[], authId: string):Observable<CartItem> {
    return this.http.put<CartItem>(`https://shop-angular-eb10e-default-rtdb.firebaseio.com/basket/${id}.json`, {
      goods: items,
      userId: authId
    })
    .pipe(
      catchError(err => {
        this.simpleService.Notification(true, this.errorCart, true);
        throw 'error'
      })
    )
  }

  getUserItems(id: string | undefined):Observable<UserBasket[]> {
    return this.http.get<UserBasket[]>(`https://shop-angular-eb10e-default-rtdb.firebaseio.com/basket/${id}.json`)
  }

  upDateUser(id : string | undefined, date: UserDate): Observable<UserDate> {
    delete date.idLink
    return this.http.put<UserDate>(`https://shop-angular-eb10e-default-rtdb.firebaseio.com/users/${id}.json`,
    {
      ...date,
    }
    )
  }

  photoUser(file: any, photoName: string | undefined): void {
    const storage = getStorage();
    const fileName: string = `${uuidv4()}_${photoName}`;
    const storageRef: StorageReference = ref(storage, 'photo/' + fileName);
    const uploadTask: UploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      'state_changed',
      (snapshot: UploadTaskSnapshot): void => {
        const progress: number = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');

        this.isProgressBar$.next(progress)
      },
      (): void => {},
      async (): Promise<void> => {
        await getDownloadURL(uploadTask.snapshot.ref).then((downloadURL: string) => {
            console.log('File available at', downloadURL);
            this.isDownloadURL$.next(downloadURL)
        }).catch((error) =>  error);

      }
    );
  }


  async onDeletePhoto(url: string): Promise<void> {
    const storage = getStorage();

    const desertRef = ref(storage, url);

    await deleteObject(desertRef);
  }
}




