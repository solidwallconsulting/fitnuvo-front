import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { WidgetsModule } from '../../_metronic/partials';
import { ReportsComponent } from './reports.component';
import { Ng2SmartTableModule } from 'ng2-smart-table';


@NgModule({
  declarations: [ReportsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: ReportsComponent,
      },
    ]),
    WidgetsModule,
    Ng2SmartTableModule,
    

    
  ],
})
export class ReportsModule {}
