import { Component, OnDestroy, OnInit} from '@angular/core';
import { NotificationService } from '../services/notification.service';
import { ServicesService } from '../services/services.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss'],
})
export class NotificationsComponent implements OnInit, OnDestroy {
  massage: string = '';
  isShow: boolean = false;
  error:boolean = false;

  constructor(
    private Notification_Service: NotificationService
  ) { }

  ngOnInit(): void {
    this.Notification_Service.isShowMassage$.subscribe((isboolean) => {
      this.isShow = isboolean;

      setTimeout(() => this.isShow = false, 7000);
    });

    this.Notification_Service.isMassages$.subscribe((gteMassage) => {
      this.massage = gteMassage;
    });

    this.Notification_Service.error$.subscribe((errorColor) => {
      this.error = errorColor;
    })

  }

  ngOnDestroy(): void {
    this.Notification_Service.isShowMassage$.unsubscribe();
    this.Notification_Service.isMassages$.unsubscribe();
    this.Notification_Service.error$.unsubscribe();
  }

}
