import { Component, Input, OnInit } from '@angular/core';
import { ServicesService } from '../services/services.service';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss']
})
export class SpinnerComponent implements OnInit {


  constructor(
    protected simpleService: ServicesService,
  ) { }

  @Input() isSpinner: boolean;

  ngOnInit(): void {

  }

}
