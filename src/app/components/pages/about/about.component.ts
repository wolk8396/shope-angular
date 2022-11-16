import { Component, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { BehaviorSubject, of, Subject, Subscription, takeUntil } from 'rxjs';
import { Operation } from '../../shard/function/function';
import { commentUser, createToDo, InputModal, Product, UserDate, UserDate2 } from '../../shard/interface/interface-const';
import { LocalService } from '../../shard/local-storage-service/local-storage';
import { ItemService } from '../../shard/modal/modal-items/modal-items-service';
import { AipHandlers, CartItem } from '../../shard/services/aip-handlers';
import { HeaderCounter } from '../../shard/services/header.servis';
import { ServicesService } from '../../shard/services/services.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
  providers: [ServicesService, ItemService]
})
export class AboutComponent implements OnInit, OnDestroy, OnChanges {
  item: Product | undefined;
  ChangeStr: string = '';
  isFlag: boolean = false;
  isCheckStory: boolean =  false;
  isOpen: boolean;
  isSpinner: boolean = false;
  isItem: Product | undefined;
  countItems: number = LocalService.countNumber();
  #exist: boolean | undefined = false;
  title_btn_add: string = '';
  #product: Product[] = [];
  isHidden$ = new BehaviorSubject<boolean>(false);
  dateModal: InputModal;
  post: commentUser[] = [];
  todo: commentUser[] = [];
  usersDate:UserDate[] = [];
  private sub_users$: Subscription;
  private sun_comment$: Subscription;
  private sub_update$: Subscription;
  private sub_getItems$: Subscription;
  private subscriptions: Subscription[] = [];
  destroy_router$: Subject<void> = new Subject<void>();

  constructor(
    private routerActive:ActivatedRoute,
    private routing: Router,
    private headerService : HeaderCounter,
    private service: ServicesService,
    private api: AipHandlers,
    private serviceItem: ItemService
  ) { }


  ngOnChanges(): void {

  }

  ngOnInit(): void {
    this.onGetComments();
    this.service.Registration(true);

    this.routerActive.params.pipe(takeUntil(this.destroy_router$))
                            .subscribe((params: Params) => {
      this.item = this.service.FindBookPage(params.product);
    });

    this.onRedirect(this.item);
    this.onSetStr();
    this.onChangeBtn();

  }

  onRedirect(item: Product | undefined): void {
    (item === undefined) ? this.routing.navigate(['**']) : null;
  }

  onSetDateModal(_element: Product | undefined, flag: boolean): InputModal {
    this.dateModal = {
      items: this.item,
      value: flag
    }
    return this.dateModal
  }

  onSetStr(): void {
    (this.isFlag) ? this.ChangeStr = 'Less..' : this.ChangeStr = 'More..';
    (this.item?.story === '') ? this.isCheckStory = true : this.isCheckStory = false;
  }

  onOpen(): void {
    this.isFlag = ! this.isFlag;
    this.onSetStr();
  }

  onChangeBtn(): void {
    this.#exist = this.defineCondition()?.exist;
    (this.#exist) ? this.title_btn_add = 'IN YOU CART' : this.title_btn_add = 'ADD TO CART';
  }

  addToCart(): void {
    this.#exist = this.defineCondition()?.exist;

    if (typeof this.item !== 'undefined') {
      this.serviceItem.onShowItemModal(true, this.item)
    }

    if (this.#exist) {
      this.routing.navigate(['cart']);
    } else {
      Operation.setValue(this.item, LocalService);
      this.countItems = LocalService.countNumber();
      this.headerService.changeCount(this.countItems);
      this.upDateCart(this.item);
      this.onChangeBtn();
    }
  }

  defineCondition(): Product | undefined {
    const products : Product [] = LocalService.getData();
    return products.find(({bookId}) => bookId === this.item?.bookId);
  }

  upDateCart(el: Product | undefined): void {
    this.#product = LocalService.getData();
    const { authId } = LocalService.getUserDate();

    if (Operation.isCheckAcc()) {
      this.isSpinner = true;
      this.sub_getItems$ = this.api.getProduct().subscribe({
        next: (el) => {
          const { idCart } = Operation.dynamicKeyHttp(el, authId);
          this.isSpinner = false;
          this.sub_update$ = this.api.upDateCart(idCart, this.#product, authId).subscribe();
          this.subscriptions.push(this.sub_update$)
        },
        complete: () => {
          this.onSetDateModal(el, true);
          this.isOpen = !this.isOpen;
        }
      })
      this.subscriptions.push(this.sub_getItems$)

    } else {
      this.isOpen = !this.isOpen;
      this.onSetDateModal(el, true);
    }
  }

  onOpenModal (value: createToDo | any): void {
    this.service.Registration(value.value);

    if (!value.value) {
      this.api.addComment(value.date).subscribe({
        next: () => {
          this.onGetComments();
        }
      });
    }
  }

  onUpDate(values : any): void {
    const date = new Map();

    this.sub_users$ = this.api.getUsersDate().subscribe({
      next: ((res) => {
        this.usersDate = Object.values(res).filter(({authId}) => authId === values.get(authId));

        this.usersDate.forEach(({authId, first_name, last_name, photoUrl}) => {
          date.set(authId, {first_name, last_name, photoUrl});
        });

        this.post = this.todo.map((item) => {
          const {first_name, last_name, photoUrl} = date.get(item.userId);

          return {...item,
            photoUrl:photoUrl,
            first_name: first_name,
            last_name: last_name
          }
        })
      })
    })
    this.subscriptions.push(this.sub_users$);
  }

  onGetComments(): void {
    const values = new Map();
    const date = new Map();

   this.sun_comment$ = this.api.getComments().subscribe({
      next: ((res) => {
      this.todo = Operation.responseMapper(res, 'item_id')
                              .filter((el) => el.book_id === this.item?.bookId);

        this.todo.forEach(element => values.set(element.userId, element.userId));

        this.onUpDate(values);
      })
    })
    this.subscriptions.push(this.sun_comment$)
  }


  onDelete(value: boolean): void {
    if (value) {
      this.onGetComments()
    }
  }

  ngOnDestroy(): void {
    this.destroy_router$.next();
    this.destroy_router$.complete();
    this.subscriptions.forEach(destroy$ => destroy$.unsubscribe());
  }

}
