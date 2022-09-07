import { Component, Input, OnInit, OnChanges, DoCheck, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from '../../interface/interface-const';
import { LocalService } from '../../local-storage-service/local-storage';

@Component({
  selector: 'app-modal-items',
  templateUrl: './modal-items.component.html',
  styleUrls: ['./modal-items.component.scss']
})
export class ModalItemsComponent implements OnInit, OnChanges {
  item:Product | undefined;
  countItems:number = 0;

  constructor(
    private routing: Router
  ) { }

  @Input() isModal: boolean;
  @Input() isItem: Product | undefined;


  ngOnChanges(changes: SimpleChanges) {
    // this.isModal;
    this.countItems = LocalService.countNumber();
  }


  ngOnInit(): void {
    this.isModal = false;
    console.log('OnIint');
  }

  toCart() {
    this.routing.navigate(['cart']);
    console.log('fuck');

  }
}
