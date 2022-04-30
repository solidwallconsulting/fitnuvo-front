import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ResponseResetPasswordComponent } from './auth/response-reset-password/response-reset-password.component';
import { HomeComponent } from './home/home.component';
import { IndexComponent } from './index/index.component';
import { AboutComponent } from './pages/about/about.component';
import { BlogComponent } from './pages/blog/blog.component';
import { ContactComponent } from './pages/contact/contact.component';
import { DetailblogComponent } from './pages/detailblog/detailblog.component';
import { PartnerComponent } from './pages/partner/partner.component';
import { SearchComponent } from './pages/search/search.component';
import { TrainerprofileComponent } from './pages/trainerprofile/trainerprofile.component';

const siteRoutes: Routes = [
  {
    path: '',
    component: IndexComponent,
    children: [
          {
            path: '',
            component: HomeComponent,
            pathMatch: 'full'
          },
          {
            path: 'about',
            component: AboutComponent, 
          },
          {
            path: 'search',
            component: SearchComponent,
          },
          {
            path: 'blog',
            component: BlogComponent,
          },
          {
            path: 'blog/detail',
            component: DetailblogComponent,
          },
          
          {
            path: 'partner',
            component: PartnerComponent,
          },
          {
            path: 'contact',
            component: ContactComponent,
          },
          {
            path: 'trainer',
            component: TrainerprofileComponent,
          },
          {
            path: 'responseResetPassword',
            component: ResponseResetPasswordComponent,
            data: {breadcrumbs: 'Changepassword'}
          },
         
    ]
  }
 
];


@NgModule({
  imports: [RouterModule.forChild(siteRoutes)],
  exports: [RouterModule]
})
export class SiteRoutingModule { }
