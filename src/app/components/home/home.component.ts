import { Component,  OnChanges, OnInit,  AfterViewInit,  Output, EventEmitter } from '@angular/core';

import { Product } from '../shard/interface/interface-const';
import { books } from '../shard/product/books';
import { LocalService } from "../shard/local-storage-service/local-storage";
import { Operation } from '../shard/function/function';
import { Route, Router } from '@angular/router';
import { routes } from "../../app-routing.module";
import { ServicesService } from '../shard/services/services.service';

interface TextElement extends Element {
  innerText: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})




export class HomeComponent implements OnInit, OnChanges, AfterViewInit  {
  items = books;
  cartArray: Product[] = new LocalService().getData();
  removeEl: Product[] = [];
  getDate: any = new Map <string, string> ();
  isFlag: boolean = false;
  btn_status: string = 'ADD TO CART';
  btn_status1: string = 'IN YOU CART';
  steBoolean: Product[] = [];
  term: string = '';
  expression:boolean = false;
  routes: any = routes;
  countItems: number = LocalService.countNumber();
  str_btn: HTMLButtonElement;


  constructor(
    private routing: Router,
    private readonly simpleService: ServicesService
    ) {}

  ngOnChanges(): void {}

  ngOnInit(): void {
    (this.cartArray.length === 0) ? new LocalService().saveData([]) : null;

    this.steBoolean =  Operation.dynamicKey();
  }

  ngAfterViewInit(): void {}



  addCart(item: Product, event: any , url: string): void  {
    this.isFlag = !this.isFlag;
    this.cartArray = new LocalService().getData();

    this.cartArray.forEach(item =>  this.getDate.set(item.bookId, item.bookId));

    if (!this.getDate.get(item.bookId)) {
      Operation.setValue(item, LocalService);
      this.countItems = LocalService.countNumber();
      event.target.innerText = 'in your cart';

      this.simpleService.changeCount(this.countItems);

    } else {
      event.target.innerText = 'ADD TO CAR'
      this.routing.navigate([url]);
    }
  }

  deleteItem(item: Product) {
    Operation.removeItem(this.cartArray, item.bookId, this.simpleService);
  }

   filter(el:Product[]): void {
    this.steBoolean = el
  }
}
