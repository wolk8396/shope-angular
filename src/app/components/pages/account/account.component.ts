import { Component, OnInit } from '@angular/core';
import { UserDate } from '../../shard/interface/interface-const';
import { Url_img } from '../../shard/url-img/url-photo';
import { LocalService } from '../../shard/local-storage-service/local-storage';
import { ServicesService } from '../../shard/services/services.service';
import { modal_delete } from '../../shard/const/const';
import { AipHandlers } from '../../shard/services/aip-handlers';
import { Operation } from '../../shard/function/function';


@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {
  avatar: string  = '';
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
  getDate: UserDate;


  constructor(
    private simpleService: ServicesService,
    private api: AipHandlers,
  ) { }

  ngOnInit(): void {
    this.getDateUser();
    this.onSetAvatar();
    this.simpleService.isDelete$.subscribe((value) => this.onDelete(value));
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
      this.api.upDateUser(this.getDate.idLink, this.getDate).subscribe();
      this.onSetAvatar();
    }
  }



  onSetAvatar(): void {
    const{photoUrl} = LocalService.getUserDate();

    (photoUrl !== 'none') ?
      this.avatar = photoUrl :
      this.avatar = Url_img.avatar
  }

}
