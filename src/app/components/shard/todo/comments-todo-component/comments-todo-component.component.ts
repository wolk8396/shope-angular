import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output } from '@angular/core';
import { modal_delete } from '../../const/const';
import { commentUser } from '../../interface/interface-const';
import { LocalService } from '../../local-storage-service/local-storage';
import { AipHandlers } from '../../services/aip-handlers';
import { ServicesService } from '../../services/services.service';
import { Operation } from '../../function/function';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-comments-todo-component',
  templateUrl: './comments-todo-component.component.html',
  styleUrls: ['./comments-todo-component.component.scss'],
})
export class CommentsTodoComponentComponent implements OnInit, OnChanges, OnDestroy {
  isTodo: Array<commentUser | []> = [];
  isFullName: string = '';
  isBtn: string = 'delete';
  isCheck: boolean = false;
  isEdit: boolean = false;
  isInput: boolean = true;
  isID: string | undefined;
  likesCount: number = 0;
  isColor: boolean = false;
  private upDate_likes$: Subscription;
  private upDate_comments$: Subscription;
  private delete_comments$: Subscription;
  private subscriptions: Subscription[] = [];

  constructor(
    private api: AipHandlers,
    private service: ServicesService,
  ) {}

  @Input() dateComments: commentUser;
  @Output() isValue = new EventEmitter<boolean>();

  ngOnChanges(): void {
    const { first_name, last_name, photoUrl } = this.dateComments;
    this.isFullName = `${first_name} ${last_name}`;
  }

  ngOnInit(): void {
    this.onRenderBtn();
    this.onCountLikes();
    this.onSetColor();
  }

  onCountLikes(): void {
    (!Array.isArray(this.dateComments.likes)) ?
      this.likesCount = 0 : this.likesCount = this.dateComments.likes.length;
  }

  onRemoveTodo(el: string | undefined): void {
    this.service.delete(true, modal_delete.comment);
    this.service.isDelete$.subscribe((value) => this.onDelete(value, el));
  }

  onChangeComment(date: commentUser): void {
   this.upDate_comments$ = this.api.upDateComments(date.item_id, date).subscribe({
      complete: () => this.isInput = !this.isInput
    })
    this.subscriptions.push(this.upDate_comments$);
  }

  onRenderBtn(): void {
    const { authId } = LocalService.getUserDate();
    if (authId) {
      this.isCheck = true;
    } else this.isCheck = false;

    (authId === this.dateComments.userId) ?
      this.isEdit = true : this.isEdit = false;
  }

  onDelete(value: boolean, id: string | undefined): void {
    if (!value) {
    this.delete_comments$ = this.api.removeComment(id).subscribe({
        complete: (() => {
          this.isValue.emit(true);
        })
      });

    this.subscriptions.push(this.delete_comments$);
    }
  }

  onAddLike(date: commentUser): void {
    const { authId } = LocalService.getUserDate();
    if (Operation.onFindLike(date.likes, authId)) {

       if (Array.isArray(date.likes)) {
         date.likes = date.likes.filter(item => item !== authId)
         if (date.likes.length === 0) {
          date.likes = 0;
         }
       }

    } else {
       if (typeof date.likes === 'number') {
        date.likes = [authId]
        } else if(Array.isArray(date.likes)) {
        date.likes.push(authId);
      }

    }

   this.upDate_likes$ = this.api.upDateComments(date.item_id, date).subscribe({
      complete: (() => {
        this.isValue.emit(true);
      })
    })
    this.subscriptions.push(this.upDate_likes$);
  }

  onSetColor() {
    const { likes } = this.dateComments;
    const { authId } = LocalService.getUserDate();

    Operation.onFindLike(likes, authId) ?
      this.isColor = true : this.isColor = false;
  }

  ngOnDestroy(): void {
    this.service.isDelete$.unsubscribe();
    this.subscriptions.forEach(item =>  item.unsubscribe());
  }
}
