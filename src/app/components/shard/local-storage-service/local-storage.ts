import { Product } from "../interface/interface-const";


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
}
