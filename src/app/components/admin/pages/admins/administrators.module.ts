import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { WidgetsModule } from '../../_metronic/partials';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { AdministratorsComponent } from './administrators.component';
import { InlineSVGModule } from 'ng-inline-svg';
import { ButtonViewAComponent } from './button.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditPassComponent } from './modal-editpassword/editpassword.component';


@NgModule({
  declarations: [AdministratorsComponent,ButtonViewAComponent,EditPassComponent],
  entryComponents: [ButtonViewAComponent],
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
    Ng2SmartTableModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule
    
    

    
  ],
})
export class AdministratorsModule {}
