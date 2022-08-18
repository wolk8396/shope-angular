import { Component, DoCheck, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { errorsMessages, massage_advance } from '../../shard/const/const';
import { AipHandlers } from '../../shard/services/aip-handlers';
import { MyValidator } from '../../shard/validators/my-validators';
import { UserDate, FormValue, SignInResponse } from '../../shard/interface/interface-const';
import { LocalService } from '../../shard/local-storage-service/local-storage';
import { UserCredential } from '@angular/fire/auth';


@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit, DoCheck {
  form: FormGroup;
  error:Map<string, string> = errorsMessages;
  first_name: string | undefined = this.error.get('first_name');
  last_name: string | undefined = this.error.get('last_name');
  required: string | undefined =  this.error.get('required');
  email: string | undefined = this.error.get('email');
  password: string | undefined;
  Match_password: string | undefined
  str_massages: string = '';
  error_str: string = '';
  isPasswordCheck: boolean;
  completed: string = massage_advance.completed;
  sing_in: string = "I've already have an account";

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

      await this.api.createUserAuthRequest(email, password_1)
        .then(({user}): void => {
          this.form.value['authId'] = user.uid;
          this.form.value['date'] = date;
          isRequestCount++
        })

      await this.api.signInRequest(email, password_1)
        .then(({ user: { accessToken} }: SignInResponse | any): void =>  {
          LocalService.setToken(accessToken)
          isRequestCount++
        })

      if (isRequestCount === 2) {
        this.api.addUser(this.form.value).subscribe((res): void => {
          this.form.value['idLink'] = res.name;
          LocalService.setUserDate(this.form.value);
          this.routing.navigate(['/'])
        });
      }
    }
  }

  onSign_in (): void {
    this.routing.navigate(['sign-in']);
  }

  onDelete() {
    LocalService.onRemove()
  }

}
