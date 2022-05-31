import { Component, Input, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-tables-widget10',
  templateUrl: './tables-widget10.component.html',
})
export class TablesWidget10Component implements OnInit {
  constructor() {}
  @Input() users:any[];
  url:string=environment.urlServeur;

  ngOnInit(): void {}
}
