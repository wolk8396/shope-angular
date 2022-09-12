import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { UserDate } from '../../shard/interface/interface-const';
import { LocalService } from '../../shard/local-storage-service/local-storage';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  form: FormGroup;
  getUserDate: UserDate;
  firstName: string = '';
  lastName: string = '';
  birth: string = '';
  city: string = '---';
  country: string = '---';

  constructor() { }

  ngOnInit(): void {
    this.onSetValue();
    this.onForm();
  }

  onSetValue (): void {
    this.getUserDate = LocalService.getUserDate();

    this.firstName = this.getUserDate.first_name;
    this.lastName = this.getUserDate.last_name;
    this.birth = this.getUserDate.birth;

    this.onCheckOut(this.getUserDate, 'city',  this.city);
    this.onCheckOut(this.getUserDate, 'country',  this.country);
  }

  onCheckOut (date: UserDate, str: string, strValue: string): void {
    (date[str] !== undefined) ? strValue = date[str] : strValue;
  }

  onSubmit(): void {
    this.getUserDate = LocalService.getUserDate();

    console.log(Object.assign(this.getUserDate, this.form.value));
  }

  onForm (): void {
    this.form = new FormGroup({
      first_name: new FormControl(this.firstName),
      last_name: new FormControl(this.lastName),
      birth: new FormControl(this.birth),
      country: new FormControl(this.country),
      city: new FormControl(this.city),
    })
  }

}
