import { Product, UserBasket } from "../interface/interface-const";
import { LocalService } from "../local-storage-service/local-storage";
import { books } from "../product/books";
import { CartItem } from "../services/aip-handlers";

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
    const num: any = new Map <string, number> ();

    getItems.forEach(item => dateMap.set(item.bookId, item.bookId));
    getItems.forEach(item =>num.set(item.bookId, item.count));

    const arr:Product[] = books.map(item => {
      return (item.bookId === dateMap.get(item.bookId) ) ?
        {...item, exist: true, count:num.get(item.bookId)} : {...item, exist: false}
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

  static inputChange(items: Product[], id: string, num: number): Product[] {
    return items.map(item => {
      return (item.bookId === id) ? {...item, count: num} : {...item}
     })
  }

  static responseMapper(response: {[key: string]: any}, dynamicKey: string): any[] {
    return Object.keys(response).map(key => ({ ...response[key], [dynamicKey]: key}));
  }

  static dynamicKeyHttp(el:CartItem | any, id: string): CartItem {
    return Object.keys(el).map((users) => ({...el[users], idCart:users}))
                          .find(({userId}) => userId ===  id);
  }
}
