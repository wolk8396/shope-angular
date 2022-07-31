import { Component, OnInit, Pipe } from '@angular/core';
import { HomeComponent } from '../../home/home.component';
import { Operation } from '../function/function';
import { Product } from '../interface/interface-const';
import { books } from '../product/books';

@Component({
  selector: 'app-search-product',
  templateUrl: './search-product.component.html',
  styleUrls: ['./search-product.component.scss']
})

export class SearchProductComponent implements OnInit {
  str: string = '';
  valueIn: string = '';
  filter: Product[] = [];
  text: string = '';
  category: Array<string> = ['All', 'Novels', 'Science Fiction', 'fantasy', 'Harry Potter', 'other'];
  arr: Product[] = Operation.dynamicKey();

  constructor(public homeComponent: HomeComponent) { }

  ngOnInit(): void {}


  checkStr(value:string) {
    this.valueIn = value;

    (this.valueIn === '') ? this.homeComponent.filter(this.arr) : null;

  }

 filterProduct1(): void {
  this.filter = this.arr.filter(item => item.product.toLowerCase().includes(this.str.toLowerCase()));

    (this.str === '') ?
      this.homeComponent.filter(this.arr) :
      this.homeComponent.filter(this.filter)
  }

  changeCategory(str1: string): void {
    this.text =  str1;
    this.filter =this.arr.filter(item => item.category === this.text);
    console.log( this.filter);

    this.homeComponent.filter(this.filter);

    (this.text === 'All') ?
      this.homeComponent.filter(this.arr) :
      this.homeComponent.filter(this.filter);
  }
}
