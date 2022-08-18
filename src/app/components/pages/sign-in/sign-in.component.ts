import { Component, OnInit, Type } from '@angular/core';
import { object } from '@angular/fire/database';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable} from 'rxjs';
import { map, filter, switchMap, observeOn, tap, take, takeLast, takeWhile, scan, reduce, find, last} from "rxjs/operators";
import { massage_advance, massage_error } from '../../shard/const/const';
import { SignInResponse, UserDate, UserDate2 } from '../../shard/interface/interface-const';
import { LocalService } from '../../shard/local-storage-service/local-storage';
import { AipHandlers } from '../../shard/services/aip-handlers';


@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
  form: FormGroup;
  title: string = 'SIGN-IN'
  tsr_title: string = 'New to bookshop? :'
  error_email:string = massage_error.email;
  error_required: string = massage_error.required;
  error_password: string = massage_error.password;
  error:string = '';
  dateUser:UserDate2[] | any = [];
  isCheck: boolean = false;
  streamGetUsers$: Observable<UserDate2[]>


  constructor(
    private routing: Router,
    private api: AipHandlers
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
      let userId: string = '';

     await this.api.signInRequest(email, password)
        .then(({ user: { accessToken, uid } }: SignInResponse | any): void => {
          userId = uid;
          LocalService.setToken(accessToken);
          this.isCheck = true
        }).catch(() => this.error = massage_error.error);

      if(this.isCheck) {
        this.api.getUsersDate().subscribe((usersDate): void => {
          this.dateUser = Object.keys(usersDate)
              .map((users: any) => ({...usersDate[users], idLink:users}))
              .find(({authId}) => authId === userId);

          LocalService.setUserDate(this.dateUser);
          this.routing.navigate(['/']);
        })
      }
    }

  }

  isLink() {
    this.routing.navigate(['sign-up']);
  }
}


