import { Component,  OnChanges, OnInit, DoCheck} from '@angular/core';

import { Product } from '../shard/interface/interface-const';
import { books } from '../shard/product/books';
import { LocalService } from "../shard/local-storage-service/local-storage";
import { Operation } from '../shard/function/function';
import { Route, Router } from '@angular/router';
import { ServicesService } from '../shard/services/services.service';
import { AipHandlers, CartItem } from '../shard/services/aip-handlers';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {
  items = books;
  cartArray: Product[] = new LocalService().getData();
  removeEl: Product[] = [];
  btn_status: string = 'ADD TO CART';
  countItems: number = LocalService.countNumber();
  isDelete: boolean = false;
  isOpen: boolean = false;
  getBoolean: boolean = false;
  isItem: Product;
  isElement:Product;
  isValue: number = 0;
  isNumber:string | number = '' || 0;
  getUserId:string = LocalService.getUserDate().authId;

  constructor(
    private routing: Router,
    private readonly simpleService: ServicesService,
    private api: AipHandlers,
    ) {}

  ngOnInit(): void {
    (this.cartArray.length === 0) ? new LocalService().saveData([]) : null;
    this.items = Operation.dynamicKey();
  }

  addCart(item: Product): void  {
    this.isOpen = !this.isOpen;
    this.isItem = item

    if (!item.exist) {
      Operation.setValue(item, LocalService);
      this.countItems = LocalService.countNumber();
      this.simpleService.changeCount(this.countItems);
      this.items = this.items = Operation.setBoolean(this.items, item, true);
      this.onUpDateCart();
    } else this.routing.navigate(['cart']);
  }

  deleteItem(item: Product) {
    this.isDelete = !this.isDelete;
    this.isElement = item;
    item.count = 1;
  }

  onSetValue(value: boolean) {
    if (value) {
      this.cartArray = new LocalService().getData();
      this.items = Operation.setBoolean(this.items, this.isElement, false);
      Operation.removeItem(this.cartArray, this.isElement.bookId, this.simpleService);
      this.onUpDateCart();
    }
  }

   filter(el:Product[]): void {
    this.items = el
  }

  getInput(str:string, el:Product) {
    this.isValue = +str;
    this.items = Operation.inputChange(this.items, el.bookId, this.isValue);
  }

  onPlus(number: number, el: Product) {
    this.isValue = number + 1;
    this.items = Operation.inputChange(this.items, el.bookId, this.isValue);
  }

  onMinus(number: number, el: Product) {
    this.isValue = number - 1;
    this.items = Operation.inputChange(this.items, el.bookId, this.isValue);
  }

  onUpDateCart():void {
    this.cartArray = new LocalService().getData()
    this.api.getProduct().subscribe((el:CartItem | any):void => {
      const {idCart} = Operation.dynamicKeyHttp(el, this.getUserId);
      this.api.upDateCart(idCart,  this.cartArray).subscribe();
    });
  }
}
