import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  isMassages$ = new Subject<string>();
  isShowMassage$ = new Subject<boolean>();
  error$ = new Subject<boolean>();

  Notification(value: boolean, str: string, error: boolean): void {
    this.isShowMassage$.next(value);
    this.isMassages$.next(str);
    this.error$.next(error);
  }
}
