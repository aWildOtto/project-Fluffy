import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FrontPageComponent } from './front-page/front-page.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  { path: '', component: FrontPageComponent },
  { path: "login", component: LoginComponent }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
