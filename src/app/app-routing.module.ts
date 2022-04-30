import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminRoutingModule } from './components/admin/app-routing.module';
import { SiteRoutingModule } from './components/site/site-routing.module';

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forRoot(routes),
    SiteRoutingModule,AdminRoutingModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
