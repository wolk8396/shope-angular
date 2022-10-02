import { Component, OnInit } from '@angular/core';
import { UserDate, UserDate2 } from '../../interface/interface-const';
import { LocalService } from '../../local-storage-service/local-storage';

@Component({
  selector: 'app-create-todo-component',
  templateUrl: './create-todo-component.component.html',
  styleUrls: ['./create-todo-component.component.scss']
})
export class CreateTodoComponentComponent implements OnInit {
  userDate: UserDate = LocalService.getUserDate();
  fullName: string = '';
  isPhoto: string = '';

  constructor() { }

  ngOnInit(): void {
    this.onSetDate();
  }

  onSetDate() {
    const { photoUrl, first_name, last_name } = this.userDate;

    this.fullName = `${first_name} ${last_name}`;

    this.isPhoto = photoUrl;
  }

}
