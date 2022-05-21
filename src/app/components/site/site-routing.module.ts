import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { Role } from 'src/app/models/adminsModel/role.model';
import { ResponseResetPasswordComponent } from './auth/response-reset-password/response-reset-password.component';
import { HomeComponent } from './home/home.component';
import { IndexComponent } from './index/index.component';
import { AboutComponent } from './pages/about/about.component';
import { BlogComponent } from './pages/blog/blog.component';
import { ClayoutComponent } from './pages/Client/clayout/clayout.component';
import { ContactComponent } from './pages/contact/contact.component';
import { CprofileComponent } from './pages/Client/cprofile/cprofile.component';
import { DetailblogComponent } from './pages/detailblog/detailblog.component';
import { PartnerComponent } from './pages/partner/partner.component';
import { SearchComponent } from './pages/search/search.component';
import { TrainerprofileComponent } from './pages/trainerprofile/trainerprofile.component';
import { AppointmentsComponent } from './pages/Client/cappointments/appointments.component';

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
            path: 'trainer/:id',
            component: TrainerprofileComponent,
          },
          {
            path: 'responseResetPassword',
            component: ResponseResetPasswordComponent,
            data: {breadcrumbs: 'Changepassword'}
          },

          {
            path: 'user',
            component: ClayoutComponent,
            canActivate: [ AuthGuard ],
            data: {
              role: Role.Client
            },
            children: [
              { path: '', 
                redirectTo: 'profile', 
                pathMatch: 'full' 
              },
              {
                path: 'profile',
                component: CprofileComponent
              },
              {
                path: 'appointments',
                component: AppointmentsComponent
              },
              
            ]
          },

          
    
         
    ]
  }
 
];


@NgModule({
  imports: [RouterModule.forChild(siteRoutes)],
  exports: [RouterModule]
})
export class SiteRoutingModule { }
