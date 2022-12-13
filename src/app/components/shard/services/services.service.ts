import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Product } from '../interface/interface-const';
import { books } from '../product/books'

@Injectable({
  providedIn: 'root'
})
export class ServicesService {
  count1$ = new Subject<number>();
  isShowModal$ = new Subject<boolean>();
  isModalDelete$ = new Subject<boolean>();
  isModalDeleteMassage$ = new Subject<string>();
  isDelete$ = new Subject<boolean>();
  isProgressBar$ = new Subject<string>();

  constructor() { }

  changeCount(count: number): void {
    this.count1$.next(count);
  }

  Registration (value: boolean): void {
    this.isShowModal$.next(value);
  }

  delete(value: boolean, massage: string): void {
    this.isModalDelete$.next(value);
    this.isModalDeleteMassage$.next(massage);
  }

  isDelete(value: boolean): void {
    this.isDelete$.next(value);
  }

  FindBookPage(title: string): Product | undefined {
    return books.find(({product}) => product === title);
  }
}
