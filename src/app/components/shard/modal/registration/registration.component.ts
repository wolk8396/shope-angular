import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServicesService } from '../../services/services.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  isShowModal: boolean = false;
  title:string = 'Please log in or register'

  constructor(
    private routing: Router,
    private simpleService: ServicesService,
  ) { }

  ngOnInit(): void {
    this.simpleService.isShowModal$.subscribe((isboolean) => {
      this.isShowModal = isboolean;
    })
  }

  onSign_in(): void {
    this.isShowModal = !this.isShowModal
    this.routing.navigate(['sign-in']);
  }

  onSign_up():void {
    this.isShowModal = !this.isShowModal
    this.routing.navigate(['sign-up']);
  }

}
