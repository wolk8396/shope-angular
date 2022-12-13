import { Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { upUser_massage } from '../const/const';
import { UserDate } from '../interface/interface-const';
import { LocalService } from '../local-storage-service/local-storage';
import { AipHandlers } from '../services/aip-handlers';
import { NotificationService } from '../services/notification.service';
import { ServicesService } from '../services/services.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  providers:[ServicesService, NotificationService]
})
export class ProfileComponent implements OnInit, OnDestroy {
  form: FormGroup;
  getUserDate: UserDate;
  firstName: string = '';
  lastName: string = '';
  birth: string = '';
  city: string | undefined;
  country: string | undefined;
  isProfile: boolean = false;
  additional :FormArray;
  destroy$: Subject<void> = new Subject<void>();

  constructor(
    private api: AipHandlers,
    private Notification_Service: NotificationService
  ) {}

  @Output() isHiddenProfile = new EventEmitter<boolean>();

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
    const obj = Object.assign(LocalService.getUserDate())
    const date = LocalService.getUserDate();
    const joinDate: UserDate = Object.assign(date, this.form.value);

    this.api.upDateUser(joinDate.idLink, joinDate)
        .pipe(takeUntil(this.destroy$)).subscribe({
            next: () => {
              LocalService.setUserDate(obj);
              this.Notification_Service.Notification(true, update, false);
            },

            error: () => {
              this.Notification_Service.Notification(true, error, true);
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
    })
  }

  onBack () {
    this.isHiddenProfile.emit(false);
  }

  onAddDate () {
    const control = new FormControl('');
    this.additional.push(control)
  }

  ngOnDestroy(): void {
    this.destroy$.next();
  }

}
