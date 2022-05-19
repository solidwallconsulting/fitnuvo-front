import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DropdownMenusModule, WidgetsModule } from '../../_metronic/partials';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { TrainersComponent } from './trainers.component';
import { InlineSVGModule } from 'ng-inline-svg';
import { ButtonViewComponent } from './button.component';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [TrainersComponent  , ButtonViewComponent],
  entryComponents: [ButtonViewComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: TrainersComponent,
      },
    ]),
    WidgetsModule,
    InlineSVGModule,
    Ng2SmartTableModule,
    DropdownMenusModule,
    CommonModule,
    FormsModule
    
    
    

    
  ],
})
export class TrainersModule {}
