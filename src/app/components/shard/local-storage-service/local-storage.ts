import { DateStorage } from "../const/const";
import { Product, UserDate } from "../interface/interface-const";


export class LocalService {

  constructor() {}

  public saveData(el:Product[]): void {
    localStorage.setItem("products", JSON.stringify(el));
  }

  public getData(): Product[] {
    return JSON.parse(localStorage.getItem('products') || '[]')
  }

  static countNumber(): number {
    const arr: Product[] = JSON.parse(localStorage.getItem('products') || '[]');
    return arr.length;
  }

  static setToken(accessToken: string): void {
   localStorage.setItem('accessToken', accessToken);
  }

  static setUserDate(date: UserDate):void {
    console.log(date);

    localStorage.setItem('UserDate', JSON.stringify(date));
  }

  static onRemove() {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('UserDate');
    localStorage.removeItem(DateStorage)
  }

  static getUserDate(): UserDate {
    return JSON.parse(localStorage.getItem('UserDate') || '[]')
  }

  static getDateAll():any {
    return JSON.parse(localStorage.getItem(DateStorage) || '[]')
  }
}
