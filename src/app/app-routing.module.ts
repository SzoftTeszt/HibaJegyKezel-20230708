import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { ErrorListComponent } from './error-list/error-list.component';
import { UserListComponent } from './user-list/user-list.component';

const routes: Routes = [
  {path:"home", component:HomeComponent},
  {path:"signIn", component:SignInComponent},
  {path:"signUp", component:SignUpComponent},
  {path:"hibaLista", component:ErrorListComponent},
  {path:"felhasznaloLista", component:UserListComponent},
  {path:"", component:HomeComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
