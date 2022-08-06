import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './components/home/home.component';
import { CartComponent } from './components/cart/cart.component';
import { SearchProductComponent } from './components/shard/search-product/search-product.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FilterProductsPipe } from './components/shard/pipeps/filter-products.pipe';
import { addBtnDirective } from './components/shard/directives/btn.add.directiv';
import { TotalPricePipe } from './components/shard/pipeps/total-price.pipe';
import { CountProductPipe } from './components/shard/pipeps/count-product.pipe';
import { ModalItemsComponent } from './components/shard/modal/modal-items/modal-items.component';
import { ModalDeleteComponent } from './components/shard/modal/modal-delete/modal-delete.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    CartComponent,
    SearchProductComponent,
    FilterProductsPipe,
    addBtnDirective,
    TotalPricePipe,
    CountProductPipe,
    ModalItemsComponent,
    ModalDeleteComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule
  ],
  providers: [HeaderComponent],
  bootstrap: [AppComponent]
})


export class AppModule { }
