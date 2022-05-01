import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { WidgetsModule } from '../../_metronic/partials';
import { SpecialityComponent } from './speciality.component';
import { Ng2SmartTableModule } from 'ng2-smart-table';


@NgModule({
  declarations: [SpecialityComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: SpecialityComponent,
      },
    ]),
    WidgetsModule,
    Ng2SmartTableModule,
    

    
  ],
})
export class SpecialityModule {}
