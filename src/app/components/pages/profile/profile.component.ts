import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { upUser_massage } from '../../shard/const/const';
import { UserDate } from '../../shard/interface/interface-const';
import { LocalService } from '../../shard/local-storage-service/local-storage';
import { NotificationsComponent } from '../../shard/notifications/notifications.component';
import { AipHandlers } from '../../shard/services/aip-handlers';
import { AccountService } from '../../shard/services/routing-service';
import { ServicesService } from '../../shard/services/services.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  providers: []
})
export class ProfileComponent implements OnInit, OnDestroy {
  form: FormGroup;
  getUserDate: UserDate;
  firstName: string = '';
  lastName: string = '';
  birth: string = '';
  city: string | undefined;
  country: string | undefined;
  isAccount: boolean = false;
  additional :FormArray;
  destroy$: Subject<void> = new Subject<void>();

  constructor(
    private routing: Router,
    private service: ServicesService,
    private showAccount: AccountService,
    private api: AipHandlers,
  ) { }

  ngOnInit(): void {
    this.onSetValue();
    this.onForm();
  }

  onSetValue (): void {
    this.getUserDate = LocalService.getUserDate();

    this.firstName = this.getUserDate.first_name;
    this.lastName = this.getUserDate.last_name;
    this.birth = this.getUserDate.birth;
    this.city = this.getUserDate.city;
    this.country = this.getUserDate.country;

    this.onCheckOut(this.getUserDate, 'city',  this.city);
    this.onCheckOut(this.getUserDate, 'country',  this.country);
  }

  onCheckOut (date: UserDate, str: string, strValue: string | undefined): void {
    (date[str] !== undefined) ? strValue = date[str] : strValue;
  }

  onSubmit(): void {
    const {update, error} = upUser_massage;

    this.getUserDate = LocalService.getUserDate();
    this.getUserDate = Object.assign(this.getUserDate, this.form.value)


    this.api.upDateUser(this.getUserDate.idLink, this.getUserDate)
        .pipe(takeUntil(this.destroy$)).subscribe({
            next: () => {
              this.service.Notification(true, update, false);
              LocalService.setUserDate(this.getUserDate);
            },

            error: () => {
              this.service.Notification(true, error, true);
            }
          });
  }

  onForm (): void {
    this.form = new FormGroup({
      first_name: new FormControl(this.firstName),
      last_name: new FormControl(this.lastName),
      birth: new FormControl(this.birth),
      country: new FormControl(this.country),
      city: new FormControl(this.city),
      addInform: new FormArray([])
    })

    this.additional = this.form.controls["addInform"] as FormArray
  }

  onBack () {
    this.routing.navigate(['account']);
    this.isAccount =!this.isAccount;

    this.showAccount.showAccount(false);
  }


  onAddDate () {
    const control = new FormControl('');
    this.additional.push(control)
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
