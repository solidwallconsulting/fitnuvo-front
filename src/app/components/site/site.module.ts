import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SiteRoutingModule } from './site-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';

import { HomeComponent } from './home/home.component';
import { IndexComponent } from './index/index.component';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { HeaderComponent } from './layouts/header/header.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { AboutComponent } from './pages/about/about.component';
import { PartnerComponent } from './pages/partner/partner.component';
import { SearchComponent } from './pages/search/search.component';
import { ContactComponent } from './pages/contact/contact.component';
import { BlogComponent } from './pages/blog/blog.component';
import { DetailblogComponent } from './pages/detailblog/detailblog.component';
import { SidebarComponent } from './layouts/sidebar/sidebar.component';
import { TrainerprofileComponent } from './pages/trainerprofile/trainerprofile.component';
import { LoginComponent } from './auth/login/login.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RegisterComponent } from './auth/register/register.component';
import { ResetpasswordComponent } from './auth/resetpassword/resetpassword.component';
import { HttpClientModule } from '@angular/common/http';
import { NavbarComponent } from './layouts/navbar/navbar.component';
import { SnotifyModule, SnotifyService, ToastDefaults } from 'ng-snotify';
import { ResponseResetPasswordComponent } from './auth/response-reset-password/response-reset-password.component';
import { CprofileComponent } from './pages/Client/cprofile/cprofile.component';
import { ClayoutComponent } from './pages/Client/clayout/clayout.component';
import { SideprofileComponent } from './pages/Client/sideprofile/sideprofile.component';
import { NgxSliderModule } from '@angular-slider/ngx-slider';
import { NgxPaginationModule } from 'ngx-pagination';
import { AppointmentsComponent } from './pages/Client/cappointments/appointments.component';


import { FullCalendarModule } from '@fullcalendar/angular'; 
import interactionPlugin from '@fullcalendar/interaction';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import { WishlistComponent } from './pages/Client/cwishlist/wishlist.component';
import { SideTprofileComponent } from './Trainer/sideprofile/sidetprofile.component';
import { TprofileComponent } from './Trainer/tprofile/tprofile.component';
import { TlayoutComponent } from './Trainer/tlayout/tlayout.component';
import { AppointmentsTComponent } from './Trainer/tappointments/appointments.component';
import { AddAppointmentComponent } from './Trainer/tappointments/modal-add-appointment/add-appointment.component';
import { AddAppointmentCComponent } from './pages/Client/cappointments/modal-add-appointment/add-appointmentc.component';
import { EditAppointmentCComponent } from './pages/Client/cappointments/modal-edit-appointment/edit-appointmentc.component';
import { MessagesComponent } from './pages/Client/messages/messages.component';
import { ConversationComponent } from './pages/Client/messages/conversation/conversation.component';
import { EditAppointmentComponent } from './Trainer/tappointments/modal-edit-appointment/edit-appointment.component';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { MessagesTComponent } from './Trainer/messages/messages.component';
import { ConverComponent } from './Trainer/messages/conversation/conversation.component';


FullCalendarModule.registerPlugins([ 
  interactionPlugin,
  dayGridPlugin,
  timeGridPlugin,
]); 

@NgModule({
  declarations: [
    HomeComponent,
    IndexComponent,
    HeaderComponent,
    FooterComponent,
    AboutComponent,
    PartnerComponent,
    SearchComponent,
    ContactComponent,
    BlogComponent,
    DetailblogComponent,
    SidebarComponent,
    TrainerprofileComponent,
    LoginComponent,
    RegisterComponent,
    ResetpasswordComponent,
    NavbarComponent,
    ResponseResetPasswordComponent,
    CprofileComponent,
    ClayoutComponent,
    SideprofileComponent,
    AppointmentsComponent,
    WishlistComponent,
    SideTprofileComponent,
    TlayoutComponent,
    AppointmentsTComponent,
    TprofileComponent,
    AddAppointmentComponent,
    AddAppointmentCComponent,
    EditAppointmentCComponent,
    MessagesComponent,
    ConversationComponent,
    EditAppointmentComponent,
    MessagesTComponent,
    ConverComponent


    
  ],
  imports: [
    CommonModule,
    SiteRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    CarouselModule,
    NgbModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,    
     SnotifyModule,
     NgxSliderModule,
     NgxPaginationModule,
     FullCalendarModule,
     Ng2SmartTableModule,
     NgMultiSelectDropDownModule.forRoot(),
     


    
    
  ], providers: [
    SnotifyService,
    {provide: 'SnotifyToastConfig', useValue: ToastDefaults}
  
  ],
})
export class SiteModule { }
