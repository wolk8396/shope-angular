import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  value$ = new Subject<boolean>();

  showAccount(isBoolean: boolean): void {
    this.value$.next(isBoolean);
  }
}
