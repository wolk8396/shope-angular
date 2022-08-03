import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '../interface/interface-const';

@Pipe({
  name: 'filterProducts'
})

export class FilterProductsPipe implements PipeTransform {

  transform(books: Product[], str: string): Product[] {
     return  books.filter(item => item.product.toLowerCase().includes(str.toLowerCase()))
  }

}
