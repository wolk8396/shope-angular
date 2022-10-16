import { Component, Input, OnInit, OnChanges, DoCheck, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { InputModal, Product } from '../../interface/interface-const';
import { LocalService } from '../../local-storage-service/local-storage';

@Component({
  selector: 'app-modal-items',
  templateUrl: './modal-items.component.html',
  styleUrls: ['./modal-items.component.scss']
})
export class ModalItemsComponent implements OnInit, OnChanges {
  item: Product | undefined;
  countItems: number = 0;
  element: Product | undefined;

  constructor(
    private routing: Router
  ) { }

  @Input() isModal: boolean;
  @Input() isItem: Product | undefined;
  @Input() date: InputModal;



  ngOnChanges(changes: SimpleChanges) {
    this.countItems = LocalService.countNumber();
  }


  ngOnInit(): void {
    this.isModal = false;

  }

  toCart() {
    this.routing.navigate(['cart']);
  }
}
