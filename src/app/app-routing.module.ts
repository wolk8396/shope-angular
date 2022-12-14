import { NgModule } from '@angular/core';
import { PreloadAllModules, PreloadingStrategy, RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/pages/home/home.component';
import { CartComponent } from "./components/pages/cart/cart.component";
import { SignInComponent } from './components/pages/sign-in/sign-in.component';
import { SignUpComponent } from './components/pages/sign-up/sign-up.component';
import { AccountComponent } from './components/pages/account/account.component';
import { ErrorPageComponent } from './components/pages/error-page/error-page.component';
import { AboutComponent } from './components/pages/about/about.component';
import { AuthGuard } from './components/shard/services/auth.guard';
import { ProfileComponent } from './components/shard/profile/profile.component';

 export const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'cart', component: CartComponent},
  {path: 'sign-in', component: SignInComponent},
  {path: 'sign-up', component: SignUpComponent},
  {path: 'account', component: AccountComponent, canActivate: [AuthGuard]},
  {path: 'about/:product',  component: AboutComponent},
  {path: 'error-page', component: ErrorPageComponent},
  {path: '**', redirectTo: '/error-page'}
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
// {path: 'account', component: AccountComponent, canActivate: [AuthGuard], children: [
//   {path: 'profile', component: ProfileComponent, canActivateChild: [AuthGuard]}
// ]},
