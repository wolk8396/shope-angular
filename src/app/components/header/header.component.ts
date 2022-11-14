import { Component, DoCheck, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Operation } from '../shard/function/function';
import { LocalService } from '../shard/local-storage-service/local-storage';
import { HeaderCounter } from '../shard/services/header.servis';
import { ServicesService } from '../shard/services/services.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  providers: [ServicesService, HeaderCounter]
})
export class HeaderComponent implements OnInit, OnDestroy {
 countCart: number = LocalService.countNumber();

  constructor(
    private  service: ServicesService,
    private header: HeaderCounter,
    private routing: Router,
    ) {}

  ngOnInit(): void {
    this.countCart = LocalService.countNumber();
    this.header.count$.subscribe((count) => this.countCarts(count));
  }

  countCarts(data: number):void {
    this.countCart = data;
  }

  onOut(): void {
    LocalService.onRemove();
  }

  onAccount(): void {
    (Operation.isCheckAcc()) ?
      this.routing.navigate(['account']) :
      this.service.Registration(true);
  }

  ngOnDestroy(): void {
    console.log('heder');
    this.header.count$.unsubscribe();
  }

}
