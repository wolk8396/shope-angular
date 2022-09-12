import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { Operation } from "../function/function";

@Injectable({providedIn: 'root'})

export class AuthGuard implements CanActivate {

  constructor(
    private routing: Router,
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean > {
    if (Operation.isCheckAcc()) {
      return true;
    } else {
      this.routing.navigate(['/'], {
        queryParams: {
          isAuth: false
        }
      });
      return false
    }

  }
}
