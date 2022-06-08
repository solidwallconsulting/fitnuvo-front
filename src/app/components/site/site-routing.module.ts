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
import { WishlistComponent } from './pages/Client/cwishlist/wishlist.component';
import { TprofileComponent } from './Trainer/tprofile/tprofile.component';
import { AppointmentsTComponent } from './Trainer/tappointments/appointments.component';
import { TlayoutComponent } from './Trainer/tlayout/tlayout.component';
import { MessagesComponent } from './pages/Client/messages/messages.component';
import { ConversationComponent } from './pages/Client/messages/conversation/conversation.component';
import { ConverComponent } from './Trainer/messages/conversation/conversation.component';
import { MessagesTComponent } from './Trainer/messages/messages.component';
import { NotificationsComponent } from './Trainer/notifications/notifications.component';
import { NotificationsCComponent } from './pages/Client/notifications/notifications.component';
import { MyProfileComponent } from './Trainer/myprofile/myprofile.component';

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
              {
                path: 'wishlist',
                component: WishlistComponent
              },
              {
                path: 'chats',
                component: ConversationComponent
              },

              {
                path: 'chats/:id',
                component: MessagesComponent
              },

              {
                path: 'notifications',
                component: NotificationsCComponent
              },
              
              
              
            ]
          },

          {
            path: 'trainerme',
            component: TlayoutComponent,
            canActivate: [ AuthGuard ],
            data: {
              role: Role.Trainer
            },
            children: [
              { path: '', 
                redirectTo: 'profile', 
                pathMatch: 'full' 
              },
              {
                path: 'profile',
                component: TprofileComponent
              },
              {
                path: 'appointments',
                component: AppointmentsTComponent
              },

              {
                path: 'chats',
                component: ConverComponent
              },

              {
                path: 'chats/:id',
                component: MessagesTComponent
              },

              
              {
                path: 'notifications',
                component: NotificationsComponent
              },
              {
                path: 'myprofile',
                component: MyProfileComponent
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
