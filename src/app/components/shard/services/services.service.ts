import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServicesService {

  public count$ = new Subject<number>();

  constructor() { }

  public changeCount(count: number) {
    this.count$.next(count);
  }
}
