import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Operation } from '../shard/function/function';
import { LocalService } from '../shard/local-storage-service/local-storage';
import { ServicesService } from '../shard/services/services.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
 countCart: number = 0;

  constructor(
    private simpleService: ServicesService,
    private routing: Router,
    ) {}

  ngOnInit(): void {
    this.countCart = LocalService.countNumber();
    this.simpleService.count$.subscribe((count) => this.countCarts(count));
  }

  countCarts(data: number): void {
    this.countCart = data;
  }

  onOut(): void {
    LocalService.onRemove();
  }

  onAccount(): void {
    (Operation.isCheckAcc()) ?
      this.routing.navigate(['account']) :
      this.simpleService.Registration(true);
  }

}
