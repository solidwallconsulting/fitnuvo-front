import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { WidgetsModule } from '../../_metronic/partials';
import { ContactsComponent } from './website-contacts.component';
import { Ng2SmartTableModule } from 'ng2-smart-table';


@NgModule({
  declarations: [ContactsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: ContactsComponent,
      },
    ]),
    WidgetsModule,
    Ng2SmartTableModule,
    

    
  ],
})
export class ContactsModule {}
