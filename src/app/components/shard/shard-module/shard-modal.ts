import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { ModalAddPhotoComponent } from '../modal/modal-add-photo/modal-add-photo.component';
import { ModalDeleteComponent } from '../modal/modal-delete/modal-delete.component';
import { ModalItemsComponent } from '../modal/modal-items/modal-items.component';
import { RegistrationComponent } from '../modal/registration/registration.component';
import { CountProductPipe } from '../pipeps/count-product.pipe';
import { ErrorPipe } from '../pipeps/errors-massage';
import { FilterProductsPipe } from '../pipeps/filter-products.pipe';
import { TotalPricePipe } from '../pipeps/total-price.pipe';

@NgModule({
  declarations : [
    ModalAddPhotoComponent,
    RegistrationComponent,
    ModalItemsComponent,
    ModalDeleteComponent,
    FilterProductsPipe,
    TotalPricePipe,
    CountProductPipe,
    ErrorPipe,
  ],
  imports:[
    CommonModule,
    NgbModule,
  ],
  exports: [
    ModalAddPhotoComponent,
    RegistrationComponent,
    ModalItemsComponent,
    ModalDeleteComponent,
    FilterProductsPipe,
    TotalPricePipe,
    CountProductPipe,
    ErrorPipe,
  ]

})

export class ShardModule {}
