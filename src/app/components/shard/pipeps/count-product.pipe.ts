import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '../interface/interface-const';

@Pipe({
  name: 'countProduct'
})

export class CountProductPipe implements PipeTransform {

  transform(prise: number, cost: number, count: number): number {
    return prise = cost * count
  }
}
