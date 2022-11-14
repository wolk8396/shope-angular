import { Component, DoCheck, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { errorsMessages, massage_advance } from '../../shard/const/const';
import { AipHandlers } from '../../shard/services/aip-handlers';
import { MyValidator } from '../../shard/validators/my-validators';
import { FormValue, SignInResponse, Product } from '../../shard/interface/interface-const';
import { LocalService } from '../../shard/local-storage-service/local-storage';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit, DoCheck, OnDestroy {
  form: FormGroup;
  error:Map<string, string> = errorsMessages;
  first_name: string | undefined = errorsMessages.get('first_name');
  last_name: string | undefined = errorsMessages.get('last_name');
  required: string | undefined = errorsMessages.get('required');
  email: string | undefined = errorsMessages.get('email');
  password: string | undefined;
  Match_password: string | undefined;
  str_massages: string = '';
  error_str: string = '';
  isPasswordCheck: boolean;
  isShow:boolean = false;
  completed: string = massage_advance.completed;
  sing_in: string = "I've already have an account";
  userId:string = '';
  destroy_user$: Subject<void> = new Subject<void>();
  destroy_addCart$: Subject<void> = new Subject<void>();

  constructor(
    private routing: Router,
    private api: AipHandlers
  ) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      first_name:  new FormControl('', [Validators.required]),
      last_name: new FormControl('', [Validators.required]),
      birth: new FormControl(null, [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password_1: new FormControl('', [Validators.required, MyValidator.PasswordCheck]),
      password_2: new FormControl(null, [Validators.required,  MyValidator.MatchPassword]),
    })
  }

  ngDoCheck(): void {
    this.str_massages = this.form.get('password_1')?.errors?.massage;
    this.isPasswordCheck = this.form.get('password_1')?.errors?.PasswordCheck;
    this.password = this.form.get('password_1')?.errors?.massage;
    this.Match_password = this.error.get('passwords');
  }

  async onSubmit(): Promise<void> {

    if (this.form.valid) {
      const {email, password_1}: FormValue = this.form.value;
      const date: Date = new Date();
      let isRequestCount: number = 0;

      delete this.form.value.password_1;
      delete this.form.value.password_2;
      this.isShow = !this.isShow;

      await this.api.createUserAuthRequest(email, password_1)
        .then(({user}): void => {
          this.form.value['authId'] = user.uid;
          this.form.value['date'] = date;
          this.form.value['photoUrl'] = 'none';
          this.userId = user.uid;
          isRequestCount++
        });

      await this.api.signInRequest(email, password_1)
        .then(({ user: { accessToken} }: SignInResponse | any): void =>  {
          LocalService.setToken(accessToken)
          isRequestCount++
        });

      if (isRequestCount === 2) {
        const addItems: Product[] = LocalService.getData();

        this.api.addUser(this.form.value)
                .pipe(takeUntil(this.destroy_user$)).subscribe((res): void => {

          this.form.value['idLink'] = res.name;
          LocalService.setUserDate(this.form.value);

          this.api.addCart(addItems, this.userId)
                  .pipe(takeUntil(this.destroy_addCart$)).subscribe();
          this.routing.navigate(['/']);
        });
      }
    }
  }

  onSign_in (): void {
    this.routing.navigate(['sign-in']);
  }

  ngOnDestroy(): void {
    this.destroy_user$.next();
    this.destroy_user$.complete();
    this.destroy_addCart$.next();
    this.destroy_addCart$.complete();
  }
}
