import { Component, OnChanges, OnDestroy, OnInit} from '@angular/core';
import { UserDate } from '../../shard/interface/interface-const';
import { Url_img } from '../../shard/url-img/url-photo';
import { LocalService } from '../../shard/local-storage-service/local-storage';
import { ServicesService } from '../../shard/services/services.service';
import { modal_delete } from '../../shard/const/const';
import { AipHandlers } from '../../shard/services/aip-handlers';
import { Operation } from '../../shard/function/function';
import { Router } from '@angular/router';
import { AccountService } from '../../shard/services/routing-service';
import { Subscription } from 'rxjs/internal/Subscription';
import { Subject } from 'rxjs';


@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss'],
  providers: [ServicesService]
})
export class AccountComponent implements OnInit, OnDestroy {
  avatar: string  = '';
  dateUser: UserDate;
  fullName: string = '';
  date: Date | undefined;
  isUrl: string = '/account/profile';
  birth: string = '';
  email: string = '';
  city: string | undefined = '';
  country: string = '';
  address: string = '';
  isMouse: boolean = true;
  isModal: boolean;
  getDate: UserDate;
  isProfile: boolean = false;
  private sub_upDateUser$: Subscription;
  private subscriptions: Array<Subject<boolean> | Subscription> = [];


  constructor(
    private simpleService: ServicesService,
    private api: AipHandlers,
    private routing: Router,
    private account: AccountService
  ) { }

  ngOnInit(): void {
    this.account.value$.subscribe((res)=> this.onShowAccount(res));
    this.onCheckPage(this.isUrl);
    this.getDateUser();
    this.onSetAvatar();
    this.simpleService.isDelete$.subscribe((value) => this.onDelete(value));
    this.subscriptions.push(this.account.value$, this.simpleService.isDelete$);
    this.isProfile = false;
    console.log(this.isProfile);
  }

  getDateUser(): void {
    this.dateUser = LocalService.getUserDate();

    const {
      first_name,
      last_name,
      date, birth,
      email,
      city,
      country
    } = this.dateUser;

    this.fullName = `${first_name} ${last_name}`
    this.birth = birth;
    this.date = date;
    this.email = email;
    this.address = '---';

    (city === undefined) ?
      this.city = '---': this.city = city;

    (country === undefined) ?
      this.country = '---': this.country = country
  }

  onAddPhoto(): void {
    this.isModal = true;
  }

  onHiddenModal(event: boolean): void {
    this.isModal = event;
    this.onSetAvatar();

  }

  onRemovePhoto(): void {
    this.simpleService.delete(true, modal_delete.photo);
  }

  onDelete(value: boolean): void {
    this.getDate = LocalService.getUserDate();

    if (value === false) {
      this.api.onDeletePhoto(this.getDate.photoUrl)
      this.getDate = Operation.onSetPhoto(this.getDate, 'none')
      this.sub_upDateUser$ = this.api.upDateUser(this.getDate.idLink, this.getDate).subscribe();
      this.onSetAvatar();
      this.subscriptions.push(this.sub_upDateUser$);
    }
  }

  onSetAvatar(): void {
    const{photoUrl} = LocalService.getUserDate();

    (photoUrl !== 'none') ?
      this.avatar = photoUrl :
      this.avatar = Url_img.avatar
  }

  goToProfile (): void {
    this.isProfile = !this.isProfile
    this.routing.navigate(['account','profile']);
  }

  onShowAccount(value: boolean) {
    this.isProfile = value;
    console.log(this.isProfile, 'on');
    this.getDateUser();
  }

  onCheckPage(url: string) {
    (this.routing.url === url) ?
      this.isProfile = true : this.isProfile = false
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(destroy$ => destroy$.unsubscribe());
  }
}
