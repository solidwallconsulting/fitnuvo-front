import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { WidgetsModule } from '../../_metronic/partials';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { AppointmentsDComponent } from './appointments.component';


@NgModule({
  declarations: [AppointmentsDComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: AppointmentsDComponent,
      },
    ]),
    WidgetsModule,
    Ng2SmartTableModule,
    

    
  ],
})
export class AppointmentsModule {}
