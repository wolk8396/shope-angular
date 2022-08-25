import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServicesService {

  count$ = new Subject<number>();
  spinner$ = new Subject<boolean>();
  isShowModal$ = new Subject<boolean>()

  constructor() { }

  public changeCount(count: number) {
    this.count$.next(count);
  }

  public SpinnerShow(isShow: boolean): void {
    this.spinner$.next(isShow)
  }

  Registration (value: boolean) {
    this.isShowModal$.next(value)
  }
}
