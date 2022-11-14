import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { massage_error } from '../../shard/const/const';
import { Operation } from '../../shard/function/function';
import { SignInResponse, UserDate2 } from '../../shard/interface/interface-const';
import { LocalService } from '../../shard/local-storage-service/local-storage';
import { AipHandlers, CartItem } from '../../shard/services/aip-handlers';
import { ServicesService } from '../../shard/services/services.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit, OnDestroy {
  form: FormGroup;
  title: string = 'SIGN-IN'
  tsr_title: string = 'New to bookshop? :'
  error_email: string = massage_error.email;
  error_required: string = massage_error.required;
  error_password: string = massage_error.password;
  error: string = '';
  dateUser: UserDate2[] | any = [];
  isShow: boolean = false;
  isCheck: boolean = false;
  isGoods: CartItem[] |  CartItem;
  destroy_date$: Subject<void> = new Subject<void>();
  destroy_upDate$: Subject<void> = new Subject<void>();

  constructor(
    private routing: Router,
    private api: AipHandlers,
    private  simpleService: ServicesService,
    ) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password:new FormControl('', [Validators.required, Validators.minLength(8)]),
    })
  }

  async onSignIn(): Promise<void> {

    if (this.form.valid) {
      const {email, password} = this.form.value;
      let idUser: string = '';
      this.isShow = !this.isShow;

     await this.api.signInRequest(email, password)
        .then(({ user: { accessToken, uid } }: SignInResponse | any): void => {
          idUser = uid;
          LocalService.setToken(accessToken);
          this.isCheck = true;
        }).catch(() => {
          this.isShow = false;
          this.error = massage_error.error
        });

      if(this.isCheck) {
        this.api.getUsersDate().pipe(takeUntil(this.destroy_date$)).subscribe({
          next: ((usersDate) => {
            this.dateUser = Operation.responseMapper(usersDate, 'idLink')
                                     .find(({authId}) => authId === idUser);
              LocalService.setUserDate(this.dateUser);
              this.onSetItems(idUser)
          }),

          complete: (() => {
            this.routing.navigate(['/']);
          })
        })
      }
    }
  }

  onSetItems(idUser: string): void {
      this.api.getProduct().pipe(takeUntil(this.destroy_upDate$)).subscribe({
        next: ((update) => {
          const { goods } = Operation.responseMapper(update, 'idCart')
                                     .find(({userId}) => userId === idUser);

          this.simpleService.changeCount(goods.length);
          LocalService.saveData(goods);
        }),
      })
  }

  isLink(): void {
    this.routing.navigate(['sign-up']);
  }

  ngOnDestroy(): void {
    this.destroy_date$.next();
    this.destroy_upDate$.complete();
    this.destroy_upDate$.next();
    this.destroy_upDate$.complete();
  }
}
