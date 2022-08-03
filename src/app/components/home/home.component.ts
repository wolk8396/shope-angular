import { Component,  OnChanges, OnInit,} from '@angular/core';

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
  btn_status1: string = 'IN YOU CART';
  routes: any = routes;
  countItems: number = LocalService.countNumber();

  constructor(
    private routing: Router,
    private readonly simpleService: ServicesService,
    ) {}

  ngOnInit(): void {
    (this.cartArray.length === 0) ? new LocalService().saveData([]) : null;
    this.items = Operation.dynamicKey();
  }

  addCart(item: Product): void  {
    if (!item.exist) {
      Operation.setValue(item, LocalService);
      this.countItems = LocalService.countNumber();
      this.simpleService.changeCount(this.countItems);
      this.items = this.items = Operation.setBoolean(this.items, item, true)

    } else this.routing.navigate(['cart']);
  }

  deleteItem(item: Product) {
    this.cartArray = new LocalService().getData();

    this.items = Operation.setBoolean(this.items, item, false);

    Operation.setBoolean(this.items, item, false);

    Operation.removeItem(this.cartArray, item.bookId, this.simpleService);
  }

   filter(el:Product[]): void {
    this.items = el
  }
}
