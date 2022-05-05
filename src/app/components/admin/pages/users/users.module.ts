import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { WidgetsModule } from '../../_metronic/partials';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { UsersComponent } from './users.component';
import { InlineSVGModule } from 'ng-inline-svg';


@NgModule({
  declarations: [UsersComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: UsersComponent,
      },
    ]),
    WidgetsModule,
    InlineSVGModule,
    
    

    
  ],
})
export class UsersModule {}
