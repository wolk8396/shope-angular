import { Product } from "../interface/interface-const";
import { LocalService } from "../local-storage-service/local-storage";
import { books } from "../product/books";

export class Operation {

 static setValue (el: Product, fn: any ): void {
  const getItems: Product[] = new fn().getData();

  let setNewEl: Product[] = [];

  setNewEl = [...getItems, el].map(item => ({...item, exist: true}));

  new fn().saveData(setNewEl);
  }

  static dynamicKey():Product[] {
    const getItems: Product[] =  new LocalService().getData();
    const dateMap: any = new Map <string, string> ();

    getItems.forEach(item => dateMap.set(item.bookId, item.bookId));

    const arr:Product[] = books.map(item => {
      return (item.bookId === dateMap.get(item.bookId) ) ? {...item, exist: true} : {...item, exist: false}
    })

    return arr;
  }

  static countItems(math_sign: number, books: Product, getItems:Product[], str: string): void {

    const count: Product[] = getItems.map(item => {
      if (item.bookId === books.bookId) {
        if (str === '-') {
          item.count = item.count - math_sign;
        } else if(str === '+') {
          item.count = item.count + math_sign
        }
      } else item.count
      return {
        ...item,
        count: item.count,
      }
    })

    new LocalService().saveData(count);
  }

  static removeItem (product:Product[], itemId:string, service: any): Product[] {

    const filterProduct: Product[] = product.filter(({bookId}) => bookId !== itemId);
    new LocalService().saveData(filterProduct);
    let getItems: number = LocalService.countNumber();

    service.changeCount(getItems);
    return filterProduct;
  }

  static totalPrice(product:Product[]): number {
    return product.reduce((acc, {cost, count}) => acc +( cost * count), 0);
  }

  static setBoolean(items: Product[], element: Product, isValue: boolean): Product[] {
    return items.map(el => {
      return (el.bookId === element.bookId) ? ({...el, exist : isValue}) : ({...el})
    })
  }
}
