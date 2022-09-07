import { Component,  OnChanges, OnInit, DoCheck} from '@angular/core';

import { Product } from '../shard/interface/interface-const';
import { books } from '../shard/product/books';
import { LocalService } from "../shard/local-storage-service/local-storage";
import { Operation } from '../shard/function/function';
import { Route, Router } from '@angular/router';
import { ServicesService } from '../shard/services/services.service';
import { AipHandlers, CartItem } from '../shard/services/aip-handlers';
import { modal_delete } from '../shard/const/const';
import { HeaderCounter } from '../shard/services/header.servis';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [ServicesService]
})
export class HomeComponent implements OnInit {
  items = books;
  cartArray: Product[] = LocalService.getData();
  removeEl: Product[] = [];
  btn_status: string = 'ADD TO CART';
  countItems: number = LocalService.countNumber();
  isDelete: boolean = false;
  isOpen: boolean = false;
  isItem: Product;
  isElement:Product;
  isValue: number = 0;

  constructor(
    private routing: Router,
    private simpleService: ServicesService,
    private headerService : HeaderCounter,
    private api: AipHandlers,
    ) {}

  ngOnInit(): void {
    (this.cartArray.length === 0) ? LocalService.saveData([]) : null;
    this.items = Operation.dynamicKey();
    this.simpleService.isDelete$.subscribe((value) => this.onSetValue(value));
  }

  addCart(item: Product): void  {
    this.isOpen = !this.isOpen;
    this.isItem = item;

    (!item.exist) ? this.setLocalStorage(item) :
      this.routing.navigate(['cart']);
  }

  setLocalStorage(item: Product): void {
    Operation.setValue(item, LocalService);
    this.countItems = LocalService.countNumber();
    this.headerService.changeCount(this.countItems);
    this.items = this.items = Operation.setBoolean(this.items, item, true);
    this.onUpDateCart();
  }

  deleteItem(item: Product): void {
    this.isDelete = !this.isDelete;
    this.isElement = item;
    item.count = 1;
    this.simpleService.delete(true, modal_delete.item);
  }

  onSetValue(value: boolean): void {
    if (!value) {
      this.cartArray = LocalService.getData();
      this.items = Operation.setBoolean(this.items, this.isElement, false);
      Operation.removeItem(this.cartArray, this.isElement.bookId, this.headerService);
      this.onUpDateCart();
    }
  }

   filter(el: Product[]): void {
    this.items = el;
  }

  getInput(str:string, el:Product): void {
    this.isValue = +str;
    this.items = Operation.inputChange(this.items, el.bookId, this.isValue);
  }

  onPlus(number: number, el: Product): void {
    this.isValue = number + 1;
    this.items = Operation.inputChange(this.items, el.bookId, this.isValue);
  }

  onMinus(number: number, el: Product): void {
    this.isValue = number - 1;
    this.items = Operation.inputChange(this.items, el.bookId, this.isValue);
  }

  onUpDateCart(): void {
    if (LocalService.getToken() && LocalService.getUserId()) {
      const { authId } = LocalService.getUserDate();
      this.cartArray = LocalService.getData();

      this.api.getProduct().subscribe((el: CartItem | any): void => {
        const {idCart} = Operation.dynamicKeyHttp(el, authId);
        this.api.upDateCart(idCart,  this.cartArray, authId).subscribe();
      });
    }
  }

}
