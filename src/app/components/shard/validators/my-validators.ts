import { FormControl } from "@angular/forms";
import { massage_advance, REGEX } from "../const/const";

export class MyValidator {

  static MatchPassword(control: FormControl ):{[key: string]: boolean} | null {
    let password_value: string = control.root.get('password_1')?.value;

    if(![password_value].includes(control.value)) {
      return {repeatPassword: true}
    } else {
      return null;
    }
  }

  static PasswordCheck(control: FormControl):{[key: string]: boolean | string }| null {
    const lower_case: any  = (REGEX.lower_case.test(control.value));
    const number:  boolean = REGEX.numbers.test(control.value);
    const upper_case: boolean = REGEX.upper_case.test(control.value);
    const EIGHT_CHARACTERS: boolean = REGEX.EIGHT_CHARACTERS.test(control.value);
    const { lowercase, numbers, uppercase, characters } = massage_advance;

    if (!lower_case) {
      return {PasswordCheck: true, massage: lowercase};
    } else if(!number) {
      return {PasswordCheck: true, massage: numbers};
    } else if(!upper_case) {
      return {PasswordCheck: true, massage: uppercase};
    } else if(!EIGHT_CHARACTERS) {
      return {PasswordCheck: true, massage: characters};
    }

    return null;
  }

}
