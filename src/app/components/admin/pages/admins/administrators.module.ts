import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { WidgetsModule } from '../../_metronic/partials';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { AdministratorsComponent } from './administrators.component';
import { InlineSVGModule } from 'ng-inline-svg';


@NgModule({
  declarations: [AdministratorsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: AdministratorsComponent,
      },
    ]),
    WidgetsModule,
    InlineSVGModule,
    Ng2SmartTableModule
    
    

    
  ],
})
export class AdministratorsModule {}
