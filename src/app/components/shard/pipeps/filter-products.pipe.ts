import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '../interface/interface-const';

@Pipe({
  name: 'filterProducts'
})

export class FilterProductsPipe implements PipeTransform {

  transform(books: Product[], str1: string): Product[] {


    console.log(str1);
     return  books.filter(item => item.product.toLowerCase().includes(str1.toLowerCase()))
  }

}
