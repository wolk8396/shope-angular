import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServicesService {

  public count$ = new Subject<number>();
  public spinner$ = new Subject<boolean>();

  constructor() { }

  public changeCount(count: number) {
    this.count$.next(count);
  }

  public SpinnerShow(isShow: boolean): void {
    this.spinner$.next(isShow)
  }
}
