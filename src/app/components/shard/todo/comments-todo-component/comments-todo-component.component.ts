import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { commentUser } from '../../interface/interface-const';

@Component({
  selector: 'app-comments-todo-component',
  templateUrl: './comments-todo-component.component.html',
  styleUrls: ['./comments-todo-component.component.scss']
})
export class CommentsTodoComponentComponent implements OnInit, OnChanges {
  isTodo: Array<commentUser | []> = [];
  str: string = 'hello world';

  constructor() { }

  @Input() dateComments: commentUser;


  ngOnChanges(): void {
    this.dateComments
  }

  ngOnInit(): void {
    this.str
  }

}
