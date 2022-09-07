import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class HeaderCounter {
  count$ = new Subject<number>();

  changeCount(count: number): void {
    this.count$.next(count);
  }
}
