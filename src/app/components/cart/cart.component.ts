import { Component, ElementRef, OnInit, ViewChild, ViewChildren, AfterViewInit } from '@angular/core';
import { Operation } from '../shard/function/function';
import { Product } from '../shard/interface/interface-const';
import { LocalService } from '../shard/local-storage-service/local-storage';
import { ServicesService } from '../shard/services/services.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit, AfterViewInit {

  items: Product[] = new LocalService().getData();
  renderArray : Product[] = [];
  plus: number = 1;
  minus: number = 1;
  plus_str: string = '+';
  minus_str: string = '-'
  countItems: number;
  price: number = 0;
  countCarts: number = 0;


 @ViewChildren("getCount") getCount: ElementRef

  constructor(private readonly simpleService: ServicesService) { }

  ngOnInit(): void {
    this.price = Operation.totalPrice(this.items);
  }

  removeEl (item: Product) {
    this.items = Operation.removeItem(this.items, item.bookId, this.simpleService);
    this.price = Operation.totalPrice(this.items);
  }


  increase(number: Product, itemCount: number): void {
    Operation.countItems(this.minus, number, this.items, this.plus_str);
    this.price = Operation.totalPrice(this.items);
  }

  ngAfterViewInit(): void {}

  decrease(number: Product, itemCount: number) {
    Operation.countItems(this.minus, number, this.items, this.minus_str);

    this.price = Operation.totalPrice(this.items);

    (itemCount <= 1) ?
      this.items = Operation.removeItem(this.items, number.bookId, this.simpleService) : null;
  }
}
