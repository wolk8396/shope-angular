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
  pass_1: string = '';
  pass_2: string = '';
  str_massages: string = '';
  error_str: string = '';
  completed: string = massage_advance.completed;


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
      password_2: new FormControl(null, [Validators.required, MyValidator.MatchPassword]),
    })

  }

  ngDoCheck(): void {
    console.log(this.form);

    this.str_massages = this.form.get('password_1')?.errors?.massage;
    (this.form.value.password_1 === '') ? this.error_str = '' :
      this.error_str = massage_advance[this.str_massages];
  }

  onSubmit(): void {

    if (this.form.valid) {
      console.log('submit', this.form);

      console.log({...this.form.value});
      this.form.reset();
      this.routing.navigate(['']);
    }
  }

  onSign_in () {
    this.routing.navigate(['sign-in']);
  }

}
