import { Component, Input, OnInit, OnChanges, Output,  EventEmitter } from '@angular/core';
import { Product } from '../../interface/interface-const';

@Component({
  selector: 'app-modal-delete',
  templateUrl: './modal-delete.component.html',
  styleUrls: ['./modal-delete.component.scss']
})
export class ModalDeleteComponent implements OnInit, OnChanges {
  isClose: boolean;

  constructor() { }

  @Input() deleteItem: boolean;
  @Output() activeDelete = new EventEmitter<boolean>()

  ngOnChanges() {
    this.deleteItem = true;
  }

  ngOnInit(): void {
    this.deleteItem = false;
  }


  onDelete() {
    this.deleteItem = false;
    this.activeDelete.emit(true);
  }

  onCancel() {
    this.deleteItem = false;
    this.activeDelete.emit(false);
  }

}
