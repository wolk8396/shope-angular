import { Component,  OnChanges, OnInit, DoCheck} from '@angular/core';

import { Product } from '../shard/interface/interface-const';
import { books } from '../shard/product/books';
import { LocalService } from "../shard/local-storage-service/local-storage";
import { Operation } from '../shard/function/function';
import { Route, Router } from '@angular/router';
import { routes } from "../../app-routing.module";
import { ServicesService } from '../shard/services/services.service';

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

  constructor(
    private routing: Router,
    private readonly simpleService: ServicesService,
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

    } else this.routing.navigate(['cart']);
  }

  deleteItem(item: Product) {
    this.isDelete = !this.isDelete;
    this.isElement = item;
  }

  onSetValue(value: boolean) {

    if (value) {
      this.cartArray = new LocalService().getData();
      this.items = Operation.setBoolean(this.items, this.isElement, false);
      Operation.removeItem(this.cartArray, this.isElement.bookId, this.simpleService);
    }

  }

   filter(el:Product[]): void {
    this.items = el
  }
}
