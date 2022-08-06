import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '../interface/interface-const';

@Pipe({
  name: 'totalPrice'
})

export class TotalPricePipe implements PipeTransform {

  transform(number: number, product:Product[]): number | string {
     return number = product.reduce((acc, {cost, count}) => acc +( cost * count), 0);
  }
}
