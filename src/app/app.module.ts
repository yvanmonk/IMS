/***********************MODULES**********************************/
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Component } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AppRoutingModule } from './app-routing.module';

/***********************SERVICES**********************************/
import { AuthGuardService } from "./service/auth-guard.service";
import { AuthenticationService } from "./service/authentication.service";

/***********************COMPONENTS**********************************/
import { AppComponent } from './app.component';
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
  declarations: [
    AppComponent,
    ProduitsComponent,
    CategoriesComponent,
    ProfileComponent,
    LoginComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [AuthenticationService, AuthGuardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
