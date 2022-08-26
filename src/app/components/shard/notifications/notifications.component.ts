import { Component, OnInit} from '@angular/core';
import { ServicesService } from '../services/services.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent implements OnInit {
  massage: string = '';
  isShow: boolean = false;
  error:boolean = false;

  constructor(
    private simpleService: ServicesService,
  ) { }

  ngOnInit(): void {
    this.simpleService.isShowMassage$.subscribe((isboolean) => {
      this.isShow = isboolean;

      setTimeout(() => this.isShow = false, 7000);
    });

    this.simpleService.isMassages$.subscribe((gteMassage) => {
      this.massage = gteMassage;
    });

    this.simpleService.error$.subscribe((errorColor) => {
      console.log(errorColor);

       this.error = errorColor;
    })

  }

}
