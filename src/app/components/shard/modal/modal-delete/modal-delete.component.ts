import { Component, Input, OnInit, OnChanges, Output,  EventEmitter } from '@angular/core';
import { Product } from '../../interface/interface-const';
import { ServicesService } from '../../services/services.service';

@Component({
  selector: 'app-modal-delete',
  templateUrl: './modal-delete.component.html',
  styleUrls: ['./modal-delete.component.scss']
})
export class ModalDeleteComponent implements OnInit, OnChanges {
  isClose: boolean = false;
  isMassage: string = '';

  constructor(
    private simpleService: ServicesService,
  ) { }

  @Input() deleteItem: boolean;
  @Output() activeDelete = new EventEmitter<boolean>();


  ngOnInit(): void {
    this.deleteItem = false;
    this.simpleService.isModalDelete$.subscribe((res) =>  this.onDeletePhoto(res));
    this.simpleService.isModalDeleteMassage$.subscribe((res) => this.setMassage(res));
  }

  ngOnChanges() {
    this.deleteItem = true;
    console.log(this.isClose);

  }

  onDeletePhoto(res: boolean) {
    this.isClose = res
  }

  setMassage(str: string) {
    this.isMassage = str;
  }

  onDelete(): any {
    this.isClose = false;
    this.simpleService.isDelete(this.isClose);
  }

  onCancel() {
    this.deleteItem = false;
    this.activeDelete.emit(false);
    this.isClose = false
  }

}
