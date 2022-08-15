import { Pipe, PipeTransform } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { errorsMessages, massage_advance } from '../const/const';


@Pipe({
  name:'errors',
  pure: false
})

export class ErrorPipe implements PipeTransform {
  transform(str: string | undefined, error: string, form: FormGroup): string | undefined {
    const required: boolean = form.get('password_1')?.errors?.required;

    console.log(massage_advance[error]);


    if (required) {
      str = errorsMessages.get('required')
    } else if(form.value.password_1 === '') {
      str = ''
    } else str = massage_advance[error];

    return str;
  }
}

