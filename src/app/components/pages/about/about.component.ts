import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { BehaviorSubject, of, Subject } from 'rxjs';
import { Operation } from '../../shard/function/function';
import { commentUser, createToDo, InputModal, Product } from '../../shard/interface/interface-const';
import { LocalService } from '../../shard/local-storage-service/local-storage';
import { AipHandlers, CartItem } from '../../shard/services/aip-handlers';
import { HeaderCounter } from '../../shard/services/header.servis';
import { ServicesService } from '../../shard/services/services.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
  providers: [ServicesService]
})
export class AboutComponent implements OnInit {
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

  constructor(
    private routerActive:ActivatedRoute,
    private routing: Router,
    private headerService : HeaderCounter,
    private service: ServicesService,
    private api: AipHandlers,
  ) { }

  ngOnInit(): void {
    this.service.Registration(true);

    this.routerActive.params.subscribe((params: Params) => {
      this.item = this.service.FindBookPage(params.product);
    });

    this.onRedirect(this.item);
    this.onSetStr();
    this.onChangeBtn();
  }

  onRedirect(item: Product | undefined): void {
    (item === undefined) ? this.routing.navigate(['**']) : null;
  }

  onSetDateModal(element: Product | undefined, flag: boolean): InputModal {
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
    this.isItem = this.item;

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
      this.api.getProduct().subscribe({
        next: (el) => {
          const { idCart } = Operation.dynamicKeyHttp(el, authId);
          this.isSpinner = false;
          this.api.upDateCart(idCart, this.#product, authId).subscribe();
        },
        complete: () => {
          this.onSetDateModal(el, true);
          this.isOpen = !this.isOpen;
        }
      })

    } else {
      this.isOpen = !this.isOpen;
      this.onSetDateModal(el, true);
    }
  }


  onOpenModal (value: createToDo | any): void {
    this.service.Registration(value.value);
    this.post.push(value.date);

    // if (!value.value) {
    //  this.api.addComment(value.date).subscribe()

    // }
  }

}
