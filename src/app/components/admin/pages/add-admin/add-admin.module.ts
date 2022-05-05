import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { WidgetsModule } from '../../_metronic/partials';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { InlineSVGModule } from 'ng-inline-svg';
import { AddAdminComponent } from './add-admin.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';


@NgModule({
  declarations: [AddAdminComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: AddAdminComponent,
      },
    ]),
    WidgetsModule,
    InlineSVGModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule
    
    

    
  ],
})
export class AddAdminModule {}
