import { Component, Input, OnInit } from '@angular/core';
import { LocalService } from '../shard/local-storage-service/local-storage';
import { ServicesService } from '../shard/services/services.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements OnInit {
 countCart: number = 0;

  constructor(private readonly simpleService: ServicesService) {}

  ngOnInit(): void {
    this.countCart = LocalService.countNumber();
    this.simpleService.count$.subscribe((count) => this.countCarts(count));
  }

  countCarts(data: number):void {
    this.countCart = data;
  }

}
