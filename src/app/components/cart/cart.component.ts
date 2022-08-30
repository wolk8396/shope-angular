import { Component, OnInit} from '@angular/core';
import { cart_massage, modal_delete } from '../shard/const/const';
import { Operation } from '../shard/function/function';
import { Product } from '../shard/interface/interface-const';
import { LocalService } from '../shard/local-storage-service/local-storage';
import { AipHandlers, CartItem } from '../shard/services/aip-handlers';
import { ServicesService } from '../shard/services/services.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  items: Product[] = LocalService.getData();
  getDateAll: any = LocalService.getDateAll();
  getItem : Product;
  plus: number = 1;
  minus: number = 1;
  plus_str: string = '+';
  minus_str: string = '-';
  isUpDate: string = cart_massage.upDate
  errorCart: string = cart_massage.error
  price: number = 0;
  countCarts: number = 0;
  isDelete:boolean = false;
  isRemove:boolean;

  constructor(
    private simpleService: ServicesService,
    private api: AipHandlers,
    ) { }

  ngOnInit(): void {
    this.price = Operation.totalPrice(this.items);
    this.simpleService.isDelete$.subscribe((value) => this.onDelete(value));
  }

  removeEl (item: Product): void {
    this.isDelete = !this.isDelete;
    this.getItem = item;
    this.simpleService.delete(true, modal_delete.item);
  }

  increase(number: Product, itemCount: number): void {
    Operation.countItems(this.minus, number, this.items, this.plus_str);
    this.price = Operation.totalPrice(this.items);
    this.getItem = number;
  }

  decrease(number: Product, itemCount: number) : void {
    Operation.countItems(this.minus, number, this.items, this.minus_str);
    this.price = Operation.totalPrice(this.items);

    this.getItem = number;

    (itemCount <= 1) ? this.isDelete = !this.isDelete : null;
  }

  onDelete(value: boolean): void {
    console.log('work');

    this.price = Operation.totalPrice(this.items);

    if (!value) {
      this.items = Operation.removeItem(this.items, this.getItem.bookId, this.simpleService);

      (LocalService.getToken() && LocalService.getUserId()) ? this.onUpDateCart() : null;
    }
  }


  onUpDateCart():void {

    if (LocalService.getToken() && LocalService.getUserId()) {
      const{ authId } = LocalService.getUserDate();

      this.api.getProduct().subscribe((el:CartItem | any):void => {
        const{ idCart } = Operation.dynamicKeyHttp(el, authId);

        this.api.upDateCart(idCart, this.items, authId).subscribe((res) => {
          this.simpleService.Notification(true, this.isUpDate, false)
        });
      });

    } else this.simpleService.Registration(true)

  }

}
