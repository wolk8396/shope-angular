import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output } from '@angular/core';
import { modal_delete } from '../../const/const';
import { commentUser } from '../../interface/interface-const';
import { LocalService } from '../../local-storage-service/local-storage';
import { AipHandlers } from '../../services/aip-handlers';
import { ServicesService } from '../../services/services.service';

@Component({
  selector: 'app-comments-todo-component',
  templateUrl: './comments-todo-component.component.html',
  styleUrls: ['./comments-todo-component.component.scss'],
})
export class CommentsTodoComponentComponent implements OnInit, OnChanges {
  isTodo: Array<commentUser | []> = [];
  isFullName: string = '';
  isBtn: string = 'delete';
  isCheck: boolean = false;
  isInput: boolean = true;
  isID: string | undefined;

  constructor(
    private api: AipHandlers,
    private service: ServicesService,
  ) { }

  @Input() dateComments: commentUser;
  @Output() isValue = new EventEmitter<boolean>();

  ngOnChanges(): void {
    const { first_name, last_name, photoUrl } = this.dateComments
    this.isFullName = `${first_name} ${last_name}`
  }

  ngOnInit(): void {
    this.onRenderBtn()
  }

  onRemoveTodo(el: string | undefined): void {
    this.service.delete(true, modal_delete.comment);
    this.service.isDelete$.subscribe((value) => this.onDelete(value, el));
  }

  onChangeComment(date: commentUser): void {
    this.api.upDateComments(date.item_id, date).subscribe({
      complete: () => this.isInput = !this.isInput
    })
  }

  onRenderBtn(): void {
    const { authId } = LocalService.getUserDate();
    if (authId === this.dateComments.userId) {
      this.isCheck = true;
    } else this.isCheck = false;
  }

  onDelete(value: boolean, id: string | undefined): void {
    console.log('test');

    if (!value) {
     this.api.removeComment(id).subscribe({
        complete: (() => {
          this.isValue.emit(true);
        })
      });
    }
  }
}
