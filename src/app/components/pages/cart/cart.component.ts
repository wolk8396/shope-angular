import { Component, OnDestroy, OnInit} from '@angular/core';
import { Subscription } from 'rxjs';
import { cart_massage, modal_delete } from '../../shard/const/const';
import { Operation } from '../../shard/function/function';
import { Product } from '../../shard/interface/interface-const';
import { LocalService } from '../../shard/local-storage-service/local-storage';
import { AipHandlers, CartItem } from '../../shard/services/aip-handlers';
import { HeaderCounter } from '../../shard/services/header.servis';
import { NotificationService } from '../../shard/services/notification.service';
import { ServicesService } from '../../shard/services/services.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
  providers: [ServicesService, NotificationService]
})
export class CartComponent implements OnInit, OnDestroy {
  items: Product[] = LocalService.getData();
  getDateAll: any = LocalService.getDateAll();
  getItem : Product;
  plus: number = 1;
  minus: number = 1;
  plus_str: string = '+';
  minus_str: string = '-';
  isUpDate: string = cart_massage.upDate;
  errorCart: string = cart_massage.error;
  price: number = 0;
  countCarts: number = 0;
  isDelete:boolean = false;
  isRemove:boolean;
  private sub_getItem$: Subscription;
  private sun_upDate$: Subscription;
  private subscriptions: Subscription[] = [];

  constructor(
    private simpleService: ServicesService,
    private headerService : HeaderCounter,
    private api: AipHandlers,
    private Notification_Service: NotificationService
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

    (itemCount <= 1) ? this.simpleService.delete(true, modal_delete.item) : null;
  }

  onDelete(value: boolean): void {
    this.price = Operation.totalPrice(this.items);

    if (!value) {
      this.items = Operation.removeItem(this.items, this.getItem.bookId, this.headerService);

      (Operation.isCheckAcc()) ? this.onUpDateCart() : null;
    }
  }

  onUpDateCart():void {

    if (Operation.isCheckAcc()) {
      const{ authId } = LocalService.getUserDate();

     this.sub_getItem$ = this.api.getProduct().subscribe((el:CartItem | any): void => {
        const { idCart } = Operation.dynamicKeyHttp(el, authId);

      this.sun_upDate$ = this.api.upDateCart(idCart, this.items, authId).subscribe({
          next:() => {
            this.Notification_Service.Notification(true, this.isUpDate, false);
          },

          error:() => {
            this.Notification_Service.Notification(true, this.errorCart, true);
          }
        });
        this.subscriptions.push(this.sun_upDate$);
      });
      this.subscriptions.push(this.sub_getItem$);

    } else this.simpleService.Registration(true);
  }

  ngOnDestroy(): void {
    this.simpleService.isDelete$.unsubscribe();
    this.subscriptions.forEach(destroy$ => destroy$.unsubscribe());
  }
}
