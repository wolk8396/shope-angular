import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Product } from "../../interface/interface-const";

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  isItemValue$ = new Subject<boolean>();
  isItems$ = new Subject<Product>()

  constructor() {}

  onShowItemModal(value: boolean, item: Product) {
    this.isItemValue$.next(value);
    this.isItems$.next(item)
  }

}
