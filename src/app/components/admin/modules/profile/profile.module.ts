import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InlineSVGModule } from 'ng-inline-svg';
import { OverviewComponent } from './overview/overview.component';
import { ReviewsComponent } from './reviews/reviews.component';
import {  ImagesComponent } from './images/images.component';
import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './profile.component';
import { AppointmentsComponent } from './appointments/appointments.component';
import {
  CardsModule,
  DropdownMenusModule,
  WidgetsModule,
} from '../../_metronic/partials';
import { SpecialitiesComponent } from './specialities/specialities.component';

@NgModule({
  declarations: [
    ProfileComponent,
    OverviewComponent,
    SpecialitiesComponent,
    AppointmentsComponent,
    ReviewsComponent,
    ImagesComponent
  ],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    InlineSVGModule,
    DropdownMenusModule,
    WidgetsModule,
    CardsModule,
  ],
})
export class ProfileModule {}
