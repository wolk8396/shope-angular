import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { StyleDirective } from "../../shard/directives/style.color.directiv";
import { ShardModule } from "../../shard/shard-module/shard-modal";
import { CommentsTodoComponentComponent } from "../../shard/todo/comments-todo-component/comments-todo-component.component";
import { CreateTodoComponentComponent } from "../../shard/todo/create-todo-component/create-todo-component.component";
import { AboutComponent } from "./about.component";

@NgModule({
  declarations: [
    AboutComponent,
    CreateTodoComponentComponent,
    CommentsTodoComponentComponent,
    StyleDirective
  ],
  imports: [
    CommonModule,
    NgbModule,
    FormsModule,
    ShardModule,
    MatIconModule,
    MatButtonModule,
  ],
})

export class AboutModule {}
