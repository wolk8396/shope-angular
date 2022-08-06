import { Component, Input, OnInit, OnChanges, DoCheck } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from '../../interface/interface-const';
import { LocalService } from '../../local-storage-service/local-storage';

@Component({
  selector: 'app-modal-items',
  templateUrl: './modal-items.component.html',
  styleUrls: ['./modal-items.component.scss']
})
export class ModalItemsComponent implements OnInit, OnChanges, DoCheck {
  item:Product;
  countItems:number = 0;
  constructor(
    private routing: Router
  ) { }

  @Input() isModal: boolean;
  @Input() isItem: Product;

  ngOnChanges() {
    this.isModal = true;
    this.countItems = LocalService.countNumber();
  }

  ngOnInit(): void {
    this.isModal = false;
    console.log(this.isItem);
  }


  ngDoCheck() {

  }


  toCart() {
    this.routing.navigate(['cart'])
  }
}
