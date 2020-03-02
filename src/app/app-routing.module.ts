import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

/***********************SERVICES**********************************/
import { AuthGuardService } from "./service/auth-guard.service";
import { AuthenticationService } from "./service/authentication.service";

import { ProduitsComponent } from './components/produits/produits.component';
import { ProfileComponent } from './components/profile/profile.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { LoginComponent } from './components/login/login.component'
import { HomeComponent } from './components/home/home.component';


const routes: Routes = [
  {path:'', component: LoginComponent},
  {path:'home', component: HomeComponent},  
  {path:'profile', component: ProfileComponent, canActivate: [AuthGuardService]},
  {path:'produits', component: ProduitsComponent, canActivate: [AuthGuardService] },
  {path:'categories', component: CategoriesComponent, canActivate: [AuthGuardService]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
