import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SiteRoutingModule } from './site-routing.module';
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
  ],
  imports: [
    CommonModule,
    SiteRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    CarouselModule
  ]
})
export class SiteModule { }
