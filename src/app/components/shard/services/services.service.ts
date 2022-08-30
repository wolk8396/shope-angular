import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServicesService {
  count$ = new Subject<number>();
  spinner$ = new Subject<boolean>();
  isShowModal$ = new Subject<boolean>();
  isMassages$ = new Subject<string>();
  isShowMassage$ = new Subject<boolean>();
  error$ = new Subject<boolean>();
  isModalDelete$ = new Subject<boolean>();
  isModalDeleteMassage$ = new Subject<string>();
  isDelete$ = new Subject<boolean>();
  isProgressBar$ = new Subject<string>();

  constructor() { }

  changeCount(count: number) {
    this.count$.next(count);
  }

  SpinnerShow(isShow: boolean): void {
    this.spinner$.next(isShow)
  }

  Registration (value: boolean) {
    this.isShowModal$.next(value)
  }

  Notification(value: boolean, str: string, error: boolean): void {
    this.isShowMassage$.next(value);
    this.isMassages$.next(str);
    this.error$.next(error)
  }

  delete(value: boolean, massage: string) {
    console.log(value,  massage);

    this.isModalDelete$.next(value);
    this.isModalDeleteMassage$.next(massage);
  }

  isDelete(value: boolean) {
    this.isDelete$.next(value)
  }
}
