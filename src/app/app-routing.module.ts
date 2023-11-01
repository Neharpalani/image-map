import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FirstPageComponent } from './first-page/first-page.component';


const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forRoot([

    {path: 'first-page', component: FirstPageComponent},
    {path: '', component: FirstPageComponent},
  ])],
  exports: [RouterModule]
})
export class AppRoutingModule { }
