//external lib or plugins
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { AngularFireModule } from "angularfire2";
import { AngularFireDatabaseModule} from "angularfire2/database";
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { HttpClientModule } from '@angular/common/http';
import { FlashMessagesModule } from 'angular2-flash-messages/module/module';
import { AngularFireStorageModule, AngularFireStorage } from 'angularfire2/storage';
import { FlashMessagesService } from 'angular2-flash-messages/module/flash-messages.service';
//our own components
import { AppComponent } from './app.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { LoginComponent } from './login/login.component';
import { FrontPageComponent } from './front-page/front-page.component';
import { AppRoutingModule } from './app-routing.module';
import { UserService } from '../services/user.service';
import { environment } from '../environments/environment';
import { FooterComponent } from './footer/footer.component';
import { AddUserInfoComponent } from './add-user-info/add-user-info.component';
import { ProfilePageComponent } from './profile-page/profile-page.component';
import { CatCardComponent } from './cat-card/cat-card.component';
import { NotFoundComponent } from './not-found/not-found.component';


@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    LoginComponent,
    FrontPageComponent,
    FooterComponent,
    AddUserInfoComponent,
    ProfilePageComponent,
    CatCardComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFirestoreModule,
    FlashMessagesModule,
    AngularFireStorageModule
  ],
  providers: [
    UserService,
    AngularFireAuth,
    FlashMessagesService,
    AngularFireStorage
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
