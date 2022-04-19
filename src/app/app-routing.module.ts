import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SiteRoutingModule } from './components/site/site-routing.module';

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forRoot(routes),
    SiteRoutingModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
