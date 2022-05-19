import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OverviewComponent } from './overview/overview.component';
import { ReviewsComponent } from './reviews/reviews.component';
import { ImagesComponent } from './images/images.component';
import { SpecialitiesComponent } from './specialities/specialities.component';
import { ProfileComponent } from './profile.component';
import { AppointmentsComponent } from './appointments/appointments.component';


const routes: Routes = [
  {
    path: '',
    component: ProfileComponent,
    
    children: [
      {
        path: 'overview/:id',
        component: OverviewComponent,

      },
      {
        path: 'specialities/:id',
        component: SpecialitiesComponent,
      },
      {
        path: 'reviews/:id',
        component: ReviewsComponent,
      },
      {
        path: 'images/:id',
        component: ImagesComponent,
      },
      {
        path: 'appointments/:id',
        component: AppointmentsComponent,
      },
      { path: '', redirectTo: 'features/users/trainers', pathMatch: 'full' },
      { path: '**', redirectTo: 'features/users/trainers', pathMatch: 'full' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfileRoutingModule {}
