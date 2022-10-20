import { Component, OnInit,  OnDestroy, AfterContentInit, AfterContentChecked } from '@angular/core';
import { Router } from '@angular/router';
import { InputModal, Product } from '../../interface/interface-const';
import { LocalService } from '../../local-storage-service/local-storage';
import { ItemService } from './modal-items-service';

@Component({
  selector: 'app-modal-items',
  templateUrl: './modal-items.component.html',
  styleUrls: ['./modal-items.component.scss']
})
export class ModalItemsComponent implements OnInit, OnDestroy, AfterContentChecked {
  isItem: Product;
  isModal: boolean = false;
  countItems: number = 0;
  element: Product | undefined;

  constructor(
    private routing: Router,
    private serviceItem: ItemService
  ) { }

  ngOnInit(): void {
    this.serviceItem.isItemValue$.subscribe(res => this.isModal = res);
    this.serviceItem.isItems$.subscribe(res => this.isItem = res);
  }

  ngAfterContentChecked(): void {
    this.countItems = LocalService.countNumber();
  }

  ngOnDestroy(): void {
    this.serviceItem.isItemValue$.unsubscribe();
    this.serviceItem.isItems$.unsubscribe();
  }

  toCart() {
    this.isModal = !this.isModal;
    this.routing.navigate(['cart']);
  }

}
