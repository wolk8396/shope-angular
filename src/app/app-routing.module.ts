import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { CartComponent } from "../app/components/cart/cart.component";
import { SignInComponent } from './components/pages/sign-in/sign-in.component';
import { SignUpComponent } from './components/pages/sign-up/sign-up.component';
import { AccountComponent } from './components/pages/account/account.component';
import { ErrorPageComponent } from './components/pages/error-page/error-page.component';
import { AboutComponent } from './components/pages/about/about.component';

 export const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'cart', component: CartComponent},
  {path: 'sign-in', component: SignInComponent},
  {path: 'sign-up', component: SignUpComponent},
  {path: 'account', component: AccountComponent},
  {path: 'about/:id',  component: AboutComponent},
  {path: 'error-page', component: ErrorPageComponent},
  {path: '**', redirectTo: '/error-page'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
