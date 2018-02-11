import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FrontPageComponent } from './front-page/front-page.component';
import { LoginComponent } from './login/login.component';
import { AddUserInfoComponent } from './add-user-info/add-user-info.component';
import { ProfilePageComponent } from './profile-page/profile-page.component';
import { NotFoundComponent } from './not-found/not-found.component';

const routes: Routes = [
  { path: '', component: FrontPageComponent },
  { path: "login", component: LoginComponent },
  { path: "register", component: AddUserInfoComponent },
  { path: "profile/:id", component: ProfilePageComponent },
  { path: '**', redirectTo: '404'},
  { path: '404', component: NotFoundComponent}
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
