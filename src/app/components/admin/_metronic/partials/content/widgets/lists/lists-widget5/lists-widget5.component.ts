import { Component, Input } from '@angular/core';
import { Appointment } from 'src/app/models/appointment.model';

@Component({
  selector: 'app-lists-widget5',
  templateUrl: './lists-widget5.component.html',
})
export class ListsWidget5Component {

  @Input() appointments:Appointment [];

  constructor() {}
}
