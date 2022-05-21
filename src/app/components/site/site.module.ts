import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SiteRoutingModule } from './site-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

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
    AppointmentsComponent

    
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
     NgxPaginationModule

    
    
  ], providers: [
    SnotifyService,
    {provide: 'SnotifyToastConfig', useValue: ToastDefaults}
  
  ],
})
export class SiteModule { }
