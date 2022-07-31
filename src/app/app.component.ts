import { Component } from '@angular/core';
import { last } from 'rxjs';
import { LocalService } from "../app/components/shard/local-storage-service/local-storage";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'angular-project';
  sendNumber: string = '55555';

  test(str:Event): void {
    console.log(str);
  }


}
