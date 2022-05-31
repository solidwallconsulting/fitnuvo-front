import { Component, Input } from '@angular/core';
import { Trainer } from 'src/app/models/trainer.model';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-lists-widget8',
  templateUrl: './lists-widget8.component.html',
})
export class ListsWidget8Component {
  @Input() cssClass = '';
  @Input() trainers:Trainer [];
  url:string=environment.urlServeur;

  constructor() {}
}
