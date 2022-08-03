import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '../interface/interface-const';

@Pipe({
  name: 'status'
})

export class FilterProductsPipe implements PipeTransform {

  transform(str: string, element: Product): string {
     return element.exist ? str = 'IN YOU CART' : str;
  }
}
