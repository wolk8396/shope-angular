import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Product } from '../../shard/interface/interface-const';
import { ServicesService } from '../../shard/services/services.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {
  item: Product | undefined

  constructor(
    private routerActive:ActivatedRoute,
    private routing: Router,
    private service: ServicesService
  ) { }

  ngOnInit(): void {
    this.routerActive.params.subscribe((params: Params) => {
      this.item = this.service.FindBookPage(params.id);
      console.log(this.item);
    })
  }

}
