import { FormControl } from "@angular/forms";
import { massage_advance, REGEX } from "../const/const";

export class MyValidator {

  static MatchPassword(control: FormControl ):{[key: string]: boolean} | null {
    let password_value: string = control.root.get('password_1')?.value;
    let  password_value_2: string = control.root.get('password_2')?.value;

    if(![password_value].includes(password_value_2)) {
      return {repeatPassword: true}
    } else {
      return null;
    }
  }

  static PasswordCheck(control: FormControl):{[key: string]: boolean | string }| null {
    const lower_case: boolean = REGEX.lower_case.test(control.value);
    const number: boolean  = REGEX.numbers.test(control.value);
    const upper_case: boolean = REGEX.upper_case.test(control.value);
    const EIGHT_CHARACTERS: boolean = REGEX.EIGHT_CHARACTERS.test(control.value);

    if (!lower_case) {
      return {PasswordCheck: lower_case, massage:'lowercase'}
    } else if(!number) {
      return {PasswordCheck: number, massage: 'numbers'}
    } else if(!upper_case) {
      return {PasswordCheck: upper_case, massage: 'uppercase'}
    } else if(!EIGHT_CHARACTERS) {
      return {PasswordCheck: EIGHT_CHARACTERS, massage: 'characters'}
    } else {
      return null;
    }
  }

}
