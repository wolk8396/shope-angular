import { Component, EventEmitter, OnInit, Output} from '@angular/core';
import { Operation } from '../function/function';
import { Product } from '../interface/interface-const';

@Component({
  selector: 'app-search-product',
  templateUrl: './search-product.component.html',
  styleUrls: ['./search-product.component.scss']
})

export class SearchProductComponent implements OnInit{
  strInput: string = '';
  valueIn: string = '';
  filter: Product[] = [];
  category: Array<string> = ['All', 'Novels', 'Science Fiction', 'fantasy', 'Harry Potter', 'other'];
  searchField: string = 'product'
  arr: Product[] = [];

  constructor() { }

  @Output() sendProduct = new EventEmitter<Product[]>();

  ngOnInit(): void {
    console.log(this.searchField);
   }

  checkStr(value: string) {
    this.valueIn = value;
    this.arr = Operation.dynamicKey();
    (value === '') ? this.sendProduct.emit(this.arr): null;
  }

  filterProduct1(): void {
    this.arr = Operation.dynamicKey();

    this.filter = this.arr.filter(item =>{
      return item[this.searchField].toLowerCase().includes(this.valueIn.toLowerCase())
    });

    (this.valueIn === '') ?
      this.sendProduct.emit(this.arr) :
      this.sendProduct.emit(this.filter);
  }

  changeCategory(str: string): void {
    this.arr = Operation.dynamicKey();
    this.filter = this.arr.filter(item => item.category === str);

    (str === 'All') ?
      this.sendProduct.emit(this.arr) :
      this.sendProduct.emit(this.filter);
  }
}
