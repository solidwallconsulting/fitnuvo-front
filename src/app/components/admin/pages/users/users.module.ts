import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { WidgetsModule } from '../../_metronic/partials';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { UsersComponent } from './users.component';
import { InlineSVGModule } from 'ng-inline-svg';
import { ButtonViewComponent } from './button.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [UsersComponent,ButtonViewComponent],
  entryComponents: [ButtonViewComponent],

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
    Ng2SmartTableModule,
    FormsModule
    
    

    
  ],
})
export class UsersModule {}
