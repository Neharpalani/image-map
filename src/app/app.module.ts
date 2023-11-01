import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { environment } from 'src/environments/environments'
import { AppComponent } from './app.component';
import { FirstPageComponent } from './first-page/first-page.component';
import {AngularFireModule} from '@angular/fire/compat';
import {AngularFireStorageModule} from '@angular/fire/compat/storage';
import { ApiService } from 'src/api.service';
import { AuthService } from 'src/auth.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SecondPageComponent } from './second-page/second-page.component';
import { ThirdPageComponent } from './third-page/third-page.component';

@NgModule({
  declarations: [
    AppComponent,
    FirstPageComponent,
    SecondPageComponent,
    ThirdPageComponent
  ],
  imports: [
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireStorageModule,
    BrowserModule,
    HttpClientModule,
    FormsModule,
    CommonModule,
    
    RouterModule.forRoot([
      {path: 'first-page', component: FirstPageComponent},
      {path: '', component: FirstPageComponent},
      {path: 'second-page', component: SecondPageComponent},
      {path: 'third-page', component: ThirdPageComponent}

    ]),
 
],
  providers: [ApiService,AuthService,HttpClientModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
