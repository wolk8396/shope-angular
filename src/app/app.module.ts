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
import { SignInComponent } from './components/pages/sign-in/sign-in.component';
import { SignUpComponent } from './components/pages/sign-up/sign-up.component';
import { ErrorPipe } from './components/shard/pipeps/errors-massage';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { provideDatabase,getDatabase } from '@angular/fire/database';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { AngularFireModule } from '@angular/fire/compat';
import { SpinnerComponent } from './components/shard/spinner/spinner.component';

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
    ErrorPipe,
    ModalItemsComponent,
    ModalDeleteComponent,
    SignInComponent,
    SignUpComponent,
    SpinnerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule,
    // AngularFireModule.initializeApp(environment.firebase),
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideDatabase(() => getDatabase()),
    provideFirestore(() => getFirestore())
  ],
  providers: [],
  bootstrap: [AppComponent]
})


export class AppModule { }
