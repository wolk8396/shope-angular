import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { appMenuStyle } from '../directives/menu.style.directiv';
import { ModalAddPhotoComponent } from '../modal/modal-add-photo/modal-add-photo.component';
import { ModalDeleteComponent } from '../modal/modal-delete/modal-delete.component';
import { ModalItemsComponent } from '../modal/modal-items/modal-items.component';
import { RegistrationComponent } from '../modal/registration/registration.component';
import { NotificationsComponent } from '../notifications/notifications.component';
import { CountProductPipe } from '../pipeps/count-product.pipe';
import { ErrorPipe } from '../pipeps/errors-massage';
import { FilterProductsPipe } from '../pipeps/filter-products.pipe';
import { TotalPricePipe } from '../pipeps/total-price.pipe';
import { SpinnerComponent } from '../spinner/spinner.component';

@NgModule({
  declarations : [
    ModalAddPhotoComponent,
    RegistrationComponent,
    ModalItemsComponent,
    ModalDeleteComponent,
    FilterProductsPipe,
    SpinnerComponent,
    TotalPricePipe,
    CountProductPipe,
    ErrorPipe,
    NotificationsComponent,
  ],
  imports:[
    CommonModule,
    NgbModule,
    MatIconModule,
    MatButtonModule,
  ],
  exports: [
    ModalAddPhotoComponent,
    RegistrationComponent,
    ModalItemsComponent,
    ModalDeleteComponent,
    FilterProductsPipe,
    SpinnerComponent,
    TotalPricePipe,
    CountProductPipe,
    ErrorPipe,
    NotificationsComponent,
  ],
})

export class ShardModule {}
