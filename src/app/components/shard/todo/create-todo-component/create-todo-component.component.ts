import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Operation } from '../../function/function';
import { createToDo, UserDate, UserDate2 } from '../../interface/interface-const';
import { LocalService } from '../../local-storage-service/local-storage';
import { Url_img } from '../../url-img/url-photo';

@Component({
  selector: 'app-create-todo-component',
  templateUrl: './create-todo-component.component.html',
  styleUrls: ['./create-todo-component.component.scss']
})
export class CreateTodoComponentComponent implements OnInit {
  userDate: UserDate = LocalService.getUserDate();
  fullName: string = '';
  isComment: string = '';
  isPhoto: string = '';
  isValue: boolean = true;
  getInputValue: string = '';
  todo: createToDo;

  constructor() { }

  @Input() bookId: string | undefined;
  @Output() openModal = new EventEmitter<object>();


  ngOnInit(): void {
    this.onSetDate();
  }

  onSetDate() {
    const { photoUrl, first_name, last_name } = this.userDate;
    if ( Operation.isCheckAcc()) {
      this.fullName = `${first_name} ${last_name}`;
      this.isValue = false;
      this.isPhoto = photoUrl;

    } else {
      this.fullName = '';
      this.isPhoto = Url_img.avatar;
      this.isValue = true;
    }
  }

  addDate (): createToDo {
   const { authId }  = this.userDate;

    let todoDate : createToDo = {
      value: true,
      date: {
          book_id: this.bookId,
          userId: authId,
          comment: this.getInputValue,
          time: new Date(),
          likes: 0
      }
    }

    return todoDate;
  }

  onBtn(): void {
    this.todo = this.addDate();
    this.todo.value =  this.isValue;
    this.getInputValue = '';

    if (!Operation.isCheckAcc()) {
      this.openModal.emit(this.todo);
    } else {
      this.openModal.emit(this.todo);
    }
  }
}
