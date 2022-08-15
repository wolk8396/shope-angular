import { Component, DoCheck, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { errorsMessages, massage_advance } from '../../shard/const/const';
import { MyValidator } from '../../shard/validators/my-validators';

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
  pass_1: string = '';
  pass_2: string = '';
  str_massages: string = '';
  error_str: string = '';
  isPasswordCheck: boolean;
  completed: string = massage_advance.completed;
  sing_in: string = "I've already have an account";

  constructor(
    private routing: Router,
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

  onSubmit(): void {

    if (this.form.valid) {
      console.log('submit', this.form);

      console.log({...this.form.value});
      this.form.reset();
      this.routing.navigate(['']);
    }
  }

  onSign_in (): void {
    this.routing.navigate(['sign-in']);
  }

}
