import { Component, OnInit } from '@angular/core';
import { UserDate } from '../../shard/interface/interface-const';
import { Url_img } from '../../shard/url-img/url-photo';
import { LocalService } from '../../shard/local-storage-service/local-storage';
import { ServicesService } from '../../shard/services/services.service';
import { modal_delete } from '../../shard/const/const';


@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {
  avatar: string = Url_img.avatar;
  dateUser: UserDate;
  fullName: string = '';
  date: Date | undefined;
  birth: string = '';
  email: string = '';
  city: string = '';
  country: string = '';
  address: string = '';
  isMouse: boolean = false;
  isModal: boolean;

  constructor(
    private simpleService: ServicesService,
  ) { }

  ngOnInit(): void {
    this.getDateUser();
  }

  getDateUser():void {
    this.dateUser = LocalService.getUserDate()
    const{first_name, last_name, date, birth, email} = this.dateUser;
    this.fullName = `${first_name} ${last_name}`
    this.birth = birth;
    this.date = date;
    this.email = email;
    this.city = '---';
    this.country = '---';
    this.address = '---';
  }

  onAddPhoto() {
    this.isModal = true;

    console.log('add', this.isModal);

  }

  onHiddenModal(event: boolean): void {
    this.isModal = event;
    console.log(event, 'e');
  }

  onRemovePhoto() {
    this.simpleService.delete(true, modal_delete.photo);
  }

  onDelete() {
    console.log('account');

  }

}
