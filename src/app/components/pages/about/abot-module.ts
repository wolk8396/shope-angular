import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { RouterModule } from "@angular/router";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { AppRoutingModule } from "src/app/app-routing.module";
import { ShardModule } from "../../shard/shard-module/shard-modal";
import { CommentsTodoComponentComponent } from "../../shard/todo/comments-todo-component/comments-todo-component.component";
import { CreateTodoComponentComponent } from "../../shard/todo/create-todo-component/create-todo-component.component";
import { AboutComponent } from "./about.component";

@NgModule({
  declarations: [
    AboutComponent,
    CreateTodoComponentComponent,
    CommentsTodoComponentComponent
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
